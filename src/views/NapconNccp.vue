<template>
  <BannerSection title="NCCP NAPCON" />
  <div class="container">
    <h3>NAPCON</h3>
    <hr />
    <p>
      The association/College has held 33 conferences with A.P.I. since its
      inception in 1959. Since the 28th Annual Conference in Delhi, 1989, the
      College has organised its annual conferences independently (NACCON). These
      conferences have proved to be highly successful and have been chaired by
      Presidents of NCCP(I). From 1999, the NCCP(I) with ICS is having Joint
      Conferences - NAPCON.
    </p>

    <div class="content">
      <h4>The conference of NCCP(I) was held from 1989 to 1999.</h4>
      <hr />
      <p>
        After several positive negotiations and meeting spread over almost 8
        years, the NCCP (I) and Indian Chest Society (ICS), the two national
        bodies on Pulmonary Medicine agreed to have the annual conference
        jointly. This is called National Conference on Pulmonary Diseases, in
        short NAPCON. The Organising Secretary and the venue of the NAPCON will
        be decided on alternate years by these organizations. The first NAPCON
        was held in Delhi in 1999. The guidelines for organising NAPCON have
        been discussed & are being finalized to help the organizers and also to
        have uniformity in the organization of NAPCON.
      </p>
    </div>
    <br />

    <table v-if="fetchedData.length">
      <tr>
        <th>Year</th>
        <th>Place</th>
        <th>Organising Secretary</th>
      </tr>

      <tr v-for="item in fetchedData" :key="item._id">
        <td>{{ item.year }}</td>
        <td>{{ item.place }}</td>
        <td>{{ item.secretary }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import BannerSection from "@/components/BannerSection.vue";
// const apiBaseUrl = import.meta.env.VUE_API_BASE_URL;

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
        const response = await axios.get(
          `http://localhost:3000/Napcondata/getNAPCONmembers`
        );
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
.container {
  padding: 20px;
  background: #f7f7f7;
}

.content {
  background: #fff;
  padding: 20px;
}
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
