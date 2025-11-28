<template>
  <div>
    <BannerSection title="Our Constitution" />

    <div class="container">
      <!-- Header Section -->
      <div class="constitution-header text-center">
        <h1 class="display-5 fw-bold text-primary mb-3">Our Constitution</h1>
        <div class="header-divider mx-auto mb-4"></div>
        <div
          class="constitution-badge bg-light rounded-pill px-4 py-2 d-inline-block"
        >
          <h2 class="h5 mb-0 text-dark">
            Registered under Societies Registration Act of 1860
          </h2>
          <small class="text-muted">Registration No. S/1421</small>
        </div>
      </div>

      <!-- Main Content Section -->
      <div class="constitution-content">
        <!-- Tab Navigation -->
        <div class="tab-section mb-5">
          <div class="section-header mb-4">
            <h2 class="section-title bg-primary text-white px-4 py-3 rounded">
              MEMORANDUM OF COLLEGE
            </h2>
          </div>

          <div class="row">
            <!-- Sidebar Navigation -->
            <div class="col-lg-3 mb-4">
              <div class="nav-tabs-vertical">
                <button
                  class="nav-tab-btn rounded-pill mb-3 text-start"
                  @click="setActiveTab('name')"
                  :class="{ active: activeTab === 'name' }"
                >
                  <i class="bi bi-building me-2"></i>
                  Name
                </button>
                <button
                  class="nav-tab-btn rounded-pill mb-3 text-start"
                  @click="setActiveTab('office')"
                  :class="{ active: activeTab === 'office' }"
                >
                  <i class="bi bi-geo-alt me-2"></i>
                  Office
                </button>
                <button
                  class="nav-tab-btn rounded-pill mb-3 text-start"
                  @click="setActiveTab('object')"
                  :class="{ active: activeTab === 'object' }"
                >
                  <i class="bi bi-bullseye me-2"></i>
                  Objects
                </button>
                <button
                  class="nav-tab-btn rounded-pill mb-3 text-start"
                  @click="setActiveTab('method')"
                  :class="{ active: activeTab === 'method' }"
                >
                  <i class="bi bi-gear me-2"></i>
                  Methods
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="col-lg-9">
              <div class="tab-content-container bg-light rounded p-4">
                <!-- Name Tab -->
                <div v-show="activeTab === 'name'" class="fade-in">
                  <h3 class="tab-content-title mb-4">
                    <i class="bi bi-building me-2 text-primary"></i>
                    Name of the Organisation
                  </h3>
                  <div class="content-card bg-white rounded p-4">
                    <p class="mb-0">
                      The name of the Organisation is
                      <strong
                        >"The National College of Chest Physicians
                        (India)"</strong
                      >
                      hereinafter called the "College". The term Chest Physician
                      for the purpose covers disciplines like Respiratory
                      Medicine, Cardiology, Thoracic Surgery, and all other
                      allied clinical and basic medical sciences pertaining to
                      Chest.
                    </p>
                  </div>
                </div>

                <!-- Office Tab -->
                <div
                  v-show="activeTab === 'office'"
                  class="fade-in"
                >
                  <h3 class="tab-content-title mb-4">
                    <i class="bi bi-geo-alt me-2 text-primary"></i>
                    Registered Office
                  </h3>
                  <div class="content-card bg-white rounded p-4">
                    <p class="mb-0">
                      The registered office of the College shall be located for
                      the present at
                      <strong
                        >Vallabhbhai Patel Chest Institute, Delhi University
                        Campus, Delhi-110 007</strong
                      >.
                    </p>
                  </div>
                </div>

                <!-- Objects Tab -->
                <div
                  v-show="activeTab === 'object'"
                  class="fade-in"
                >
                  <h3 class="tab-content-title mb-4">
                    <i class="bi bi-bullseye me-2 text-primary"></i>
                    Objects and Purposes
                  </h3>
                  <div class="content-card bg-white rounded p-4">
                    <p class="fw-semibold text-center mb-4">
                      The objects and purposes of the College shall be:
                    </p>
                    <ul class="objectives-list">
                      <li class="mb-3">
                        <i
                          class="bi bi-check-circle-fill text-success me-2"
                        ></i>
                        To advance knowledge, stimulate scientific and practical
                        interests, promote research and disseminate knowledge
                        and recognise merit among individuals and organizations
                        in the speciality of Chest Diseases.
                      </li>
                      <li class="mb-3">
                        <i
                          class="bi bi-check-circle-fill text-success me-2"
                        ></i>
                        To act as a liaison body between Indian and
                        International workers in the field.
                      </li>
                      <li class="mb-0">
                        <i
                          class="bi bi-check-circle-fill text-success me-2"
                        ></i>
                        To do and perform all other acts, matters and things
                        that may assist in or be necessary for the fulfilment of
                        the above aims and objects of the College.
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Methods Tab -->
                <div
                  v-show="activeTab === 'method'"
                  class=" fade-in"
                >
                  <h3 class="tab-content-title mb-4">
                    <i class="bi bi-gear me-2 text-primary"></i>
                    Methods and Implementation
                  </h3>
                  <div class="content-card bg-white rounded p-4">
                    <p class="fw-semibold text-center mb-4">
                      For the attainment and furtherance of these objects, the
                      College may:
                    </p>
                    <ul class="methods-list">
                      <li class="mb-3">
                        <i
                          class="bi bi-arrow-right-circle text-primary me-2"
                        ></i>
                        Hold periodical conferences of the members of the
                        College and the medical profession in general
                      </li>
                      <li class="mb-3">
                        <i
                          class="bi bi-arrow-right-circle text-primary me-2"
                        ></i>
                        Arrange, from time to time, congresses, conferences,
                        lectures, refresher courses, discussions and
                        demonstrations on any aspect of the medical and allied
                        sciences concerned in the speciality.
                      </li>
                      <li class="mb-3">
                        <i
                          class="bi bi-arrow-right-circle text-primary me-2"
                        ></i>
                        Publish and circulate a Journal which shall be the
                        official organ of the College of a character consistent
                        with the objects of the College.
                      </li>
                      <li class="mb-3">
                        <i
                          class="bi bi-arrow-right-circle text-primary me-2"
                        ></i>
                        Publish from time to time transactions and other papers
                        embodying medical researches conducted by the members or
                        under the auspices of the College.
                      </li>
                      <li class="mb-3">
                        <i
                          class="bi bi-arrow-right-circle text-primary me-2"
                        ></i>
                        Encourage research in medical and allied sciences
                        through grants out of the funds of the College, by the
                        establishment of scholarships, prizes or awards, and in
                        such other manner as may, from time to time, be
                        determined by the College.
                      </li>
                      <li class="mb-0">
                        <i
                          class="bi bi-arrow-right-circle text-primary me-2"
                        ></i>
                        Purchase, take lease of or otherwise acquire, hold,
                        manage, let, sell, exchange, mortgage or otherwise
                        dispose of movable or immovable property of every
                        description and all rights or privileges necessary or
                        convenient for the purpose of the College.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Enhanced Awards Section -->
  <div class="container mt-5">
    <div class="awards-section">
      <div class="section-header mb-5">
        <h2 class="section-title text-primary">Awards & Recognitions</h2>
        <div class="header-divider mx-auto mb-3"></div>
        <p class="text-center text-muted">
          These awards will have a certificate or any other form of presentation
          as decided by the Governing Council of the College.
        </p>
      </div>

      <div class="row g-4">
        <div
          class="col-md-6 col-lg-4"
          v-for="(award, index) in awardData"
          :key="award._id"
        >
          <div class="award-card h-100" :class="`award-card-${(index % 3) + 1}`">
            <div class="card-body d-flex flex-column">
              <h5 class="award-title">{{ award.awardName }}</h5>
              <p class="award-description flex-grow-1">
                {{ award.awardDescription }}
              </p>

              <div class="award-footer mt-3 d-flex justify-content-between align-items-center">
                <small class="text-muted">
                  <i class="bi bi-person-fill me-1"></i>
                  {{ award.winners.length }} Recipients
                </small>
                <button
                  class="btn award-btn rounded-pill"
                  @click="viewAwardDetails(award._id)"
                >
                  View Details <i class="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import BannerSection from "@/components/BannerSection.vue";

