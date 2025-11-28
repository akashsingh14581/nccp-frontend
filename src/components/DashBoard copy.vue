<template>
  <div class="admin_items">
    <div class="left_side_menu">
      <h3 style="font-size: 15px; margin-top: 25px; font-weight: 800">
        Admin Dashboard
      </h3>
      <hr />
      <div class="admin_dashboards_btn">
        <button
          @click="setActiveTab('dashboard')"
          :class="{ active: activetab === 'dashboard' }"
        >
          Dashboard
        </button>
        <button
          @click="setActiveTab('honorary_members')"
          :class="{ active: activetab === 'honorary_members' }"
        >
          Honorary Members
        </button>
        <button
          @click="setActiveTab('life_members')"
          :class="{ active: activetab === 'life_members' }"
        >
          Life Members
        </button>
        <button
          @click="setActiveTab('ordinary_members')"
          :class="{ active: activetab === 'ordinary_members' }"
        >
          Ordinary Fellow Members
        </button>
        <button
          @click="setActiveTab('life_fellow_members')"
          :class="{ active: activetab === 'life_fellow_members' }"
        >
          Life Fellow Members
        </button>
        <button
          @click="setActiveTab('subscribers')"
          :class="{ active: activetab === 'subscribers' }"
        >
          Subscribers
        </button>
        <button
          @click="setActiveTab('create_email_template')"
          :class="{ active: activetab === 'create_email_template' }"
        >
          Create Email Template
        </button>
        <button
          @click="setActiveTab('contact_query')"
          :class="{ active: activetab === 'contact_query' }"
        >
          Contact Query
        </button>
        <button
          @click="setActiveTab('gallery')"
          :class="{ active: activetab === 'gallery' }"
        >
          Gallery
        </button>
      </div>
    </div>

    <div class="right_side_menu">
      <div class="dashboard_header">
        <div class="input_box_div">
          <form>
            <input class="input_box" placeholder="Search here..." required />
            <input type="submit" value="Search" class="input_btn" />
          </form>
        </div>
        <div class="stuff"></div>
        <div class="notifications_attachment_div">
          <i class="bi bi-bell-fill" v-if="totalSubscribers !== null">
            <span class="newletter_subsriber_count">{{
              totalSubscribers
            }}</span>
          </i>
          <i class="bi bi-envelope-arrow-up-fill">
            <span class="newletter_subsriber_count">{{
              totalContactQuery
            }}</span>
          </i>
          <div class="user_img_div">
            <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2198"
            />
          </div>
          <h4 style="font-size: 12px">
            Hello Suraj !
            <span>
              <i
                class="bi bi-chevron-double-down profile_dropdown"
                @click="functionShowLogout"
              ></i>
            </span>
          </h4>
          <div class="user_information_log_out" v-show="showLogOut">
            <li><i class="bi bi-box-arrow-left"></i>Log Out</li>
          </div>
        </div>
      </div>

      <!-- Dashboard Tab -->
      <div v-show="activetab === 'dashboard'">
        <div class="admin_dashboard">
          <CanvasJSChart :options="options" :styles="styleOptions" />
        </div>

        <div class="mt-3 show_websites_knowledge">
          <div
            class="subscription_query_visit"
            v-if="totalSubscribers !== null"
          >
            <h4
              @click="setActiveTab('subscribers')"
              :class="{ active: activetab === 'subscribers' }"
            >
              Total Subscribers<br />
              <span style="font-size: 25px"> {{ totalSubscribers }}</span>
            </h4>
          </div>

          <div
            class="subscription_query_visit"
            v-if="totalContactQuery !== null"
          >
            <h4
              @click="setActiveTab('contact_query')"
              :class="{ active: activetab === 'contact_query' }"
            >
              Total Contact Query<br />
              <span style="font-size: 25px">{{ totalContactQuery }}</span>
            </h4>
          </div>

          <div class="subscription_query_visit">
            <h4>Total Website Visitors</h4>
          </div>
        </div>
      </div>

      <!-- Honorary Members -->
      <div
        class="mt-3 honorary_members"
        v-show="activetab === 'honorary_members'"
      >
        <div class="container">
          <h3>NCCP Honorary Members</h3>
          <hr />
          <div
            class="mt-5 member-section"
            v-if="fetchedHonoraryData.length > 0"
          >
            <div
              class="profile"
              v-for="(items, index) in fetchedHonoraryData"
              :key="items._id"
            >
              <div class="bg-img">
                <div class="img-profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    class="bi bi-person-fill-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                    />
                    <path
                      d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
                    />
                  </svg>
                  <button
                    style="float: right"
                    class="edit_button"
                    @click="toggleEdit(index)"
                  >
                    <i class="bi bi-pencil-square"></i>Edit
                  </button>
                </div>
              </div>

              <h4 class="mt-5 text-center">{{ items.name }}</h4>
              <div class="mt-2 members-details">
                <div v-if="!isEditing[index]">
                  <p>
                    <i class="bi bi-person-fill"></i>
                    <span>{{ items.id }} </span>
                  </p>
                  <p>
                    <i class="bi bi-envelope-at-fill"></i>
                    <span>{{ items.state }} </span>
                  </p>
                  <p>
                    <i class="bi bi-geo-alt-fill"></i>
                    <span>{{ items.address }} </span>
                  </p>
                </div>

                <div v-else>
                  <input v-model="editMemberData[index].name" />
                  <input v-model="editMemberData[index].id" />
                  <input v-model="editMemberData[index].state" />
                  <input v-model="editMemberData[index].address" />
                  <button @click="saveEdit(index, items._id)">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="upload_member" @click="showToggleForm()">
          Upload New NCCP Honorary Member
        </button>
        <HonoraryMembersForm v-show="HideNccpForm" />
      </div>

      <!-- Life Members -->

      <div class="life_members" v-show="activetab === 'life_members'">
        <div class="container" v-if="paginatedLifeMembers.length > 0">
          <h3>
            NCCP Life Members<br /><span class="sub-heading"
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
          <div class="mt-2 text-right pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
              Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              Next
            </button>
          </div>
          <div class="mt-5 profile-cards">
            <template v-for="(row, index) in paginatedLifeMembers" :key="index">
              <div class="profile">
                <div class="bg-img">
                  <div class="img-profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      class="bi bi-person-fill-check"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                      />
                      <path
                        d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
                      />
                    </svg>
                    <button
                      style="float: right"
                      class="edit_button"
                      @click="toggleEditLifeMember(index)"
                    >
                      <i class="bi bi-pencil-square"></i>Edit
                    </button>
                  </div>
                </div>
                <h4 class="mt-5 text-center">{{ row.name }}</h4>
                <div class="mt-2 members-details">
                  <div v-if="!isEditingLifeMember[index]">
                    <p>
                      <i class="bi bi-person-fill"></i>
                      <span>{{ row.id }} </span>
                    </p>
                    <p v-if="row.email">
                      <i class="bi bi-envelope-at-fill"></i>
                      <span>{{ row.email }} </span>
                    </p>
                    <p class="address">
                      <i class="bi bi-geo-alt-fill"></i>
                      <span>{{ row.address }} </span>
                    </p>
                    <p class="number" v-if="row.phone">
                      <i class="bi bi-telephone-inbound-fill"></i
                      ><span>{{ row.phone }} </span>
                    </p>
                    <p class="state" v-if="row.state">
                      <i class="bi bi-crosshair"></i
                      ><span>{{ row.state }} </span>
                    </p>
                  </div>
                  <div v-else>
                    <input v-model="editLifeMemberData[index].name" />
                    <input v-model="editLifeMemberData[index].id" />
                    <input v-model="editLifeMemberData[index].address" />
                    <input v-model="editLifeMemberData[index].phone" />
                    <input v-model="editLifeMemberData[index].state" />

                    <button @click="saveEditLifeMembers(index, items._id)">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="text-right pagination">
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

      <!-- --------------------Subscribers---------------------------- -->
      <div class="subscribers" v-show="activetab === 'subscribers'">
        <h3>Subscribers List</h3>
        <hr />
        <ul v-if="subscribersList.length">
          <li v-for="subscriber in subscribersList" :key="subscriber.email">
            <p>Email: {{ subscriber.email }}</p>
            <p>Date: {{ subscriber.date }}</p>
            <p>Time: {{ subscriber.time }}</p>
            <p>Location: {{ subscriber.location }}</p>
          </li>
        </ul>
        <p v-else>No subscribers found.</p>
      </div>

      <!-- --------------------Contact Query---------------------------- -->
      <div class="contact_query" v-show="activetab === 'contact_query'">
        <h3 class="mt-3">NCCP's Total Contact Query</h3>
        <hr />
        <div
          style="
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          "
        >
          <div
            class="style_box"
            v-for="contactQuery in contactQueryList"
            :key="contactQuery._id"
          >
            <h5><bold>Subject : </bold> {{ contactQuery.message }}</h5>
            <p><b>First Name: </b> {{ contactQuery.firstName }}</p>
            <p><b>Last Name: </b> {{ contactQuery.lastName }}</p>
            <p><b>Email :</b> {{ contactQuery.email }}</p>
            <p><b>Contact Info: </b> {{ contactQuery.phoneNumber }}</p>
          </div>
        </div>
      </div>

      <!-- ------------------------------------Gallery--------------------------------------- -->
      <div v-show="activetab === 'gallery'">
        <div class="container">
          <h3>NCCP Gallery</h3>
          <hr />
          <div class="gallery_images">
            <div
              v-for="(item, index) in fetchedImagesData"
              :key="item._id"
              class="image_items"
              @click="openModal(index)"
            >
              <img
                :src="imagePath + item.imageUrl"
                alt="Photo"
                class="images"
              />
            </div>
          </div>

          <form
            @submit.prevent="uploadPhoto"
            class="mt-5 text-end"
            style="
              background-color: #edf2f7;
              padding: 20px;
              border-radius: 10px;
            "
          >
            <h4 class="text-end">Upload Photos</h4>
            <input type="file" class="mt-4" @change="onFileChange" required />
            <button type="submit" class="upload_btn">Upload</button>
          </form>

          <div v-if="isModalOpen" class="modal">
            <span class="close" @click="closeModal">&times;</span>
            <div style="height: 100%">
              <img
                :src="imagePath + fetchedImagesData[currentImageIndex].imageUrl"
                class="modal-content"
                style="height: 100%; width: 100%; object-fit: cover"
              />
              <a class="prev" @click="prevImage">&#10094;</a>
              <a class="next" @click="nextImage">&#10095;</a>
            </div>
          </div>
        </div>
      </div>

      <!-- -------------------create Email template---------------------- -->
      <div
        class="create_email_template"
        v-show="activetab === 'create_email_template'"
      >
        <text_editor />
      </div>
    </div>
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import text_editor from "../components/text_editor";
import HonoraryMembersForm from "../components/HonoraryMembersForm.vue";

