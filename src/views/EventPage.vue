<template>
  <BannerSection v-if="eventData" :title="eventData.title" />
  <div class="container py-5">

    <!-- Event Data -->
    <div v-if="eventData">
      <h2 class="mb-3 text-primary fw-bold">{{ eventData.title }}</h2>
      <p class="text-muted"><strong>Year:</strong> {{ eventData.year }}</p>
      <p class="lead">{{ eventData.description }}</p>

      <!-- Organizers -->
      <h4 class="mt-5 mb-3 text-success">Organizers:</h4>
      <ul class="list-group list-group-flush">
        <li v-for="org in eventData.organizers" :key="org._id" class="list-group-item py-2">
          <strong>{{ org.name }}</strong> - <em>{{ org.role }}</em>
        </li>
      </ul>

      <!-- Photos Gallery -->
      <h4 class="mt-5 mb-4 text-success">Photos:</h4>
      <div class="row g-3">
        <div
          class="col-md-4 col-sm-6"
          v-for="(photo, index) in eventData.photos"
          :key="photo._id"
        >
          <div
            class="photo-card position-relative overflow-hidden rounded shadow-sm cursor-pointer"
            @click="openLightbox(index)"
          >
            <img
              :src="imageBaseUrl + photo.imageUrl"
              class="img-fluid rounded w-100"
              style="height: 220px; object-fit: cover;"
              :alt="photo.title" loading="lazy"
            />
            <div class="photo-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 text-white opacity-0 transition">
              <h6 class="text-center px-3 mb-0">{{ photo.title }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading event...</p>
    </div>

    <!-- Lightbox Modal -->
    <div
      class="modal fade"
      id="lightboxModal"
      tabindex="-1"
      aria-hidden="true"
      ref="lightboxModal" style="background-color: black;"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bg-transparent border-0 shadow-lg">
          <div class="modal-body p-0 position-relative">

            <!-- Close Button -->
            <button
              type="button"
              class="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <!-- Image -->
            <img
              :src="currentPhotoUrl"
              class="img-fluid w-100 rounded"
              style="max-height: 85vh; object-fit: contain;"
              :alt="currentPhotoTitle" loading="lazy"
            />

            <!-- Caption (Title + Description) -->
            <div class="position-absolute bottom-0 start-0 end-0 bg-gradient-dark text-white p-3 rounded-bottom">
              <h5 class="mb-1 text-center">{{ currentPhotoTitle }}</h5>
              <p class="mb-0 text-center small" v-if="currentPhotoDescription">
                {{ currentPhotoDescription }}
              </p>
            </div>

            <!-- Navigation Arrows -->
            <button
              v-if="hasPrevious"
              class="btn btn-light btn-lg position-absolute top-50 start-0 translate-middle-y ms-3 z-3 rounded-circle shadow"
              @click.stop="prevPhoto"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            <button
              v-if="hasNext"
              class="btn btn-light btn-lg position-absolute top-50 end-0 translate-middle-y me-3 z-3 rounded-circle shadow"
              @click.stop="nextPhoto"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import BannerSection from '@/components/BannerSection.vue';

export default {
  name: 'EventDetail',
  components: { BannerSection },
  data() {
    return {
      eventData: null,
      imageBaseUrl: 'http://localhost:3000',
      currentIndex: 0,
      lightbox: null,
    };
  },
  computed: {
    currentPhoto() {
      return this.eventData?.photos[this.currentIndex] || {};
    },
    currentPhotoUrl() {
      return this.imageBaseUrl + this.currentPhoto.imageUrl;
    },
    currentPhotoTitle() {
      return this.currentPhoto.title || 'Untitled';
    },
    currentPhotoDescription() {
      return this.currentPhoto.description || '';
    },
    hasPrevious() {
      return this.currentIndex > 0;
    },
    hasNext() {
      return this.currentIndex < (this.eventData?.photos.length - 1);
    },
  },
  async mounted() {
    const eventId = this.$route.params.id;
    try {
      const res = await fetch(`http://localhost:3000/api/events/${eventId}`);
      const data = await res.json();
      this.eventData = data;
    } catch (err) {
      console.error('Error fetching event:', err);
    }

    // Initialise Bootstrap Modal
    this.lightbox = new Modal(document.getElementById('lightboxModal'));
  },
  methods: {
    openLightbox(index) {
      this.currentIndex = index;
      this.lightbox.show();
    },
    closeLightbox() {
      this.lightbox.hide();
    },
    prevPhoto() {
      if (this.hasPrevious) this.currentIndex--;
    },
    nextPhoto() {
      if (this.hasNext) this.currentIndex++;
    },
  },
};
</script>

<style scoped>
.photo-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,.15) !important;
}
.photo-card:hover .photo-overlay { opacity: 1 !important; }

.photo-overlay { transition: opacity .3s ease; }

.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0,0,0,.8), transparent);
}

.cursor-pointer { cursor: pointer; }
.transition { transition: all .3s ease; }
</style>