export default {
  components: {
    BannerSection,
  },
  data() {
    return {
      activeTab: "name",
    awardData: [],
    };
  },
  methods: {
       setActiveTab(tab) {
      this.activeTab = tab;
    },
    async fetchAwards() {
      try {
        const response = await axios.get("http://localhost:3000/api/awards");
        this.awardData = response.data;
      } catch (error) {
        console.error("Error fetching awards:", error);
      }
    },
    viewAwardDetails(id) {
      this.$router.push({ name: "Award_section", params: { id } });
    },
  },
   mounted() {
    this.fetchAwards();
  },
  
};
</script>

<style scoped>
/* Header Styles */
.constitution-header {
  padding: 0 3rem 3rem;
}

.header-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #0d6efd, #0dcaf0);
  border-radius: 2px;
}

.constitution-badge {
  border: 2px solid #e9ecef;
}

/* Section Styles */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 10px;
}

.section-header {
  text-align: center;
}

/* Tab Navigation */
.nav-tabs-vertical {
  position: sticky;
  top: 2rem;
}

.nav-tab-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  color: #6c757d;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-tab-btn:hover {
  border-color: #0d6efd;
  color: #0d6efd;
  transform: translateX(5px);
}

.nav-tab-btn.active {
  background: #0d6efd;
  border-color: #0d6efd;
  color: white;
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
}

