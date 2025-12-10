<template>
  <div>
    <BannerSection title="Our Gallery" />
    <div class="container">
      <div class="gallery-header">
        <h1 class="gallery-title">NCCP Gallery</h1>
        <p class="gallery-subtitle">
          Explore our collection of memorable moments and events
        </p>
        <div class="divider"></div>
      </div>

      <!-- Gallery Grid -->
      <div class="gallery-grid">
        <div
          v-for="(item, index) in currentPageImages"
          :key="item._id"
          class="gallery-item"
          @click="openModal(getActualIndex(index))"
        >
          <div class="image-container">
            <img
              :src="imagePath + item.imageUrl"
              :alt="item.description || 'NCCP Gallery image'"
              class="gallery-image"
              loading="lazy"
            />
            <div class="image-overlay">
              <div class="overlay-content">
                <div class="view-icon">
                  <i class="bi bi-zoom-in"></i>
                </div>
                <div class="image-description-preview" v-if="item.description">
                  {{ truncateDescription(item.description) }}
                </div>
              </div>
            </div>
          </div>
          <!-- Description Badge -->
          <div class="description-badge" v-if="item.description">
            <i class="bi bi-card-text"></i>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="fetchedImagesData.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="bi bi-images"></i>
        </div>
        <h3>No Images Yet</h3>
        <p>Gallery images will be added soon</p>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button
          class="pagination-btn prev-btn"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
          Previous
        </button>

        <div class="page-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="page-btn"
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button
          class="pagination-btn next-btn"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <!-- Image Modal -->
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeModal">
            <i class="bi bi-x-lg"></i>
          </button>
          <div class="modal-image-container">
            <img
              :src="imagePath + fetchedImagesData[currentImageIndex].imageUrl"
              class="modal-image"
              :alt="
                fetchedImagesData[currentImageIndex].description ||
                'NCCP Gallery image'
              "
            />
            <button class="nav-btn prev-btn" @click="prevImage">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="nav-btn next-btn" @click="nextImage">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <div class="image-details">
            <div class="image-counter">
              {{ currentImageIndex + 1 }} / {{ fetchedImagesData.length }}
            </div>
            <div
              class="modal-description"
              v-if="fetchedImagesData[currentImageIndex].description"
            >
              <i class="bi bi-card-text"></i>
              {{ fetchedImagesData[currentImageIndex].description }}
            </div>
            <div class="modal-description placeholder" v-else>
              <i class="bi bi-image"></i>
              No description available
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'

export default {
  components: { BannerSection },
  data() {
    return {
      fetchedImagesData: [],
      imagePath: `${API_BASE_URL}`,
      isModalOpen: false,
      currentImageIndex: 0,
      currentPage: 1,
      imagesPerPage: 12,
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
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(
        this.totalPages,
        startPage + maxVisiblePages - 1
      );

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    async fetchallimagesdata() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/gallery/photos`
        );
        this.fetchedImagesData = response.data;
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    },
    openModal(index) {
      this.currentImageIndex = index;
      this.isModalOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = "auto";
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    getActualIndex(index) {
      return (this.currentPage - 1) * this.imagesPerPage + index;
    },
    truncateDescription(description) {
      if (description.length > 60) {
        return description.substring(0, 60) + "...";
      }
      return description;
    },
  },
  mounted() {
    this.fetchallimagesdata();
  },
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.gallery-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  margin: 0 auto;
  border-radius: 2px;
}

/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  background: white;
}

.gallery-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 1rem;
}

.view-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.image-description-preview {
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 500;
}

.description-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  padding: 6px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-icon {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #374151;
}

.empty-state p {
  font-size: 1rem;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 20px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.95rem;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  padding: 12px 18px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  min-width: 50px;
}

.page-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  transform: scale(1.05);
}

.page-btn:hover:not(.active) {
  border-color: #667eea;
  color: #667eea;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.modal-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  background: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.modal-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  flex: 1;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 2rem;
}

.next-btn {
  right: 2rem;
}

.image-details {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.image-counter {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  text-align: center;
}

.modal-description {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: white;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.modal-description.placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.modal-description i {
  color: #667eea;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .gallery-title {
    font-size: 2.5rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .image-container {
    height: 220px;
  }

  .modal-image-container {
    height: 60vh;
  }

  .nav-btn {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }

  .prev-btn {
    left: 1rem;
  }

  .next-btn {
    right: 1rem;
  }

  .pagination {
    flex-direction: column;
    gap: 0.75rem;
  }

  .page-numbers {
    order: -1;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .gallery-title {
    font-size: 2rem;
  }

  .image-container {
    height: 250px;
  }

  .modal-content {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-image-container {
    height: 50vh;
  }

  .nav-btn {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }

  .modal-description {
    font-size: 0.9rem;
    padding: 0 0.5rem;
  }
}
</style>
