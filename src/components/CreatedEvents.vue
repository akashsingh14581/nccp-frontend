<template>
  <div class="events-list-container">
    <!-- Header -->
    <div class="gallery-header">
      <div class="header-content">
        <h1>All Events</h1>
        <p>Manage your events and their photos</p>
      </div>
      <div class="header-actions">
        <router-link to="/create-event" class="btn-primary">
          <i class="bi bi-plus-circle"></i>
          Create New Event
        </router-link>
      </div>
    </div>

    <!-- Events Grid -->
    <div class="events-grid">
      <div v-for="event in events" :key="event._id" class="event-card">
        <div class="event-card-image" @click="viewEventImages(event._id)">
          <img v-if="event.coverImage" :src="getImageUrl(event.coverImage)" :alt="event.eventName" />
          <div v-else class="no-image-placeholder">
            <i class="bi bi-images"></i>
            <span>No photos yet</span>
          </div>
          <div class="photo-count-badge">
            <i class="bi bi-camera-fill"></i>
            {{ event.photoCount || 0 }}
          </div>
        </div>
        <div class="event-card-content">
          <h4>{{ event.eventName }}</h4>
          <p class="event-title">{{ event.title }}</p>
          <p class="event-description">{{ event.description }}</p>
          <div class="event-meta">
            <span class="event-year">
              <i class="bi bi-calendar"></i>
              {{ event.year }}
            </span>
            <span class="event-organizers">
              <i class="bi bi-people"></i>
              {{ event.organizers ? event.organizers.length : 0 }} organizers
            </span>
          </div>
          <div class="event-dates">
            <span class="created-date">
              Created: {{ formatDate(event.createdAt) }}
            </span>
          </div>
        </div>
        <div class="event-card-actions">
          <button class="btn-view-images" @click="viewEventImages(event._id)">
            <i class="bi bi-grid-3x3-gap"></i>
            View Images ({{ event.photoCount || 0 }})
          </button>
          <div class="action-buttons">
            <button class="btn-edit" @click="editEvent(event)">
              <i class="bi bi-pencil"></i>
              Edit
            </button>
            <button class="btn-delete" @click="deleteEvent(event._id)">
              <i class="bi bi-trash"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="events.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="bi bi-calendar-event"></i>
      </div>
      <h3>No Events Yet</h3>
      <p>Create your first event to get started</p>
      <router-link to="/create-event" class="btn-primary">
        <i class="bi bi-plus-circle"></i>
        Create Your First Event
      </router-link>
    </div>

    <!-- Edit Event Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click="showEditModal = false">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h3>Edit Event</h3>
          <button class="close-btn" @click="showEditModal = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateEvent" class="event-form">
            <div class="form-section">
              <h3 class="section-title">Event Information</h3>
              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="editEventName">Event Name *</label>
                  <input id="editEventName" type="text" v-model="editingEvent.eventName"
                    placeholder="Enter event name" required />
                </div>

                <div class="form-group full-width">
                  <label for="editTitle">Title *</label>
                  <input id="editTitle" type="text" v-model="editingEvent.title"
                    placeholder="Enter event title" required />
                </div>

                <div class="form-group full-width">
                  <label for="editDescription">Description *</label>
                  <textarea id="editDescription" v-model="editingEvent.description"
                    placeholder="Enter event description" required rows="3"></textarea>
                </div>

                <div class="form-group">
                  <label for="editYear">Year *</label>
                  <input id="editYear" type="number" v-model="editingEvent.year" 
                    placeholder="2024" min="2000" max="2030" required />
                </div>
              </div>
            </div>

            <!-- Organizers Section -->
            <div class="form-section">
              <div class="section-header">
                <h3 class="section-title">Organizers</h3>
                <div class="organizer-stats">
                  <span class="organizer-count">{{ editingEvent.organizers.length }} organizers</span>
                  <button type="button" @click="addOrganizer" class="btn-add-organizer">
                    <i class="bi bi-plus-circle"></i>
                    Add Organizer
                  </button>
                </div>
              </div>

              <div class="organizers-list">
                <div v-for="(organizer, index) in editingEvent.organizers" :key="index" class="organizer-card">
                  <div class="organizer-card-header">
                    <div class="organizer-title">
                      <i class="bi bi-person-gear"></i>
                      Organizer #{{ index + 1 }}
                    </div>
                    <button type="button" @click="removeOrganizer(index)"
                      class="btn-remove-organizer" :disabled="editingEvent.organizers.length === 1">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="organizer-fields">
                    <div class="form-group">
                      <label>Name *</label>
                      <input type="text" v-model="organizer.name" placeholder="Organizer name" required />
                    </div>
                    <div class="form-group">
                      <label>Role</label>
                      <input type="text" v-model="organizer.role" placeholder="Role (optional)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-secondary" @click="showEditModal = false">Cancel</button>
              <button type="submit" class="btn-primary" :disabled="updating">
                <i class="bi" :class="updating ? 'bi-arrow-repeat spin' : 'bi-check-circle'"></i>
                {{ updating ? "Updating..." : "Update Event" }}
              </button>
            </div>
          </form>
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
import { getAllEvents, updateEvent, deleteEvent, getPhotosByEvent } from "./eventAPI";