export default {
  components: { HonoraryMembersForm, text_editor },
  data() {
    return {
      lifeMembers: [],
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
      fetchedSubscribers: [],
      editMemberData: [],
      isEditing: [],
      isEditingLifeMember: [],
      HideNccpForm: false,
      imagePath: "http://localhost:3000",
      photos: [],
      selectedFile: null,
      fetchedImagesData: [],
      currentImageIndex: 0,
      isModalOpen: false,
      emailSubject: "",
      emailMessage: "",
      options: {
        theme: "light4",
        animationEnabled: true,
        title: {
          text: "Website Visitor Analysis",
        },
        axisY: {
          title: "Number of Visits",
        },
        axisX: {
          valueFormatString: "DD MMM",
        },
        toolTip: {
          shared: true,
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries.bind(this), // Ensure the method is bound to `this`
        },
        data: [
          {
            type: "splineArea",
            name: "Total Visit",
            showInLegend: true,
            color: "#9FA8DA",
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
            color: "#26C6DA",
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
        height: "360px",
      },
    };
  },
  methods: {
    showToggleForm() {
      this.HideNccpForm = !this.HideNccpForm;
    },
    setActiveTab(tab) {
      this.activetab = tab;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    async fetchHonoraryMemberData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/honorarymembers/getHonorarymembers"
        );
        this.fetchedHonoraryData = response.data || [];
        this.isEditing = Array(this.fetchedHonoraryData.length).fill(false);
        this.editMemberData = JSON.parse(
          JSON.stringify(this.fetchedHonoraryData)
        ); // Clone original data for editing
        console.log(this.fetchedHonoraryData, "Fetched data");
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    },

    toggleEdit(index) {
      this.isEditing.splice(index, 1, !this.isEditing[index]);
    },
    toggleEditLifeMember(index) {
      this.isEditing.splice(index, 1, !this.isEditing[index]);
    },
    async saveEdit(index, memberId) {
      const updatedData = this.editMemberData[index]; // Get the edited data
      console.log("Attempting to save data:", updatedData);
      try {
        const response = await axios.put(
          `http://localhost:3000/honorarymembers/update/${memberId}`,
          updatedData
        );
        console.log(`Saving updated data for member ${memberId}:`, updatedData);
        if (response.status === 200) {
          this.fetchHonoraryMemberData();
          this.toggleEdit(index); // Exit edit mode
          toast.success("Member Data Update Successfully", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          console.error("Error: Failed to update member data");
          toast.error("Failed To Upload MemberData", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Error updating data:", error);
        alert("An error occurred while updating member data.");
      }
    },

    // ---------------------update life member--------------------
    // ---------------------update life member--------------------

    //get

    // async fetchLifeMembers() {
    //   try {
    //     const response = await axios.get('http://localhost:3000/fellowmember/getfellowmember');
    //     this.lifeMembers = response.data || [];
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     this.lifeMembers = [];
    //   }
    // },

    async fetchLifeMembers() {
      try {
        const response = await axios.get(
          "http://localhost:3000/fellowmember/getfellowmember"
        );
        this.lifeMembers = response.data || [];
        this.isEditingLifeMember = Array(this.lifeMembers.length).fill(false);
        this.editLifeMemberData = JSON.parse(JSON.stringify(this.lifeMembers)); // Clone original data for editing
        console.log(this.lifeMembers, "Fetched data");
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    },
    ///Update
    async saveEditLifeMembers(index, memberId) {
      const updatedData = this.editLifeMemberData[index]; // Get the edited data
      console.log("Attempting to save data:", updatedData);
      try {
        const response = await axios.put(
          `http://localhost:3000/fellowmember/updateMember/${memberId}`,
          updatedData
        );
        if (response.status === 200) {
          this.fetchLifeMembers(); // Refresh the list
          this.toggleEditLifeMember(index); // Exit edit mode
          toast.success("Member Data Updated Successfully", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          console.error("Error: Failed to update member data");
          toast.error("Failed To Update Member Data", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Error updating data:", error);
        alert("An error occurred while updating member data.");
      }
    },

    // ---------------------update life member--------------------
    // ---------------------update life member--------------------

    async fetchedSubscribersData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/news/subscribers"
        );
        this.totalSubscribers = response.data.length || 0;
        this.subscribersList = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.totalSubscribers = 0;
        this.subscribersList = [];
      }
    },
    async fetchedContactQueryData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/Contact_querys/getcontactquery"
        );
        this.totalContactQuery = response.data.length || 0;
        this.contactQueryList = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.totalContactQuery = 0;
        this.contactQueryList = [];
      }
    },
    toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    },
    functionShowLogout() {
      this.showLogOut = !this.showLogOut;
    },
    scrollToTop() {
      window.scrollTo({ top: 300, behavior: "smooth" });
    },

    // -----------------------gallery get post delete--------------------------------
    // post
    async uploadPhoto() {
      if (!this.selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("photo", this.selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3000/gallery/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Image Upload Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        this.fetchallimagesdata();
        this.photos.push(response.data);
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.error("Failed to upload image!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },

    // get
    async fetchallimagesdata() {
      try {
        const response = await axios.get(
          "http://localhost:3000/gallery/photos"
        );
        this.fetchedImagesData = response.data;
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    },

    // delete
    async deletePhoto(photoId) {
      try {
        const confirmDelete = confirm(
          "Are you sure you want to delete this photo?"
        );
        if (confirmDelete) {
          await axios.delete(`http://localhost:3000/gallery/photos/${photoId}`);
          this.$toast?.success("Photo deleted successfully");
          this.fetchallimagesdata(); // Refresh images after delete
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Error deleting photo";
        console.error("Error deleting photo:", errorMessage);
        this.$toast?.error(errorMessage); // Use optional chaining to avoid reading 'error' of undefined
      }
    },

    onFileChange(event) {
      this.selectedFile = event.target.files[0]; // Store the selected file
    },
    openModal(index) {
      this.currentImageIndex = index;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
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
    // End

    async sendEmail() {
      try {
        await axios.post("http://localhost:3000/news/sendEmails", {
          subject: this.emailSubject,
          message: this.emailMessage,
        });

        toast.success("Emails sent successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        this.emailSubject = "";
        this.emailMessage = "";
      } catch (error) {
        console.error(error);
        toast.error(
          "There was an error sending emails. Please try again later.",
          {
            position: "bottom-right",
            autoClose: 3000,
          }
        );
      }
    },
  },
  computed: {
    filteredLifeMembers() {
      if (this.searchQuery) {
        return this.lifeMembers.filter(
          (member) =>
            member.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            member.id.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.lifeMembers;
    },
    paginatedLifeMembers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredLifeMembers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredLifeMembers.length / this.itemsPerPage);
    },
  },
  async mounted() {
    this.fetchHonoraryMemberData();
    this.fetchLifeMembers();
    this.fetchedSubscribersData();
    this.fetchedContactQueryData();
    this.fetchallimagesdata();
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
}
.admin_items {
  display: grid;
  grid-template-columns: 20% 80%;
  gap: 5px;
  padding: 20px;
}
.left_side_menu,
.right_side_menu {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
}
.left_side_menu {
  height: 100vh;
  text-align: center;
  color: white;
  background: #0d6efd;
}
.left_side_menu li {
  list-style-type: none;
}
.left_side_menu i {
  position: relative;
  left: -10px;
}
.dashboard_btn {
  padding: 7px;
  border: none;
  width: 100%;
  margin: 10px 0px;
  outline: none;
  border-radius: 5px;
  background: #fff;
}
.admin_user {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.admin_dashboards_btn {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 20px;
}
.admin_user img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.dashboard_header {
  display: grid;
  grid-template-columns: 50% 20% 30%;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 10px;
}
.input_box {
  border: 1px solid #0d6efd;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  width: 260px;
}
.input_btn {
  padding: 8px 34px;
  margin: 0px 10px;
  color: #fff;
  background: #0d6efd;
  border: none;
  border-radius: 6px;
  outline: none;
}
.notifications_attachment_div {
  display: grid;
  place-items: center;
  grid-template-columns: 20% 20% 22% 36%;
}
.notifications_attachment_div i {
  font-size: 18px;
}
.user_img_div {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.user_img_div img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.profile_dropdown {
  position: relative;
  top: 2px;
  font-size: 15px !important;
  cursor: pointer;
}

.user_information_log_out {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: absolute;
  top: 105px;
  background: #fff;
  right: 25px;
  z-index: 999;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
.user_information_log_out li {
  list-style-type: none;
}

.user_information_log_out i {
  position: relative;
  left: -6px;
  top: 1px;
  font-size: 15px !important;
}

.admin_dashboards_btn button {
  width: 100%;
  color: #fff;
  border: 2px solid white;
  background: transparent;
  outline: none;
  padding: 7px;
  border-radius: 6px;
}

.admin_dashboards_btn .active {
  width: 100%;
  color: #000;
  border: none;
  background: #fff;
  outline: none;
  padding: 7px;
  border-radius: 6px;
}
.admin_dashboards_btn button:hover {
  width: 100%;
  color: #000;
  border: none;
  background: #fff;
  outline: none;
  padding: 7px;
  border-radius: 6px;
  transition: 0.7s;
}

.member-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 30px;
}

.edit_button {
  position: absolute;
  left: 78px;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
}

/* --------------------------------Dashboard css----------------------------------*/
.show_websites_knowledge {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  place-content: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}
.subscription_query_visit {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
}
.subscription_query_visit h4 {
  color: #0d6efd;
  font-size: 14px;
}
.subscription_query_visit:hover {
  background: #0d6efd;
  transition: 0.5s;
}
.subscription_query_visit:hover h4 {
  color: #fff;
  transition: 0.5s;
}
.upload_member {
  float: right;
  padding: 13px 20px;
  margin: 20px 0px;
  border: none;
  outline: none;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.honorary_form {
  width: 100% !important;
  padding: 5px;
  margin-top: -128px !important;
}

/*--------Subscribers page css---------------*/
.subscribers {
  padding: 20px;
}

.style_box {
  padding: 25px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}
.notification-count {
  background-color: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 3px 7px;
  position: absolute;
  top: -10px;
  right: -10px;
}

.newletter_subsriber_count {
  font-size: 13px;
  position: relative;
  top: -7px;
}
.gallery_images {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.image_items {
  height: 300px;
  width: 100%;
  border-radius: 10px;
}
.image_items img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.upload_btn {
  padding: 10px 30px;
  border-radius: 10px;
  color: #fff;
  background: #007bff;
  border: none;
}
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  align-items: center;
  justify-content: center;
}
.modal-content {
  max-width: 90%;
  max-height: 80%;
  margin: auto;
  display: block;
}
.close {
  position: absolute;
  top: 20px;
  right: 35px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}
.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}
.next {
  right: 10px;
  border-radius: 3px 0 0 3px;
}
.prev {
  left: 10px;
  border-radius: 3px 0 0 3px;
}
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
@media (max-width: 800px) {
  .gallery_images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
@media (max-width: 768px) {
  .gallery_images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
@media (max-width: 468px) {
  .gallery_images {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
}

.delete_btn {
  width: 83%;
  padding: 4px 0px;
  border: none;
  background-color: red;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  right: -18px;
  top: -12px;
}
.profile-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
