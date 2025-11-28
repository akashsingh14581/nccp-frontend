<!-- src/components/Gallery.vue -->
<template>
  <BannerSection title="Our Gallery" />
  <div
    class="container"
    style="
      display: grid;
      place-items: center;
      place-content: center;
      margin-top: 10px;
      background-color: #edf2f7;
      padding: 40px;
      border-radius: 10px;
    "
  >
    <h1>Upload Photo</h1>
    <form @submit.prevent="uploadPhoto">
      <input type="file" @change="onFileChange" required />
      <button type="submit">Upload</button>
    </form>

    <h2>Gallery</h2>
    <div class="gallery">
      <div v-for="photo in photos" :key="photo._id">
        <img :src="photo.imageUrl" alt="Photo" />
      </div>
    </div>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";
import axios from "axios";
// const apiBaseUrl = import.meta.env.VUE_API_BASE_URL;

export default {
  components: { BannerSection },
  data() {
    return {
      photos: [],
      selectedFile: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadPhoto() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append("photo", this.selectedFile);

      try {
        const response = await axios.post(
          `http://localhost:3000/gallery/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.photos.push(response.data);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    },
  },
};
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
.gallery img {
  width: 100%;
  height: auto;
}
</style>
