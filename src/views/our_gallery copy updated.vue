<template>
  <BannerSection title="Our Gallery"/>
  <div class="container">
    <h3 class="gallery-title">NCCP Gallery</h3>
    <hr class="divider">
    
    <!-- Upload Section (Optional) -->
    <div class="upload-section" v-if="showUpload">
      <input type="file" @change="onFileChange" accept="image/*" class="file-input">
      <button class="upload-btn" @click="uploadPhoto">Upload Photo</button>
    </div>
    
    <!-- Gallery Grid -->
    <div class="gallery-grid">
      <div v-for="(item, index) in currentPageImages" :key="item._id" 
           class="gallery-item" @click="openModal(getActualIndex(index))">
        <div class="image-container">
          <img :src="imagePath + item.imageUrl" :alt="item.alt || 'Gallery image'" class="gallery-image">
          <div class="image-overlay">
            <span class="view-icon">👁️</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button class="pagination-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        &laquo; Prev
      </button>
      
      <button v-for="page in visiblePages" :key="page" 
              class="pagination-btn" 
              :class="{ active: page === currentPage }"
              @click="changePage(page)">
        {{ page }}
      </button>
      
      <button class="pagination-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
        Next &raquo;
      </button>
    </div>
    
    <!-- Image Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeModal">&times;</span>
        <div class="modal-image-container">
          <img :src="imagePath + fetchedImagesData[currentImageIndex].imageUrl" 
               class="modal-image" 
               :alt="fetchedImagesData[currentImageIndex].alt || 'Gallery image'">
          <button class="nav-btn prev-btn" @click="prevImage">&#10094;</button>
          <button class="nav-btn next-btn" @click="nextImage">&#10095;</button>
        </div>
        <div class="image-counter">
          {{ currentImageIndex + 1 }} / {{ fetchedImagesData.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSection from '@/components/BannerSection.vue';
import axios from 'axios';

export default {
  components: { BannerSection },
  data() {
    return {
      fetchedImagesData: [],
      selectedFile: null,
      imagePath: "http://localhost:3000",
      isModalOpen: false,
      currentImageIndex: 0,
      currentPage: 1,
      imagesPerPage: 12,
      showUpload: false // Set to true if you want to show upload functionality
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.fetchedImagesData.length / this.imagesPerPage);
    },
    currentPageImages() {
      const startIndex = (this.currentPage - 1) * this.imagesPerPage;
      const endIndex = startIndex + this.imagesPerPage;
      return this.fetchedImagesData.slice(startIndex, endIndex);
    },
    visiblePages() {
      const maxVisiblePages = 5;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
      
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    async fetchallimagesdata() {
      try {
        const response = await axios.get(`http://localhost:3000/gallery/photos`);
        this.fetchedImagesData = response.data;
      } catch (error) {
        console.error('Error Fetching Data', error);
      }
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadPhoto() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('photo', this.selectedFile);

      try {
        const response = await axios.post(`http://localhost:3000/gallery/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert("Successfully Uploaded");
        this.fetchallimagesdata();
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    },
    openModal(index) {
      this.currentImageIndex = index;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    },
    nextImage() {
      if (this.currentImageIndex < this.fetchedImagesData.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.fetchedImagesData.length - 1;
      }
    },
    changePage(page) {
      this.currentPage = page;
      // Scroll to top of gallery when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    getActualIndex(index) {
      return (this.currentPage - 1) * this.imagesPerPage + index;
    }
  },
  mounted() {
    this.fetchallimagesdata();
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.gallery-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  color: #2c3e50;
}

.divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #3498db, #2ecc71);
  border: none;
  margin: 0 auto 2rem;
}

.upload-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 2rem;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.file-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
}

.upload-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 3rem;
}

.gallery-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: white;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.view-icon {
  font-size: 2rem;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 10px 16px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f1f1f1;
  border-color: #bbb;
}

.pagination-btn.active {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border-color: #3498db;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  background-color: #111;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  color: white;
  font-size: 36px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #bbb;
}

.modal-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.image-counter {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
  }
  
  .image-container {
    height: 200px;
  }
  
  .modal-image-container {
    height: 60vh;
  }
  
  .nav-btn {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .pagination-btn {
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
  
  .image-container {
    height: 150px;
  }
  
  .gallery-title {
    font-size: 2rem;
  }
  
  .upload-section {
    flex-direction: column;
  }
  
  .modal-content {
    max-width: 95%;
    max-height: 95%;
  }
  
  .modal-image-container {
    height: 50vh;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
    padding: 10px;
  }
  
  .pagination {
    gap: 5px;
  }
  
  .pagination-btn {
    padding: 6px 10px;
    font-size: 0.9rem;
  }
}
</style>