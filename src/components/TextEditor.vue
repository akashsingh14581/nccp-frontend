<template>
  <div class="OuterAreaEditor">
    <div class="top-section-editor2">
      <button class="pull-left topBarButtons" @click="saveText">
        <i class="fas fa-save" />
      </button>
      <button class="pull-left topBarButtons" @click="saveData">
        <i class="fa-solid fa-cloud-arrow-down" />
      </button>
      <button class="pull-left topBarButtons" @click="applyBoldFormatting">
        <i class="fas fa-bold" />
      </button>
      <button class="pull-left topBarButtons" @click="applyItalicFormatting">
        <i class="fas fa-italic" />
      </button>
      <button class="pull-left topBarButtons" @click="applyUnderlineFormatting">
        <i class="fas fa-underline" />
      </button>
      <button
        class="pull-left topBarButtons"
        style="margin-right: 6px"
        @click="applyStrikeThroughFormatting"
      >
        <i class="fas fa-strikethrough" />
      </button>
      <button class="pull-left topBarButtons" @click="applySubscriptFormatting">
        <i class="fas fa-subscript" />
      </button>
      <button
        class="pull-left topBarButtons"
        @click="applySuperscriptFormatting"
      >
        <i class="fas fa-superscript" />
      </button>
      <button class="pull-left topBarButtons" @click="increaseFontSize">
        <i class="fas fa-font" />+
      </button>
      <button class="pull-left topBarButtons" @click="decreaseFontSize">
        <i class="fas fa-font" />-
      </button>
      <button class="pull-left topBarButtons" @click="applyBulletPoint">
        <i class="fas fa-list-ul" />
      </button>
      <button class="pull-left topBarButtons" @click="applyOrderedList">
        <i class="fas fa-list-ol" />
      </button>

      <button class="topBarButtons" style="position: relative">
        T
        <input
          v-model="fontColor"
          type="color"
          class="pull-left topBar"
          style="height: 20px; width: 20px; position: absolute; top: 0; left: 0"
          @change="applyFontColor"
        />
      </button>

      <button class="topBarButtons" style="position: relative">
        B
        <input
          v-model="backgroundColor"
          type="color"
          class="pull-left topBar"
          style="height: 20px; width: 20px; position: absolute; top: 0; left: 0"
          @change="applyBackgroundColor"
        />
      </button>

      <select class="pull-left topBarButtons" @change="applyFontFamily">
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
    <div
      ref="editableContent"
      contenteditable="true"
      class="textAreaEditor"
      @input="handleInput"
    />
  </div>
</template>

<script>
// In your JavaScript or TypeScript file
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'

export default {
  data() {
    return {
      fontSize: 16,
      fontColor: "#000000",
      backgroundColor: "#000000",
    };
  },
  methods: {
    saveText() {
      // For example, save to localStorage
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

      // localStorage.setItem('savedText', a);
      alert("Text saved successfully!");
    },
    async saveData() {
      try {
        let content = this.$refs.editableContent.innerHTML;
        const user_id = this.$store.getters.hasuserdetails._id;
        const fileName = prompt("Enter File Name");
        if (fileName == null) {
          return false;
        }

        const response = await axios.post(
          `${API_BASE_URL}/editor/editableContent`,
          { fileName, content, user_id }
        );

        // Handle the response, if needed
        console.log(response.data);

        // Show a success message or perform other actions
        alert("Data saved successfully!");
      } catch (error) {
        // Handle errors
        console.error("Error saving data:", error);
        alert("Error saving data. Please try again.");
      }
    },

    applyBoldFormatting() {
      document.execCommand("bold", false, null);
    },

    applyItalicFormatting() {
      document.execCommand("italic", false, null);
    },

    applyUnderlineFormatting() {
      document.execCommand("underline", false, null);
    },

    applyStrikeThroughFormatting() {
      document.execCommand("strikethrough", false, null);
    },

    increaseFontSize() {
      this.fontSize += 2;
      this.applyFontSize();
    },
    decreaseFontSize() {
      if (this.fontSize > 2) {
        this.fontSize -= 2;
        this.applyFontSize();
      }
    },
    applyFontSize() {
      document.execCommand("fontSize", false, this.fontSize.toString());
    },

    applyFontColor() {
      document.execCommand("foreColor", false, this.fontColor);
    },

    applyBackgroundColor() {
      document.execCommand("backColor", false, this.backgroundColor);
    },
    applyFontFamily(event) {
      const fontFamily = event.target.value;
      console.log(fontFamily);
      document.execCommand("fontName", false, fontFamily);
    },
    applySubscriptFormatting() {
      document.execCommand("subscript", false, null);
    },

    applySuperscriptFormatting() {
      document.execCommand("superscript", false, null);
    },

    applyBulletPoint() {
      document.execCommand("insertUnorderedList", false, null);
    },
    applyOrderedList() {
      document.execCommand("insertOrderedList", false, null);
    },
    handleInput() {
      // Emit the HTML content whenever there's an input
      this.$emit("html-updated", this.$refs.editableContent.innerHTML);
    },
  },
};
</script>

<style scoped>
/* Add any styling if needed */
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
  width: 259mm;
  border-radius: 7px;
  height: 38vh;
  position: absolute;
  background: white;
  top: 9%;
  left: 0%;
  padding: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border: 1px solid rgb(149 138 138); */
}
.textAreaEditor {
  width: 93%;
  height: 37%;
  margin-top: 20px;
  padding: 20px;
  border-radius: 7px;
  border: 1px solid lightgray;
  outline: none;
  resize: both;
  overflow: hidden;
}
</style>
