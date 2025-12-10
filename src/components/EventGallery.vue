<template>
  <div class="event-images-container">
    <!-- Header -->
    <div class="gallery-header">
      <button class="btn-back" @click="$router.back()">
        <i class="bi bi-arrow-left"></i>
        Back to Events
      </button>
      <div class="header-content">
        <h1>{{ event.eventName }}</h1>
        <p>{{ event.title }} - {{ event.year }}</p>
        <div class="event-stats">
          <span class="photo-count">
            <i class="bi bi-images"></i>
            {{ photos.length }} photos
          </span>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn-add-photos" @click="showUploadModal = true">
          <i class="bi bi-plus-circle"></i>
          Add More Photos
        </button>
      </div>
    </div>

    <!-- Photos Grid -->
    <div class="photos-grid">
      <div v-for="photo in photos" :key="photo._id" class="photo-card">
        <div class="photo-image">
          <img :src="getImageUrl(photo.imageUrl)" :alt="photo.title" loading="lazy" />
          <div class="photo-overlay">
            <button class="btn-zoom" @click="openLightbox(photo)">
              <i class="bi bi-zoom-in"></i>
            </button>
          </div>
        </div>
        <div class="photo-content">
          <h4>{{ photo.title }}</h4>
          <p v-if="photo.description" class="photo-description">{{ photo.description }}</p>
          <div class="photo-meta">
            <span class="upload-date">
              <i class="bi bi-calendar"></i>
              {{ formatDate(photo.createdAt) }}
            </span>
            <span class="file-size" v-if="photo.fileSize">
              <i class="bi bi-hdd"></i>
              {{ formatFileSize(photo.fileSize) }}
            </span>
          </div>
        </div>
        <div class="photo-actions">
          <button class="btn-edit" @click="editPhoto(photo)">
            <i class="bi bi-pencil"></i>
            Edit
          </button>
          <button class="btn-delete" @click="deletePhoto(photo._id)">
            <i class="bi bi-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="photos.length === 0 && !loading" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-images"></i>
      </div>
      <h3>No Photos Yet</h3>
      <p>Start by uploading some photos to your event</p>
      <button class="btn-primary" @click="showUploadModal = true">
        <i class="bi bi-cloud-arrow-up"></i>
        Upload Photos
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading photos...</p>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal-overlay" @click="showUploadModal = false">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h3>Upload Photos to {{ event.eventName }}</h3>
          <button class="close-btn" @click="showUploadModal = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="upload-section">
            <div class="file-upload-area" 
                 @click="triggerFileInput" 
                 @drop="handleImageDrop"
                 @dragover="handleImageDragOver"
                 @dragleave="handleImageDragLeave"
                 :class="{ 'drag-over': isDragOver }">
              <input type="file" ref="imageInput" @change="handleImageUpload" 
                     accept="image/*" multiple class="file-input" />
              <div class="upload-content">
                <div class="upload-icon">
                  <i class="bi bi-cloud-arrow-up"></i>
                </div>
                <div class="upload-text">
                  <h4>Drop images here</h4>
                  <p>or click to browse files (Max 10MB per image)</p>
                  <p class="file-types">Supported: JPG, PNG, WebP, AVIF</p>
                </div>
              </div>
            </div>

            <!-- Selected Files Preview -->
            <div v-if="selectedFiles.length > 0" class="selected-files">
              <h4>Selected Files ({{ selectedFiles.length }})</h4>
              <div class="files-list">
                <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
                  <div class="file-preview">
                    <img :src="getPreviewUrl(file)" alt="Preview" loading="lazy" />
                  </div>
                  <div class="file-info">
                    <div class="file-name">{{ file.name }}</div>
                    <div class="file-size">{{ formatFileSize(file.size) }}</div>
                    <div class="file-status" :class="getFileStatus(file)">
                      {{ getFileStatusText(file) }}
                    </div>
                  </div>
                  <button @click="removeSelectedFile(index)" class="btn-remove-file" :disabled="uploading">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>

              <!-- Photo Details Form -->
              <div class="photo-details-form" v-if="selectedFiles.length > 0">
                <h4>Photo Details</h4>
                <div class="form-grid">
                  <div class="form-group">
                    <label>Title *</label>
                    <input type="text" v-model="photoDetails.title" 
                           placeholder="Enter photo title" required 
                           :class="{ 'error': !photoDetails.title && uploadFormSubmitted }" />
                    <span class="error-message" v-if="!photoDetails.title && uploadFormSubmitted">
                      Photo title is required
                    </span>
                  </div>
                  <div class="form-group full-width">
                    <label>Description</label>
                    <textarea v-model="photoDetails.description" 
                              placeholder="Enter photo description" rows="3"></textarea>
                  </div>
                </div>
              </div>

              <!-- Upload Progress -->
              <div v-if="uploading" class="upload-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
                </div>
                <div class="progress-text">
                  Uploading... {{ Math.round(uploadProgress) }}%
                </div>
              </div>

              <!-- Upload Button -->
              <button class="btn-upload-photos" @click="uploadPhotos" 
                      :disabled="!canUploadPhotos || uploading">
                <i class="bi" :class="uploading ? 'bi-arrow-repeat spin' : 'bi-cloud-arrow-up'"></i>
                {{ uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photo${selectedFiles.length > 1 ? 's' : ''}` }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Photo Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click="showEditModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Edit Photo</h3>
          <button class="close-btn" @click="showEditModal = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="edit-photo-preview">
            <img :src="getImageUrl(editingPhoto.imageUrl)" :alt="editingPhoto.title" loading="lazy" />
          </div>
          <div class="form-group">
            <label>Title *</label>
            <input type="text" v-model="editingPhoto.title" required 
                   :class="{ 'error': !editingPhoto.title && editFormSubmitted }" />
            <span class="error-message" v-if="!editingPhoto.title && editFormSubmitted">
              Title is required
            </span>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="editingPhoto.description" rows="3" 
                      placeholder="Enter photo description"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="showEditModal = false">Cancel</button>
          <button class="btn-primary" @click="updatePhoto" :disabled="updating">
            <i class="bi" :class="updating ? 'bi-arrow-repeat spin' : 'bi-check-circle'"></i>
            {{ updating ? 'Updating...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="showLightbox" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">
          <i class="bi bi-x-lg"></i>
        </button>
        <div class="lightbox-image">
          <img :src="getImageUrl(currentPhoto.imageUrl)" :alt="currentPhoto.title" loading="lazy" />
        </div>
        <div class="lightbox-info">
          <h3>{{ currentPhoto.title }}</h3>
          <p v-if="currentPhoto.description">{{ currentPhoto.description }}</p>
          <div class="lightbox-meta">
            <span>Uploaded: {{ formatDate(currentPhoto.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Toasts -->
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
import { getPhotosByEvent, uploadPhoto, updatePhoto, deletePhoto } from "./eventAPI";

export default {
  name: "EventImages",
  data() {
    return {
      event: {},
      photos: [],
      loading: false,
      selectedFiles: [],
      uploading: false,
      uploadProgress: 0,
      isDragOver: false,
      showUploadModal: false,
      showEditModal: false,
      showLightbox: false,
      updating: false,
      uploadFormSubmitted: false,
      editFormSubmitted: false,
      editingPhoto: {},
      currentPhoto: {},
      photoDetails: {
        title: "",
        description: ""
      },
      showSuccess: false,
      showError: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  computed: {
    eventId() {
      return this.$route.params.eventId;
    },
    canUploadPhotos() {
      return this.selectedFiles.length > 0 && this.photoDetails.title.trim().length > 0;
    }
  },
  async mounted() {
    await this.fetchPhotos();
  },
  methods: {
    
    async fetchPhotos() {
      this.loading = true;
      try {
        const res = await getPhotosByEvent(this.eventId);
        this.photos = res.data;
      } catch (error) {
        console.error('Error fetching photos:', error);
        this.showErrorToast("Failed to load photos");
      } finally {
        this.loading = false;
      }
    },
    
    // File Upload Methods
    triggerFileInput() {
      this.$refs.imageInput.click();
    },
    
    handleImageDragOver(event) {
      event.preventDefault();
      this.isDragOver = true;
    },
    
    handleImageDragLeave(event) {
      event.preventDefault();
      this.isDragOver = false;
    },
    
    handleImageDrop(event) {
      event.preventDefault();
      this.isDragOver = false;
      const files = Array.from(event.dataTransfer.files);
      this.handleImageFiles(files);
    },
    
    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      this.handleImageFiles(files);
      // Reset the input
      event.target.value = '';
    },
    
    handleImageFiles(files) {
      const validFiles = files.filter(file => {
        const isValidType = file.type.startsWith('image/');
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
        
        if (!isValidType) {
          this.showErrorToast('Please select only image files');
          return false;
        }
        if (!isValidSize) {
          this.showErrorToast('File size must be less than 10MB');
          return false;
        }
        return true;
      });

      this.selectedFiles = [...this.selectedFiles, ...validFiles];
    },
    
    getPreviewUrl(file) {
      return URL.createObjectURL(file);
    },
    
    removeSelectedFile(index) {
      this.selectedFiles.splice(index, 1);
    },
    
    getFileStatus(file) {
        console.log(file)
      return 'valid';
    },
    
    getFileStatusText(file) {
        console.log(file)
      return 'Ready to upload';
    },
    
    async uploadPhotos() {
      this.uploadFormSubmitted = true;
      
      if (!this.canUploadPhotos) {
        this.showErrorToast("Please provide a title for the photos");
        return;
      }

      this.uploading = true;
      this.uploadProgress = 0;
      
      try {
        const totalFiles = this.selectedFiles.length;
        let uploadedCount = 0;

        for (const file of this.selectedFiles) {
          const formData = new FormData();
          formData.append("eventId", this.eventId);
          formData.append("title", this.photoDetails.title);
          formData.append("description", this.photoDetails.description);
          formData.append("photo", file);

          await uploadPhoto(formData);
          
          uploadedCount++;
          this.uploadProgress = (uploadedCount / totalFiles) * 100;
        }

        this.showSuccessToast(`Successfully uploaded ${this.selectedFiles.length} photos`);
        this.selectedFiles = [];
        this.photoDetails = { title: "", description: "" };
        this.uploadFormSubmitted = false;
        this.showUploadModal = false;
        await this.fetchPhotos();
      } catch (error) {
        console.error('Error uploading photos:', error);
        if (error.response && error.response.data) {
          this.showErrorToast(error.response.data.message || "Failed to upload photos");
        } else {
          this.showErrorToast("Failed to upload photos. Please try again.");
        }
      } finally {
        this.uploading = false;
        this.uploadProgress = 0;
      }
    },
    
    // Photo Management Methods
    editPhoto(photo) {
      this.editingPhoto = { ...photo };
      this.editFormSubmitted = false;
      this.showEditModal = true;
    },
    
    async updatePhoto() {
      this.editFormSubmitted = true;
      
      if (!this.editingPhoto.title.trim()) {
        this.showErrorToast("Please enter a title for the photo");
        return;
      }

      this.updating = true;
      try {
        await updatePhoto(this.editingPhoto._id, {
          title: this.editingPhoto.title,
          description: this.editingPhoto.description
        });
        
        this.showSuccessToast("Photo updated successfully");
        this.showEditModal = false;
        await this.fetchPhotos();
      } catch (error) {
        console.error('Error updating photo:', error);
        this.showErrorToast("Failed to update photo");
      } finally {
        this.updating = false;
      }
    },
    
    async deletePhoto(photoId) {
      if (!confirm("Are you sure you want to delete this photo? This action cannot be undone.")) {
        return;
      }

      try {
        await deletePhoto(photoId);
        this.showSuccessToast("Photo deleted successfully");
        await this.fetchPhotos();
      } catch (error) {
        console.error('Error deleting photo:', error);
        this.showErrorToast("Failed to delete photo");
      }
    },
    
    // Lightbox Methods
    openLightbox(photo) {
      this.currentPhoto = photo;
      this.showLightbox = true;
    },
    
    closeLightbox() {
      this.showLightbox = false;
      this.currentPhoto = {};
    },
    
    // Utility Methods
    getImageUrl(imagePath) {
      if (!imagePath) return '';
      // Remove leading slash if present
      const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      return imagePath.startsWith('http') ? imagePath : `http://localhost:3000/${cleanPath}`;
    },
    
    formatFileSize(bytes) {
      if (!bytes || bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Unknown date';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
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
.event-images-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 60px;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  gap: 20px;
}

.header-content h1 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 28px;
}

.header-content p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 16px;
}

