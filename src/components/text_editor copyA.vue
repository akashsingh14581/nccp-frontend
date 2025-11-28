<template>
  <div>
    <h4 class="mt-3">Create Email Template</h4>
    <hr>
    <form @submit.prevent="sendEmailTemplateAllData">
      <div class="input_boxes">
        <input v-model="sendEmailTemplate.templateName" placeholder="Enter Email Template Name" required>
        <input v-model="sendEmailTemplate.templateTitle" placeholder="Enter Email Template Title" required>
        <input v-model="sendEmailTemplate.templateSubject" placeholder="Enter Email Template Subject" required>
      </div>

      <div class="OuterAreaEditor">
        <div class="top-section-editor2">
          <button type="button" class="pull-left topBarButtons" @click="saveText">
            <i class="fas fa-save" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="saveData">
            <i class="fa-solid fa-cloud-arrow-down" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="applyBoldFormatting">
            <i class="fas fa-bold" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="applyItalicFormatting">
            <i class="fas fa-italic" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="applyUnderlineFormatting">
            <i class="fas fa-underline" />
          </button>
          <button type="button" class="pull-left topBarButtons" style="margin-right: 6px"
            @click="applyStrikeThroughFormatting">
            <i class="fas fa-strikethrough" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="applySubscriptFormatting">
            <i class="fas fa-subscript" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="applySuperscriptFormatting">
            <i class="fas fa-superscript" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="increaseFontSize">
            <i class="fas fa-font" />+
          </button>
          <button type="button" class="pull-left topBarButtons" @click="decreaseFontSize">
            <i class="fas fa-font" />-
          </button>
          <button type="button" class="pull-left topBarButtons" @click="applyBulletPoint">
            <i class="fas fa-list-ul" />
          </button>
          <button type="button" class="pull-left topBarButtons" @click="applyOrderedList">
            <i class="fas fa-list-ol" />
          </button>

          <button class="topBarButtons" style="position: relative">
            T
            <input v-model="fontColor" type="color" class="pull-left topBar"
              style="height: 20px; width: 20px; position: absolute; top: 0; left: 0" @change="applyFontColor"
              required />
          </button>

          <button class="topBarButtons" style="position: relative">
            B
            <input v-model="backgroundColor" type="color" class="pull-left topBar"
              style="height: 20px; width: 20px; position: absolute; top: 0; left: 0" @change="applyBackgroundColor" />
          </button>

          <select type="button" class="pull-left topBarButtons" @change="applyFontFamily">
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Palatino">Palatino</option>
            <option value="Garamond">Garamond</option>
            <option value="Bookman">Bookman</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Arial Black">Arial Black</option>
            <option value="Impact">Impact</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Geneva">Geneva</option>
            <option value="Courier">Courier</option>
            <option value="Lucida Console">Lucida Console</option>
            <option value="Monaco">Monaco</option>
            <option value="Brush Script MT">Brush Script MT</option>
            <option value="Copperplate">Copperplate</option>
          </select>
        </div>



        <div ref="editableContent" contenteditable="true" class="textAreaEditor" @input="updateTemplateContent" />
      </div>
      <button v-if="!editMode" type="submit" class="save_btn" style="margin-top: 80px;">Save</button>
      <button v-if="editMode" @click="updateEmailTemplate" type="button" class="save_btn"
        style="margin-top: 80px;">Update</button>
      <button v-if="editMode" @click="cancelEdit" type="button" class="save_btn" style="margin-top: 80px;">Cancel
        Edit</button>
    </form>

    <table class="mt-3" v-if="fetchedEmailTemplateData.length">
      <tr>
        <th>Email Template Name</th>
        <th>Email Template Title</th>
        <th>Email Template Subject</th>
        <th>Email Template Content</th>
      </tr>

      <tr v-for="item in fetchedEmailTemplateData" :key="item._id">
        <td>{{ item.templateName }}</td>
        <td>{{ item.templateTitle }}</td>
        <td>{{ item.templateSubject }}</td>
        <td>{{ item.templateContent }}</td>
        <td>
          <button class="table_btns" v-tooltip="'Send Email To Subscribers'">Send Email</button>
          <button class="table_btns" @click="editEmailTemplate(item)">Edit</button>
          <button class="table_btns" @click="deleteEmailTemplate(item._id)">Delete</button>
          <!-- <button class="table_btns">View</button> -->
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

