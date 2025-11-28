<template>
  <section class="contact-section py-5 min-vh-100">
    <div class="container">
      <!-- Card that contains both sides -->
      <div
        class="row g-0 shadow-lg rounded-4 overflow-hidden"
        style="max-width: 1100px; margin: auto"
      >
        <!-- LEFT: Image + Overlay Info -->
        <div class="col-lg-5 position-relative d-none d-lg-block">
          <div class="left-panel h-100">
            <!-- Background image -->
            <div class="bg-image"></div>

            <!-- Overlay content -->
            <div
              class="overlay-content p-5 text-white d-flex flex-column justify-content-between h-100"
            >
              <!-- Title -->
              <div>
                <h3 class="fw-bold mb-4">
                  <i class="fas fa-lungs-virus me-2"></i> NCCP India
                </h3>
                <p class="lead mb-0">National College of Chest Physicians</p>
              </div>

              <!-- Contact details -->
              <div class="contact-info mb-5">
                <div class="info-item d-flex align-items-center mb-3">
                  <div class="icon-circle me-3">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <small class="d-block opacity-75">Call Us</small>
                    <a
                      href="tel:+919811271916"
                      class="text-white text-decoration-none fw-medium"
                    >
                      +91 98112 71916
                    </a>
                  </div>
                </div>

                <div class="info-item d-flex align-items-center mb-3">
                  <div class="icon-circle me-3">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div>
                    <small class="d-block opacity-75">Email Us</small>
                    <a
                      href="mailto:support@chestcourses.org"
                      class="text-white text-decoration-none fw-medium"
                    >
                      support@chestcourses.org
                    </a>
                  </div>
                </div>
              </div>

              <!-- Social icons -->
              <div>
                <p class="mb-3 fw-medium">Connect With Us</p>
                <div class="social-icons d-flex gap-3">
                  <a href="#" class="social-btn facebook"
                    ><i class="fab fa-facebook-f"></i
                  ></a>
                  <a href="#" class="social-btn twitter"
                    ><i class="fa-brands fa-x-twitter"></i
                  ></a>
                  <a href="#" class="social-btn instagram"
                    ><i class="fab fa-instagram"></i
                  ></a>
                  <a href="#" class="social-btn linkedin"
                    ><i class="fab fa-linkedin-in"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Contact Form -->
        <div class="col-lg-7 bg-white p-4 p-lg-5 d-flex align-items-center">
          <div class="w-100">
            <div class="text-center mb-4">
              <h3 class="fw-bold text-primary">
                <i class="fas fa-paper-plane me-2"></i> Get in Touch
              </h3>
              <p class="text-muted">
                We’ll respond within <strong>24 hours</strong>
              </p>
            </div>

            <!-- FORM -->
            <form @submit.prevent="submitForm" class="row g-3" novalidate>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control form-control-lg rounded-pill"
                  :class="{ 'is-invalid': errors.firstName }"
                  v-model="form.firstName"
                  placeholder="First Name *"
                  required
                />
                <div class="invalid-feedback">{{ errors.firstName }}</div>
              </div>

              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control form-control-lg rounded-pill"
                  :class="{ 'is-invalid': errors.lastName }"
                  v-model="form.lastName"
                  placeholder="Last Name *"
                  required
                />
                <div class="invalid-feedback">{{ errors.lastName }}</div>
              </div>

              <div class="col-md-6">
                <input
                  type="email"
                  class="form-control form-control-lg rounded-pill"
                  :class="{ 'is-invalid': errors.email }"
                  v-model="form.email"
                  placeholder="Email *"
                  required
                />
                <div class="invalid-feedback">{{ errors.email }}</div>
              </div>

              <div class="col-md-6">
                <input
                  type="tel"
                  class="form-control form-control-lg rounded-pill"
                  :class="{ 'is-invalid': errors.phoneNumber }"
                  v-model="form.phoneNumber"
                  placeholder="Phone (+91) *"
                  required
                />
                <div class="invalid-feedback">{{ errors.phoneNumber }}</div>
              </div>

              <div class="col-12">
                <textarea
                  class="form-control form-control-lg rounded-3"
                  :class="{ 'is-invalid': errors.message }"
                  rows="4"
                  v-model="form.message"
                  placeholder="Your message... *"
                  required
                ></textarea>
                <div class="invalid-feedback">{{ errors.message }}</div>
              </div>

              <div class="col-12 text-center">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm w-100 d-flex align-items-center justify-content-center gap-2"
                  :disabled="loading"
                >
                  <span v-if="loading">
                    <i class="fas fa-spinner fa-spin"></i> Sending...
                  </span>
                  <span v-else>
                    <i class="fas fa-paper-plane"></i> Send Message
                  </span>
                </button>
              </div>
            </form>

            <!-- Mobile social links (visible only on small screens) -->
            <div class="d-lg-none text-center mt-4 pt-3 border-top">
              <p class="mb-2 text-muted small">Follow Us</p>
              <div class="social-icons d-flex justify-content-center gap-3">
                <a href="#" class="social-btn facebook"
                  ><i class="fab fa-facebook-f"></i
                ></a>
                <a href="#" class="social-btn twitter"
                  ><i class="fab fa-twitter"></i
                ></a>
                <a href="#" class="social-btn instagram"
                  ><i class="fab fa-instagram"></i
                ></a>
                <a href="#" class="social-btn linkedin"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ContactUs",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      },
      loading: false,
    };
  },
  methods: {
    validateForm() {
      let valid = true;
      Object.keys(this.errors).forEach((k) => (this.errors[k] = ""));

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+91\d{10}$|^\d{10}$/;

      if (!this.form.firstName.trim()) {
        this.errors.firstName = "Required";
        valid = false;
      }
      if (!this.form.lastName.trim()) {
        this.errors.lastName = "Required";
        valid = false;
      }
      if (!this.form.email.trim()) {
        this.errors.email = "Required";
        valid = false;
      } else if (!emailRegex.test(this.form.email)) {
        this.errors.email = "Invalid email";
        valid = false;
      }

      const phone = this.form.phoneNumber.replace(/\s/g, "");
      if (!phone) {
        this.errors.phoneNumber = "Required";
        valid = false;
      } else if (!phoneRegex.test(phone)) {
        this.errors.phoneNumber = "Invalid phone";
        valid = false;
      }

      if (!this.form.message.trim()) {
        this.errors.message = "Required";
        valid = false;
      } else if (this.form.message.trim().length < 15) {
        this.errors.message = "Min 15 characters";
        valid = false;
      }

      return valid;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      this.loading = true;
      const payload = {
        firstName: this.form.firstName.trim(),
        lastName: this.form.lastName.trim(),
        email: this.form.email.trim(),
        phoneNumber: this.form.phoneNumber.replace(/\s/g, ""),
        message: this.form.message.trim(),
      };

      try {
        await axios.post(
          "http://localhost:3000/Contact_querys/postcontactquery",
          payload
        );

        toast.success("Message sent! We’ll reply soon.", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 4000,
        });

        // Reset form
        Object.keys(this.form).forEach((k) => (this.form[k] = ""));
        Object.keys(this.errors).forEach((k) => (this.errors[k] = ""));
      } catch (err) {
        toast.error("Failed to send. Try again.", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 4000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* ------------------------------------------------------------------ */
/* General */
.contact-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

/* LEFT PANEL */
.left-panel {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(13, 110, 253, 0.95),
    rgba(102, 16, 242, 0.95)
  );
  min-height: 600px;
}
.bg-image {
  position: absolute;
  inset: 0;
  background: url("https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870")
    center/cover;
  opacity: 0.2;
}
.overlay-content {
  position: relative;
  z-index: 2;
}

/* Icon circle */
.icon-circle {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  backdrop-filter: blur(5px);
}

/* SOCIAL BUTTONS */
.social-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
.social-btn:hover {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
.facebook {
  background: #1877f2;
}
.twitter {
  background: #1da1f2;
}
.instagram {
  background: linear-gradient(
    45deg,
    #f09433,
    #e6683c,
    #dc2743,
    #cc2366,
    #bc1888
  );
}
.linkedin {
  background: #0a66c2;
}

/* INPUT FOCUS */
.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
}

/* SUBMIT BUTTON */
.btn-primary {
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
  border: none;
  font-weight: 600;
}
.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #0a58ca, #084298);
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .left-panel {
    min-height: 300px;
  }
  .bg-image {
    opacity: 0.3;
  }
}
</style>
