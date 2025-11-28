<template>
  <div style="display: grid; place-items: center">
    <form class="life_form" @submit.prevent="submitLifeMembersData">
      <h3 class="text-center display-7">NCCP Life Members Form</h3><br>

      <div>
        <label for="name">Name:</label><br>
        <input type="text" v-model="LifeMembersData.name" id="name" required>
      </div>

      <div>
        <label for="id">ID:</label><br>
        <input type="text" v-model="LifeMembersData.id" id="id" required>
      </div>

      <div>
        <label for="email">Email:</label><br>
        <input type="email" v-model="LifeMembersData.email" id="email" required>
      </div>

      <div>
        <label for="phone">Phone:</label><br>
        <input type="text" v-model="LifeMembersData.phone" id="phone" required>
      </div>

      <div>
        <label for="state">State:</label><br>
        <input type="text" v-model="LifeMembersData.state" id="state">
      </div>

      <div>
        <label for="address">Address:</label><br>
        <input type="text" v-model="LifeMembersData.address" id="address" required>
      </div>

      <div>
        <label for="status">Status:</label><br>
        <input type="text" v-model="LifeMembersData.status" id="status">
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      LifeMembersData: {
        name: '',
        id: '',
        email: '',
        phone: '',
        state: '',
        address: '',
        status: '',
      },
    };
  },
  methods: {
    async submitLifeMembersData() {
      try {
        await axios.post('http://localhost:3000/lifemembers/createLifeMember', this.LifeMembersData);
        this.$emit('refreshLifeMembers');
        this.$emit('closeLifeMembersForm');
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
  font-weight: 600;
}

div {
  margin-bottom: 15px;
}
</style>
