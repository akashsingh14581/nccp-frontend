<template>
  <div class="admin-dashboard">
    <!-- Modern Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo" v-if="!isSidebarCollapsed">
          <div class="logo-icon">
            <i class="bi bi-shield-check"></i>
          </div>
          <div class="logo-text">
            <span class="brand">NCCP</span>
            <span class="subtitle">Admin Panel</span>
          </div>
        </div>
        <div class="logo" v-else>
          <div class="logo-icon">
            <i class="bi bi-shield-check"></i>
          </div>
        </div>
        <button class="sidebar-toggle" @click="toggleSidebar">
          <i
            class="bi"
            :class="isSidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"
          ></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-label" v-if="!isSidebarCollapsed">Main</div>
          <button
            @click="setActiveTab('dashboard')"
            :class="['nav-item', { active: activetab === 'dashboard' }]"
            :data-tooltip="isSidebarCollapsed ? 'Dashboard' : ''"
          >
            <div class="nav-icon">
              <i class="bi bi-grid-1x2"></i>
            </div>
            <span class="nav-text" v-if="!isSidebarCollapsed">Dashboard</span>
            <div
              class="nav-badge"
              v-if="!isSidebarCollapsed && (totalSubscribers || totalContactQuery)"
            >
              <span class="badge">{{
                (totalSubscribers || 0) + (totalContactQuery || 0)
              }}</span>
            </div>
          </button>
        </div>

        <div class="nav-section">
          <div class="nav-label" v-if="!isSidebarCollapsed">Members Management</div>
          <button
            v-for="tab in memberTabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            :class="['nav-item', { active: activetab === tab.id }]"
            :data-tooltip="isSidebarCollapsed ? tab.name : ''"
          >
            <div class="nav-icon">
              <i :class="tab.icon"></i>
            </div>
            <span class="nav-text" v-if="!isSidebarCollapsed">{{ tab.name }}</span>
          </button>
        </div>

        <div class="nav-section">
          <div class="nav-label" v-if="!isSidebarCollapsed">Content & Communications</div>
          <button
            v-for="tab in contentTabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            :class="['nav-item', { active: activetab === tab.id }]"
            :data-tooltip="isSidebarCollapsed ? tab.name : ''"
          >
            <div class="nav-icon">
              <i :class="tab.icon"></i>
            </div>
            <span class="nav-text" v-if="!isSidebarCollapsed">{{ tab.name }}</span>
            <div
              class="nav-badge"
              v-if="!isSidebarCollapsed && getNotificationCount(tab.id)"
            >
              <span class="badge">{{ getNotificationCount(tab.id) }}</span>
            </div>
          </button>
        </div>
        <div class="nav-section">
          <div class="nav-label" v-if="!isSidebarCollapsed">Awards Management</div>
          <router-link to="/award" class="nav-item">
            <div class="nav-icon">
              <i class="fa-solid fa-award"></i>
            </div>
            <span class="nav-text" v-if="!isSidebarCollapsed"> Award Management </span>
          </router-link>
        </div>
        <div class="nav-section">
          <div class="nav-label" v-if="!isSidebarCollapsed">Event Management</div>
          <router-link to="/create-event" class="nav-item">
            <div class="nav-icon">
              <i class="fa-solid fa-calendar"></i>
            </div>
            <span class="nav-text" v-if="!isSidebarCollapsed"> Create Event </span>
          </router-link>
          <router-link to="/created-event" class="nav-item">
            <div class="nav-icon">
              <i class="fa-solid fa-calendar-days"></i>
            </div>
            <span class="nav-text" v-if="!isSidebarCollapsed"> Created Event </span>
          </router-link>
        </div>
      </nav>

      <div class="user-profile">
        <div class="user-avatar">
          <img
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2198"
            alt="User" loading="lazy"
          />
        </div>
        <div class="user-info" v-if="!isSidebarCollapsed">
          <div class="user-name">Admin G</div>
          <div class="user-role">Administrator</div>
        </div>
        <button
          class="logout-btn"
          @click="logout"
          v-if="!isSidebarCollapsed"
          title="Logout"
        >
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ expanded: isSidebarCollapsed }">
      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <div class="breadcrumb">
            <span class="page-title">{{ getPageTitle(activetab) }}</span>
          </div>
        </div>

        <div class="header-right">
          <div class="search-bar">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Search here..." class="search-input" />
          </div>

          <div class="header-actions">
            <div class="notifications">
              <div class="notification-icon" @click="setActiveTab('subscribers')">
                <i class="bi bi-bell-fill"></i>
                <span class="notification-badge" v-if="totalSubscribers !== null">
                  {{ totalSubscribers }}
                </span>
              </div>
              <div class="notification-icon" @click="setActiveTab('contact_query')">
                <i class="bi bi-envelope-arrow-up-fill"></i>
                <span class="notification-badge" v-if="totalContactQuery !== null">
                  {{ totalContactQuery }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="content-area">
        <!-- Dashboard Overview -->
        <div v-show="activetab === 'dashboard'" class="dashboard-overview">
          <div class="welcome-banner">
            <div class="welcome-content">
              <h1>Welcome back, Admin! 👋</h1>
              <p>Here's what's happening with your NCCP admin panel today.</p>
            </div>
            <div class="welcome-actions">
              <button class="btn-primary" @click="setActiveTab('life_members')">
                <i class="bi bi-plus-circle"></i>
                Add New Member
              </button>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card" @click="setActiveTab('subscribers')">
              <div class="stat-icon subscribers">
                <i class="bi bi-people-fill"></i>
              </div>
              <div class="stat-info">
                <h3>{{ totalSubscribers || 0 }}</h3>
                <p>Total Subscribers</p>
                <span class="stat-trend positive">
                  <i class="bi bi-arrow-up"></i> 12%
                </span>
              </div>
            </div>

            <div class="stat-card" @click="setActiveTab('contact_query')">
              <div class="stat-icon queries">
                <i class="bi bi-chat-left-text-fill"></i>
              </div>
              <div class="stat-info">
                <h3>{{ totalContactQuery || 0 }}</h3>
                <p>Contact Queries</p>
                <span class="stat-trend negative">
                  <i class="bi bi-arrow-down"></i> 5%
                </span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon visitors">
                <i class="bi bi-graph-up-arrow"></i>
              </div>
              <div class="stat-info">
                <h3>2.4K</h3>
                <p>Website Visitors</p>
                <span class="stat-trend positive">
                  <i class="bi bi-arrow-up"></i> 18%
                </span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon members">
                <i class="bi bi-person-check-fill"></i>
              </div>
              <div class="stat-info">
                <h3>{{ lifeFellowMembers.length || 0 }}</h3>
                <p>Total Life Fellow Members</p>
                <span class="stat-trend positive">
                  <i class="bi bi-arrow-up"></i> 8%
                </span>
              </div>
            </div>
          </div>

          <div class="chart-section">
            <div class="chart-card">
              <CanvasJSChart :options="options" :styles="styleOptions" />
            </div>
          </div>
        </div>

        <!-- Members Sections -->
        <div
          v-show="
            [
              'honorary_members',
              'life_members',
              'ordinary_members',
              'life_fellow_members',
              'executive_members',
              'president_secretary_members',
            ].includes(activetab)
          "
          class="members-section"
        >
          <div class="section-header">
            <div class="section-title">
              <h2>{{ getSectionTitle(activetab) }}</h2>
              <p class="section-subtitle">
                {{ getSectionSubtitle(activetab) }}
              </p>
            </div>
            <div class="section-actions">
               <button class="btn-primary" @click="showExelFileUploadPage()">
                <i class="bi bi-plus-circle"></i>
                Import Excel File
              </button>
              <button class="btn-primary" @click="showToggleForm()">
                <i class="bi bi-plus-circle"></i>
                Add New Member
              </button>
           
              <button class="btn-secondary" @click="exportToExcel">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>

          <!-- Search and Filters -->
          <div class="search-filters">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by name or ID..."
                class="search-input"
              />
            </div>
          </div>

          <!-- Members Grid -->
          <div class="members-grid" v-if="currentMembers.length > 0">
            <div
              v-for="(member, index) in paginatedMembers"
              :key="member._id"
              class="member-card"
            >
              <div class="member-header">
                <div class="member-avatar">
                  <i class="bi bi-person-fill-check"></i>
                </div>
                <div class="member-actions-container">
                  <button
                    class="edit-btn"
                    @click="toggleEditMember(index)"
                    :class="{ editing: isEditingMember[index] }"
                  >
                    <i
                      class="bi"
                      :class="isEditingMember[index] ? 'bi-x-circle' : 'bi-pencil-square'"
                    ></i>
                    {{ isEditingMember[index] ? "Cancel" : "Edit" }}
                  </button>
                  <button
                    class="member-delete-action-btn"
                    @click="confirmDeleteMember(member._id, index)"
                    v-if="!isEditingMember[index]"
                  >
                    <i class="bi bi-trash"></i>
                    Delete
                  </button>
                </div>
              </div>

              <div class="member-info">
                <h4 class="member-name">{{ member.name }}</h4>
                <div class="member-id" v-if="member.id">ID: {{ member.id }}</div>

                <div v-if="!isEditingMember[index]" class="member-details">
                  <div class="detail-item" v-if="member.email">
                    <i class="bi bi-envelope"></i>
                    <span>{{ member.email }}</span>
                  </div>
                  <div class="detail-item" v-if="member.address">
                    <i class="bi bi-geo-alt"></i>
                    <span>{{ member.address }}</span>
                  </div>
                  <div class="detail-item" v-if="member.phone">
                    <i class="bi bi-telephone"></i>
                    <span>{{ member.phone }}</span>
                  </div>
                  <div class="detail-item" v-if="member.state">
                    <i class="bi bi-geo"></i>
                    <span>{{ member.state }}</span>
                  </div>
                  <div class="detail-item" v-if="member.status">
                    <i class="bi bi-info-circle"></i>
                    <span>Status: {{ member.status }}</span>
                  </div>
                </div>

                <div v-else class="edit-form">
                  <input
                    v-model="editMemberData[index].name"
                    placeholder="Name *"
                    class="edit-input"
                    required
                  />
                  <input
                    v-if="activetab !== 'executive_members'"
                    v-model="editMemberData[index].id"
                    placeholder="ID *"
                    class="edit-input"
                  />
                  <input
                    v-model="editMemberData[index].email"
                    placeholder="Email"
                    class="edit-input"
                    type="email"
                  />
                  <input
                    v-model="editMemberData[index].address"
                    placeholder="Address *"
                    class="edit-input"
                    required
                  />
                  <input
                    v-model="editMemberData[index].phone"
                    placeholder="Phone"
                    class="edit-input"
                  />
                  <input
                    v-if="activetab !== 'executive_members'"
                    v-model="editMemberData[index].state"
                    placeholder="State *"
                    class="edit-input"
                  />
                  <input
                    v-if="activetab !== 'executive_members'"
                    v-model="editMemberData[index].status"
                    placeholder="Status"
                    class="edit-input"
                  />

                  <div class="edit-actions">
                    <button
                      class="btn-primary save-btn"
                      @click="saveEditMember(index, member._id)"
                    >
                      <i class="bi bi-check-circle"></i>
                      Save Changes
                    </button>
                    <button class="btn-secondary" @click="toggleEditMember(index)">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Delete Confirmation Modal -->
          <div class="member-deletion-modal-overlay" v-if="showDeleteModal">
            <div class="member-deletion-modal-content">
              <div class="member-deletion-modal-header">
                <h3 class="member-deletion-modal-title">Confirm Deletion</h3>
                <button class="member-deletion-modal-close" @click="closeDeleteModal">
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <div class="member-deletion-modal-body">
                <p class="member-deletion-warning-text">
                  <i
                    class="bi bi-exclamation-triangle-fill member-deletion-warning-icon"
                  ></i>
                  Are you sure you want to delete
                  <strong>{{ memberToDelete?.name || "this member" }}</strong
                  >? This action cannot be undone.
                </p>
              </div>
              <div class="member-deletion-modal-actions">
                <button
                  class="member-deletion-confirm-btn"
                  @click="deleteMember"
                  :disabled="isDeleting"
                >
                  <i class="bi bi-trash"></i>
                  {{ isDeleting ? "Deleting..." : "Delete Member" }}
                </button>
                <button
                  class="member-deletion-cancel-btn"
                  @click="closeDeleteModal"
                  :disabled="isDeleting"
                >
                  <i class="bi bi-x-circle"></i>
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="currentMembers.length === 0" class="empty-state">
            <div class="empty-icon">
              <i class="bi bi-people"></i>
            </div>
            <h3>No Members Found</h3>
            <p>No members match your search criteria.</p>
            <button class="btn-primary" @click="clearSearch">
              <i class="bi bi-arrow-clockwise"></i>
              Clear Search
            </button>
          </div>

          <!-- Pagination -->
          <div class="pagination" v-if="totalPages > 1">
            <button
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="prevPage"
            >
              <i class="bi bi-chevron-left"></i>
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
              @click="nextPage"
            >
              Next
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>

          <div v-show="['honorary_members'].includes(activetab)">
            <!-- Overlay background -->
            <div
              v-if="HideNccpForm"
              class="hmf-overlay"
              @click="HideNccpForm = false"
            ></div>

            <!-- Form modal -->
            <div v-if="HideNccpForm" class="hmf-modal">
              <HonoraryMembersForm
                @honorMemberFormSubmit="closeHonoraryForm"
                @refreshHonorMembers="fetchHonoraryMemberData"
              />
            </div>
          </div>
          <div v-show="['life_members'].includes(activetab)">
            <!-- Overlay background -->
            <div
              v-if="HideLifeMembersForm"
              class="hmf-overlay"
              @click="HideLifeMembersForm = false"
            ></div>

            <!-- Form modal -->
            <div v-if="HideLifeMembersForm" class="hmf-modal">
              <LifeMembersForm
                @refreshLifeMembers="fetchLifeMembers"
                @closeLifeMembersForm="closeLifeMembersForm"
              />
            </div>
          </div>
          <div v-show="['life_fellow_members'].includes(activetab)">
            <!-- Overlay background -->
            <div
              v-if="HideLifeFellowMembersForm"
              class="hmf-overlay"
              @click="HideLifeFellowMembersForm = false"
            ></div>

            <!-- Form modal -->
            <div v-if="HideLifeFellowMembersForm" class="hmf-modal">
              <LifeFellowMembersForm
                @refreshLifeFellowMembers="fetchLifeFellowMembers"
                @closeLifeFellowMemberForm="closeLifeFellowForm"
              />
            </div>
          </div>
          <div v-show="['ordinary_members'].includes(activetab)">
            <!-- Overlay background -->
            <div
              v-if="HideOrdinaryMemberForm"
              class="hmf-overlay"
              @click="HideOrdinaryMemberForm = false"
            ></div>

            <!-- Form modal -->
            <div v-if="HideOrdinaryMemberForm" class="hmf-modal">
              <OrdinaryMemberForm
                @refreshOrdinaryMembers="fetchOrdinaryMembers"
                @closeOrdinaryMemberForm="closeOrdinaryMemberForm"
              />
            </div>
          </div>

          <div v-show="['executive_members'].includes(activetab)">
            <!-- Overlay background -->
            <div
              v-if="HideExecutiveMemberForm"
              class="hmf-overlay"
              @click="HideExecutiveMemberForm = false"
            ></div>

            <!-- Form modal -->
            <div v-if="HideExecutiveMemberForm" class="hmf-modal">
              <ExecutiveMembersForm
                @refreshExecutiveMembers="fetchExecutiveMemberData"
                @closeExecutiveMemberForm="closeExecutiveMemberForm"
              />
            </div>
          </div>
          <div v-show="['president_secretary_members'].includes(activetab)">
            <!-- Overlay background -->
            <div
              v-if="HidePresidentAndSecretaryMemberForm"
              class="hmf-overlay"
              @click="HidePresidentAndSecretaryMemberForm = false"
            ></div>

            <!-- Form modal -->
            <div v-if="HidePresidentAndSecretaryMemberForm" class="hmf-modal">
              <PresidentAndSecretaryForm
                @closePresidentAndSecretaryMemberForm="
                  closePresidentAndSecretaryMemberForm
                "
              />
            </div>
          </div>
        </div>

        <!-- Subscribers Section -->
        <div v-show="activetab === 'subscribers'" class="subscribers-section">
          <div class="section-header">
            <div class="section-title">
              <h2>Subscribers List</h2>
              <p>Manage your newsletter subscribers</p>
            </div>
            <div class="section-actions">
              <button class="btn-primary">
                <i class="bi bi-envelope-plus"></i>
                Send Newsletter
              </button>
              <button class="btn-secondary">
                <i class="bi bi-download"></i>
                Export List
              </button>
            </div>
          </div>

          <div class="subscribers-list" v-if="subscribersList.length">
            <div class="list-header">
              <div class="list-column">Email</div>
              <div class="list-column">Subscription Date</div>
              <div class="list-column">Location</div>
              <div class="list-column">Status</div>
            </div>

            <div
              v-for="subscriber in subscribersList"
              :key="subscriber.email"
              class="subscriber-item"
            >
              <div class="list-column">
                <div class="subscriber-email">
                  <i class="bi bi-envelope-fill"></i>
                  {{ subscriber.email }}
                </div>
              </div>
              <div class="list-column">
                <span class="subscriber-date">{{ subscriber.date }}</span>
                <small>{{ subscriber.time }}</small>
              </div>
              <div class="list-column">
                <span class="subscriber-location">{{
                  subscriber.location || "Unknown"
                }}</span>
              </div>
              <div class="list-column">
                <span class="status-badge active">Active</span>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
            <i class="bi bi-people"></i>
            <h3>No subscribers found</h3>
            <p>Your subscriber list is currently empty</p>
          </div>
        </div>

        <!-- Contact Query Section -->
        <div v-show="activetab === 'contact_query'" class="contact-query-section">
          <div class="section-header">
            <div class="section-title">
              <h2>Contact Queries</h2>
              <p>Review and manage contact form submissions</p>
            </div>
            <div class="section-actions">
              <button class="btn-primary">
                <i class="bi bi-reply-all"></i>
                Bulk Reply
              </button>
              <button class="btn-secondary">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>

          <div class="queries-grid">
            <div
              v-for="contactQuery in contactQueryList"
              :key="contactQuery._id"
              class="query-card"
            >
              <div class="query-header">
                <h4>{{ contactQuery.message }}</h4>
                <span class="query-date">Today</span>
              </div>

              <div class="query-details">
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value"
                    >{{ contactQuery.firstName }} {{ contactQuery.lastName }}</span
                  >
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">{{ contactQuery.email }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">{{ contactQuery.phoneNumber }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="contactQueryList.length === 0" class="empty-state">
            <i class="bi bi-chat-left"></i>
            <h3>No Contact Queries</h3>
            <p>No contact form submissions yet.</p>
          </div>
        </div>

        <!-- Gallery Section -->
        <div v-show="activetab === 'gallery'" class="gallery-section">
          <div class="section-header">
            <div class="section-title">
              <h2>Gallery Management</h2>
              <p>Upload and manage your gallery images</p>
            </div>
          </div>

          <!-- Upload Form -->
          <div class="upload-card">
            <h4>Upload New Image</h4>
            <form @submit.prevent="uploadPhoto" class="upload-form">
              <div class="file-upload">
                <input type="file" @change="onFileChange" required class="file-input" />
                <div class="upload-area">
                  <i class="bi bi-cloud-arrow-up"></i>
                  <p>Click to upload or drag and drop</p>
                  <span>PNG, JPG, WEBP up to 10MB</span>
                </div>
              </div>

              <!-- Title Field -->
              <div class="form-group">
                <label for="imageTitle">
                  Event Title
                  <span class="required">*</span>
                </label>
                <input
                  type="text"
                  id="imageTitle"
                  v-model="imageTitle"
                  placeholder="Enter event title..."
                  class="form-input"
                  required
                  maxlength="100"
                />
                <div class="char-counter">{{ imageTitle.length }}/100</div>
              </div>

              <!-- Year Field -->
              <div class="form-group">
                <label for="imageYear">
                  Event Year
                  <span class="required">*</span>
                </label>
                <select id="imageYear" v-model="imageYear" class="form-select" required>
                  <option value="">Select Year</option>
                  <option v-for="year in availableYears" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>

              <!-- Description Field -->
              <div class="form-group">
                <label for="imageDescription">
                  Image Description
                  <span class="optional">(Optional)</span>
                </label>
                <textarea
                  id="imageDescription"
                  v-model="imageDescription"
                  placeholder="Enter a description for this image..."
                  class="description-input"
                  rows="3"
                  maxlength="200"
                ></textarea>
                <div class="char-counter">{{ imageDescription.length }}/200</div>
              </div>

              <button
                type="submit"
                class="btn-primary upload-btn"
                :disabled="!selectedFile || !imageTitle || !imageYear"
              >
                <i class="bi bi-upload"></i>
                Upload Image
              </button>
            </form>
          </div>

          <!-- Gallery Grid -->
          <div class="gallery-grid">
            <div
              v-for="(item, index) in fetchedImagesData"
              :key="item._id"
              class="gallery-item"
            >
              <div class="image-container">
                <img
                  :src="imagePath + item.imageUrl"
                  alt="Gallery image"
                  class="gallery-image"
                  @click="openModal(index)"
                  loading="lazy"
                />
                <div class="gallery-overlay">
                  <button class="overlay-btn view" @click="openModal(index)">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="overlay-btn delete" @click.stop="deletePhoto(item._id)">
                    <i class="bi bi-trash"></i>
                  </button>
                  <button
                    class="overlay-btn edit"
                    @click.stop="openEditDetails(item, index)"
                    title="Edit details"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </div>
              </div>

              <!-- Info Display - Show title and year -->
              <div class="image-info">
                <div class="image-title">{{ item.title }}</div>
                <div class="image-year">{{ item.year }}</div>
                <div
                  v-if="activeDescriptionIndex === index"
                  class="image-description active"
                >
                  {{ item.description || "No description available" }}
                </div>
                <button
                  v-if="activeDescriptionIndex === index"
                  class="close-description-btn"
                  @click="closeDescription"
                  title="Close description"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Edit Details Modal -->
          <div
            v-if="showEditDetailsModal"
            class="modal-overlay edit-details-modal"
            @click="closeEditDetailsModal"
          >
            <div class="img-edit-modal-content details-modal" @click.stop>
              <!-- Header -->
              <div class="modal-header">
                <div class="header-content">
                  <div class="header-icon">
                    <i class="bi bi-pencil-square"></i>
                  </div>
                  <div class="header-text">
                    <h3>Edit Image Details</h3>
                    <p>Update event title, year, and description</p>
                  </div>
                </div>
                <button class="close-btn" @click="closeEditDetailsModal">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>

              <!-- Preview Section -->
              <div class="preview-section">
                <div class="preview-header">
                  <i class="bi bi-image"></i>
                  <span>Image Preview</span>
                </div>
                <div class="current-image-preview">
                  <img
                    :src="imagePath + editingImage.imageUrl"
                    alt="Preview"
                    class="preview-image"
                    loading="lazy"
                  />
                </div>
              </div>

              <!-- Form Section -->
              <div class="form-section">
                <!-- Title Field -->
                <div class="form-group">
                  <label for="editTitle" class="form-label">
                    <i class="bi bi-card-heading"></i>
                    Event Title
                    <span class="required">*</span>
                  </label>
                  <div class="input-container">
                    <input
                      type="text"
                      id="editTitle"
                      v-model="editingTitle"
                      placeholder="Enter event title..."
                      class="form-input"
                      required
                      maxlength="100"
                    />
                    <div class="input-actions">
                      <button
                        class="clear-btn"
                        @click="editingTitle = ''"
                        v-if="editingTitle"
                        type="button"
                      >
                        <i class="bi bi-x-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div class="input-footer">
                    <div class="char-counter">
                      {{ editingTitle.length }}/100 characters
                    </div>
                  </div>
                </div>

                <!-- Year Field -->
                <div class="form-group">
                  <label for="editYear" class="form-label">
                    <i class="bi bi-calendar"></i>
                    Event Year
                    <span class="required">*</span>
                  </label>
                  <select
                    id="editYear"
                    v-model="editingYear"
                    class="form-select"
                    required
                  >
                    <option value="">Select Year</option>
                    <option v-for="year in availableYears" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>

                <!-- Description Field -->
                <div class="form-group">
                  <label for="editDescription" class="form-label">
                    <i class="bi bi-card-text"></i>
                    Image Description
                    <span class="optional">(Optional)</span>
                  </label>
                  <div class="textarea-container">
                    <textarea
                      id="editDescription"
                      v-model="editingDescription"
                      placeholder="Describe what this image represents, the event, or any important details..."
                      class="description-input"
                      rows="4"
                      maxlength="200"
                    ></textarea>
                    <div class="input-actions">
                      <button
                        class="clear-btn"
                        @click="editingDescription = ''"
                        v-if="editingDescription"
                        type="button"
                      >
                        <i class="bi bi-x-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div class="input-footer">
                    <div
                      class="char-counter"
                      :class="{ 'near-limit': editingDescription.length > 180 }"
                    >
                      {{ editingDescription.length }}/200 characters
                    </div>
                    <div class="char-progress">
                      <div
                        class="progress-bar"
                        :style="{
                          width: (editingDescription.length / 200) * 100 + '%',
                        }"
                        :class="{
                          'near-limit': editingDescription.length > 180,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal Actions -->
              <div class="modal-actions">
                <button class="btn btn-outline" @click="closeEditDetailsModal">
                  <i class="bi bi-arrow-left"></i>
                  Cancel
                </button>
                <button
                  class="btn btn-primary"
                  @click="saveDetails"
                  :disabled="!editingTitle.trim() || !editingYear"
                  :class="{ loading: isSaving }"
                >
                  <template v-if="!isSaving">
                    <i class="bi bi-check-circle"></i>
                    Save Changes
                  </template>
                  <template v-else>
                    <div class="spinner"></div>
                    Saving...
                  </template>
                </button>
              </div>
            </div>
          </div>

          <!-- Image View Modal -->
          <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
              <button class="close-btn" @click="closeModal">
                <i class="bi bi-x-lg"></i>
              </button>
              <div class="modal-image-container">
                <img
                  :src="imagePath + fetchedImagesData[currentImageIndex].imageUrl"
                  class="modal-image"
                  alt="Gallery image"
                  loading="lazy"
                />
                <button class="nav-btn prev" @click="prevImage">
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button class="nav-btn next" @click="nextImage">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>
              <div class="image-details">
                <div class="image-counter">
                  {{ currentImageIndex + 1 }} / {{ fetchedImagesData.length }}
                </div>
                <div class="modal-title">
                  {{ fetchedImagesData[currentImageIndex].title }}
                </div>
                <div class="modal-year">
                  {{ fetchedImagesData[currentImageIndex].year }}
                </div>
                <div class="modal-description">
                  {{
                    fetchedImagesData[currentImageIndex].description ||
                    "No description available"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Template Section -->
        <div
          v-show="activetab === 'create_email_template'"
          class="email-template-section"
        >
          <div class="section-header">
            <h2>Email Template Builder</h2>
            <p>Create and manage email templates</p>
          </div>
          <text_editor />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'
import text_editor from "../components/text_editor";
import HonoraryMembersForm from "../components/HonoraryMembersForm.vue";
import LifeMembersForm from "../components/LifeMembersForm.vue";
import LifeFellowMembersForm from "../components/LifeFellowMembersForm.vue";
import OrdinaryMemberForm from "../components/OrdinaryMemberForm.vue";
import ExecutiveMembersForm from "../components/ExecutiveMembersForm.vue";
import PresidentAndSecretaryForm from "../components/PresidentSecretaryForm";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  components: {
    HonoraryMembersForm,
    text_editor,
    LifeMembersForm,
    LifeFellowMembersForm,
    OrdinaryMemberForm,
    ExecutiveMembersForm,
    PresidentAndSecretaryForm,
  },
  data() {
    return {
      isSidebarCollapsed: false,
      memberTabs: [
        {
          id: "honorary_members",
          name: "Honorary Members",
          icon: "bi bi-award",
        },
        {
          id: "life_fellow_members",
          name: "Life Fellow",
          icon: "bi bi-person-heart",
        },

        {
          id: "ordinary_members",
          name: "Ordinary Members",
          icon: "bi bi-people",
        },
        {
          id: "life_members",
          name: "Life Members",
          icon: "bi bi-person-check",
        },
        {
          id: "executive_members",
          name: "Executive Members",
          icon: "bi bi-person-check",
        },
        {
          id: "president_secretary_members",
          name: "President And Secretary Members",
          icon: "bi bi-person-check",
        },
      ],
      contentTabs: [
        { id: "subscribers", name: "Subscribers", icon: "bi bi-envelope" },
        {
          id: "create_email_template",
          name: "Email Templates",
          icon: "bi bi-pencil-square",
        },
        {
          id: "contact_query",
          name: "Contact Queries",
          icon: "bi bi-chat-left",
        },
        { id: "gallery", name: "Gallery", icon: "bi bi-images" },
      ],
      // Existing data
      lifeFellowMembers: [],
      lifeMembers: [],
      ordinaryMembers: [],
      totalSubscribers: null,
      totalContactQuery: null,
      subscribersList: [],
      contactQueryList: [],
      currentPage: 1,
      itemsPerPage: 12,
      searchQuery: "",
      activetab: "dashboard",
      showLogOut: false,
      fetchedHonoraryData: [],
      executiveMembers: [],
      fetchedSubscribers: [],
      editMemberData: [],
      isEditingMember: [],
      HideNccpForm: false,
      HideLifeMembersForm: false,
      HideExecutiveMemberForm: false,
      HidePresidentAndSecretaryMemberForm: false,
      HideLifeFellowMembersForm: false,
      HideOrdinaryMemberForm: false,
      imagePath: `${API_BASE_URL}`,
      photos: [],
      selectedFile: null,
      fetchedImagesData: [],
      currentImageIndex: 0,
      isModalOpen: false,
      emailSubject: "",
      emailMessage: "",

      // Gallery related data
      // Upload form data
      imageTitle: "",
      imageYear: "",
      imageDescription: "",

      // Edit modal data
      editingImage: null,
      editingTitle: "",
      editingYear: "",
      editingDescription: "",
      showEditDetailsModal: false,
      isSaving: false,
      // Available years for dropdown (you can generate this dynamically)
      availableYears: this.generateYearRange(2010, new Date().getFullYear()),

      showDeleteModal: false,
      memberToDelete: null,
      isDeleting: false,

      options: {
        theme: "light2",
        animationEnabled: true,
        title: {
          text: "Website Visitor Analysis",
          fontFamily: "Inter, sans-serif",
          fontWeight: "600",
        },
        axisY: {
          title: "Number of Visits",
          gridThickness: 0,
          lineThickness: 1,
        },
        axisX: {
          valueFormatString: "DD MMM",
          lineThickness: 1,
        },
        toolTip: {
          shared: true,
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries.bind(this),
          fontFamily: "Inter, sans-serif",
        },
        data: [
          {
            type: "splineArea",
            name: "Total Visit",
            showInLegend: true,
            color: "#6366F1",
            markerSize: 0,
            xValueType: "dateTime",
            dataPoints: [
              { x: 1651343400000, y: 1100 },
              { x: 1651429800000, y: 700 },
              { x: 1651516200000, y: 943 },
              { x: 1651602600000, y: 658 },
              { x: 1651689000000, y: 734 },
              { x: 1651775400000, y: 963 },
              { x: 1651948200000, y: 847 },
              { x: 1652034600000, y: 1500 },
              { x: 1652121000000, y: 869 },
              { x: 1652207400000, y: 710 },
              { x: 1652293800000, y: 970 },
              { x: 1652380200000, y: 1050 },
              { x: 1652466600000, y: 1300 },
              { x: 1652553000000, y: 1400 },
            ],
          },
          {
            type: "splineArea",
            name: "Unique Visit",
            showInLegend: true,
            color: "#10B981",
            markerSize: 0,
            xValueType: "dateTime",
            dataPoints: [
              { x: 1651343400000, y: 700 },
              { x: 1651429800000, y: 560 },
              { x: 1651516200000, y: 540 },
              { x: 1651602600000, y: 400 },
              { x: 1651689000000, y: 544 },
              { x: 1651775400000, y: 693 },
              { x: 1651948200000, y: 657 },
              { x: 1652034600000, y: 1330 },
              { x: 1652121000000, y: 639 },
              { x: 1652207400000, y: 506 },
              { x: 1652293800000, y: 660 },
              { x: 1652380200000, y: 906 },
              { x: 1652466600000, y: 900 },
              { x: 1652553000000, y: 1001 },
            ],
          },
        ],
      },
      styleOptions: {
        width: "100%",
        height: "400px",
      },
    };
  },
  computed: {
    currentMembers() {
      switch (this.activetab) {
        case "honorary_members":
          return this.filteredHonoraryMembers;
        case "life_fellow_members":
          return this.filteredLifeFellowMembers;
        case "life_members":
          return this.filteredLifeMembers;
        case "ordinary_members":
          return this.filteredOrdinaryMembers;
        case "executive_members":
          return this.filteredExecutiveMembers;
        default:
          return [];
      }
    },
    filteredLifeFellowMembers() {
      if (this.searchQuery) {
        return this.lifeFellowMembers.filter(
          (member) =>
            member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            member.id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.lifeFellowMembers;
    },

    // filter ordfinary members
    filteredOrdinaryMembers() {
      if (this.searchQuery) {
        return this.ordinaryMembers.filter(
          (member) =>
            member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            member.id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.ordinaryMembers;
    },
    // filter honorary members
    filteredHonoraryMembers() {
      if (this.searchQuery) {
        return this.fetchedHonoraryData.filter(
          (member) =>
            member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            member.id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.fetchedHonoraryData;
    },

    // filter honorary members
    filteredLifeMembers() {
      if (this.searchQuery) {
        return this.lifeMembers.filter(
          (member) =>
            member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            member.id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.lifeMembers;
    },

    // filter executive members
    filteredExecutiveMembers() {
      if (this.searchQuery) {
        return this.executiveMembers.filter(
          (member) =>
            member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.executiveMembers;
    },
    paginatedMembers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.currentMembers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.currentMembers.length / this.itemsPerPage);
    },
    visiblePages() {
      const maxVisiblePages = 5;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    confirmDeleteMember(memberId, index) {
      const member = this.paginatedMembers[index];
      this.memberToDelete = {
        id: memberId,
        index: index,
        name: member.name,
      };
      this.showDeleteModal = true;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.memberToDelete = null;
      this.isDeleting = false;
    },

    async deleteMember() {
      if (!this.memberToDelete) return;

      this.isDeleting = true;

      try {
        let response;
        const memberId = this.memberToDelete.id;

        // Delete based on active tab
        if (this.activetab === "life_fellow_members") {
          response = await axios.delete(
            `${API_BASE_URL}/fellowmember/deleteFellowMember/${memberId}`
          );
        } else if (this.activetab === "honorary_members") {
          response = await axios.delete(
            `${API_BASE_URL}/honorarymembers/deleteHonoraryMember/${memberId}`
          );
        } else if (this.activetab === "life_members") {
          response = await axios.delete(
            `${API_BASE_URL}/Lifemembers/deleteLifeMember/${memberId}`
          );
        } else if (this.activetab === "ordinary_members") {
          response = await axios.delete(
            `${API_BASE_URL}/ordinaryMember/deleteOrdinaryMember/${memberId}`
          );
        } else if (this.activetab === "executive_members") {
          response = await axios.delete(
            `${API_BASE_URL}/executiveMembers/deleteExecutiveMember/${memberId}`
          );
        } else {
          throw new Error("Unknown tab type");
        }

        console.log("Delete Response:", response.data);

        // Remove from current array
        const actualIndex = this.currentMembers.findIndex(
          (m) => m._id === this.memberToDelete.id
        );
        if (actualIndex !== -1) {
          this.currentMembers.splice(actualIndex, 1);
        }

        // Refresh the data after successful deletion
        if (this.activetab === "life_fellow_members") {
          await this.fetchLifeFellowMembers();
        } else if (this.activetab === "honorary_members") {
          await this.fetchHonoraryMemberData();
        } else if (this.activetab === "life_members") {
          await this.fetchLifeMembers();
        } else if (this.activetab === "ordinary_members") {
          await this.fetchOrdinaryMembers();
        } else if (this.activetab === "executive_members") {
          await this.fetchExecutiveMemberData();
        }

        this.closeDeleteModal();
        this.showSuccessToast("Member deleted successfully from database");
      } catch (error) {
        console.error("Error deleting member:", error);
        this.showErrorToast("Error deleting member from database");
        this.isDeleting = false;
      }
    },

    exportToExcel() {
      const selectedData = this.currentMembers;
      let sheetName = "";

      switch (this.activetab) {
        case "ordinary_members":
          sheetName = "Ordinary Members";
          break;
        case "honorary_members":
          sheetName = "Honorary Members";
          break;
        case "life_fellow_members":
          sheetName = "Life Fellow Members";
          break;
        case "life_members":
          sheetName = "Life Members";
          break;
        case "executive_members":
          sheetName = "Executive Members";
        default:
          alert("No valid tab selected!");
          return;
      }

      if (!selectedData || !selectedData.length) {
        alert(`No ${sheetName} data to export!`);
        return;
      }

      // ✅ Step 3: Clean data — remove _id, __v, createdAt, updatedAt
      const cleanedData = selectedData.map((member) => {
        const { _id, __v, createdAt, updatedAt, ...rest } = member;
        return rest;
      });

      // ✅ Step 4: Generate Excel file
      const worksheet = XLSX.utils.json_to_sheet(cleanedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      const fileName = `${sheetName.replace(/\s+/g, "_")}.xlsx`;
      saveAs(blob, fileName);
    },

    getPageTitle(tab) {
      const titles = {
        dashboard: "Dashboard",
        honorary_members: "Honorary Members",
        life_members: "Life Members",
        ordinary_members: "Ordinary Members",
        life_fellow_members: "Life Fellow Members",
        executive_members: "Executive Members",
        subscribers: "Subscribers",
        create_email_template: "Email Templates",
        contact_query: "Contact Queries",
        gallery: "Gallery",
      };
      return titles[tab] || "Dashboard";
    },

    getSectionTitle(tab) {
      const titles = {
        honorary_members: "Honorary Members",
        life_members: "Life Members",
        ordinary_members: "Ordinary Members",
        life_fellow_members: "Life Fellow Members",
        executive_members: "Executive Members",
      };
      return titles[tab] || "Members";
    },

    getSectionSubtitle(tab) {
      const subtitles = {
        honorary_members:
          "National College of Chest Physicians - Distinguished Honorary Members",
        life_members: "National College of Chest Physicians - Lifetime Members",
        ordinary_members:
          "National College of Chest Physicians - Ordinary Fellow Members",
        life_fellow_members: "National College of Chest Physicians - Life Fellow Members",
        executive_members: "National College of Chest Physicians - Executive Members",
      };
      return subtitles[tab] || "Manage member information";
    },

    setActiveTab(tab) {
      this.activetab = tab;
      this.currentPage = 1;
      this.searchQuery = "";

      // Reset editing state when switching tabs
      this.isEditingMember = [];
      this.editMemberData = [];

      // Re-initialize editing data for the new tab
      this.$nextTick(() => {
        if (this.currentMembers.length > 0) {
          this.isEditingMember = Array(this.currentMembers.length).fill(false);
          this.editMemberData = JSON.parse(JSON.stringify(this.currentMembers));
        }
      });
    },

    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },

    getNotificationCount(tabId) {
      const counts = {
        subscribers: this.totalSubscribers,
        contact_query: this.totalContactQuery,
      };
      return counts[tabId] || 0;
    },

    logout() {
      if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        this.$router.push("/login");
        toast.success("Logged out successfully!");
      }
    },

    showToggleForm() {
      if (this.activetab === "honorary_members") {
        this.HideNccpForm = !this.HideNccpForm;
      } else if (this.activetab === "life_members") {
        this.HideLifeMembersForm = !this.HideLifeMembersForm;
      } else if (this.activetab === "life_fellow_members") {
        this.HideLifeFellowMembersForm = !this.HideLifeFellowMembersForm;
      } else if (this.activetab === "ordinary_members") {
        this.HideOrdinaryMemberForm = !this.HideOrdinaryMemberForm;
      } else if (this.activetab === "executive_members") {
        this.HideExecutiveMemberForm = !this.HideExecutiveMemberForm;
      } else if (this.activetab === "president_secretary_members") {
        this.HidePresidentAndSecretaryMemberForm = !this
          .HidePresidentAndSecretaryMemberForm;
      }
    },
    showExelFileUploadPage() {
      const routeMap = {
        honorary_members: "/upload-honorary-members-Excel-file",
        life_members: "/upload-life-members-Excel-file",
        life_fellow_members: "/upload-life-fellow-members-Excel-file",
        ordinary_members: "/upload-ordinary-members-Excel-file",
        executive_members: "/upload-executive-members-Excel-file",
        president_secretary_members: "/upload-president-secretary-members-Excel-file",
      };

      const route = routeMap[this.activetab];
      if (route) {
        this.$router.push(route);
      }
    },

    closeHonoraryForm() {
      this.HideNccpForm = false; // <-- hide overlay + form
    },
    closeLifeFellowForm() {
      this.HideLifeFellowMembersForm = false;
    },
    closeOrdinaryMemberForm() {
      this.HideOrdinaryMemberForm = false;
    },
    closeLifeMembersForm() {
      this.HideLifeMembersForm = false;
    },
    closeExecutiveMemberForm() {
      this.HideExecutiveMemberForm = false;
    },
    closePresidentAndSecretaryMemberForm() {
      this.HidePresidentAndSecretaryMemberForm = false;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    changePage(page) {
      this.currentPage = page;
    },

    clearSearch() {
      this.searchQuery = "";
      this.currentPage = 1;
    },

    // Generic member editing methods
    toggleEditMember(index) {
      this.isEditingMember.splice(index, 1, !this.isEditingMember[index]);
      // Reset edit data if canceling
      if (!this.isEditingMember[index]) {
        this.editMemberData[index] = { ...this.currentMembers[index] };
      }
    },

    async saveEditMember(index, memberId) {
      const updatedData = this.editMemberData[index];

      // Validation check
      if (!this.isMemberFormValid(updatedData)) {
        this.showErrorToast("Please fill all required fields");
        return;
      }

      try {
        let response;
        let payload;
        let apiURL;

        // Determine payload and API URL based on active tab
        switch (this.activetab) {
          case "executive_members":
            payload = {
              name: updatedData.name,
              email: updatedData.email,
              phone: updatedData.phone,
              address: updatedData.address,
              position: updatedData.position,
            };
            apiURL = `http://localhost:3000/executiveMembers/updateExecutiveMember/${memberId}`;
            break;

          case "life_fellow_members":
            payload = {
              id: updatedData.id,
              name: updatedData.name,
              address: updatedData.address,
              state: updatedData.state,
              status: updatedData.status,
              phone: updatedData.phone,
              email: updatedData.email,
            };
            apiURL = `http://localhost:3000/fellowmember/editFellowMember/${memberId}`;
            break;

          case "honorary_members":
            payload = updatedData;
            apiURL = `http://localhost:3000/honorarymembers/update/${memberId}`;
            break;

          case "life_members":
            payload = updatedData;
            apiURL = `http://localhost:3000/lifemembers/updateMember/${memberId}`;
            break;

          case "ordinary_members":
            payload = updatedData;
            apiURL = `http://localhost:3000/ordinaryMember/updateOrdinaryMember/${memberId}`;
            break;

          default:
            this.showErrorToast("Invalid member type");
            return;
        }

        // Send update request
        response = await axios.put(apiURL, payload);
        console.log("Update Response:", response.data);

        // Refresh data after successful update
        switch (this.activetab) {
          case "executive_members":
            await this.fetchExecutiveMemberData();
            break;
          case "life_fellow_members":
            await this.fetchLifeFellowMembers();
            break;
          case "honorary_members":
            await this.fetchHonoraryMemberData();
            break;
          case "life_members":
            await this.fetchLifeMembers();
            break;
          case "ordinary_members":
            await this.fetchOrdinaryMembers();
            break;
        }

        this.toggleEditMember(index);
        this.showSuccessToast("Member updated successfully in database");
      } catch (error) {
        console.error("Error updating member:", error);
        this.showErrorToast("Error updating member in database");
      }
    },

    // Validation method for members
    isMemberFormValid(memberData) {
      return memberData.name && memberData.email && memberData.address;
    },

    // Toast notification methods
    showSuccessToast(message) {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
      });
    },

    showErrorToast(message) {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
      });
    },

    // Honorary Members Methods
    async fetchHonoraryMemberData() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/honorarymembers/getHonorarymembers`
        );
        this.fetchedHonoraryData = response.data || [];
        this.isEditingMember = Array(this.fetchedHonoraryData.length).fill(false);
        this.editMemberData = JSON.parse(JSON.stringify(this.fetchedHonoraryData));
        console.log("Honorary members data fetched successfully");
      } catch (error) {
        console.error("Error Fetching Data", error);
        this.showErrorToast("Failed to fetch honorary members data");
      }
    },

    // Life Fellow Members Method
    async fetchLifeFellowMembers() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/fellowmember/getfellowmember`
        );
        this.lifeFellowMembers = response.data || [];
        this.isEditingMember = Array(this.lifeFellowMembers.length).fill(false);
        this.editMemberData = JSON.parse(JSON.stringify(this.lifeFellowMembers));
        console.log("Life members data fetched successfully");
      } catch (error) {
        console.error("Error Fetching Data", error);
        this.showErrorToast("Failed to fetch life members data");
      }
    },

    // Life Members Method
    async fetchLifeMembers() {
      try {
        const response = await axios.get(`${API_BASE_URL}/Lifemembers/getXsl`);
        this.lifeMembers = response.data || [];
        this.isEditingMember = Array(this.lifeMembers.length).fill(false);
        this.editMemberData = JSON.parse(JSON.stringify(this.lifeMembers));
        console.log("Life members data fetched successfully");
      } catch (error) {
        console.error("Error Fetching Data", error);
        this.showErrorToast("Failed to fetch life members data");
      }
    },

    // Life Members Method
    async fetchOrdinaryMembers() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/ordinaryMember/getAllOrdinaryMembers`
        );
        this.ordinaryMembers = response.data.data || [];
        this.isEditingMember = Array(this.ordinaryMembers.length).fill(false);
        this.editMemberData = JSON.parse(JSON.stringify(this.ordinaryMembers));
        console.log("Life members data fetched successfully");
      } catch (error) {
        console.error("Error Fetching Data", error);
        this.showErrorToast("Failed to fetch life members data");
      }
    },

    // get executive members data
    async fetchExecutiveMemberData() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/executiveMembers/getmemberData`
        );
        this.executiveMembers = response.data || [];
        this.isEditingMember = Array(this.executiveMembers.length).fill(false);
        this.editMemberData = JSON.parse(JSON.stringify(this.executiveMembers));
        console.log("executive members data fetched successfully");
      } catch (error) {
        console.error("Error Fetching Data", error);
        this.showErrorToast("Failed to fetch honorary members data");
      }
    },

    // Subscribers Methods
    async fetchedSubscribersData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/news/subscribers`);
        this.totalSubscribers = response.data.length || 0;
        this.subscribersList = response.data;
        console.log("Subscribers data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        this.totalSubscribers = 0;
        this.subscribersList = [];
        this.showErrorToast("Failed to fetch subscribers data");
      }
    },

    // Contact Query Methods
    async fetchedContactQueryData() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/Contact_querys/getcontactquery`
        );
        this.totalContactQuery = response.data.length || 0;
        this.contactQueryList = response.data;
        console.log("Contact queries data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        this.totalContactQuery = 0;
        this.contactQueryList = [];
        this.showErrorToast("Failed to fetch contact queries data");
      }
    },

    // Gallery Methods
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    async uploadPhoto() {
      if (!this.selectedFile) {
        this.showErrorToast("Please select a file to upload");
        return;
      }

      if (!this.imageTitle || !this.imageTitle.trim()) {
        this.showErrorToast("Please enter an event title");
        return;
      }

      if (!this.imageYear) {
        this.showErrorToast("Please select an event year");
        return;
      }

      const formData = new FormData();
      formData.append("photo", this.selectedFile);
      formData.append("title", this.imageTitle.trim());
      formData.append("year", this.imageYear);
      formData.append("description", this.imageDescription);

      try {
        await axios.post(`${API_BASE_URL}/gallery/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.showSuccessToast("Image Uploaded Successfully!");
        await this.fetchallimagesdata();
        // Reset form
        this.selectedFile = null;
        this.imageTitle = "";
        this.imageYear = "";
        this.imageDescription = "";
        const fileInput = document.querySelector(".file-input");
        if (fileInput) fileInput.value = "";
      } catch (error) {
        console.error("Error uploading photo:", error);
        this.showErrorToast("Failed to upload image!");
      }
    },

    async fetchallimagesdata() {
      try {
        const response = await axios.get(`${API_BASE_URL}/gallery/photos`);
        this.fetchedImagesData = response.data;
        console.log("Gallery images fetched successfully");
      } catch (error) {
        console.error("Error Fetching Data", error);
        // this.showErrorToast("Failed to fetch gallery images");
      }
    },

    // gallery section start
    openModal(index) {
      this.currentImageIndex = index;
      this.isModalOpen = true;
      document.body.style.overflow = "hidden";
      // Also show description below the image when clicked
      this.activeDescriptionIndex = index;
    },

    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = "auto";
      // Don't close the description below the image when modal closes
    },

    // Toggle description display below image
    toggleDescription(index) {
      if (this.activeDescriptionIndex === index) {
        // If clicking the same image, close description
        this.activeDescriptionIndex = -1;
      } else {
        // Show description for clicked image
        this.activeDescriptionIndex = index;
      }
    },

    // Close description
    closeDescription() {
      this.activeDescriptionIndex = -1;
    },

    // Edit Details Methods (updated from Edit Description)
    openEditDetails(image, index) {
      this.editingImage = image;
      this.editingTitle = image.title || "";
      this.editingYear = image.year || "";
      this.editingDescription = image.description || "";
      this.editingImageIndex = index;
      this.showEditDetailsModal = true;
    },

    closeEditDetailsModal() {
      this.showEditDetailsModal = false;
      this.editingImage = null;
      this.editingTitle = "";
      this.editingYear = "";
      this.editingDescription = "";
      this.editingImageIndex = -1;
    },

    async saveDetails() {
      // Check if an image is selected and required fields are filled
      if (!this.editingImage) return;

      if (!this.editingTitle || !this.editingTitle.trim()) {
        this.showErrorToast("Please enter an event title");
        return;
      }

      if (!this.editingYear) {
        this.showErrorToast("Please select an event year");
        return;
      }

      const trimmedTitle = this.editingTitle.trim();
      const trimmedDescription = this.editingDescription?.trim() || "";

      try {
        const response = await axios.put(
          `${API_BASE_URL}/gallery/photos/${this.editingImage._id}/details`,
          {
            title: trimmedTitle,
            year: this.editingYear,
            description: trimmedDescription,
          }
        );

        if (response.status === 200) {
          // Update local gallery data
          this.fetchedImagesData[this.editingImageIndex].title = trimmedTitle;
          this.fetchedImagesData[this.editingImageIndex].year = this.editingYear;
          this.fetchedImagesData[this.editingImageIndex].description = trimmedDescription;

          // Show success toast
          this.showSuccessToast(
            response.data?.message || "Image details updated successfully!"
          );

          // Close edit modal
          this.closeEditDetailsModal();
        }
      } catch (error) {
        // Handle server or network errors
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update image details!";
        console.error("Error updating image details:", errorMessage);
        this.showErrorToast(errorMessage);
      }
    },

    nextImage() {
      if (this.currentImageIndex < this.fetchedImagesData.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    },

    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.fetchedImagesData.length - 1;
      }
    },

    async deletePhoto(photoId) {
      try {
        const confirmDelete = confirm("Are you sure you want to delete this photo?");
        if (confirmDelete) {
          await axios.delete(`${API_BASE_URL}/gallery/photos/${photoId}`);
          this.showSuccessToast("Photo deleted successfully");
          await this.fetchallimagesdata();
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || error?.message || "Error deleting photo";
        console.error("Error deleting photo:", errorMessage);
        this.showErrorToast(errorMessage);
      }
    },

    // Generate available years for dropdown
    generateYearRange() {
      const currentYear = new Date().getFullYear();
      const startYear = 2010; // You can adjust this as needed
      const years = [];
      for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
      }
      return years;
    },

    // Email Methods
    async sendEmail() {
      if (!this.emailSubject || !this.emailMessage) {
        this.showErrorToast("Please fill in both subject and message");
        return;
      }

      try {
        await axios.post(`${API_BASE_URL}/news/sendEmails`, {
          subject: this.emailSubject,
          message: this.emailMessage,
        });

        this.showSuccessToast("Emails sent successfully!");
        this.emailSubject = "";
        this.emailMessage = "";
      } catch (error) {
        console.error(error);
        this.showErrorToast("There was an error sending emails. Please try again later.");
      }
    },

    // Chart Methods
    toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    },

    // Utility Methods
    functionShowLogout() {
      this.showLogOut = !this.showLogOut;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // Mobile responsiveness
    checkMobileView() {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile && !this.isSidebarCollapsed) {
        this.isSidebarCollapsed = true;
      }
    },

    handleResize() {
      this.checkMobileView();
    },
  },
  async mounted() {
    // Initialize mobile detection
    this.checkMobileView();
    window.addEventListener("resize", this.handleResize);

    // Fetch initial data
    await Promise.all([
      this.fetchHonoraryMemberData(),
      this.fetchLifeFellowMembers(),
      this.fetchLifeMembers(),
      this.fetchedSubscribersData(),
      this.fetchedContactQueryData(),
      this.fetchallimagesdata(),
      this.fetchOrdinaryMembers(),
      this.fetchExecutiveMemberData(),
    ]);

    console.log("Admin dashboard initialized successfully");
  },

  beforeUnmount() {
    // Cleanup event listeners
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #334155;
}

/* Modern Sidebar Styles */
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #1a1f36 0%, #2d3748 100%);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-collapsed {
  width: 80px;
}

/* Sidebar Header */
.sidebar-header {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 500;
}

.sidebar-toggle {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 1rem;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 12px;
  color: #a0aec0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.nav-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  transform: translateX(4px);
}

.nav-item:hover::before {
  transform: scaleY(1);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.nav-item.active::before {
  transform: scaleY(1);
}

.nav-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.nav-text {
  font-weight: 500;
  font-size: 0.9rem;
  white-space: nowrap;
  flex: 1;
  text-align: left;
}

.nav-badge {
  flex-shrink: 0;
}

.badge {
  background: linear-gradient(135deg, #ed64a6, #ed8936);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(237, 100, 166, 0.4);
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.75rem;
  color: #a0aec0;
}

.logout-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  color: #fc8181;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #feb2b2;
  transform: scale(1.1);
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content.expanded {
  margin-left: 80px;
}

/* Top Header */
.top-header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e2e8f0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-bar {
  position: relative;
  flex: 0 1 400px;
}

.search-bar i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
}

.search-input:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notifications {
  display: flex;
  gap: 0.75rem;
}

.notification-icon {
  position: relative;
  padding: 0.75rem;
  border-radius: 10px;
  background: #f8fafc;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-icon:hover {
  background: #e2e8f0;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: 2px solid white;
}

/* Content Area */
.content-area {
  flex: 1;
  padding: 2rem;
  background: #f8fafc;
}

/* Dashboard Overview */
.dashboard-overview {
  space-y: 2rem;
}

.welcome-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.welcome-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-content p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.welcome-actions {
  display: flex;
  gap: 1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 1rem 0rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
}

.stat-icon.subscribers {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.stat-icon.queries {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.visitors {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.members {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.stat-info {
  flex: 1;
}

.stat-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.stat-info p {
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.stat-trend {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-trend.positive {
  background: #dcfce7;
  color: #166534;
}

.stat-trend.negative {
  background: #fecaca;
  color: #991b1b;
}

/* Chart Section */
.chart-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
}

.section-title h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.section-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

/* Search and Filters */
.search-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  z-index: 1;
}

/* Members Grid */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.member-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.member-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.member-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.member-avatar {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.edit-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.edit-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.edit-btn.editing {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

.member-info {
  text-align: center;
}

.member-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.member-id {
  color: #64748b;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  display: inline-block;
}

.member-details {
  space-y: 0.75rem;
  text-align: left;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #64748b;
  font-size: 0.9rem;
  border-bottom: 1px solid #f1f5f9;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item i {
  width: 16px;
  color: #6366f1;
  flex-shrink: 0;
}

.edit-form {
  space-y: 0.75rem;
  text-align: left;
}

.edit-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.edit-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.save-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background 0.3s ease;
}

.save-btn:hover {
  background: #059669;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.pagination-btn {
  padding: 0.75rem 1.25rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  gap: 0.5rem;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover {
  background: #f8fafc;
}

.page-btn.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

/* Subscribers Section */
.subscribers-list {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.subscriber-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.3s ease;
  align-items: center;
}

.subscriber-item:hover {
  background: #f8fafc;
}

.subscriber-item:last-child {
  border-bottom: none;
}

.subscriber-email {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #1e293b;
}

.subscriber-date {
  display: block;
  color: #1e293b;
  font-weight: 500;
}

.subscriber-date small {
  color: #64748b;
  font-size: 0.8rem;
}

.subscriber-location {
  color: #64748b;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fef2f2;
  color: #991b1b;
}

/* Contact Query Section */
.queries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.query-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.query-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.query-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.query-header h4 {
  font-weight: 600;
  color: #1e293b;
  flex: 1;
  margin-right: 1rem;
  line-height: 1.4;
}

.query-date {
  font-size: 0.8rem;
  color: #94a3b8;
  white-space: nowrap;
}

.query-details {
  space-y: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-weight: 500;
  color: #64748b;
  font-size: 0.9rem;
}

.detail-value {
  color: #1e293b;
  font-size: 0.9rem;
  text-align: right;
  font-weight: 500;
}

/* Gallery Section */
.upload-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
}

.upload-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.upload-form {
  space-y: 1.5rem;
}

.file-upload {
  position: relative;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background: #f8fafc;
  position: relative;
  z-index: 1;
}

.upload-area:hover {
  border-color: #6366f1;
  background: #f0f9ff;
}

.upload-area i {
  font-size: 3rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.upload-area p {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.upload-area span {
  color: #64748b;
  font-size: 0.9rem;
}

.upload-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: #f8fafc;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: white;
}

.overlay-btn.view {
  background: rgba(255, 255, 255, 0.2);
}

.overlay-btn.view:hover {
  background: rgba(255, 255, 255, 0.3);
}

.overlay-btn.delete {
  background: rgba(239, 68, 68, 0.8);
}

.overlay-btn.delete:hover {
  background: rgba(220, 38, 38, 0.9);
}

.overlay-btn.edit {
  background: rgba(59, 130, 246, 0.8);
}

.overlay-btn.edit:hover {
  background: rgba(37, 99, 235, 0.9);
}

/* Description Overlay Styles */
.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  color: white;
  padding: 1.5rem 1rem 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  opacity: 0;
  z-index: 2;
}

.image-info.active {
  transform: translateY(0);
  opacity: 1;
}

.image-title {
  font-weight: 700;
  font-size: 15px;
  color: #2c3e50;
  margin-bottom: 4px;
  line-height: 1.3;
}

.image-year {
  font-size: 13px;
  color: #007bff;
  font-weight: 600;
  margin-bottom: 8px;
  padding: 2px 8px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 12px;
  display: inline-block;
}

.image-description {
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  word-wrap: break-word;
  max-height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.close-description-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: background 0.3s ease;
}

.close-description-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  color: white;
  overflow: auto;
}

.img-edit-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  color: white;
  overflow: auto;
  width: 100%;
}

.image-container {
  height: 100%;
  width: 100%;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: background 0.3s ease;
  z-index: 10;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-btn.prev {
  left: 1rem;
}

.nav-btn.next {
  right: 1rem;
}

.image-counter {
  /* position: absolute; */
  bottom: 1rem;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-weight: 500;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
}

/* Edit Description Modal Styles */
.edit-description-modal {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.7);
}

.description-modal {
  max-width: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.header-text h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.header-text p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Preview Section */
.preview-section {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #475569;
  font-weight: 600;
  font-size: 0.9rem;
}

.preview-header i {
  color: #667eea;
}

.current-image-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
}

.preview-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(102, 126, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.current-image-preview:hover .preview-overlay {
  opacity: 1;
}

.current-image-preview:hover .preview-image {
  transform: scale(1.05);
}

.preview-overlay i {
  font-size: 2rem;
  color: #667eea;
}

/* Form Section */
.form-section {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 0;
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.form-label i {
  color: #667eea;
}

.optional {
  color: #94a3b8;
  font-weight: 400;
  font-size: 0.8rem;
}

.textarea-container {
  position: relative;
}

.description-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
}

.description-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: #fafbff;
}

.description-input::placeholder {
  color: #94a3b8;
}

.input-actions {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

.clear-btn {
  background: rgba(100, 116, 139, 0.1);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.clear-btn:hover {
  background: rgba(100, 116, 139, 0.2);
  color: #475569;
}

.input-footer {
  margin-top: 0.75rem;
}

.char-counter {
  font-size: 0.8rem;
  color: #64748b;
  text-align: right;
  margin-bottom: 0.25rem;
}

.char-counter.near-limit {
  color: #dc2626;
  font-weight: 600;
}

.char-progress {
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.progress-bar.near-limit {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  flex: 1;
  justify-content: center;
}

.image-details {
  position: relative;
  text-align: center;
}

.btn-outline {
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-outline:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: 2px solid transparent;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn.loading {
  pointer-events: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .description-modal {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }

  .modal-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }

  .preview-section,
  .form-section {
    padding: 1.25rem;
  }

  .modal-actions {
    padding: 1rem 1.25rem 1.25rem;
    flex-direction: column;
  }

  .btn {
    flex: none;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  color: #cbd5e1;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #475569;
  font-weight: 600;
}

.empty-state p {
  margin-bottom: 2rem;
  color: #64748b;
}

.empty-icon {
  margin-bottom: 1.5rem;
}

.empty-icon i {
  font-size: 3rem;
  color: #cbd5e1;
}

/* Scrollbar Styling */
.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Collapsed State Styles */
.sidebar-collapsed .nav-label,
.sidebar-collapsed .nav-text,
.sidebar-collapsed .user-info,
.sidebar-collapsed .logo-text {
  display: none;
}

.sidebar-collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem;
}

.sidebar-collapsed .user-profile {
  justify-content: center;
  padding: 0.75rem;
}

.sidebar-collapsed .logout-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

/* Tooltip for collapsed state */
.nav-item {
  position: relative;
}

.nav-item::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  background: #2d3748;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.sidebar-collapsed .nav-item:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(8px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }

  .main-content {
    margin-left: 240px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .members-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0 !important;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .top-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-left,
  .header-right {
    width: 100%;
  }

  .search-bar {
    flex: 1;
    min-width: 100%;
  }

  .content-area {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .members-grid {
    grid-template-columns: 1fr;
  }

  .queries-grid {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-filters {
    flex-direction: column;
  }

  .search-box {
    min-width: 100%;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .section-actions {
    width: 100%;
    justify-content: stretch;
  }

  .section-actions button {
    flex: 1;
    justify-content: center;
  }

  .welcome-banner {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .list-header,
  .subscriber-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .modal-image-container {
    height: 60vh;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .pagination {
    flex-direction: column;
    align-items: stretch;
  }

  .page-numbers {
    justify-content: center;
  }

  .upload-card {
    padding: 1.5rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }
}

/* Utility Classes */
.space-y > * + * {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-5 {
  margin-top: 2rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-5 {
  margin-bottom: 2rem;
}

/* Animation for sidebar items */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-item {
  animation: slideIn 0.3s ease forwards;
}

.nav-item:nth-child(1) {
  animation-delay: 0.1s;
}

.nav-item:nth-child(2) {
  animation-delay: 0.15s;
}

.nav-item:nth-child(3) {
  animation-delay: 0.2s;
}

.nav-item:nth-child(4) {
  animation-delay: 0.25s;
}

.nav-item:nth-child(5) {
  animation-delay: 0.3s;
}

/* Loading States */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Print Styles */
@media print {
  .sidebar,
  .top-header,
  .section-actions,
  .pagination {
    display: none !important;
  }

  .main-content {
    margin-left: 0 !important;
  }

  .content-area {
    padding: 0 !important;
  }

  .stat-card,
  .member-card,
  .query-card {
    box-shadow: none !important;
    border: 1px solid #ddd !important;
    break-inside: avoid;
  }
}

.hmf-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.hmf-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 10px;
  z-index: 1000;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  /* responsive */
}

/* CSS for new delete button and modal elements */

/* Member actions container */
.member-actions-container {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

/* Delete button styling */
.member-delete-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.member-delete-action-btn:hover {
  background-color: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
}

.member-delete-action-btn:active {
  background-color: #bd2130;
  transform: translateY(0);
}

.member-delete-action-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Delete confirmation modal overlay */
.member-deletion-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

/* Modal content container */
.member-deletion-modal-content {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Modal header section */
.member-deletion-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.member-deletion-modal-title {
  margin: 0;
  color: #dc3545;
  font-size: 1.25rem;
  font-weight: 600;
}

.member-deletion-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.member-deletion-modal-close:hover {
  background-color: #e9ecef;
  color: #495057;
}

/* Modal body section */
.member-deletion-modal-body {
  padding: 24px;
}

.member-deletion-warning-text {
  margin: 0;
  color: #495057;
  line-height: 1.5;
  font-size: 1rem;
}

.member-deletion-warning-icon {
  color: #dc3545;
  margin-right: 8px;
}

/* Modal actions section */
.member-deletion-modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.member-deletion-confirm-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
}

.member-deletion-confirm-btn:hover {
  background-color: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.member-deletion-confirm-btn:active {
  background-color: #bd2130;
  transform: translateY(0);
}

.member-deletion-cancel-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
}

.member-deletion-cancel-btn:hover {
  background-color: #5a6268;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

.member-deletion-cancel-btn:active {
  background-color: #545b62;
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .member-deletion-modal-actions {
    flex-direction: column-reverse;
  }

  .member-deletion-modal-content {
    margin: 20px;
    width: calc(100% - 40px);
  }

  .member-actions-container {
    flex-direction: column;
    gap: 6px;
  }

  .member-delete-action-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
}

/* Loading state for delete button */
.member-delete-action-btn.loading {
  position: relative;
  color: transparent;
}

.member-delete-action-btn.loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-spinner 0.8s linear infinite;
}

@keyframes button-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
