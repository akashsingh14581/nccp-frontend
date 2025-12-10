<template>
  <div v-if="show" class="overlay">
    <form class="modal-box" @submit.prevent="handleSubmit">
      <input type="text" placeholder="Enter your first name" v-model="firstName" />
      <input type="text" placeholder="Enter your last name" v-model="lastName" />
      <input type="email" placeholder="Enter your email" v-model="email" />
      <textarea placeholder="Write here your query" v-model="message"></textarea>

      <div>
        <button type="button" @click="closePopup">Close</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'
export default {
  props: ["show"],
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      message: ""
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post(`${API_BASE_URL}/Contact_querys/postcontactquery`, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          message: this.message
        });

        alert("✅ Your message has been sent successfully!");

        // Clear form
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.message = "";

        // Close popup after submit
        this.$emit("closePopup");

      } catch (error) {
        console.error(error);
        alert("❌ Something went wrong. Please try again.");
      }
    },

    closePopup() {
      this.$emit("closePopup");
    }
  }
};
</script>

<style scoped>
/* Optional styling */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.50);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 350px;
}
</style>
