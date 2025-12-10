<template>
    <BannerSection :title="'NCCP NAPCON ' + year" />

  <div class="container py-5">
    <!-- <h2 class="text-center mb-4">NAPCON {{ year }} Events</h2> -->

    <div v-if="filteredEvents.length === 0" class="text-center text-muted">
      No events found for this year.
    </div>

    <div
      v-for="event in filteredEvents"
      :key="event._id"
      class="event-box"
      @click="goToEvent(event._id)"
    >
      <!-- First photo as background -->
      <div
        class="event-bg"
        :style="{ backgroundImage: `url(${firstPhoto(event)})` }"
      ></div>

      <!-- Title overlay (visible on hover) -->
      <div class="event-overlay">
        <h4 class="event-title">{{ event.title }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'

export default {
      components: {
    BannerSection,
  },
  data() {
    return {
      year: this.$route.params.year,
      events: [],
    };
  },

  async created() {
    const res = await axios.get(`${API_BASE_URL}/api/events`);
    this.events = res.data;
  },

  computed: {
    filteredEvents() {
      return this.events.filter((e) => e.year == this.year);
    },
  },

  methods: {
    goToEvent(id) {
      this.$router.push({ name: "NapconEventDetail", params: { id } });
    },

    /** Return the full URL of the first photo (or a fallback) */
    firstPhoto(event) {
      if (event.photos && event.photos.length > 0) {
        // API returns paths like "/gallery_images/xxx.avif"
        return `${this.imageBaseUrl}${event.photos[0].imageUrl}`;
      }
      return "/fallback-event.jpg"; // local fallback in public/
    },
  },
};
</script>

<style scoped>
.event-box {
  position: relative;
  height: 220px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.event-box:hover {
  transform: translateY(-4px);
}

/* Background image */
.event-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.event-box:hover .event-bg {
  transform: scale(1.05);
}

/* Title overlay – hidden by default */
.event-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.event-box:hover .event-overlay {
  opacity: 1;
}

.event-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  padding: 0 1rem;
  margin: 0;
}
</style>