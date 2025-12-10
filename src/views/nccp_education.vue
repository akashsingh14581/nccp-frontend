<template>
  <BannerSection title="Nccp Education" />
  <div class="container py-5">
    <!-- Header -->
    <div class="text-center mb-5">
      <img
        src="../assets/logo.png"
        alt="NCCP Logo"
        class="mb-3"
        width="80" loading="lazy"
      />
      <h1 class="fw-bold text-primary">NCCP (India) Education</h1>
      <p class="lead text-muted">
        We are happy to serve you better, for Healthcare Bulletins you can download as per your choice:
      </p>
    </div>

    <!-- Cards -->
    <div class="row g-4">
      <!-- Card 1 -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 hover-lift">
          <div class="card-body text-center p-4">
            <div class="icon-wrapper mb-3">
              <font-awesome-icon :icon="['fas', 'graduation-cap']" class="fa-3x text-primary" />
            </div>
            <h5 class="card-title fw-semibold">NCCP E-Courses</h5>
            <p class="card-text text-muted small">
              NCCP E-Courses are available...
            </p>
            <a
              href="https://chestcourses.org"
              target="_blank"
              class="btn btn-outline-primary btn-sm mt-2"
            >
              <font-awesome-icon :icon="['fas', 'external-link-alt']" class="me-1" /> Visit
            </a>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 hover-lift">
          <div class="card-body text-center p-4">
            <div class="icon-wrapper mb-3">
              <font-awesome-icon :icon="['fas', 'clipboard-check']" class="fa-3x text-success" />
            </div>
            <h5 class="card-title fw-semibold">PG Quiz – Respiratory Disease</h5>
            <p class="card-text text-muted small">
              Post-Graduate quiz in Respiratory Diseases...
            </p>
            <a href="/document/Membership-Enrollment-Form.pdf" download
              
              class="btn btn-success btn-sm mt-2"
            >
              <font-awesome-icon :icon="['fas', 'file-pdf']" class="me-1" /> Download PDF
            </a>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 hover-lift">
          <div class="card-body text-center p-4">
            <div class="icon-wrapper mb-3">
              <font-awesome-icon :icon="['fas', 'prescription-bottle-alt']" class="fa-3x text-info" />
            </div>
            <h5 class="card-title fw-semibold">Nebulization Guidelines</h5>
            <p class="card-text text-muted small">
              Guidelines on Nebulization Therapy...
            </p>
            <a href="/document/Membership-Enrollment-Form.pdf" download
             
              class="btn btn-info btn-sm mt-2 text-white"
            >
              <font-awesome-icon :icon="['fas', 'file-pdf']" class="me-1" /> Download PDF
          </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer note -->
    <div class="mt-5 text-center text-muted small">
      <font-awesome-icon :icon="['fas', 'heart']" class="text-danger" />
      Maintained by National College of Chest Physicians (India)
    </div>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGraduationCap,
  faClipboardCheck,
  faPrescriptionBottleAlt,
  faExternalLinkAlt,
  faFilePdf,
  faHeart
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faGraduationCap,
  faClipboardCheck,
  faPrescriptionBottleAlt,
  faExternalLinkAlt,
  faFilePdf,
  faHeart
)

export default {
  name: 'NCCPEducation',
  components: {
    FontAwesomeIcon,
    BannerSection
  },
}
</script>

<style scoped>
.hover-lift {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hover-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>