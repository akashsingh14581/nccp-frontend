<template>

  <div style="margin-top: 200px; display: grid; place-items: center" >
    
    <form @submit.prevent="submitForm">
      <h3 class="text-center display-7">Annual Conferance Form</h3><br>
      <div>
        <label for="name">Name:</label><br>
        <input type="text" v-model="formData.name" id="name" required>
      </div>
      <div>
        <label for="year">Year:</label><br>
        <input type="number" v-model="formData.year" id="year" required>
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
      formData: {
        name: '',
        year: ''
      },
    };
  },
  methods: {
    async submitForm() {
      try {
       await axios.post(`${API_BASE_URL}/api/form`, this.formData);
        this.formData.name = '';
        this.formData.year = '';
        this.$emit('formSubmitted');
        alert("Successfully Submitted")
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }
};


  </script>

<style scoped>
form { 
width: 25%;
padding: 20px;

}

input{
  width: 100% !important;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
}

button{
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
