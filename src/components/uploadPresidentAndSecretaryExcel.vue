<template>
  <div class="excel-upload-container">
    <!-- Header Section -->
    <div class="upload-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="bi bi-person-badge"></i>
        </div>
        <div class="header-text">
          <h1>Upload President & Secretary Members</h1>
          <p>Import President and Secretary data from Excel files (.xls, .xlsx)</p>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn-help" @click="showHelp = true">
          <i class="bi bi-question-circle"></i>
          Help Guide
        </button>
               <button class="btn-back" @click="goToDashboard">
                    <i class="bi bi-arrow-left"></i>
                    Back to Dashboard
                </button>
      </div>
    </div>

    <!-- Upload Card -->
    <div class="upload-card">
      <div class="upload-area" @click="triggerFileInput" @drop="handleDrop" @dragover="handleDragOver">
        <input type="file" ref="fileInput" @change="handleFileUpload" accept=".xls,.xlsx" class="file-input" />
        <div class="upload-content" :class="{ 'has-file': selectedFile }">
          <div class="upload-icon">
            <i class="bi" :class="selectedFile ? 'bi-file-earmark-excel-fill' : 'bi-cloud-arrow-up'"></i>
          </div>
          <div class="upload-text">
            <h3 v-if="!selectedFile">Drop your Excel file here</h3>
            <h3 v-else>{{ selectedFile.name }}</h3>
            <p v-if="!selectedFile">or click to browse files</p>
            <p v-else class="file-size">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <div class="upload-progress" v-if="isUploading">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
            </div>
            <span>{{ uploadProgress }}%</span>
          </div>
        </div>
      </div>

      <div class="upload-requirements" v-if="!selectedFile">
        <h4>File Requirements:</h4>
        <ul>
          <li><i class="bi bi-check-circle"></i> Excel format (.xls, .xlsx)</li>
          <li><i class="bi bi-check-circle"></i> Maximum file size: 10MB</li>
          <li><i class="bi bi-check-circle"></i> <strong>Required columns:</strong> Year, President, Secretary</li>
          <li><i class="bi bi-check-circle"></i> Ensure all required columns are filled</li>
        </ul>
      </div>
    </div>

    <!-- Data Preview -->
    <div v-if="presidentSecretaryMembers.length > 0" class="preview-section">
      <div class="preview-header">
        <div class="preview-info">
          <h2>Data Preview</h2>
          <p>Review the imported President & Secretary data before saving to database</p>
          <div class="preview-stats">
            <div class="stat">
              <span class="stat-number">{{ presidentSecretaryMembers.length }}</span>
              <span class="stat-label">Records Found</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ validRecords }}</span>
              <span class="stat-label">Valid Records</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ invalidRecords }}</span>
              <span class="stat-label">Issues Found</span>
            </div>
          </div>
        </div>
        <div class="preview-actions">
          <button class="btn-secondary" @click="clearData">
            <i class="bi bi-arrow-clockwise"></i>
            Re-upload
          </button>
          <button class="btn-primary" @click="saveDataToDB" :disabled="isSaving">
            <i class="bi" :class="isSaving ? 'bi-arrow-repeat spin' : 'bi-cloud-check'"></i>
            {{ isSaving ? 'Saving...' : 'Save to Database' }}
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-container">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th class="column-header year-column">
                  <div class="header-content">
                    <span>Year</span>
                    <i class="bi bi-calendar"></i>
                  </div>
                </th>
                <th class="column-header">
                  <div class="header-content">
                    <span>President</span>
                    <i class="bi bi-person-fill"></i>
                  </div>
                </th>
                <th class="column-header">
                  <div class="header-content">
                    <span>Secretary</span>
                    <i class="bi bi-person-fill"></i>
                  </div>
                </th>
                <th class="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in paginatedData" :key="index"
                :class="{ 'even-row': index % 2 === 0, 'has-issue': hasDataIssue(row) }">
                
                <!-- Year Column -->
                <td :class="getCellClass('year', row.year)">
                  <span v-if="row.year" class="year-badge">{{ row.year }}</span>
                  <span v-else class="missing-data">Missing</span>
                </td>
                
                <!-- President Column -->
                <td :class="getCellClass('president', row.president)">
                  <div class="member-info">
                    <strong>{{ row.president || '-' }}</strong>
                  </div>
                </td>
                
                <!-- Secretary Column -->
                <td :class="getCellClass('secretary', row.secretary)">
                  <div class="member-info">
                    <strong>{{ row.secretary || '-' }}</strong>
                  </div>
                </td>
                
                <td class="actions-cell">
                  <button class="action-btn edit" @click="editRow(index)" title="Edit">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="action-btn delete" @click="deleteRow(index)" title="Delete">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State for Table -->
        <div v-if="presidentSecretaryMembers.length === 0" class="empty-table">
          <i class="bi bi-table"></i>
          <h3>No data to display</h3>
          <p>Upload an Excel file to see the data preview</p>
        </div>

        <!-- Pagination -->
        <div class="pagination" v-if="presidentSecretaryMembers.length > 0">
          <div class="pagination-info">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ presidentSecretaryMembers.length }} entries
          </div>
          <div class="pagination-controls">
            <button class="pagination-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
              <i class="bi bi-chevron-left"></i>
            </button>
            <div class="page-numbers">
              <button v-for="page in visiblePages" :key="page" class="page-btn"
                :class="{ active: page === currentPage }" @click="changePage(page)">
                {{ page }}
              </button>
            </div>
            <button class="pagination-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <div class="page-size">
            <select v-model="pageSize" @change="currentPage = 1">
              <option value="10">10 / page</option>
              <option value="25">25 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingRowIndex !== null ? 'Edit President & Secretary' : 'Add New Record' }}</h3>
          <button class="close-btn" @click="closeEditModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveEditedRow" class="edit-form">
            <div class="form-fields">
              <!-- Year (Required) -->
              <div class="form-group">
                <label for="edit-year">Year *</label>
                <input id="edit-year" type="number" v-model="editingRow.year" required 
                  :class="{ 'error': !editingRow.year }" placeholder="Enter year (e.g., 2024)"
                  min="1900" :max="new Date().getFullYear() + 1" />
                <span class="error-message" v-if="!editingRow.year">Year is required</span>
              </div>

              <!-- President (Required) -->
              <div class="form-group">
                <label for="edit-president">President Name *</label>
                <input id="edit-president" type="text" v-model="editingRow.president" required
                  :class="{ 'error': !editingRow.president }" placeholder="Enter president's full name" />
                <span class="error-message" v-if="!editingRow.president">President name is required</span>
              </div>

              <!-- Secretary (Required) -->
              <div class="form-group">
                <label for="edit-secretary">Secretary Name *</label>
                <input id="edit-secretary" type="text" v-model="editingRow.secretary" required
                  :class="{ 'error': !editingRow.secretary }" placeholder="Enter secretary's full name" />
                <span class="error-message" v-if="!editingRow.secretary">Secretary name is required</span>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="closeEditModal">
                Cancel
              </button>
              <button type="submit" class="btn-primary" :disabled="!isFormValid">
                <i class="bi bi-check-circle"></i>
                {{ editingRowIndex !== null ? 'Update' : 'Add' }} Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Confirm Deletion</h3>
          <button class="close-btn" @click="showDeleteModal = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="delete-warning">
            <i class="bi bi-exclamation-triangle"></i>
            <h4>Are you sure you want to delete this record?</h4>
            <p>This action cannot be undone. The following record will be permanently removed:</p>
            <div class="record-info">
              <strong>Year: {{ memberToDelete?.year }}</strong>
              <span>President: {{ memberToDelete?.president }}</span>
              <span>Secretary: {{ memberToDelete?.secretary }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="showDeleteModal = false">
            Cancel
          </button>
          <button class="btn-danger" @click="confirmDelete">
            <i class="bi bi-trash"></i>
            Delete Record
          </button>
        </div>
      </div>
    </div>

    <!-- Help Modal -->
    <div v-if="showHelp" class="modal-overlay" @click="showHelp = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>President & Secretary Upload Guide</h3>
          <button class="close-btn" @click="showHelp = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="guide-section">
            <h4>Required Columns:</h4>
            <ul>
              <li><strong>year:</strong> Year of term (Required)</li>
              <li><strong>president:</strong> President's full name (Required)</li>
              <li><strong>secretary:</strong> Secretary's full name (Required)</li>
            </ul>
          </div>
          <div class="guide-section">
            <h4>Excel Format Example:</h4>
            <div class="excel-example">
              <table class="example-table">
                <thead>
                  <tr>
                    <th>year</th>
                    <th>president</th>
                    <th>secretary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024</td>
                    <td>John Doe</td>
                    <td>Jane Smith</td>
                  </tr>
                  <tr>
                    <td>2023</td>
                    <td>Mike Johnson</td>
                    <td>Sarah Wilson</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="guide-section">
            <h4>Tips:</h4>
            <ul>
              <li>Ensure the first row contains column headers</li>
              <li>Year should be in numeric format (e.g., 2024)</li>
              <li>Each year should have unique president and secretary entries</li>
              <li>All three columns must be filled for each record</li>
              <li>Keep file size under 10MB for better performance</li>
              <li>All column headings in the Excel sheet must be in lowercase.
  - Example: `name`, `email`, `mobile`, `designation`, `address`, etc.
</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="showSuccess" class="toast success">
      <div class="toast-icon">
        <i class="bi bi-check-circle-fill"></i>
      </div>
      <div class="toast-content">
        <h4>Success!</h4>
        <p>{{ successMessage }}</p>
      </div>
      <button class="toast-close" @click="showSuccess = false">
        <i class="bi bi-x"></i>
      </button>
    </div>

    <!-- Error Toast -->
    <div v-if="showError" class="toast error">
      <div class="toast-icon">
        <i class="bi bi-exclamation-circle-fill"></i>
      </div>
      <div class="toast-content">
        <h4>Error!</h4>
        <p>{{ errorMessage }}</p>
      </div>
      <button class="toast-close" @click="showError = false">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as XLSX from 'xlsx';
import axios from 'axios';
import {API_BASE_URL} from '../utils/apis.js'
export default {
  data() {
    return {
      presidentSecretaryMembers: [],
      selectedFile: null,
      isUploading: false,
      uploadProgress: 0,
      isSaving: false,
      showHelp: false,
      showSuccess: false,
      showError: false,
      successMessage: '',
      errorMessage: '',
      currentPage: 1,
      pageSize: 10,

      // Edit functionality
      showEditModal: false,
      editingRowIndex: null,
      editingRow: {
        year: '',
        president: '',
        secretary: ''
      },

      // Delete functionality
      showDeleteModal: false,
      memberToDelete: null,
      deleteIndex: null
    };
  },
  computed: {
    validRecords() {
      return this.presidentSecretaryMembers.filter(row =>
        row.year && row.president && row.secretary
      ).length;
    },
    invalidRecords() {
      return this.presidentSecretaryMembers.length - this.validRecords;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.presidentSecretaryMembers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.presidentSecretaryMembers.length / this.pageSize);
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
      return Math.min(this.startIndex + this.pageSize, this.presidentSecretaryMembers.length);
    },
    isFormValid() {
      return this.editingRow.year && this.editingRow.president && this.editingRow.secretary;
    }
  },
  methods: {
      goToDashboard() {
            window.location.href = "/admin_dashboard";
        },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.name.match(/\.(xls|xlsx)$/)) {
        this.showErrorToast('Please select a valid Excel file (.xls or .xlsx)');
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        this.showErrorToast('File size must be less than 10MB');
        return;
      }

      this.selectedFile = file;
      this.isUploading = true;
      this.uploadProgress = 0;

      const reader = new FileReader();

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          this.uploadProgress = Math.round((e.loaded / e.total) * 100);
        }
      };

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          // Validate data structure
          if (jsonData.length === 0) {
            this.showErrorToast('No data found in the Excel file');
            return;
          }

          // Validate required columns
          const firstRow = jsonData[0];
          const hasRequiredColumns = firstRow.hasOwnProperty('year') && 
                                   firstRow.hasOwnProperty('president') && 
                                   firstRow.hasOwnProperty('secretary');

          if (!hasRequiredColumns) {
            this.showErrorToast('Missing required columns. Please ensure your Excel file has year, president, and secretary columns.');
            this.isUploading = false;
            return;
          }

          this.presidentSecretaryMembers = jsonData;
          this.isUploading = false;
          this.uploadProgress = 100;
          this.showSuccessToast(`Successfully imported ${jsonData.length} President & Secretary records`);

        } catch (error) {
          console.error('Error parsing Excel file:', error);
          this.showErrorToast('Error parsing Excel file. Please check the format.');
          this.isUploading = false;
        }
      };

      reader.onerror = () => {
        this.showErrorToast('Error reading file');
        this.isUploading = false;
      };

      reader.readAsArrayBuffer(file);
    },
    handleDragOver(event) {
      event.preventDefault();
      event.currentTarget.classList.add('drag-over');
    },
    handleDrop(event) {
      event.preventDefault();
      event.currentTarget.classList.remove('drag-over');
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.$refs.fileInput.files = files;
        this.handleFileUpload({ target: { files } });
      }
    },
    async saveDataToDB() {
      if (this.presidentSecretaryMembers.length === 0) {
        this.showErrorToast('No data to save');
        return;
      }

      this.isSaving = true;

      try {
        const formattedData = this.presidentSecretaryMembers.map((record) => ({
          year: record['year']?.toString() || '',
          president: record['president'] || '',
          secretary: record['secretary'] || ''
        }));

        console.log('Formatted President & Secretary Data:', formattedData);

        const response = await axios.post(`${API_BASE_URL}/api/president-secretary/uploadExcel`, {
          records: formattedData
        });

        console.log('Data saved to DB:', response.data);
        this.showSuccessToast(`Successfully saved ${formattedData.length} President & Secretary records to database`);

      } catch (error) {
        console.error('Error saving data to DB:', error);
        this.showErrorToast('Error saving data to database. Please try again.');
      } finally {
        this.isSaving = false;
      }
    },
    clearData() {
      this.presidentSecretaryMembers = [];
      this.selectedFile = null;
      this.currentPage = 1;
      this.$refs.fileInput.value = '';
    },

    // Edit Methods
    editRow(index) {
      const actualIndex = this.startIndex + index;
      this.editingRowIndex = actualIndex;
      this.editingRow = { ...this.presidentSecretaryMembers[actualIndex] };
      this.showEditModal = true;
    },

    saveEditedRow() {
      if (!this.isFormValid) {
        this.showErrorToast('Please fill all required fields');
        return;
      }

      if (this.editingRowIndex !== null) {
        // Update existing row
        this.presidentSecretaryMembers[this.editingRowIndex] = { ...this.editingRow };
        this.showSuccessToast('Record updated successfully');
      } else {
        // Add new row
        this.presidentSecretaryMembers.unshift({ ...this.editingRow });
        this.showSuccessToast('Record added successfully');
      }

      this.closeEditModal();
    },

    closeEditModal() {
      this.showEditModal = false;
      this.editingRowIndex = null;
      this.resetEditForm();
    },

    resetEditForm() {
      this.editingRow = {
        year: '',
        president: '',
        secretary: ''
      };
    },

    // Delete Methods
    deleteRow(index) {
      const actualIndex = this.startIndex + index;
      this.memberToDelete = this.presidentSecretaryMembers[actualIndex];
      this.deleteIndex = actualIndex;
      this.showDeleteModal = true;
    },

    confirmDelete() {
      if (this.deleteIndex !== null) {
        this.presidentSecretaryMembers.splice(this.deleteIndex, 1);
        this.showSuccessToast('Record deleted successfully');

        // Adjust current page if needed
        if (this.paginatedData.length === 0 && this.currentPage > 1) {
          this.currentPage--;
        }
      }

      this.showDeleteModal = false;
      this.memberToDelete = null;
      this.deleteIndex = null;
    },

    changePage(page) {
      this.currentPage = page;
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    getCellClass(key, value) {
      const classes = [];
      // Required fields validation
      if (key === 'year' && !value) classes.push('missing-required');
      if (key === 'president' && !value) classes.push('missing-required');
      if (key === 'secretary' && !value) classes.push('missing-required');
      return classes.join(' ');
    },
    hasDataIssue(row) {
      return !row.year || !row.president || !row.secretary;
    },
    showSuccessToast(message) {
      this.successMessage = message;
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    },
    showErrorToast(message) {
      this.errorMessage = message;
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    }
  }
};
</script>

