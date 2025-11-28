<template>
  <div style="margin: 75px;">
    <input type="file" @change="handleFileUpload" accept=".xls,.xlsx" />
    <div v-if="lifeMembers.length > 0">
      <table>
        <thead>
          <tr>
            <th v-for="(value, key) in lifeMembers[0]" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in lifeMembers" :key="index">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="saveDataToDB">Save Data to DB</button>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
// // const apiBaseUrl = import.meta.env.VUE_API_BASE_URL;

export default {
  data() {
    return {
      lifeMembers: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        this.lifeMembers = XLSX.utils.sheet_to_json(firstSheet);
      };
      reader.readAsArrayBuffer(file);
    },
    async saveDataToDB() {
      try {
        const formattedData = this.lifeMembers.map((lifeMember) => ({
          id: lifeMember['id'],
          name: lifeMember['name'],
          address: lifeMember['address'],
          state: lifeMember['state'],
          status: lifeMember['status'],
          phone: lifeMember['phone'],
          email: lifeMember['email'],
        }));

        console.log('Formatted Data:', formattedData);

        const response = await axios.post(`http://localhost:3000/fellowmember/uploadfellowmember`, {
          chapters: formattedData
        });

        console.log('Data saved to DB:', response.data);
      } catch (error) {
        console.error('Error saving data to DB:', error);
      }
    }
  }
};
</script>
