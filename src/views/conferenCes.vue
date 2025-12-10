<template>
  <BannerSection title="Conferance" />
  <div class="container">
    <h3>Conferences</h3>
    <hr />
    <p style="text-align: justify">
      The association/College has held 33 conferences with A.P.I. since its
      inception in 1959. Since the 28th Annual Conference in Delhi, 1989, the
      College has organised its annual conferences independently (NACCON). These
      conferences have proved to be highly successful and have been chaired by
      Presidents of NCCP(I). From 1999, the NCCP(I) with ICS is having Joint
      Conferences - NAPCON.
    </p>
    <h3>Annual Conferences</h3>
    <p>
      The following held office of the President of the Annual Conferences of
      the Association, and later National College of Chest Physicians (India).
      From 1989 the President of the College was also the President of the
      annual conference.
    </p>
    <div class="container">
      <table v-if="fetchedData.length">
        <tr>
          <th>Name</th>
          <th>Year</th>
        </tr>

        <tr v-for="item in fetchedData" :key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.year }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BannerSection from "@/components/BannerSection.vue";
import {API_BASE_URL} from '../utils/apis.js'

export default {
  components: {
    BannerSection,
  },
  data() {
    return {
      fetchedData: [],
    };
  },

  methods: {
    async fetchFormData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/forms`);
        this.fetchedData = response.data;
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    },
  },

  mounted() {
    this.fetchFormData();
  },
};
</script>

<style scoped>
.tableHeading {
  padding: 10px;
}

table {
  width: 50%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

tr:nth-child(odd) {
  background-color: #fff7f7;
}

th {
  background-color: #06e;
  color: white;
}
</style>
