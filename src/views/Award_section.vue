<template>
  <div>
    <BannerSection title="Winning Award By NCCP" />
    <section v-if="award" class="award-details container mt-5">
      <!-- Header Section -->
      <div class="row justify-content-center mb-4">
        <div class="col-lg-10">
          <div class="card shadow border-0">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <i class="fas fa-award fa-2x text-warning me-3"></i>
                <h1 class="h2 mb-0 text-primary">{{ award.awardName }}</h1>
              </div>
              
              <!-- Description Section -->
              <div class="mb-4">
                <h5 class="d-flex align-items-center text-secondary mb-3">
                  <i class="fas fa-info-circle me-2"></i> Description
                </h5>
                <p class="card-text">{{ award.awardDescription }}</p>
              </div>
              
              <!-- Oration Details Section -->
              <div class="mb-4">
                <h5 class="d-flex align-items-center text-secondary mb-3">
                  <i class="fas fa-microphone me-2"></i> Oration Details
                </h5>
                <p class="card-text">{{ award.orationDetails }}</p>
              </div>
              
              <!-- Extra Info Section -->
              <div v-if="award.extraInfo" class="mb-4">
                <h5 class="d-flex align-items-center text-secondary mb-3">
                  <i class="fas fa-star me-2"></i> Additional Information
                </h5>
                <p class="card-text">{{ award.extraInfo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Winners Section -->
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card shadow border-0">
            <div class="card-header bg-primary text-white py-3">
              <h3 class="h4 mb-0 d-flex align-items-center">
                <i class="fas fa-trophy me-2"></i> Winners
              </h3>
            </div>
            <div class="card-body p-0">
              <div class="list-group list-group-flush">
                <div 
                  v-for="(winner, index) in award.winners" 
                  :key="winner._id"
                  :class="['list-group-item d-flex justify-content-between align-items-center', 
                          index % 2 === 0 ? 'bg-light' : '']"
                >
                  <div>
                    <h5 class="mb-1">{{ winner.name }}</h5>
                    <p class="mb-0 text-muted">{{ winner.city }}</p>
                  </div>
                  <span class="badge bg-primary rounded-pill">{{ winner.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <section v-else class="text-center mt-5">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h3 class="mt-3 text-muted">Loading award details...</h3>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import BannerSection from "@/components/BannerSection.vue";
export default {
   components: {
    BannerSection,
  },
  name: "Award_section",
  props: ["id"],
  data() {
    return {
      award: null,
    };
  },
  mounted() {
    this.fetchAward();
  },
  watch: {
    id(newId, oldId) {
      if (newId !== oldId) {
        this.fetchAward();
      }
    }
  },
  methods: {
    async fetchAward() {
      try {
        const res = await axios.get(`http://localhost:3000/api/awards/${this.id}`);
        this.award = res.data;
      } catch (err) {
        console.error("Error fetching award:", err);
      }
    },
  },
};
</script>

<style scoped>
.award-details {
  max-width: 100%;
}

.card {
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  border-radius: 0 !important;
}

.list-group-item {
  padding: 1.25rem 1.5rem;
  border: none;
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: rgba(0, 123, 255, 0.05) !important;
}

.badge {
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
}

h1, h3, h5 {
  font-weight: 600;
}

.text-primary {
  color: #2c3e50 !important;
}

.bg-primary {
  background-color: #0d6efd!important;
}
</style>