<style scoped>
.excel-upload-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Header Styles */
.upload-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 3rem;
  opacity: 0.9;
}

.header-text h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.header-text p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.btn-help, .btn-back {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-help:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-back {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
}

.btn-back:hover {
    background: white;
    transform: translateY(-2px);
}

.header-actions {
    display: flex;
    gap: 1rem;
}

/* Upload Card */
.upload-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: #f8fafc;
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: #667eea;
  background: #f0f9ff;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  transition: all 0.3s ease;
}

.upload-content.has-file {
  opacity: 0.7;
}

.upload-icon {
  font-size: 4rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.upload-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.upload-text p {
  color: #64748b;
}

.file-size {
  color: #667eea;
  font-weight: 500;
}

.upload-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  transition: width 0.3s ease;
}

.upload-requirements {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f1f5f9;
  border-radius: 8px;
}

.upload-requirements h4 {
  color: #374151;
  margin-bottom: 0.75rem;
}

.upload-requirements ul {
  list-style: none;
  padding: 0;
}

.upload-requirements li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.upload-requirements li i {
  color: #10b981;
}

/* Preview Section */
.preview-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
}

.preview-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.preview-info p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.preview-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.preview-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

/* Buttons */
.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

/* Table Styles */
.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.column-header {
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions-header {
  background: #f8fafc;
  text-align: center;
  width: 120px;
}

.data-table tbody tr:hover {
  background: #f8fafc;
}

.even-row {
  background: #fafafa;
}

.has-issue {
  background: #fef2f2;
}

.has-issue:hover {
  background: #fecaca;
}

.missing-required {
  background: #fef2f2;
  color: #dc2626;
}

/* Year column styling */
.year-column {
  width: 120px;
}

.year-badge {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-block;
}

.missing-data {
  color: #ef4444;
  font-style: italic;
  font-size: 0.875rem;
}

/* Member info styling */
.member-info strong {
  color: #1e293b;
  font-weight: 600;
}

.actions-cell {
  text-align: center;
  white-space: nowrap;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 0.25rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-btn.edit {
  background: #f0f9ff;
  color: #0369a1;
}

.action-btn.edit:hover {
  background: #bae6fd;
}

.action-btn.delete {
  background: #fef2f2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background: #fecaca;
}

.empty-table {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.empty-table i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-table h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #475569;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  flex-wrap: wrap;
  gap: 1rem;
}

.pagination-info {
  color: #64748b;
  font-size: 0.875rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.page-btn:hover {
  background: #f8fafc;
}

.page-btn.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.page-size select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #374151;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f1f5f9;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: #e2e8f0;
}

.modal-body {
  padding: 1.5rem;
}

/* Guide Section */
.guide-section {
  margin-bottom: 2rem;
}

.guide-section h4 {
  color: #374151;
  margin-bottom: 1rem;
}

.guide-section ul {
  list-style: none;
  padding: 0;
}

.guide-section li {
  padding: 0.5rem 0;
  color: #64748b;
  border-bottom: 1px solid #f1f5f9;
}

.guide-section li:last-child {
  border-bottom: none;
}

.guide-section li strong {
  color: #374151;
}

/* Excel Example Table */
.excel-example {
  margin: 1rem 0;
}

.example-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.example-table th,
.example-table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #e2e8f0;
}

.example-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
}

