<template>
  <BannerSection title="Our Gallery"/>
  <div class="container">
      <h3>NCCP Gallery</h3>
      <hr>
      <div class="gallery_images">
          <div v-for="(item, index) in fetchedImagesData" :key="item._id" class="image_items" @click="openModal(index)">
              <img :src="imagePath + item.imageUrl" alt="Photo" class="images">
          </div>
      </div>


      <div v-if="isModalOpen" class="modal">
          <span class="close" @click="closeModal">&times;</span>
          <div style="height: 100%">
          <img :src="imagePath + fetchedImagesData[currentImageIndex].imageUrl" class="modal-content" style="height: 100%; width: 100%; object-fit: cover">
          <a class="prev" @click="prevImage">&#10094;</a>
          <a class="next" @click="nextImage">&#10095;</a>
        </div>
      </div>
  </div>
</template>


<script>
import BannerSection from '@/components/BannerSection.vue';
import axios from 'axios';
// const apiBaseUrl = import.meta.env.VUE_API_BASE_URL;

export default {
    components: { BannerSection },
    data() {
        return {
            fetchedImagesData: [],
            selectedFile: null,
            imagePath: "http://localhost:3000",
            isModalOpen: false,
            currentImageIndex: 0
        };
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
                this.photos.push(response.data);

            } catch (error) {
                console.error('Error uploading photo:', error);
            }
        },
        openModal(index) {
            this.currentImageIndex = index;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
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
    },
    mounted() {
        this.fetchallimagesdata();
    }
}
</script>

<style scoped>
.gallery_images {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
}
.image_items {
    height: 300px;
    width: 100%;
    border-radius: 10px;
}
.image_items img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.upload_btn {
    padding: 10px 30px;
    border-radius: 10px;
    color: #fff;
    background: #007bff;
    border: none;
}
.modal {
    display: flex;
    position: fixed;
    z-index: 1000;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.9);
    align-items: center;
    justify-content: center;
}
.modal-content {
    max-width: 90%;
    max-height: 80%;
    margin: auto;
    display: block;
}
.close {
    position: absolute;
    top: 20px;
    right: 35px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
    cursor: pointer;
}
.close:hover, .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
}
.prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
}
.next {
    right: 10px;
    border-radius: 3px 0 0 3px;
}
.prev {
    left: 10px;
    border-radius: 3px 0 0 3px;
}
.prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
}
@media(max-width: 800px){
    .gallery_images {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}
@media(max-width: 768px){
    .gallery_images {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}
@media(max-width: 468px){
    .gallery_images {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
    }
}
</style>
