<template>
  <div>
    <BannerSection :title="bannerContent" />
    <div class="container">
      <!-- History Section -->
      <section class="history-section">
        <h2 class="section-title">A Brief History</h2>
        <div class="divider"></div>

        <div class="history-content">
          <div class="history-text">
            <p>
              The Indian Association of Chest Diseases was established in the
              year 1959, with fifty-eight founder members. It was formally
              inaugurated at the time of Indian Science Congress by the Late Sir
              Arcot Lakshamanaswami Mudaliar, Vice Chancellor, Madras
              University, in January, 1959. Dr. V.K.R.V. Rao, Vice Chancellor,
              University of Delhi, presided. Soon after the inauguration, the
              first business meeting was held under the Presidentship of Late
              Dr. A. V. Baliga.
            </p>
            <p>
              The Association is a registered body functioning essentially for
              the promotion of the cause of chest diseases and allied sciences.
              According to the rules of the Association, the first elected
              members of the Governing Body including the Chairman held office
              for five years.
            </p>
            <p>
              The first annual conference was held in January, 1960 jointly with
              the Association of Physicians of India and other specialist
              organisations at New Delhi. Subsequent annual conferences were
              also held jointly with the Association of Physicians of India till
              1963.
            </p>

            <div v-show="showcontent" class="expanded-content">
              <p>
                In 1974, the Association held its annual conference jointly with
                the Tuberculosis Association of India.
              </p>
              <p>
                As part of the aims and objectives of the Association, a
                Journal, namely 'Indian Journal of Chest Diseases' was started
                and the first issue came out on July 1, 1959. The journal was
                quarterly published jointly with the Vallabhbhai Patel Chest
                Institute, Delhi University.
              </p>

              <div class="highlight-box">
                <h3>INDIAN ASSOCIATION FOR CHEST DISEASES was renamed as</h3>
                <h3>NATIONAL COLLEGE OF CHEST PHYSICIANS (India) in 1981</h3>
              </div>

              <p>
                The Indian Association for Chest Diseases (IACD) in its meeting
                held on November 15, 1979-subsequently ratified by the General
                Body meeting held on November 6, 1979, unanimously decided to
                change the name of IACD to National College of Chest Physicians
                (India).
              </p>

              <div class="highlight-box">
                <h3>
                  Fellowships of the National College of Chest Physicians of
                  India
                </h3>
              </div>

              <p>
                It was initially decided that all existing fellows of the
                American College of Chest Physicians would be taken as the
                Founder Fellows of the National College of Chest Physicians
                (India).
              </p>
              <p>
                It was further decided that the selection of new fellows would
                be restricted to eminent scientists engaged in the chest
                specialty and allied sciences.
              </p>
            </div>

            <button @click="showcontentfunction()" class="toggle-btn">
              {{ showcontent ? "Read Less" : "Read More" }}
              <span :class="showcontent ? 'icon-up' : 'icon-down'"></span>
            </button>
          </div>

          <div class="history-image">
            <img
              src="../assets/about_vector/about-doctor.png"
              alt="Medical professional" loading="lazy"
            />
          </div>
        </div>
      </section>

      <!-- Tabs Section -->
      <section class="tabs-section">
        <h2 class="section-title">More Information</h2>
        <div class="divider"></div>

        <div class="tabs-container">
          <div class="tab-buttons">
            <button
              @click="setActiveTab('Fellowships')"
              :class="{ active: activeTab === 'Fellowships' }"
            >
              Fellowships
            </button>
            <button
              @click="setActiveTab('Chapters')"
              :class="{ active: activeTab === 'Chapters' }"
            >
              Chapters
            </button>
            <button
              @click="setActiveTab('Zones')"
              :class="{ active: activeTab === 'Zones' }"
            >
              Zones
            </button>
          </div>

          <div class="tab-content">
            <div v-show="activeTab === 'Fellowships'" class="tab-panel">
              <p>
                It was initially decided that all existing fellows of the
                American College of Chest Physicians would be taken as the
                Founder Fellows of the National College of Chest Physicians
                (India).
              </p>
              <p>
                It was further decided that the selection of new fellows would
                be restricted to eminent scientists engaged in the chest
                specialty and allied sciences. The application of the candidate
                for fellowship will be scrutinized by a high power Credential
                Committee and its recommendations should be duly approved by the
                Governing Council and then by the General Body.
              </p>
              <p>
                The NCCP(I) has a website nccpindia.com. The NCCP (I) has
                published a Directory of College having detailed information
                about every fellow and member of the college, which is updated
                after every 5 year.
              </p>
            </div>

            <div v-show="activeTab === 'Chapters'" class="tab-panel">
              <p>
                At present the college has a few Chapters created under
                different Zones:
              </p>
              <ul class="info-list">
                <li>North Zone – Delhi Chapter at Delhi</li>
                <li>Central Zone – UP Chapter at Kanpur</li>
                <li>West Zone – Rajasthan at Jaipur</li>
                <li>Gujarat Chapter at Ahemedabad</li>
                <li>Maharashtra Chapter at Nagpur (to be created this year)</li>
              </ul>
            </div>

            <div v-show="activeTab === 'Zones'" class="tab-panel">
              <p>
                According to the constitution of NCCP (India), there will be a
                Chapter for each of the Five Zones, provided there are at least
                15 Fellows/members in the Zone. Five Zones as recognised w.e.f.
                27.7.89 are as follows:
              </p>
              <ul class="info-list">
                <li>
                  <strong>North Zone</strong> - Jammu and Kashmir, Himachal
                  Pradesh, Punjab, Haryana, Chandigarh and Delhi/New Delhi.
                </li>
                <li>
                  <strong>East Zone</strong> - West Bengal, Bihar, Orissa,
                  Arunachal Pradesh, Sikkim, Assam, Nagaland, Manipur, Mizoram,
                  Tripura.
                </li>
                <li>
                  <strong>Central Zone</strong> - Uttar Pradesh and Madhya
                  Pradesh.
                </li>
                <li>
                  <strong>South Zone</strong> - Tamil Nadu, Kamataka,
                  Pondicherry, Kerala, Andaman & Nicobar and Andhra Pradesh.
                </li>
                <li>
                  <strong>West Zone</strong> - Maharashtra, Gujarat, Goa and
                  Rajasthan.
                </li>
              </ul>
              <p class="note">
                <strong
                  >The Zonal Chairman will be responsible for the promotion of
                  academic and scientific activities in their region. The
                  Chapter will have its own regulations for the proper
                  functioning in the Zone.</strong
                >
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";

