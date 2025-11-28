<template>
  <div>
    <BannerSection title="NCCP Honorary Members" />
    <div class="container" v-if="fetchedhonoraryData.length > 0">
      <h3>
        NCCP Honorary Members<br /><span class="sub-heading"
          >National Collage Of Chest Physican---</span
        >
      </h3>
      <hr />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name or id..."
        class="search-input"
      />
      <div class="pagination text-right mt-2" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
      <div class="profile-cards mt-5">
        <div
          class="profile-card"
          v-for="items in paginatedHonoraryMembers"
          :key="items._id"
        >
          <div class="card-top-border"></div>
          <div class="card-header">
            <div class="member-info">
              <h4 class="member-name">{{ items.name }}</h4>
              <p class="member-id">{{ items.id }}</p>
            </div>
          </div>
          <div class="card-body">
            <div class="info-row">
              <div class="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
              </div>
              <div class="info-text">{{ items.id }}</div>
            </div>
            <div class="info-row" v-if="items.state">
              <div class="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-geo"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                  />
                </svg>
              </div>
              <div class="info-text">{{ items.state }}</div>
            </div>
            <div class="info-row">
              <div class="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                  />
                  <path
                    d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                </svg>
              </div>
              <div class="info-text">{{ items.address }}</div>
            </div>
            <div class="status-section">
              <span class="status-label">Type:</span>
              <span class="status-value honorary">Honorary Member</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination text-right" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
    <div v-else-if="fetchedhonoraryData.length === 0" class="container">
      <div class="no-data">
        <p>No honorary members found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BannerSection from "@/components/BannerSection.vue";

export default {
  components: {
    BannerSection,
  },
  data() {
    return {
      fetchedhonoraryData: [],
      currentPage: 1,
      itemsPerPage: 12,
      searchQuery: "",
    };
  },
  computed: {
    filteredHonoraryMembers() {
      if (this.searchQuery) {
        return this.fetchedhonoraryData.filter(
          (member) =>
            member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            member.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            (member.state && member.state.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      }
      return this.fetchedhonoraryData;
    },
    paginatedHonoraryMembers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredHonoraryMembers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredHonoraryMembers.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchHonorarymemberdatas() {
      try {
        const response = await axios.get(
          `http://localhost:3000/honorarymembers/getHonorarymembers`
        );
        this.fetchedhonoraryData = response.data;
        console.log(this.fetchedhonoraryData, "this is fetched data");
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 300, behavior: "smooth" });
    },
  },
  mounted() {
    this.fetchHonorarymemberdatas();
  },
};
</script>

<style scoped>
.profile-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.profile-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.card-top-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #007bff;
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  margin-top: 4px;
}

.member-info {
  flex: 1;
}

.member-name {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
}

.member-id {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
}

.card-body {
  padding: 15px;
  position: relative;
}

.info-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-icon {
  width: 20px;
  margin-right: 10px;
  color: #6c757d;
  display: flex;
  justify-content: center;
  margin-top: 2px;
}

.info-text {
  flex: 1;
  font-size: 14px;
  color: #495057;
  word-break: break-word;
}

.status-section {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
  font-size: 14px;
}

.status-label {
  font-weight: 600;
  color: #495057;
  margin-right: 8px;
}

.status-value {
  font-weight: 500;
}

.status-value.honorary {
  color: #007bff;
}

.sub-heading {
  font-size: 13px;
}

.pagination {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 30px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 18px;
}

@media (max-width: 768px) {
  .profile-cards {
    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
  }
}
</style>