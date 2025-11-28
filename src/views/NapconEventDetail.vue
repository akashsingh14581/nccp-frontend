<template>
    <BannerSection :title="event.eventName" />
  <div class="container py-5">
    <h1>{{ event.eventName }}</h1>
    <h2>{{ event.title }}</h2>
    <p>{{ event.description }}</p>

    <!-- Gallery grid – uniform height -->
    <div class="row mt-4">
      <div
        v-for="photo in event.photos"
        :key="photo._id"
        class="col-md-3 mb-4 position-relative gallery-item"
        @click="openLightbox(photo)"
      >
        <img
          :src="imageBaseUrl + photo.imageUrl"
          :alt="photo.title"
          class="gallery-img"
        />
        <div class="overlay">
          <div class="overlay-text">{{ photo.title }}</div>
        </div>
      </div>
    </div>

    <!-- Lightbox modal -->
    <transition name="fade">
      <div v-if="lightboxOpen" class="lightbox-backdrop" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <!-- Close button -->
          <button class="lightbox-close" @click="closeLightbox"><i class="fa-solid fa-xmark"></i></button>

          <!-- Prev / Next buttons -->
          <button class="lightbox-nav left" @click="prevPhoto" :disabled="currentIdx === 0">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button
            class="lightbox-nav right"
            @click="nextPhoto"
            :disabled="currentIdx === event.photos.length - 1"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>

          <!-- Large image -->
          <img
            :src="imageBaseUrl + currentPhoto.imageUrl"
            class="lightbox-img"
            :alt="currentPhoto.title"
          />

          <!-- Title & description -->
          <div class="lightbox-info">
        <h3>{{ currentPhoto.title }}</h3>
            <p>{{ currentPhoto.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";
import axios from "axios";

export default {
      components: {
    BannerSection,
  },
  data() {
    return {
      event: {},
      imageBaseUrl: "http://localhost:3000",
      lightboxOpen: false,
      currentPhoto: {},
      currentIdx: -1,
    };
  },
  async created() {
    const id = this.$route.params.id;
    const res = await axios.get("http://localhost:3000/api/events");
    this.event = res.data.find((e) => e._id === id);
  },
  methods: {
    openLightbox(photo) {
      this.currentPhoto = photo;
      this.currentIdx = this.event.photos.findIndex((p) => p._id === photo._id);
      this.lightboxOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeLightbox() {
      this.lightboxOpen = false;
      document.body.style.overflow = "";
    },
    prevPhoto() {
      if (this.currentIdx > 0) {
        this.currentIdx--;
        this.currentPhoto = this.event.photos[this.currentIdx];
      }
    },
    nextPhoto() {
      if (this.currentIdx < this.event.photos.length - 1) {
        this.currentIdx++;
        this.currentPhoto = this.event.photos[this.currentIdx];
      }
    },
    handleKeydown(e) {
      if (!this.lightboxOpen) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowLeft") this.prevPhoto();
      if (e.key === "ArrowRight") this.nextPhoto();
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style scoped>
/* ---------- Gallery – uniform size ---------- */
.gallery-item {
  cursor: pointer;
  overflow: hidden;
  height: 100%;
}
.gallery-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 6px;
}
.gallery-item:hover .gallery-img {
  transform: scale(1.05);
}

/* Hover overlay */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.gallery-item:hover .overlay {
  opacity: 1;
}
.overlay-text {
  color: #fff;
  font-weight: 600;
  text-align: center;
  padding: 0 1rem;
  font-size: 1.1rem;
}

/* ---------- Lightbox ---------- */
.lightbox-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  text-align: center;
}
.lightbox-close {
  position: absolute;
  top: -15px;
  right: -15px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
}
.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightbox-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.lightbox-nav.left {
  left: -70px;
}
.lightbox-nav.right {
  right: -70px;
}
.lightbox-img {
  max-width: 90vw;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
}
.lightbox-info {
  margin-top: 1rem;
  color: #fff;
}
.lightbox-info h4 {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>