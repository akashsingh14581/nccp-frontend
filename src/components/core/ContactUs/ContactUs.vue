<template>
  <div class="contact-container">
    <!-- Overlay -->
    <div class="overlay" @click="$emit('close')"></div>

    <!-- Form Box -->
    <div class="contact-box p-4 p-md-5 rounded shadow-lg bg-white">
      <h3 class="mb-4 text-center fw-bold">Contact Us</h3>

      <form @submit.prevent="handleSubmit">

        <div class="row g-3">
          <div class="col-md-6">
            <input v-model="form.firstName" type="text" class="form-control form-control-lg"
              placeholder="First Name" required />
          </div>

          <div class="col-md-6">
            <input v-model="form.lastName" type="text" class="form-control form-control-lg"
              placeholder="Last Name" required />
          </div>
        </div>

        <div class="mt-3">
          <input v-model="form.email" type="email" class="form-control form-control-lg"
            placeholder="Email Address" required />
        </div>

        <div class="mt-3">
          <input v-model="form.phoneNumber" type="tel" class="form-control form-control-lg"
            placeholder="phone no." required />
        </div>

        <div class="mt-3">
          <textarea v-model="form.message" rows="4" class="form-control form-control-lg"
            placeholder="Your Message" required></textarea>
        </div>

        <button class="btn btn-primary btn-lg w-100 mt-4">
          Send Message
        </button>

        <!-- Messages -->
        <p class="text-success fw-bold mt-3" v-if="success">{{ success }}</p>
        <p class="text-danger fw-bold mt-3" v-if="error">{{ error }}</p>

      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {API_BASE_URL} from '@/utils/apis.js'
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
      success: "",
      error: "",
    };
  },

  methods: {
    async handleSubmit() {
      this.success = "";
      this.error = "";

      try {
        const res = await axios.post(`${API_BASE_URL}/Contact_querys/postcontactquery`, this.form);
        console.log(res)
        this.success = "Message sent successfully! 🎉";
        this.form = { firstName: "", lastName: "", email: "", phoneNumber: "", message: "" };

      } catch (err) {
        this.error = err?.response?.data?.message || "Something went wrong!";
      }
    },
  },
};
</script>

<style scoped>
@import url(./ContactUs.css);
</style>
