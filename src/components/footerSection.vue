<template>
  <div class="container">
    <div class="footer_section">
      <!-- Navigation Links -->
      <div class="navigation-links mb-4">
        <div class="d-flex flex-wrap justify-content-center gap-4">
          <router-link
            to="/"
            class="nav-link text-dark fw-semibold text-decoration-none"
            active-class="text-primary"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="nav-link text-dark fw-semibold text-decoration-none"
            active-class="text-primary"
          >
            About Us
          </router-link>
          <router-link
            to="/Rules&Regulations"
            class="nav-link text-dark fw-semibold text-decoration-none"
            active-class="text-primary"
          >
            Rules & Regulations
          </router-link>
          <router-link
            to="/our_gallery"
            class="nav-link text-dark fw-semibold text-decoration-none"
            active-class="text-primary"
          >
            Gallery
          </router-link>
        </div>
      </div>

      <!-- Social Media Links -->
      <div class="social-media mt-4">
        <div class="d-flex justify-content-center gap-4">
          <a href="#" class="social-icon text-decoration-none">
            <i class="bi bi-facebook fs-5"></i>
          </a>
          <a href="#" class="social-icon text-decoration-none">
            <i class="bi bi-instagram fs-5"></i>
          </a>
          <a href="#" class="social-icon text-decoration-none">
            <i class="bi bi-linkedin fs-5"></i>
          </a>
          <a href="#" class="social-icon text-decoration-none">
            <i class="bi bi-twitter-x fs-5"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsletterFooter",
};
</script>

<style scoped>
.footer_section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.newsletter-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.newsletter-subtitle {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.subscribe-form .form-control {
  border: 2px solid #e9ecef;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.subscribe-form .form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 2px 15px rgba(13, 110, 253, 0.2);
}

.subscribe-btn {
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
  border: none;
}

.subscribe-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.4);
}

.navigation-links .nav-link {
  position: relative;
  padding: 8px 0;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.navigation-links .nav-link:hover {
  color: #0d6efd !important;
  transform: translateY(-2px);
}

.navigation-links .nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #0d6efd;
  transition: width 0.3s ease;
}

.navigation-links .nav-link:hover::after,
.navigation-links .nav-link.router-link-active::after {
  width: 100%;
}

.navigation-links .nav-link.router-link-active {
  color: #0d6efd !important;
}

.social-media .social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  color: #2c3e50;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.social-media .social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  color: #0d6efd;
}

/* Specific colors for social icons */
.social-media .social-icon:nth-child(1):hover {
  color: #1877f2;
} /* Facebook */
.social-media .social-icon:nth-child(2):hover {
  color: #e4405f;
} /* Instagram */
.social-media .social-icon:nth-child(3):hover {
  color: #0a66c2;
} /* LinkedIn */
.social-media .social-icon:nth-child(4):hover {
  color: #000000;
} /* Twitter */

/* Responsive Design */
@media (max-width: 768px) {

  .newsletter-title {
    font-size: 1.8rem;
  }

  .newsletter-subtitle {
    font-size: 1rem;
  }

  .subscribe-form {
    flex-direction: column;
    align-items: center;
  }

  .subscribe-form .form-control {
    width: 100%;
    max-width: 300px;
  }

  .navigation-links .d-flex {
    gap: 20px;
  }

  .social-media .d-flex {
    gap: 20px;
  }
}

@media (max-width: 576px) {


  .newsletter-title {
    font-size: 1.5rem;
  }

  .navigation-links .d-flex {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
