<template>
  <!-- ======= Enhanced Hero Section ======= -->
  <section id="hero" class="hero-section d-flex align-items-center">
    <div class="video-container">
      <video autoplay muted loop id="bg-video">
        <source src="../assets/video1.mp4" type="video/mp4" />
      </video>
      <div class="video-overlay"></div>
    </div>

    <div class="container text-center position-relative hero-content">
      <div
        class="hero-text"
        data-aos="zoom-in-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <span class="hero-subtitle"
          >Welcome To National College Of Chest Physicians</span
        >
        <h1 class="hero-title">
          Education and Research In <br /><span class="highlight"
            >"Respiratory Disease & Allied Sciences"</span
          >
        </h1>
        <div class="hero-divider"></div>
        <p class="hero-description">
          A professional society for continuing education & research in
          respiratory medicine
        </p>
        <a href="#contact_form" class="btn btn-primary btn-lg hero-cta scrollt">
          <i class="bi bi-arrow-right me-2"></i>Join Us
        </a>
      </div>
    </div>
  </section>

  <!-- ----------------------Enhanced Cards Section------------------------------------ -->
  <div class="container mt-5 mb-5">
    <div class="section-header text-center mb-5">
      <h2 class="section-title">
        Welcome To <span class="text-primary">NCCP (INDIA)</span>
      </h2>
      <p class="section-subtitle">National College of Chest Physicians</p>
      <div class="section-divider mx-auto"></div>
    </div>

    <div class="row g-4">
      <div
        class="col-md-6 col-lg-3"
        data-aos="zoom-out"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div class="card h-100 feature-card">
          <div class="card-img-container">
            <img
              src="../assets/jamila-polatova-7261803_1280.jpg"
              class="card-img-top"
              alt="Who We Are"
            />
            <div class="card-img-overlay d-flex align-items-end">
              <div class="card-link-container">
                <router-link class="card-link" to="/about">
                  Who We Are <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-md-6 col-lg-3"
        data-aos="zoom-out"
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        <div class="card h-100 feature-card">
          <div class="card-img-container">
            <img
              src="../assets/about/about3.jpg"
              class="card-img-top"
              alt="Our Constitution"
            />
            <div class="card-img-overlay d-flex align-items-end">
              <div class="card-link-container">
                <router-link class="card-link" to="/Constitution">
                  Our Constitution <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-md-6 col-lg-3"
        data-aos="zoom-out"
        data-aos-delay="150"
        data-aos-duration="1000"
      >
        <div class="card h-100 feature-card">
          <div class="card-img-container">
            <img
              src="../assets/about/about1.jpg"
              class="card-img-top"
              alt="NCCP Publications"
            />
            <div class="card-img-overlay d-flex align-items-end">
              <div class="card-link-container">
                <router-link class="card-link" to="/nccp_publications">
                  NCCP Publications <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-md-6 col-lg-3"
        data-aos="zoom-out"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        <div class="card h-100 feature-card">
          <div class="card-img-container">
            <img
              src="../assets/about/about2.jpg"
              class="card-img-top"
              alt="Our Events"
            />
            <div class="card-img-overlay d-flex align-items-end">
              <div class="card-link-container">
                <router-link class="card-link" to="/NAPCON2020">
                  Our Events <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- --------Enhanced Call to Action--------------- -->
  <section id="cta" class="cta-section py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center" data-aos="zoom-in">
          <div class="cta-content">
            <h3 class="cta-title">National College of Chest Physicians</h3>
            <p class="cta-text">
              A professional Society For Continuing
              <span class="highlight-text"
                >Education & Research in Respiratory Disease & Allied
                Sciences</span
              >
            </p>
            <a
              class="btn btn-outline-light btn-lg cta-btn"
              href="#contact_form"
            >
              <i class="bi bi-question-circle me-2"></i>Get a query
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced Events Section -->
  <section class="events-section py-5">
    <div class="container">
      <div class="section-header text-center mb-5">
        <h2 class="section-title">
          Our Events <i class="bi bi-calendar-event text-primary"></i>
        </h2>
        <p class="section-subtitle">National College of Chest Physicians</p>
        <div class="section-divider mx-auto"></div>
      </div>

      <div class="row">
        <div class="col-lg-3 mb-4">
          <div
            class="nav flex-column nav-pills events-nav"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              class="nav-link text-start"
              :class="{ active: activeTab === 'newest_event' }"
              @click="setActiveTab('newest_event')"
              role="tab"
            >
              <i class="bi bi-calendar4-event me-2"></i> Newest Events
            </button>
            <button
              class="nav-link text-start"
              :class="{ active: activeTab === 'popular_event' }"
              @click="setActiveTab('popular_event')"
              role="tab"
            >
              <i class="bi bi-calendar4-event me-2"></i> Popular Events
            </button>
            <button
              class="nav-link text-start"
              :class="{ active: activeTab === 'feature_event' }"
              @click="setActiveTab('feature_event')"
              role="tab"
            >
              <i class="bi bi-calendar4-event me-2"></i> Featured Events
            </button>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="tab-content">
            <div
              class="tab-pane fade"
              :class="{ 'show active': activeTab === 'newest_event' }"
            >
              <div class="row g-4">
                <div
                  class="col-sm-6 col-md-4 col-lg-3"
                  v-for="event in newestEvents"
                  :key="event._id"
                >
                  <div class="event-card" @click="goToYearPage(event._id)">
                    <div class="event-image">
                      <img
                        :src="imageBaseUrl + event.photos[0].imageUrl"
                        class="img-fluid"
                        :alt="event.title"
                      />
                    </div>
                    <div class="event-content">
                      <h5 class="event-year">Year {{ event.year }}</h5>
                      <p class="event-name">{{ event.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Popular -->
            <div
              class="tab-pane fade"
              :class="{ 'show active': activeTab === 'popular_event' }"
            >
              <div class="row g-4">
                <div
                  class="col-sm-6 col-md-4 col-lg-3"
                  v-for="event in popularEvents"
                  :key="event._id"
                >
                  <div class="event-card" @click="goToYearPage(event._id)">
                    <div class="event-image">
                      <img
                        :src="imageBaseUrl + event.photos[0].imageUrl"
                        class="img-fluid"
                        :alt="event.title"
                      />
                    </div>
                    <div class="event-content">
                      <h5 class="event-year">Year {{ event.year }}</h5>
                      <p class="event-name">{{ event.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- All Events -->
            <div
              class="tab-pane fade"
              :class="{ 'show active': activeTab === 'feature_event' }"
            >
              <div class="row g-4">
                <div
                  class="col-sm-6 col-md-4 col-lg-3"
                  v-for="event in allEvents"
                  :key="event._id"
                >
                  <div class="event-card" @click="goToYearPage(event._id)">
                    <div class="event-image">
                      <img
                        :src="imageBaseUrl + event.photos[0].imageUrl"
                        class="img-fluid"
                        :alt="event.title"
                      />
                    </div>
                    <div class="event-content">
                      <h5 class="event-year">Year {{ event.year }}</h5>
                      <p class="event-name">{{ event.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<section class="membership-section py-5 bg-light">
    <div class="">
      <div class="section-header text-center mb-5">
        <h2 class="section-title">
          <i class="bi bi-person-badge text-primary me-3"></i>
          NCCP (INDIA) Membership
        </h2>
        <p class="section-subtitle">Join the National College of Chest Physicians</p>
        <div class="section-divider mx-auto"></div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="membership-card">
            <div class="membership-header">
              <h3 class="membership-title">
                <i class="bi bi-download me-2"></i>
                Download and Submit Required Documents
              </h3>
              <p class="membership-subtitle">
                We are happy to serve you better! For membership and fellowship, 
                you can download forms as per your choice:
              </p>
            </div>

            <div class="membership-content">
              <div class="row g-4">
                <!-- Membership Form -->
                <div class="col-md-6 col-lg-3">
                  <div class="document-card">
                    <div class="document-icon">
                      <i class="bi bi-file-earmark-person"></i>
                    </div>
                    <h5>Membership Form</h5>
                    <p>Proforma for Enrolment as Member of the College</p>
                    <div class="document-actions">
                      <a href="/Document/Membership-Enrollment-Form.pdf" download class="btn btn-primary btn-sm">
                        <i class="bi bi-download me-1"></i>Download
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Directory Form -->
                <div class="col-md-6 col-lg-3">
                  <div class="document-card">
                    <div class="document-icon">
                      <i class="bi bi-journal-text"></i>
                    </div>
                    <h5>Directory Form</h5>
                    <p>Fill Directory Form while applying for Membership</p>
                    <div class="document-actions">
                      <a href="/Document/Membership-Enrollment-Form.pdf" download class="btn btn-primary btn-sm">
                        <i class="bi bi-download me-1"></i>Download
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Fellowship Nomination -->
                <div class="col-md-6 col-lg-3">
                  <div class="document-card">
                    <div class="document-icon">
                      <i class="bi bi-award"></i>
                    </div>
                    <h5>Fellowship Form</h5>
                    <p>Proforma for Nomination to Fellow-ship</p>
                    <div class="document-actions">
                      <a href="/Document/Membership-Enrollment-Form.pdf" download class="btn btn-primary btn-sm">
                        <i class="bi bi-download me-1"></i>Download
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Constitution -->
                <div class="col-md-6 col-lg-3">
                  <div class="document-card">
                    <div class="document-icon">
                      <i class="bi bi-file-earmark-ruled"></i>
                    </div>
                    <h5>NCCP Constitution</h5>
                    <p>Download NCCP (India) Constitution Document</p>
                    <div class="document-actions">
                      <a href="/Document/Membership-Enrollment-Form.pdf" download class="btn btn-primary btn-sm">
                        <i class="bi bi-download me-1"></i>Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>

           
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ----------Contact Section---------------- -->
  <section class="contact-section py-5" id="contact_form">
    <div class="container">
      <div class="section-header text-center mb-5">
        <h2 class="section-title">Get In Touch</h2>
        <p class="section-subtitle">We'd love to hear from you</p>
        <div class="section-divider mx-auto"></div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12">
          <contact_us />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import contact_us from "../components/HomeContactUs.vue";

export default {
  name: "HomePage",
  components: {
    contact_us,
  },
  data() {
    return {
      activeTab: "newest_event",
      allEventsData: [], // API se events ka data yahan store hoga
      imageBaseUrl: "http://localhost:3000",
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    async fetchEvents() {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        this.allEventsData = data;
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    },
    goToYearPage(eventId) {
      this.$router.push({ name: "NapconEventDetail", params: { id: eventId } });
    },
  },
  computed: {
    newestEvents() {
      const recentEvents = this.allEventsData.filter(event => event.year >= 2020);
      const years = [...new Set(recentEvents.map(e => e.year))];
      return years.map(year => recentEvents.find(e => e.year === year));
    },
    popularEvents() {
      const popular = this.allEventsData.filter(event => event.year >= 2015 && event.year < 2020);
      const years = [...new Set(popular.map(e => e.year))];
      return years.map(year => popular.find(e => e.year === year));
    },
    allEvents() {
      const years = [...new Set(this.allEventsData.map(e => e.year))];
      return years.map(year => this.allEventsData.find(e => e.year === year));
    }
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>


<style scoped>
/* Hero Section Styles */
.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(13, 110, 253, 0.7),
    rgba(13, 110, 253, 0.4)
  );
  z-index: -1;
}

.hero-content {
  z-index: 1;
  padding-top: 100px;
}

.hero-text {
  color: white;
  max-width: 800px;
  margin: 0 auto;
}

.hero-subtitle {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  display: block;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #0d6efd;
}

.hero-divider {
  width: 80px;
  height: 4px;
  background: #0d6efd;
  margin: 1.5rem auto;
  border-radius: 2px;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.hero-cta {
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.hero-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Section Header Styles */
.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: #0d6efd;
  border-radius: 2px;
}

/* Feature Card Styles */
.feature-card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.card-img-container {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.card-img-top {
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.feature-card:hover .card-img-top {
  transform: scale(1.1);
}

.card-img-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .card-img-overlay {
  opacity: 1;
}

.card-link-container {
  width: 100%;
  padding: 20px;
}

.card-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.card-link:hover {
  color: #0d6efd;
}

/* CTA Section Styles */
.cta-section {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  background-position: center;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-text {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.highlight-text {
  font-weight: 600;
  text-decoration: underline;
}

.cta-btn {
  border-width: 2px;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  background-color: white;
  color: #0d6efd;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Events Section Styles */
.events-section {
  background-color: #f8f9fa;
}

.events-nav .nav-link {
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #495057;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.events-nav .nav-link:hover {
  background-color: #e9ecef;
}

.events-nav .nav-link.active {
  background-color: #0d6efd;
  color: white;
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
}

.event-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.event-image {
  height: 180px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.1);
}

.event-content {
  padding: 15px;
}

.event-year {
  color: #0d6efd;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.event-name {
  font-size: 0.9rem;
  margin-bottom: 0;
  color: #495057;
}

/* Contact Section Styles */
.contact-section {
  background-color: white;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .events-nav {
    margin-bottom: 2rem;
  }
}
/* Membership Section Styles */
.membership-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.membership-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.membership-header {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  color: white;
  padding: 2.5rem;
  text-align: center;
}

.membership-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.membership-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

.membership-content {
  padding: 2.5rem;
}

/* Document Card Styles */
.document-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.document-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(13, 110, 253, 0.15);
  border-color: #0d6efd;
}

.document-icon {
  font-size: 2.5rem;
  color: #0d6efd;
  margin-bottom: 1rem;
}

.document-card h5 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.document-card p {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.document-actions .btn {
  border-radius: 25px;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.document-actions .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
}

/* Membership Notes */
.membership-notes .alert {
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
}

.membership-notes .alert-heading {
  color: #0c5460;
  font-weight: 600;
}

.membership-notes ul {
  color: #0c5460;
}

.membership-notes li {
  margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .membership-header {
    padding: 2rem 1.5rem;
  }
  
  .membership-title {
    font-size: 1.5rem;
  }
  
  .membership-content {
    padding: 1.5rem;
  }
  
  .document-card {
    margin-bottom: 1rem;
  }
}
</style>
