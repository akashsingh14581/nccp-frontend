<template>
  <div class="container">
    <div class="footer_section">
      <h3 class="heading_newsletter">
        Sign up to our newsletter to receive updates
      </h3>
      <p class="text-center subparagraph_newletter">
        Join our newsletter to stay informed! Subscribe now and be the first to
        receive the
        <br />
        latest updates, news, and special offers directly in your inbox
      </p>
      <div class="input_subscribe">
        <form @submit.prevent="subscribe">
          <input v-model="email" placeholder="email@email.com" required />
          <button type="submit" class="subscribe_btn">Subscribe</button>
        </form>
      </div>
      <div class="navigation_link mt-4">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/Rules&Regulations">Rules & Regulations</router-link>
        <router-link to="/our_gallery">Gallery</router-link>
      </div>
      <div class="socialmedia_links_icons mt-5">
        <i class="bi bi-facebook"></i>
        <i class="bi bi-instagram"></i>
        <i class="bi bi-linkedin"></i>
        <i class="bi bi-twitter-x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// Import toast methods directly
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// const apiBaseUrl = import.meta.env.VUE_API_BASE_URL;

export default {
  data() {
    return {
      email: "",
    };
  },

  methods: {
    async subscribe() {
      try {
        await axios.post(`http://localhost:3000/news/postNesletter`, {
          email: this.email,
        });

        // Use toast directly
        toast.success("You have subscribed!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        this.email = "";
      } catch (error) {
        console.error(error);

        // Use toast for error notification
        toast.error("There was an error. Please try again later.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.footer_section {
  background-color: #edf2f7;
  padding: 60px;
  text-align: center;
  display: grid;
  place-items: center;
  place-content: center;
  border-radius: 10px;
  margin-top: 60px;
}
.heading_newsletter {
  font-size: 24px;
}
.subparagraph_newletter {
  font-size: 13px;
  color: gray;
  margin-top: 10px;
}
.input_subscribe input {
  border: none;
  outline: none;
  padding: 13px 30px;
  border-radius: 10px;
  margin: 0px 20px;
  border-radius: 40px;
}
.input_subscribe input::placeholder {
  font-size: 13px;
  font-weight: 600;
}
.subscribe_btn {
  border: none;
  outline: none;
  font-size: 13px;
  padding: 13px 30px;
  border-radius: 10px;
  background: #0d6efd;
  color: #fff;
  border-radius: 40px;
  font-weight: 600;
  text-transform: capitalize;
}
.navigation_link {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  margin-top: 20px;
}
.navigation_link a {
  font-weight: 600;
  cursor: pointer;
  color: black;
}
.navigation_link a:active {
  color: #0d6efd !important;
  text-decoration: underline;
}
.socialmedia_links_icons i {
  margin: 20px;
}
</style>
