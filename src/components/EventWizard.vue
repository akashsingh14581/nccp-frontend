<template>
  <div class="event-creation-container">
    <!-- Header Section -->
    <div class="upload-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="bi bi-calendar-event"></i>
        </div>
        <div class="header-text">
          <h1>Create New Event</h1>
          <p>Create your event and upload photos all in one place</p>
        </div>
      </div>
      <div class="header-actions">
        <div class="step-indicator">
          <div class="step" :class="{ 'active': currentStep === 1, 'completed': currentStep > 1 }">
            <span class="step-number">1</span>
            <span class="step-label">Event Details</span>
          </div>
          <div class="step-connector"></div>
          <div class="step" :class="{ 'active': currentStep === 2, 'completed': eventCreated }">
            <span class="step-number">2</span>
            <span class="step-label">Upload Photos</span>
          </div>
        </div>
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

    <!-- Progress Bar -->
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressWidth }"></div>
      </div>
      <div class="progress-text">
        {{ progressText }}
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="main-content-grid">
      <!-- Left Column - Event Form -->
      <div class="event-form-section" :class="{ 'collapsed': currentStep === 2 }">
        <div class="form-card">
          <div class="form-header">
            <h2>Event Details</h2>
            <p>Fill in the event information and organizers details</p>
          </div>

          <form @submit.prevent="submitEventForm" class="event-form">
            <!-- Event Details -->
            <div class="form-section">
              <h3 class="section-title">Event Information</h3>
              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="eventName">Event Name *</label>
                  <input id="eventName" type="text" v-model="event.eventName"
                    placeholder="Enter event name" required
                    :class="{ 'error': !event.eventName && formSubmitted }" />
                  <span class="error-message" v-if="!event.eventName && formSubmitted">Event name is required</span>
                </div>

                <div class="form-group full-width">
                  <label for="title">Title *</label>
                  <input id="title" type="text" v-model="event.title"
                    placeholder="Enter event title" required
                    :class="{ 'error': !event.title && formSubmitted }" />
                  <span class="error-message" v-if="!event.title && formSubmitted">Title is required</span>
                </div>

                <div class="form-group full-width">
                  <label for="description">Description *</label>
                  <textarea id="description" v-model="event.description"
                    placeholder="Enter event description" required rows="3"
                    :class="{ 'error': !event.description && formSubmitted }"></textarea>
                  <span class="error-message" v-if="!event.description && formSubmitted">Description is required</span>
                </div>

                <div class="form-group">
                  <label for="year">Year *</label>
                  <input id="year" type="number" v-model="event.year" 
                    placeholder="2024" min="2000" max="2030" required
                    :class="{ 'error': !event.year && formSubmitted }" />
                  <span class="error-message" v-if="!event.year && formSubmitted">Year is required</span>
                </div>
              </div>
            </div>

            <!-- Organizers Section -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">Organizers</h3>
                <div class="organizer-stats">
                  <span class="organizer-count">{{ event.organizers.length }} organizers</span>
                  <button type="button" @click="addOrganizer" class="btn-add-organizer">
                    <i class="bi bi-plus-circle"></i>
                    Add Organizer
                  </button>
                </div>
              </div>

              <div class="organizers-list">
                <div v-for="(organizer, index) in event.organizers" :key="index" class="organizer-card">
                  <div class="organizer-card-header">
                    <div class="organizer-title">
                      <i class="bi bi-person-gear"></i>
                      Organizer #{{ index + 1 }}
                    </div>
                    <button type="button" @click="removeOrganizer(index)"
                      class="btn-remove-organizer" :disabled="event.organizers.length === 1">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="organizer-fields">
                    <div class="form-group">
                      <label>Name *</label>
                      <input type="text" v-model="organizer.name" placeholder="Organizer name"
                        required :class="{ 'error': !organizer.name && formSubmitted }" />
                      <span class="error-message" v-if="!organizer.name && formSubmitted">Name is required</span>
                    </div>
                    <div class="form-group">
                      <label>Role*</label>
                      <input type="text" required v-model="organizer.role" placeholder="Role (optional)" />
                    </div>
                  </div>
                </div>

                <!-- Add Organizer Button -->
                <button type="button" @click="addOrganizer" class="btn-add-organizer-large">
                  <i class="bi bi-plus-lg"></i>
                  Add Another Organizer
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="form-actions">
              <button type="button" @click="resetForm" class="btn-secondary" :disabled="loading">
                <i class="bi bi-x-circle"></i>
                Cancel
              </button>
              <button type="submit" class="btn-primary" :disabled="loading">
                <i class="bi" :class="loading ? 'bi-arrow-repeat spin' : 'bi-check-circle'"></i>
                {{ loading ? "Creating Event..." : "Create Event & Continue" }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column - Photo Upload -->
      <div class="photo-upload-section" :class="{ 'expanded': eventCreated }">
        <div class="form-card">
          <div class="form-header">
            <h2>Event Photos</h2>
            <p>Upload photos to showcase your event</p>
            <div class="event-badge" v-if="eventCreated">
              <i class="bi bi-check-circle"></i>
              Event Created Successfully
            </div>
          </div>

          <!-- Upload Area -->
          <div class="upload-section">
            <div class="file-upload-area" 
                 @click="triggerFileInput" 
                 @drop="handleImageDrop"
                 @dragover="handleImageDragOver"
                 :class="{ 'disabled': !eventCreated }">
              <input type="file" ref="imageInput" @change="handleImageUpload" 
                     accept="image/*" multiple class="file-input" 
                     :disabled="!eventCreated" />
              <div class="upload-content">
                <div class="upload-icon">
                  <i class="bi bi-cloud-arrow-up"></i>
                </div>
                <div class="upload-text">
                  <h4 v-if="!eventCreated">Create Event First</h4>
                  <h4 v-else>Drop images here</h4>
                  <p v-if="!eventCreated">Please create the event first to upload photos</p>
                  <p v-else>or click to browse files (Max 10MB per image)</p>
                  <p class="file-types">Supported: JPG, PNG, WebP</p>
                </div>
              </div>
            </div>

            <!-- Selected Files Preview -->
            <div v-if="selectedFiles.length > 0" class="selected-files">
              <h4>Selected Files ({{ selectedFiles.length }})</h4>
              <div class="files-list">
                <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
                  <div class="file-preview">
                    <img :src="getPreviewUrl(file)" alt="Preview" />
                  </div>
                  <div class="file-info">
                    <div class="file-name">{{ file.name }}</div>
                    <div class="file-size">{{ formatFileSize(file.size) }}</div>
                  </div>
                  <button @click="removeSelectedFile(index)" class="btn-remove-file">
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
                           :class="{ 'error': !photoDetails.title && photoFormSubmitted }" />
                    <span class="error-message" v-if="!photoDetails.title && photoFormSubmitted">Photo title is required</span>
                  </div>
                  <div class="form-group full-width">
                    <label>Description</label>
                    <textarea v-model="photoDetails.description" 
                              placeholder="Enter photo description" rows="2"></textarea>
                  </div>
                </div>
              </div>

              <!-- Upload Button -->
              <button class="btn-upload-photos" @click="uploadPhotos" 
                      :disabled="!canUploadPhotos || uploading">
                <i class="bi" :class="uploading ? 'bi-arrow-repeat spin' : 'bi-cloud-arrow-up'"></i>
                {{ uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photos` }}
              </button>
            </div>
          </div>

          <!-- Uploaded Photos Gallery -->
          <div v-if="uploadedPhotos.length > 0" class="photos-gallery">
            <div class="gallery-header">
              <h3>Uploaded Photos ({{ uploadedPhotos.length }})</h3>
              <button @click="clearUploadedPhotos" class="btn-clear-gallery">
                <i class="bi bi-trash"></i>
                Clear All
              </button>
            </div>
            <div class="gallery-grid">
              <div v-for="(photo, index) in uploadedPhotos" :key="index" class="gallery-item">
                <img :src="getImageUrl(photo.imageUrl)" :alt="photo.title" />
                <div class="photo-overlay">
                  <div class="photo-info">
                    <h5>{{ photo.title }}</h5>
                    <p v-if="photo.description">{{ photo.description }}</p>
                  </div>
                  <button @click="deletePhoto(photo._id)" class="btn-delete-photo">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Completion Section -->
          <div v-if="eventCreated && uploadedPhotos.length > 0" class="completion-section">
            <div class="completion-card">
              <div class="completion-icon">
                <i class="bi bi-check-circle"></i>
              </div>
              <div class="completion-content">
                <h3>Event Created Successfully!</h3>
                <p>Your event has been created with {{ uploadedPhotos.length }} photos.</p>
                <div class="completion-actions">
                  <button @click="createAnotherEvent" class="btn-secondary">
                    <i class="bi bi-plus-circle"></i>
                    Create Another Event
                  </button>
                  <button @click="viewEvent" class="btn-primary">
                    <i class="bi bi-eye"></i>
                    View Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Modal -->
    <div v-if="showHelp" class="modal-overlay" @click="showHelp = false">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h3>Event Creation Guide</h3>
          <button class="close-btn" @click="showHelp = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="guide-section">
            <h4><i class="bi bi-info-circle"></i> Event Details</h4>
            <p>Fill in all the required event information:</p>
            <ul>
              <li><strong>Event Name:</strong> The main title of your event</li>
              <li><strong>Title:</strong> A subheading or tagline</li>
              <li><strong>Description:</strong> Detailed information about the event</li>
              <li><strong>Year:</strong> The year the event takes place (e.g., 2024)</li>
              <li><strong>Organizers:</strong> Add at least one organizer with name</li>
            </ul>
          </div>

          <div class="guide-section">
            <h4><i class="bi bi-images"></i> Photo Upload</h4>
            <p>After creating the event, upload photos:</p>
            <ul>
              <li>Supported formats: JPG, PNG, WebP</li>
              <li>Maximum file size: 10MB per image</li>
              <li>You can upload multiple photos at once</li>
              <li>Add titles and descriptions for each photo</li>
              <li>Photos will be displayed in the event gallery</li>
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
import { createEvent, uploadPhoto, getPhotosByEvent } from "./eventAPI";

export default {
  name: "EventCreationSinglePage",
  data() {
    return {
      currentStep: 1,
      eventCreated: false,
      eventId: null,
      loading: false,
      uploading: false,
      showHelp: false,
      showSuccess: false,
      showError: false,
      successMessage: '',
      errorMessage: '',
      formSubmitted: false,
      photoFormSubmitted: false,
      
      event: {
        eventName: "",
        title: "", // Changed from eventTitle
        description: "", // Changed from eventDescription
        year: "", // Changed from eventDate to year (number)
        organizers: [{ name: "", role: "" }],
      },
      
      selectedFiles: [],
      uploadedPhotos: [],
      photoDetails: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    progressWidth() {
      if (!this.eventCreated) return '50%';
      return this.uploadedPhotos.length > 0 ? '100%' : '75%';
    },
    progressText() {
      if (!this.eventCreated) return 'Step 1 of 2 - Event Details';
      if (this.uploadedPhotos.length === 0) return 'Step 2 of 2 - Upload Photos';
      return 'Complete - Event Created with Photos';
    },
    canUploadPhotos() {
      return this.eventCreated && 
             this.selectedFiles.length > 0 && 
             this.photoDetails.title.trim().length > 0;
    },
    isFormValid() {
      return (
        this.event.eventName.trim().length > 0 &&
        this.event.title.trim().length > 0 && // Updated field
        this.event.description.trim().length > 0 && // Updated field
        this.event.year && // Updated field
        this.event.organizers.every(org => org.name.trim())
      );
    }
  },
  methods: {
    // Event Form Methods
    async submitEventForm() {
      this.formSubmitted = true;
      
      if (!this.isFormValid) {
        this.showErrorToast("Please fill all required fields");
        return;
      }

      this.loading = true;
      try {
        const eventData = {
          eventName: this.event.eventName.trim(),
          title: this.event.title.trim(), // Updated field name
          description: this.event.description.trim(), // Updated field name
          year: parseInt(this.event.year), // Convert to number
          organizers: this.event.organizers.map(org => ({
            name: org.name.trim(),
            role: org.role ? org.role.trim() : "",
          }))
        };

        console.log('Sending event data:', eventData); // Debug log

        const response = await createEvent(eventData);
        this.eventId = response.data.event._id; // Updated response path
        this.eventCreated = true;
        this.currentStep = 2;
        this.showSuccessToast("Event created successfully! You can now upload photos.");
        
        // Fetch any existing photos
        await this.fetchPhotos();
      } catch (error) {
        console.error('Error creating event:', error);
        if (error.response && error.response.data) {
          this.showErrorToast(error.response.data.message || "Failed to create event");
        } else {
          this.showErrorToast("Failed to create event. Please check all fields.");
        }
      } finally {
        this.loading = false;
      }
    },

    addOrganizer() {
      this.event.organizers.push({ name: "", role: ""});
    },

    removeOrganizer(index) {
      if (this.event.organizers.length === 1) {
        this.showErrorToast("At least one organizer is required");
        return;
      }
      this.event.organizers.splice(index, 1);
    },

    resetForm() {
      this.event = {
        eventName: "",
        title: "", // Updated field
        description: "", // Updated field
        year: "", // Updated field
        organizers: [{ name: "", role: ""}],
      };
      this.formSubmitted = false;
      this.photoFormSubmitted = false;
      this.eventCreated = false;
      this.eventId = null;
      this.currentStep = 1;
      this.selectedFiles = [];
      this.uploadedPhotos = [];
      this.photoDetails = { title: "", description: "" };
    },

    // Photo Upload Methods
    triggerFileInput() {
      if (this.eventCreated) {
        this.$refs.imageInput.click();
      }
    },

    handleImageDragOver(event) {
      if (!this.eventCreated) return;
      event.preventDefault();
      event.currentTarget.classList.add('drag-over');
    },

    handleImageDrop(event) {
      if (!this.eventCreated) return;
      event.preventDefault();
      event.currentTarget.classList.remove('drag-over');
      const files = Array.from(event.dataTransfer.files);
      this.handleImageFiles(files);
    },

    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      this.handleImageFiles(files);
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

    async uploadPhotos() {
      this.photoFormSubmitted = true;
      
      if (!this.canUploadPhotos) {
        this.showErrorToast("Please provide a title for the photos");
        return;
      }

      this.uploading = true;
      try {
        for (const file of this.selectedFiles) {
          const formData = new FormData();
          formData.append("eventId", this.eventId);
          formData.append("title", this.photoDetails.title);
          formData.append("description", this.photoDetails.description);
          formData.append("photo", file);

          console.log('Uploading photo for event:', this.eventId); // Debug log

          await uploadPhoto(formData);
        }

        this.showSuccessToast(`Successfully uploaded ${this.selectedFiles.length} photos`);
        this.selectedFiles = [];
        this.photoDetails = { title: "", description: "" };
        this.photoFormSubmitted = false;
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
      }
    },

    async fetchPhotos() {
      if (!this.eventId) return;
      
      try {
        const res = await getPhotosByEvent(this.eventId);
        this.uploadedPhotos = res.data;
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    },

    async deletePhoto(photoId) {
      try {
        // You'll need to implement deletePhoto in your API
        // await deletePhoto(photoId);
        console.log(photoId)
        this.showSuccessToast("Photo deleted successfully");
        await this.fetchPhotos();
      } catch (error) {
        this.showErrorToast("Failed to delete photo");
      }
    },

    clearUploadedPhotos() {
      this.uploadedPhotos = [];
    },

    createAnotherEvent() {
      this.resetForm();
    },

    viewEvent() {
      // Navigate to event view page
      window.location.href = `/events/${this.eventId}`;
    },

    // Utility Methods
    getImageUrl(imagePath) {
      return imagePath.startsWith('http') ? imagePath : `http://localhost:3000${imagePath}`;
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    goToDashboard() {
      window.location.href = "/admin_dashboard";
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
/* Base container styles */
.event-creation-container {
  max-width: 1400px;
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

.header-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

/* Step Indicator */
.step-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: white;
  color: #667eea;
  border-color: white;
}

.step.completed .step-number {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.step.active .step-label {
  color: white;
  font-weight: 600;
}

.step-connector {
  width: 60px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 0.5rem;
}

/* Buttons */
.btn-help,
.btn-back {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  border: none;
}

.btn-help {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
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

/* Progress Bar */
.progress-container {
  margin-bottom: 2rem;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.5s ease;
  border-radius: 4px;
}

.progress-text {
  text-align: center;
  color: #64748b;
  font-weight: 500;
}

/* Main Content Grid */
.main-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* Form Cards */
.form-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.form-header {
  margin-bottom: 2rem;
  position: relative;
}

.form-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #64748b;
  margin: 0;
}

.event-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #dcfce7;
  color: #166534;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Form Sections */
.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Organizers Section */
.organizer-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.organizer-count {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.organizers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.organizer-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
}

.organizer-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.organizer-title {
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.organizer-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.organizer-fields .form-group:first-child {
  grid-column: 1 / -1;
}

/* Buttons */
.btn-add-organizer,
.btn-add-organizer-large {
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

.btn-add-organizer {
  background: #f0f9ff;
  color: #0369a1;
  border: 1px solid #bae6fd;
}

.btn-add-organizer:hover {
  background: #bae6fd;
}

.btn-add-organizer-large {
  width: 100%;
  background: #f8fafc;
  color: #64748b;
  border: 2px dashed #cbd5e1;
  padding: 1.5rem;
  font-size: 1rem;
  justify-content: center;
}

.btn-add-organizer-large:hover {
  background: #f1f5f9;
  border-color: #6366f1;
  color: #6366f1;
}

.btn-remove-organizer {
  background: #fef2f2;
  color: #dc2626;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-remove-organizer:hover:not(:disabled) {
  background: #fecaca;
}

.btn-remove-organizer:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

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

/* Photo Upload Section */
.upload-section {
  margin-bottom: 2rem;
}

.file-upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.file-upload-area:hover:not(.disabled) {
  border-color: #667eea;
  background: #f0f9ff;
}

.file-upload-area.drag-over {
  border-color: #667eea;
  background: #f0f9ff;
}

.file-upload-area.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.file-upload-area.disabled:hover {
  border-color: #cbd5e1;
  background: white;
}

.upload-content {
  transition: all 0.3s ease;
}

.upload-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.file-upload-area.disabled .upload-icon {
  color: #94a3b8;
}

.upload-text h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.upload-text p {
  color: #64748b;
  margin-bottom: 0.25rem;
}

.file-types {
  font-size: 0.875rem;
  color: #94a3b8;
}

.file-input {
  display: none;
}

/* Selected Files */
.selected-files {
  margin-top: 2rem;
}

.selected-files h4 {
  color: #374151;
  margin-bottom: 1rem;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.file-preview {
  width: 60px;
  height: 60px;
  border-radius: 6px;
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
  color: #374151;
  margin-bottom: 0.25rem;
}

.file-size {
  font-size: 0.875rem;
  color: #64748b;
}

.btn-remove-file {
  background: #fef2f2;
  color: #dc2626;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-remove-file:hover {
  background: #fecaca;
}

/* Photo Details Form */
.photo-details-form {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.photo-details-form h4 {
  color: #374151;
  margin-bottom: 1rem;
}

/* Upload Button */
.btn-upload-photos {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.btn-upload-photos:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(16, 185, 129, 0.4);
}

.btn-upload-photos:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Photos Gallery */
.photos-gallery {
  margin-top: 2rem;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.gallery-header h3 {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
}

.btn-clear-gallery {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-clear-gallery:hover {
  background: #fecaca;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid #e2e8f0;
}

.gallery-item img {
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
  background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.7));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .photo-overlay {
  opacity: 1;
}

.photo-info {
  color: white;
}

.photo-info h5 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.photo-info p {
  font-size: 0.75rem;
  opacity: 0.9;
  margin: 0;
}

.btn-delete-photo {
  align-self: flex-end;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.btn-delete-photo:hover {
  background: #dc2626;
}

/* Completion Section */
.completion-section {
  margin-top: 2rem;
}

.completion-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.completion-icon {
  font-size: 3rem;
  color: #0369a1;
  margin-bottom: 1rem;
}

.completion-content h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.completion-content p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Modal Styles */
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
  animation: modalSlideIn 0.3s ease;
}

.modal-content.large {
  max-width: 700px;
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
  margin: 0;
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

.guide-section {
  margin-bottom: 2rem;
}

.guide-section h4 {
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.guide-section ul {
  color: #6b7280;
  padding-left: 1.5rem;
}

.guide-section li {
  margin-bottom: 0.5rem;
}

/* Toast Styles */
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
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

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
@media (max-width: 1024px) {
  .main-content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .event-creation-container {
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

  .header-actions {
    align-items: center;
    width: 100%;
  }

  .step-indicator {
    width: 100%;
    justify-content: center;
  }

  .form-card {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .organizer-fields {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .completion-actions {
    flex-direction: column;
  }

  .file-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .toast {
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .form-card {
    padding: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}


.edit-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #fef3c7;
  color: #d97706;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.gallery-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-reorder {
  background: #f0f9ff;
  color: #0369a1;
  border: 1px solid #bae6fd;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-reorder:hover,
.btn-reorder.active {
  background: #bae6fd;
}

.reorder-instructions {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0369a1;
  font-size: 0.875rem;
}

.gallery-grid.reordering {
  cursor: grab;
}

.gallery-item.reordering {
  cursor: grab;
}

.gallery-item.reordering:active {
  cursor: grabbing;
}

.draggable-grid {
  display: contents;
}

.photo-actions {
  display: flex;
  gap: 0.25rem;
}

.btn-drag-handle {
  background: rgba(255, 255, 255, 0.9);
  color: #64748b;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-drag-handle:hover {
  background: white;
  color: #374151;
}

.btn-edit-photo {
  background: rgba(255, 255, 255, 0.9);
  color: #0369a1;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-edit-photo:hover {
  background: white;
  color: #1d4ed8;
}

.cover-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 193, 7, 0.95);
  color: #000;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.photo-meta {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.photo-meta small {
  opacity: 0.8;
  font-size: 0.75rem;
}

.photo-preview {
  text-align: center;
  margin-bottom: 1.5rem;
}

.photo-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

</style>