export default {
  components: {
    BannerSection,
  },
  data() {
    return {
      showcontent: false,
      activeTab: "Fellowships",
      bannerContent: "Who We Are",
    };
  },
  methods: {
    showcontentfunction() {
      this.showcontent = !this.showcontent;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.section-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.divider {
  height: 3px;
  width: 80px;
  background: #0d6efd;
  margin: 0 auto 2rem;
}

/* History Section */
.history-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.history-text p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #555;
}

.history-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-image img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;
  border-radius: 40px;
}

.toggle-btn:hover {
  background: #2980b9;
}

.icon-down,
.icon-up {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.icon-down {
  border-top: 5px solid white;
}

.icon-up {
  border-bottom: 5px solid white;
}

.expanded-content {
  margin-top: 1.5rem;
}

.highlight-box {
  background: #0d6efd;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: center;
}

.highlight-box h3 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

/* Tabs Section */
.tabs-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.tab-buttons {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.tab-buttons button {
  flex: 1;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-buttons button.active {
  background: #0d6efd;
  color: white;
}

.tab-buttons button:not(.active):hover {
  background: #e9ecef;
  color: #495057;
}

.tab-content {
  padding: 2rem;
}

.tab-panel p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #555;
}

.info-list {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.info-list li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.note {
  background: #f8f9fa;
  padding: 1rem;
  border-left: 4px solid #0d6efd;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .history-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .tab-buttons {
    flex-direction: column;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
