<template>
  <BannerSection title="NCCP Life Members" />
  <div class="container">
    <h3>NCCP Life Members</h3>
    <hr />
    <!-- <div style="margin: 75px; mt-5">
    <div v-if="lifeMembers.length > 0">
      <table border="1">
          <tr>
            <th >Id</th>
            <th >Name</th>
            <th >Address</th>
            <th >State</th>
          </tr>
          <tr v-for="(row, index) in lifeMembers" :key="index">
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.address }}</td>
            <td>{{ row.state}}</td>
          </tr>
      </table>
    </div>
    <div v-else>
      <p>No data available</p>
    </div>
  </div> -->
    <div class="card" v-if="lifeMembers.length > 0">
      <div class="profile-ui" v-for="(card, index) in lifeMembers" :key="index">
        <img :src="card.img" alt="card" loading="lazy" />
        <i class="bi bi-person-check-fill"></i
        ><span v-html="card.name" class="text-center"></span><br />
        <i class="bi bi-person-check-fill"></i
        ><span v-html="card.name" class="text-center"></span><br />
        <i class="bi bi-envelope-check-fill"></i
        ><span v-html="card.email" class="text-center"></span><br />
        <i class="bi bi-telephone-inbound-fill"></i
        ><span v-html="card.phone" class="text-center"></span><br />
        <i class="bi bi-geo-alt-fill"></i
        ><span v-html="card.state" class="text-center"></span><br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BannerSection from "@/components/BannerSection.vue";
import {API_BASE_URL} from '../utils/apis.js'
// const apiBaseUrl = import.meta.env.VUE_API_BASE_URL;

export default {
  components: { BannerSection },
  data() {
    return {
      lifeMembers: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/Lifemembers/getXsl`
        );
        this.lifeMembers = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box !important;
}
.card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  border: none;
}

.profile-ui {
  padding: 15px;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45),
    5px 5px 9px rgba(94, 104, 121, 0.3);
}
.profile-ui i {
  padding: 20px;
  color: blue;
  margin: 20px 0px;
}

.profile-ui span {
  font-size: 13px;
}

.profile-ui:hover {
  transform: scale(1.1);
  transition: 0.5s;
  cursor: pointer;
}

@media (max-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    border: none;
  }
}
</style>