.event-stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.event-stats span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-back {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-back:hover {
  background: #e0e0e0;
}

.btn-add-photos {
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-add-photos:hover {
  background: #1565c0;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.photo-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.photo-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.photo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.btn-zoom {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-zoom:hover {
  background: white;
}

.photo-content {
  padding: 16px;
}

.photo-content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.photo-description {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.photo-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.photo-actions {
  padding: 0 16px 16px 16px;
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
}

.btn-edit {
  background-color: #e3f2fd;
  color: #1976d2;
  border: 1px solid #bbdefb;
}

.btn-edit:hover {
  background-color: #bbdefb;
}

.btn-delete {
  background-color: #ffebee;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
}

.btn-delete:hover {
  background-color: #ffcdd2;
}

/* Upload Modal Styles */
.file-upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.file-upload-area:hover,
.file-upload-area.drag-over {
  border-color: #1976d2;
  background-color: #f8fbff;
}

.upload-content {
  color: #666;
}

.upload-icon {
  font-size: 48px;
  color: #1976d2;
  margin-bottom: 16px;
}

.upload-text h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.upload-text p {
  margin: 0 0 4px 0;
}

.file-types {
  font-size: 12px;
  color: #999;
}

.file-input {
  display: none;
}

.selected-files {
  margin-top: 24px;
}

.files-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 8px;
}

.file-preview {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-info {
  flex: 1;
}

.file-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.file-size {
  font-size: 12px;
  color: #666;
}

.file-status {
  font-size: 12px;
  margin-top: 4px;
}

.file-status.valid {
  color: #4caf50;
}

.btn-remove-file {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.btn-remove-file:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.upload-progress {
  margin: 16px 0;
}

.progress-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.btn-upload-photos {
  width: 100%;
  padding: 12px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-upload-photos:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-upload-photos:not(:disabled):hover {
  background: #1565c0;
}

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
}

.lightbox-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.lightbox-info {
  background: white;
  padding: 16px;
  border-radius: 0 0 8px 8px;
}

.lightbox-info h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.lightbox-info p {
  margin: 0 0 12px 0;
  color: #666;
}

.lightbox-meta {
  font-size: 12px;
  color: #999;
}

/* Empty and Loading States */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #666;
}

.empty-icon {
  font-size: 80px;
  color: #ccc;
  margin-bottom: 24px;
}

.empty-state h3 {
  margin: 0 0 12px 0;
  font-size: 24px;
  color: #333;
}

.empty-state p {
  margin: 0 0 24px 0;
  font-size: 16px;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1976d2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Toast Styles */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  max-width: 400px;
  border-left: 4px solid;
}

.toast.success {
  border-left-color: #4caf50;
}

.toast.error {
  border-left-color: #f44336;
}

.toast-icon {
  font-size: 20px;
}

.toast.success .toast-icon {
  color: #4caf50;
}

.toast.error .toast-icon {
  color: #f44336;
}

.toast-content {
  flex: 1;
}

.toast-content h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.toast-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
}

.toast-close:hover {
  color: #333;
}

/* Form Styles */
.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1976d2;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.edit-photo-preview {
  text-align: center;
  margin-bottom: 20px;
}

.edit-photo-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
}

/* Button Styles */
.btn-primary {
  background: #1976d2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #1565c0;
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.spin {
  animation: spin 1s linear infinite;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content.large {
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 4px;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Responsive Design */
@media (max-width: 768px) {
  .gallery-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .header-actions {
    align-self: flex-start;
  }
  
  .photos-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>