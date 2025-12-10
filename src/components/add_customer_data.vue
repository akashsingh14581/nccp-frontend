<template>
  <form @submit.prevent="submitForm">
    
      <div id="Heading_1">
        <div class="">
          <h4>Add Customer Data (CRM) <span /></h4>
        </div>
      </div>

        <div class="field">
          <input
            ref="fileInput"
            type="file"
            accept=".csv, .xls, .xlsx, .txt"
            name="import_contact"
            placeholder=" "
            class="textbox"
            data-secure_code="54v3e4sc"
            style="display: block"
            @change="handleFileChange"
          />
          <!-- v-model="third__add_customer_data.import_contact" -->
          <label class="form_Label" for=""
            >Import Contact | Customer Data (In Bulk)</label
          >
        </div>
       
        <div class="">
          <input
            v-model="excel_format"
            class="notificationForAlret"
            type="radio"
            name="fileData"
            value="Excel Format"
            data-secure_code="RLGdztlI"
          />
          <label for="">Excel Format</label><br />
        </div>
        
      
    
   

  </form>
  
  <!-- <third__add_customer_data />
  <first_form_add_customer_data /> -->
  
</template>
<script>
import axios from "axios";

import { Country, State, City } from "country-state-city";
import second_add_customer_data from "./datatable_second_add_customer_data.vue";
// import third__add_customer_data from './datatable_third__add_customer_data.vue';
// import first_form_add_customer_data from './datatable_first_form_add_customer_data.vue';
import crmsubgroupcode from "./datatable_crm_subgroup_code.vue";
import {API_BASE_URL} from '../utils/apis.js'

export default {
  name: "AddCustomerData",
  components: {
    second_add_customer_data,
    // third__add_customer_data,
    // first_form_add_customer_data,
    crmsubgroupcode,
  },
  data() {
    return {
      countries: [],
      states: [],
      cities: [],

      second_add_customer_data: {
        company_code: "",
        Operational_unit: "",
        department: "",

        hospitalname: "",
      },

      third__add_customer_data: {
        user_sub_group_name: "",
        selectedFile: null,
        import_in_user_category_from_sector: "",
        user_roles: "",
        import_contact: "",
        // csv_format: "",
        // excel_format: "",
        // textformet: "",
        bulkpassword: "",

        selectedCountry: "",
        selectedState: "",
        selectedCity: "",

        hospitalname: "",
      },
      first_form_add_customer_data: {
        name: "",
        email: "",
      },
      myform: [
        "second_add_customer_data",
        "third__add_customer_data",
        "first_form_add_customer_data",
      ],
      tableHeaders: [],
      tableData: [],
      records: [],
      items: [],
    };
  },
  created() {
    this.countries = Country.getAllCountries();
  },
  methods: {
    submitForm: function () {
      const headers = { "Content-Type": "multipart/form-data" };

      axios
        .post(
          `${API_BASE_URL}/add_customer_data/formdata_add`,
          {
            all_form: [
              this.second_add_customer_data,
              this.third__add_customer_data,
              this.first_form_add_customer_data,
            ],
            myforms: this.myform,
          },
          { headers }
        )
        .then((response) => {
          // Handle the response from the server if needed

          alert(response.data.message);
        })
        .catch((error) => {
          // Handle errors if the request fails
          console.error(error);
        });
      this.formSubmitted = true;
    },

    handleFileChange() {
      this.third__add_customer_data.selectedFile =
        this.$refs.fileInput.files[0];
    },

    onCountryChange() {
      this.states = State.getStatesOfCountry(
        this.third__add_customer_data.selectedCountry
      );
      this.cities = [];
      this.third__add_customer_data.selectedState = "";
      this.third__add_customer_data.selectedCity = "";
    },
    onStateChange() {
      this.cities = City.getCitiesOfState(
        this.third__add_customer_data.selectedCountry,
        this.third__add_customer_data.selectedState
      );
      this.third__add_customer_data.selectedCity = "";
    },
  },
};
</script>
<style scoped>
.customize-table {
  --easy-table-header-background-color: #6b0a23;
  --easy-table-header-font-color: #fff;
}
.formImputGrid5 {
  display: grid;
  grid-template-columns: 10% 45% 45%;
  margin-bottom: 7px;
}

.formImputGrid12 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 7px;
}

@import "../assets/uploads/CRM/add_customer_data/Add_customer_data.css";
</style>
