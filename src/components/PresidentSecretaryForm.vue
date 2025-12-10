<template>
  <div style="display: grid; place-items: center">
    <form class="honorary_form" @submit.prevent="submitPresidentSecretaryData">
      <h3 class="text-center display-7">President & Secretary Form</h3>
      <br />

      <div>
        <label for="year">Year:</label><br />
        <input type="text" v-model="formData.year" id="year" required />
      </div>

      <div>
        <label for="president">President:</label><br />
        <input
          type="text"
          v-model="formData.president"
          id="president"
          required
        />
      </div>

      <div>
        <label for="secretary">Secretary:</label><br />
        <input
          type="text"
          v-model="formData.secretary"
          id="secretary"
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'
export default {
  name: "PresidentSecretaryForm",
  data() {
    return {
      formData: {
        year: "",
        president: "",
        secretary: "",
      },
    };
  },
  methods: {
    async submitPresidentSecretaryData() {
      try {
        await axios.post(
          `${API_BASE_URL}/api/president-secretary`,
          this.formData
        );
        alert("✅ Record submitted successfully!");
        // Clear form after submit
        this.formData.year = "";
        this.formData.president = "";
        this.formData.secretary = "";
        this.$emit("closePresidentAndSecretaryMemberForm");
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        alert("Failed to submit record. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
input {
  width: 100% !important;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  padding: 5px;
}

button {
  width: 100%;
  border: none;
  outline: none;
  background-color: #0d6efd;
  padding: 5px 20px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background-color: #0b5ed7;
}

div {
  margin-bottom: 15px;
}
</style>
