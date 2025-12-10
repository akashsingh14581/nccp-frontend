<template>

    <div style="margin-top: 200px; display: grid; place-items: center" >
      <form @submit.prevent="submitRamanAwardData">
        <h3 class="text-center display-7">Executive Member List</h3><br>
        <div>
          <label for="name">Name:</label><br>
          <input type="text" v-model="RamanAwardData.name" id="name" required>
        </div>
        <div>
          <label for="year">Year:</label><br>
          <input type="text" v-model="RamanAwardData.year" id="id" required>
        </div>
        <div>
          <label for="city">City:</label><br>
          <input type="text" v-model="RamanAwardData.city" id="city" required>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import {API_BASE_URL} from '../../utils/apis.js'
  export default {
    components: {
    },
    data() {
      return {
        RamanAwardData: {
          name: '',
          id: '',
          state: '',
          address: '',
        },
      };
    },
    methods: {
      async submitRamanAwardData() {
        try {
         await axios.post(`${API_BASE_URL}/RamanAward/PostRamanAwarddata`, this.RamanAwardData);
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
  