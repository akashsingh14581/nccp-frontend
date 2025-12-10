<template>
  <BannerSection title="PRESIDENTS & SECRETARIES OF THE COLLEGE" />

  <div class="container">
    <div class="header">
      <h2>PRESIDENTS & SECRETARIES OF THE COLLEGE</h2>
      <div class="org-info">
        <h3>NATIONAL COLLEGE OF CHEST PHYSICIANS (INDIA)</h3>
        <p><strong>GOVERNING COUNCIL (YEAR – 2024-2025)</strong></p>
        <p>W.E.F. - 1-4-2024</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>Loading data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchData" class="btn">Try Again</button>
    </div>

    <!-- Data Section -->
    <div v-else>
      <!-- Controls -->
      <div class="controls">
        <span class="count">Total Records: {{ tableData.length }}</span>
        <button @click="fetchData" class="btn">Refresh</button>
      </div>

      <!-- Table -->
      <div class="table-wrapper" v-if="tableData.length > 0">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>President</th>
              <th>Secretary</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in paginatedData" :key="data._id || index">
              <td class="year">{{ data.year }}</td>
              <td>{{ data.president }}</td>
              <td>{{ data.secretary }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination">
          <div class="pagination-info">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of
            {{ tableData.length }} entries
          </div>
          <div class="pagination-controls">
            <button
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              Previous
            </button>

            <div class="page-numbers">
              <button
                v-for="page in visiblePages"
                :key="page"
                class="page-btn"
                :class="{ active: page === currentPage }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>

            <button
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              Next
            </button>
          </div>
          <div class="page-size">
            <select v-model="pageSize" @change="currentPage = 1">
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty">
        <p>No records found</p>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'

export default {
  components: {
    BannerSection,
  },
  data() {
    return {
      tableData: [],
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.tableData.length / this.pageSize);
    },
    visiblePages() {
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    endIndex() {
      return Math.min(this.startIndex + this.pageSize, this.tableData.length);
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/president-secretary`
        );
        this.tableData = response.data.sort((a, b) => b.year - a.year);
        this.currentPage = 1;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.error = "Failed to load data. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.org-info h3 {
  color: #0d6efd;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.org-info p {
  color: #7f8c8d;
  margin: 5px 0;
}

/* Loading & Error States */
.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.error {
  color: #e74c3c;
}

.btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background: #2980b9;
}

.btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

/* Controls */
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.count {
  color: #7f8c8d;
  font-weight: 500;
}

/* Table */
.table-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #0d6efd;
  color: white;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #ecf0f1;
  text-align: left;
}

tr:hover {
  background: #f8f9fa;
}

.year {
  font-weight: 600;
  color: #2c3e50;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #ecf0f1;
  flex-wrap: wrap;
  gap: 15px;
}

.pagination-info {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-btn {
  background: white;
  border: 1px solid #bdc3c7;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: #2c3e50;
}

.pagination-btn:hover:not(:disabled) {
  background: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-btn {
  background: white;
  border: 1px solid #bdc3c7;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: #2c3e50;
  min-width: 40px;
}

.page-btn:hover {
  background: #ecf0f1;
}

.page-btn.active {
  background: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

.page-size select {
  padding: 8px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  background: white;
  color: #2c3e50;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .header h2 {
    font-size: 1.5rem;
  }

  .org-info h3 {
    font-size: 1.1rem;
  }

  .controls {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  .pagination {
    flex-direction: column;
    text-align: center;
  }

  .pagination-controls {
    order: -1;
  }

  th,
  td {
    padding: 10px 8px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .page-numbers {
    display: none;
  }

  .pagination-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
