<template>
  <div>
    <BannerSection title="Executive Members" />
    <div class="container" v-if="fetchedData.length > 0">
      <h3>
        Executive Members<br /><span class="sub-heading"
          >National College Of Chest Physicians---</span
        >
      </h3>
      <hr />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name or position..."
        class="search-input"
      />
      <div class="pagination text-right mt-2">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
      <div class="profile-cards mt-5">
        <template v-for="items in paginatedExecutiveMembers" :key="items._id">
          <div class="profile-card">
            <div class="card-top-border"></div>
            <div class="card-header">
              <div class="member-info">
                <h4 class="member-name">{{ items.name }}</h4>
                <p class="member-position">{{ items.position }}</p>
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
                    class="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                    />
                  </svg>
                </div>
                <div class="info-text" v-if="items.email">
                  {{ items.email }}
                </div>
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
              <div class="info-row" v-if="items.phone">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-telephone"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    />
                  </svg>
                </div>
                <div class="info-text">{{ items.phone }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="pagination text-right">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
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
      currentPage: 1,
      itemsPerPage: 12,
      searchQuery: "",
    };
  },

  computed: {
    filteredExecutiveMembers() {
      if (this.searchQuery) {
        return this.fetchedData.filter(
          (member) =>
            member.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            member.position
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      }
      return this.fetchedData;
    },
    paginatedExecutiveMembers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredExecutiveMembers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(
        this.filteredExecutiveMembers.length / this.itemsPerPage
      );
    },
  },

  methods: {
    async fetchmemberdata() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/executiveMembers/getmemberData`
        );
        this.fetchedData = response.data;
        console.log(this.fetchedData);
      } catch (error) {
        console.error("Error Fetching From Data", error);
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
    this.fetchmemberdata();
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

.member-position {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
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

.year-section {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
  font-size: 14px;
}

.year-label {
  font-weight: 600;
  color: #495057;
  margin-right: 8px;
}

.year-value {
  font-weight: 500;
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

@media (max-width: 768px) {
  .profile-cards {
    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
  }
}
</style>
