<template>
    <div class="main-class">
<form @submit.prevent="submitdata">
    <input type="text" v-model="practicedata.name" id="name" placeholder="Enter Full Name..."><br>
    <input type="text" v-model="practicedata.age" id="age"   placeholder="Enter Your Age..."><br>
    <input type="text" v-model="practicedata.email" id="email" placeholder="Enter Your Email..."><br>
    <input type="submit" value="send">
</form>
    </div>
</template>

<script>
import axios from 'axios';
import {API_BASE_URL} from '../utils/apis.js'
// const apiBaseUrl = import.meta.env.VUE_API_BASE_URL;



export default{
    data(){
        return{
        practicedata:{
            name: '',
            age: '',
            email: '',

        }
    }
},

methods: {
    async submitdata(){
        try{
            await axios.post(`${API_BASE_URL}/practicedata/pr`, this.practicedata);
            this.$emit('Successfully Submited');
        }
        catch(error){
        alert('Error', error)
        }
    }
}
};
</script>



<style scoped>
.main-class{
    display: grid;
    place-items: center;
    max-height: 100vh;
}
</style>