export default {
  name: "EventsList",
  data() {
    return {
      events: [],
      showEditModal: false,
      updating: false,
      editingEvent: {
        eventName: "",
        title: "",
        description: "",
        year: "",
        organizers: []
      },
      showSuccess: false,
      showError: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  async mounted() {
    await this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await getAllEvents();
        this.events = response.data.events || response.data;
        
        // Fetch photo count for each event
        for (let event of this.events) {
          try {
            const photosResponse = await getPhotosByEvent(event._id);
            event.photoCount = photosResponse.data.length;
            // Set cover image as first photo if available
            if (photosResponse.data.length > 0) {
              event.coverImage = photosResponse.data[0].imageUrl;
            }
          } catch (error) {
            console.error(`Error fetching photos for event ${event._id}:`, error);
            event.photoCount = 0;
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        this.showErrorToast("Failed to load events");
      }
    },

    viewEventImages(eventId) {
      this.$router.push(`/event-images/${eventId}`);
    },

    editEvent(event) {
      this.editingEvent = JSON.parse(JSON.stringify(event));
      this.showEditModal = true;
    },

    async updateEvent() {
      this.updating = true;
      try {
        await updateEvent(this.editingEvent._id, this.editingEvent);
        this.showSuccessToast("Event updated successfully");
        this.showEditModal = false;
        await this.fetchEvents();
      } catch (error) {
        console.error('Error updating event:', error);
        this.showErrorToast("Failed to update event");
      } finally {
        this.updating = false;
      }
    },

    async deleteEvent(eventId) {
      if (!confirm("Are you sure you want to delete this event? This will also delete all associated photos.")) {
        return;
      }

      try {
        await deleteEvent(eventId);
        this.showSuccessToast("Event deleted successfully");
        await this.fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        this.showErrorToast("Failed to delete event");
      }
    },

    addOrganizer() {
      this.editingEvent.organizers.push({ name: "", role: "" });
    },

    removeOrganizer(index) {
      if (this.editingEvent.organizers.length === 1) {
        this.showErrorToast("At least one organizer is required");
        return;
      }
      this.editingEvent.organizers.splice(index, 1);
    },

    getImageUrl(imagePath) {
      if (!imagePath) return '';
      return imagePath.startsWith('http') ? imagePath : `http://localhost:3000${imagePath}`;
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
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
.events-list-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.event-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.event-card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.event-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.event-card:hover .event-card-image img {
  transform: scale(1.05);
}

.no-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #666;
}

.no-image-placeholder i {
  font-size: 48px;
  margin-bottom: 10px;
  opacity: 0.7;
}

.photo-count-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
}

.event-card-content {
  padding: 20px;
}

.event-card-content h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.event-title {
  font-weight: 600;
  color: #1976d2;
  margin: 0 0 12px 0;
  font-size: 14px;
}

.event-description {
  color: #666;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.event-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.event-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.event-dates {
  font-size: 12px;
  color: #999;
}

.event-card-actions {
  padding: 0 20px 20px 20px;
}

.btn-view-images {
  width: 100%;
  padding: 12px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
  margin-bottom: 12px;
  font-weight: 500;
}

.btn-view-images:hover {
  background: #1565c0;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 10px;
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
  transform: translateY(-1px);
}

.btn-delete {
  background-color: #ffebee;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
}

.btn-delete:hover {
  background-color: #ffcdd2;
  transform: translateY(-1px);
}

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
  max-width: 800px;
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

/* Form Styles (reused from create event) */
.form-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group.full-width {
  grid-column: 1 / -1;
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
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1976d2;
}

.organizer-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.organizer-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.organizer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #333;
}

.btn-remove-organizer {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.btn-remove-organizer:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.organizer-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn-add-organizer {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>