/* Tab Content */
.tab-content-container {
  min-height: 300px;
  border-left: 4px solid #0d6efd;
}

.tab-content-title {
  color: #2c3e50;
  font-weight: 600;
}

.content-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
}

/* Lists */
.objectives-list,
.methods-list {
  list-style: none;
  padding-left: 0;
}

.objectives-list li,
.methods-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.objectives-list li:last-child,
.methods-list li:last-child {
  border-bottom: none;
}

/* Enhanced Awards Section */
.awards-section {
  padding: 3rem 0;
}

.award-card {
  border: none;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  background: white;
  overflow: hidden;
  position: relative;
}

.award-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #0d6efd, #0dcaf0);
}

.award-card-1::before {
  background: linear-gradient(135deg, #0d6efd, #0dcaf0);
}
.award-card-2::before {
  background: linear-gradient(135deg, #198754, #20c997);
}
.award-card-3::before {
  background: linear-gradient(135deg, #6f42c1, #d63384);
}

.award-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.award-header {
  position: relative;
  padding: 2rem 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.award-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #0d6efd, #0dcaf0);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.3);
}

.award-card-2 .award-icon {
  background: linear-gradient(135deg, #198754, #20c997);
  box-shadow: 0 6px 20px rgba(25, 135, 84, 0.3);
}

.award-card-3 .award-icon {
  background: linear-gradient(135deg, #6f42c1, #d63384);
  box-shadow: 0 6px 20px rgba(111, 66, 193, 0.3);
}

.award-badge {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #495057;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1.5rem;
}

.award-title {
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.award-description {
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.award-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.award-stats {
  font-size: 0.8rem;
}

.award-btn {
  background: linear-gradient(135deg, #0d6efd, #0dcaf0);
  border: none;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.5rem 1.2rem;
  transition: all 0.3s ease;
}

.award-btn:hover {
  transform: translateX(3px);
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.4);
  color: white;
}

.award-card-2 .award-btn {
  background: linear-gradient(135deg, #198754, #20c997);
}

.award-card-3 .award-btn {
  background: linear-gradient(135deg, #6f42c1, #d63384);
}

/* Animations */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .constitution-header {
    padding: 2rem 0;
  }

  .nav-tabs-vertical {
    position: static;
    margin-bottom: 2rem;
  }

  .nav-tab-btn {
    text-align: center;
  }

  .tab-content-container {
    border-left: none;
    border-top: 4px solid #0d6efd;
  }

  .award-header {
    padding: 1.5rem 1rem 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .award-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .award-btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 15px;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .award-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}
</style>
