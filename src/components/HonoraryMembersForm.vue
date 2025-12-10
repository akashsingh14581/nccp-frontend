<template>

  <div style="display: grid; place-items: center">
    <form class="honorary_form" @submit.prevent="submitHonoraryMembersData">
      <h3 class="text-center display-7">NCCP Honorary Members Form</h3><br>
      <div>
        <label for="name">Name:</label><br>
        <input type="text" v-model="HonoraryMembersData.name" id="name" required>
      </div>
      <div>
        <label for="id">ID:</label><br>
        <input type="text" v-model="HonoraryMembersData.id" id="id" required>
      </div>
      <div>
        <label for="email">Email:</label><br>
        <input type="email" v-model="HonoraryMembersData.email" id="email" required>
      </div>
      <div>
        <label for="phone">Phone:</label><br>
        <input type="text" v-model="HonoraryMembersData.phone" id="phone" required>
      </div>
      <div>
        <label for="state">State:</label><br>
        <input type="text" v-model="HonoraryMembersData.state" id="state">
      </div>
      <div>
        <label for="address">Address:</label><br>
        <input type="text" v-model="HonoraryMembersData.address" id="address" required>
      </div>
      <div>
        <label for="status">Status:</label><br>
        <input type="text" v-model="HonoraryMembersData.status" id="address" required>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';
import {API_BASE_URL} from '../utils/apis.js'

export default {
  components: {
  },
  data() {
    return {
      HonoraryMembersData: {
        name: '',
        id: '',
        state: '',
        address: '',
        email: '',
        phone: '',
        status: '',
      },
    };
  },
  methods: {
    async submitHonoraryMembersData() {
      try {
        await axios.post(`${API_BASE_URL}/honorarymembers/PostHonorarymembers`, this.HonoraryMembersData);
        this.$emit('honorMemberFormSubmit');
        this.$emit('refreshHonorMembers');
        alert("Successfully Submitted");
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }
};


</script>

<style scoped>
input {
  width: 100% !important;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
}

button {
  width: 100%;
  border: none;
  outline: none;
  background-color: #0d6efd;
  padding: 5px 20px;
  color: #fff;
  font-weight: 600
}

div {
  margin-bottom: 15px;
}
</style>