.example-table td {
  background: white;
}

/* Edit Form Styles */
.edit-form {
  space-y: 1.5rem;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

/* Delete Modal Styles */
.delete-warning {
  text-align: center;
  padding: 1rem;
}

.delete-warning i {
  font-size: 3rem;
  color: #f59e0b;
  margin-bottom: 1rem;
}

.delete-warning h4 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.delete-warning p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.record-info {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.record-info strong {
  display: block;
  font-size: 1.125rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.record-info span {
  display: block;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(239, 68, 68, 0.4);
}

/* Toast */
.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
  z-index: 1001;
  border-left: 4px solid;
  animation: slideInRight 0.3s ease;
}

.toast.success {
  border-left-color: #10b981;
}

.toast.error {
  border-left-color: #ef4444;
}

.toast-icon {
  font-size: 1.5rem;
}

.toast.success .toast-icon {
  color: #10b981;
}

.toast.error .toast-icon {
  color: #ef4444;
}

.toast-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.toast-content p {
  color: #64748b;
  font-size: 0.875rem;
}

.toast-close {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.toast-close:hover {
  background: #f1f5f9;
}

/* Animations */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .excel-upload-container {
    margin: 1rem auto;
    padding: 0 0.5rem;
  }

  .upload-header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .preview-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .preview-stats {
    justify-content: center;
  }

  .preview-actions {
    width: 100%;
    justify-content: stretch;
  }

  .preview-actions button {
    flex: 1;
    justify-content: center;
  }

  .pagination {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .table-responsive {
    font-size: 0.875rem;
  }

  .data-table th,
  .data-table td {
    padding: 0.75rem 0.5rem;
  }

  .toast {
    right: 1rem;
    left: 1rem;
    max-width: none;
  }

  .form-actions {
    flex-direction: column;
  }

  .modal-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .upload-card {
    padding: 1rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }

  .upload-icon {
    font-size: 3rem;
  }

  .upload-text h3 {
    font-size: 1.25rem;
  }

  .preview-section {
    padding: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }

  .action-btn {
    width: 28px;
    height: 28px;
    margin: 0 0.125rem;
  }

  .year-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>