export default {
  data() {
    return {
      editMode: false,
      fontSize: 16,
      fontColor: "#000000",
      backgroundColor: "#000000",
      fetchedEmailTemplateData: [],
      sendEmailTemplate: {
        templateName: '',
        templateTitle: '',
        templateSubject: '',
        templateContent: '',
        _id: null,
      }
    };
  },
  methods: {
    cancelEdit() {
      this.editMode = false
      this.sendEmailTemplate = {
        templateName: '',
        templateTitle: '',
        templateSubject: '',
        templateContent: '',
        _id: null,
      }
    },
    editEmailTemplate(template) {
      this.editMode = true;
      this.sendEmailTemplate = { ...template };
      this.$refs.editableContent.innerHTML = template.templateContent;
    },

    updateTemplateContent() {
      this.sendEmailTemplate.templateContent = this.$refs.editableContent.innerHTML;
    },

    // POST: Create a new email template
    async sendEmailTemplateAllData() {
      try {
        await axios.post(`http://localhost:3000/templateData/postEmailTemplateData`, this.sendEmailTemplate);
        toast.success("Template Created Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        this.resetForm();
        this.getAllEmailTemplateSaveData();
        // Refresh the table after creation
      } catch (error) {
        console.error('Error creating template:', error);
        toast.error("Failed to create template", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },

    // PUT: Update an existing email template by ID
    async updateEmailTemplate() {
      try {
        console.log('Updating template with data:', this.sendEmailTemplate);
        await axios.put(`http://localhost:3000/templateData/updateEmailTemplateData/${this.sendEmailTemplate._id}`, this.sendEmailTemplate);
        toast.success("Template Updated Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        this.resetForm();
        this.getAllEmailTemplateSaveData(); // Refresh the table after update
        this.editMode = false
      } catch (error) {
        console.error('Error updating template:', error);
        toast.error("Failed to update template", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },


    // GET: Fetch all email templates
    async getAllEmailTemplateSaveData() {
      try {
        const response = await axios.get(`http://localhost:3000/templateData/getEmailTemplateData`);
        console.log(response.data);  // Log the fetched data
        this.fetchedEmailTemplateData = response.data;
      } catch (error) {
        console.error('Error fetching data', error);  // Log any error
        toast.error("Failed to fetch templates", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    // DELETE: Delete a template by ID
    async deleteEmailTemplate(id) {
      if (confirm("Are you sure you want to delete this template?")) {
        try {
          await axios.delete(`http://localhost:3000/templateData/deleteEmailTemplateData/${id}`);
          toast.success("Template Deleted Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          this.getAllEmailTemplateSaveData(); // Refresh the table after deletion
        } catch (error) {
          console.error('Error deleting template:', error);
          toast.error("Failed to delete template", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    },

    // Reset form after successful action
    resetForm() {
      this.sendEmailTemplate = {
        templateName: '',
        templateTitle: '',
        templateSubject: '',
        templateContent: '',
        _id: null,
      };
      this.$refs.editableContent.innerHTML = ""; // Clear the editor content
    },
    saveText() {
      let content = this.$refs.editableContent.textContent;
      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "myFile.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Text Saved Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },

    applyBoldFormatting() {
      document.execCommand('bold');
    },
    applyItalicFormatting() {
      document.execCommand('italic');
    },
    applyUnderlineFormatting() {
      document.execCommand('underline');
    },
    applyStrikeThroughFormatting() {
      document.execCommand('strikethrough');
    },
    applySubscriptFormatting() {
      document.execCommand('subscript');
    },
    applySuperscriptFormatting() {
      document.execCommand('superscript');
    },
    applyBulletPoint() {
      document.execCommand('insertUnorderedList');
    },
    applyOrderedList() {
      document.execCommand('insertOrderedList');
    },
    increaseFontSize() {
      document.execCommand('fontSize', false, this.fontSize + 1);
      this.fontSize++;
    },
    decreaseFontSize() {
      document.execCommand('fontSize', false, this.fontSize - 1);
      this.fontSize--;
    },
    applyFontColor() {
      document.execCommand('foreColor', false, this.fontColor);
    },
    applyBackgroundColor() {
      document.execCommand('backColor', false, this.backgroundColor);
    },
    applyFontFamily(event) {
      document.execCommand('fontName', false, event.target.value);
    }

  },
  mounted() {
    this.getAllEmailTemplateSaveData();
  }
};
</script>

<style scoped>
.pull-left {
  padding: 6px 10px;
  border-radius: 5px;
  background: white;
  transition: 0.5s;
  border: 0.5px solid lightgray;
}

.topBarButtons {
  cursor: pointer;
  padding: 6px 19.6px;
  border-radius: 5px;
  background: white;
  transition: 0.5s;
  border: 0.5px solid lightgray;
  margin-right: -3px;
}

ul,
ol {
  padding: 13px;
}

.topBar {
  cursor: pointer;
  padding: 0;
  border-radius: 5px;
  margin-left: 2px;
  background: white;
  transition: 0.5s;
  border: none;
}

.topBarButtons:hover {
  background-color: rgb(248, 237, 237);
}

.top-section-editor2 {
  padding: 10px;
  padding-top: 6px;
  border-radius: 7px;
  background-color: #fff;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  margin-bottom: -14px;
  margin-top: -3px;
}

.OuterAreaEditor {
  width: 100%;
  border-radius: 7px;
  height: 35vh;
  background: white;
  padding: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgb(149 138 138); */
}

.textAreaEditor {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 20px;
  border-radius: 7px;
  border: 1px solid lightgray;
  outline: none;
  resize: both;
  overflow: hidden;
}

.input_boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 10px;
}

.input_boxes input {
  width: 100%;
  height: 30px;
  padding: 20px;
  outline: none;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  border-radius: 10px;
}

table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 5px;
}

tr th {
  background: #0d6efd;
  color: #fff;
}

.save_btn {
  padding: 4px 40px;
  border: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #0d6efd;
  background: transparent;
  margin: 0px 10px;
}

.table_btns {
  margin: 0px 2px;
  color: #000;
  background: transparent;
  border: 1px solid #0d6efd;
}











/* Scoped styles for the tooltip */
.tooltip {
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  padding: 18px 22px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 200px;
  text-align: center;
}

.tooltip[data-popper-placement^='top'] .tooltip-arrow {
  border-top-color: #333;
}

.tooltip[data-popper-placement^='bottom'] .tooltip-arrow {
  border-bottom-color: #333;
}

.tooltip[data-popper-placement^='left'] .tooltip-arrow {
  border-left-color: #333;
}

.tooltip[data-popper-placement^='right'] .tooltip-arrow {
  border-right-color: #333;
}

.tooltip-arrow {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
}
</style>
