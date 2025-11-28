<template>
  <div style="display: grid; place-items: center">
    <form class="executive_member_form" @submit.prevent="executiveMembers">
      <h3 class="text-center display-7">Executive Member Form</h3>
      <br />

      <div>
        <label for="name">Name:</label><br />
        <input type="text" v-model="memberData.name" id="name" required />
      </div>

      <div>
        <label for="email">Email:</label><br />
        <input type="email" v-model="memberData.email" id="email" required />
      </div>

      <div>
        <label for="phone">Phone:</label><br />
        <input type="text" v-model="memberData.phone" id="phone" required />
      </div>

      <div>
        <label for="position">Position:</label><br />
        <input type="text" v-model="memberData.position" id="position" />
      </div>

      <div>
        <label for="address">Address:</label><br />
        <input type="text" v-model="memberData.address" id="address" required />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      memberData: {
        name: "",
        email: "",
        phone: "",
        position: "",
        address: "",
      },
    };
  },
  methods: {
    async executiveMembers() {
      try {
        await axios.post(
          `http://localhost:3000/executiveMembers/PostmemberForm`,
          this.memberData
        );
        this.$emit("refreshExecutiveMembers");
        this.$emit("closeExecutiveMemberForm");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit Executive Member data");
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
