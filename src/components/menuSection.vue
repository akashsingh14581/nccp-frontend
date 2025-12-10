<template>
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container">
      <div class="header-container d-flex align-items-center justify-content-between" style="margin:0px auto;">
        <!-- Logo -->
        <div class="logo">
          <router-link @click="closeMobileMenu" to="/">
            <img src="../assets/logo.png" alt="Logo" class="img-fluid" loading="lazy" />
          </router-link>
        </div>

        <!-- Navbar -->
        <nav id="navbar" class="navbar">
          <ul>
            <!-- Home -->
            <li>
              <router-link @click="closeMobileMenu" :to="'/'" class="nav-link scrollto"
                :class="{ active: isActive('/') }">
                Home
              </router-link>
            </li>

            <!-- About Us -->
            <li class="dropdown">
              <a href="#" :class="{ active: isActive('/Guidelines') }" @click="toggleDropdown">
                <span>About Us</span> <i class="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li>
                  <router-link @click="closeMobileMenu" to="/Guidelines" :class="{ active: isActive('/Guidelines') }">
                    Our Guidelines
                  </router-link>
                </li>
                <li>
                  <router-link @click="closeMobileMenu" to="/Constitution"
                    :class="{ active: isActive('/Constitution') }">
                    Our Constitution
                  </router-link>
                </li>

                <li><router-link @click="closeMobileMenu" to="/ExecutiveMembers">Executive Members</router-link></li>

                <li>
                  <router-link @click="closeMobileMenu" to="/Rules&Regulations"
                    :class="{ active: isActive('/Rules&Regulations') }">
                    Rules & Regulations
                  </router-link>
                </li>
                <li>
                  <router-link @click="closeMobileMenu" to="/about" :class="{ active: isActive('/about') }">
                    Who We Are
                  </router-link>
                </li>
                <li>
                  <router-link @click="closeMobileMenu" to="/President_And_Secretaries"
                    :class="{ active: isActive('/President_And_Secretaries') }">
                    President & Secretaries
                  </router-link>
                </li>

                <!-- NCCP Members -->
                <li class="dropdown">
                  <a href="#" @click="toggleDropdown">
                    <span>NCCP Members</span>
                    <i class="bi bi-chevron-right"></i>
                  </a>
                  <ul>
                    <li>
                      <router-link @click="closeMobileMenu" to="/Nccp_Honorary_Members"
                        :class="{ active: isActive('/Nccp_Honorary_Members') }">
                        NCCP Honorary Members
                      </router-link>
                    </li>
                    <li>
                      <router-link @click="closeMobileMenu" to="/Nccp_Life_Members"
                        :class="{ active: isActive('/Nccp_Life_Members') }">
                        NCCP Life Members
                      </router-link>
                    </li>
                    <li>
                      <router-link @click="closeMobileMenu" to="/Nccp_Ordinary_Members"
                        :class="{ active: isActive('/Nccp_Ordinary_Members') }">
                        NCCP Ordinary Fellow Members
                      </router-link>
                    </li>
                    <li>
                      <router-link @click="closeMobileMenu" to="/Nccp_Life_Fellow_Members"
                        :class="{ active: isActive('/Nccp_Life_Fellow_Members') }">
                        NCCP Life Fellow Members
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <!-- Activities -->
            <li class="dropdown">
              <a href="#" :class="{ active: isActive('/activities') }" @click="toggleDropdown">
                <span>Activities</span> <i class="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li>
                  <router-link @click="closeMobileMenu" to="/nccp_education"
                    :class="{ active: isActive('/nccp_education') }">
                    Education
                  </router-link>
                </li>
                <li>
                  <router-link @click="closeMobileMenu" to="/Napcon_Nccp" :class="{ active: isActive('/Napcon_Nccp') }">
                    NAPCON
                  </router-link>
                </li>
                <li>
                  <router-link @click="closeMobileMenu" to="/conference" :class="{ active: isActive('/conference') }">
                    Conference
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Awards (Dynamic) -->
            <li class="dropdown">
              <a href="#" :class="{ active: isActive('/awards') }" @click="toggleDropdown">
                <span>Awards</span> <i class="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li v-for="award in awards" :key="award._id" class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  @click="navigateToAward(award._id)">
                  {{ award.awardName }}
                </li>
              </ul>
            </li>

            <!-- Publications -->
            <li>
              <router-link @click="closeMobileMenu" to="/nccp_publications" class="nav-link scrollto"
                :class="{ active: isActive('/nccp_publications') }">
                NCCP Publications
              </router-link>
            </li>

            <!-- Gallery -->
            <!-- <li>
              <router-link @click="closeMobileMenu" to="/our_gallery" class="nav-link scrollto"
                :class="{ active: isActive('/our_gallery') }">
                Gallery
              </router-link>
            </li> -->

            <!-- Our Events -->
            <!-- <li class="dropdown">
              <a href="#" :class="{ active: isActive('/events') }" @click="toggleDropdown">
                <span>Our Events</span> <i class="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li><router-link @click="closeMobileMenu" to="/NAPCON2020">NAPCON 2020</router-link></li>
                <li><router-link @click="closeMobileMenu" to="/NAPCON2021">NAPCON 2021</router-link></li>
              </ul>
            </li> -->

            <!-- NAPCONS -->
            <li class="dropdown">
              <a href="#" :class="{ active: isActive('/napcon') }" @click="toggleDropdown">
                <span>NAPCONS</span> <i class="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li v-for="year in years" :key="year">
                  <router-link @click="closeMobileMenu" :to="{ name: 'NapconYear', params: { year } }">
                    NAPCON {{ year }}
                  </router-link>
                </li>
              </ul>
            </li>



            <!-- Contact -->
            <a class="getstarted">Contact Us</a>
          </ul>

          <i class="bi bi-list mobile-nav-toggle" @click="toggleMobileMenu"></i>
        </nav>
      </div>


    </div>
  </header>
</template>

<script>
import axios from "axios";
import {API_BASE_URL} from '../utils/apis.js'
export default {
  name: "AppNavbar",

  data() {
    return {
      showpopup: false,
      years: [],
      awards: [],
    };
  },

  computed: {
    isActive() {
      return (path) => this.$route.path === path;
    },
  },

  methods: {
    toggleDropdown(event) {
      if (document.querySelector("#navbar").classList.contains("navbar-mobile")) {
        event.preventDefault();
        const dropdown = event.currentTarget.nextElementSibling;
        dropdown.classList.toggle("dropdown-active");
      }
    },



    toggleMobileMenu() {
      const navbar = document.querySelector("#navbar");
      navbar.classList.toggle("navbar-mobile");

      // Toggle icon (menu <-> close)
      const icon = document.querySelector(".mobile-nav-toggle");
      icon.classList.toggle("bi-list");
      icon.classList.toggle("bi-x");
    },

    closeMobileMenu() {
      const navbar = document.querySelector("#navbar");
      const icon = document.querySelector(".mobile-nav-toggle");
      if (navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        icon.classList.add("bi-list");
        icon.classList.remove("bi-x");
      }
    },

    async navigateToAward(awardId) {
      this.closeMobileMenu(); // ✅ Close mobile nav when clicking any award link
      await this.$router.push(`/awards/${awardId}`);
    },

    async fetchYears() {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events`);
        const EventData = res.data;
        const allYears = EventData.map((item) => item.year);
        this.years = [...new Set(allYears)].sort((a, b) => b - a);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    },

    async fetchAwards() {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/awards`);
        this.awards = res.data;
      } catch (error) {
        console.error("Error fetching awards:", error);
      }
    },
  },

  async mounted() {
    await this.fetchYears();
    await this.fetchAwards();
  },
};
</script>



<style scoped>
.navbar .active {
  color: #0d6efd;
  /* Define your active link styles */
}

.container {
  max-width: 1200PX;
}

a {
  color: #0d6efd;
  text-decoration: none;
}

.icon-fix {
  position: fixed;
  top: 45%;
  left: 0px;
}

.round {
  margin: 0px 0px;
  padding: 10px;
  border-radius: 50%;
}



.bi-facebook {
  color: #0d6efd;
}

.bi-instagram {
  color: red;
}

.bi-twitter-x {
  color: gray;
}

.bi-linkedin {
  color: rgb(11, 45, 196);
}

/*--------------------------------------------------------------
  # Back to top button
  --------------------------------------------------------------*/
.back-to-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 996;
  background: #0d6efd;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  transition: all 0.4s;
}

.back-to-top i {
  font-size: 28px;
  color: #fff;
  line-height: 0;
}

.back-to-top:hover {
  background: #00c28e;
  color: #fff;
}

.back-to-top.active {
  visibility: visible;
  opacity: 1;
}

/*--------------------------------------------------------------
  # Disable AOS delay on mobile
  --------------------------------------------------------------*/
@media screen and (max-width: 768px) {
  [data-aos-delay] {
    transition-delay: 0 !important;
  }
}

/*--------------------------------------------------------------
  # Header
  --------------------------------------------------------------*/
#header {
  transition: all 0.5s;
  z-index: 997;
  transition: all 0.5s;
  top: 15px;
}

#header .header-container {
  background: #fff;
  border-radius: 5px;
  height: 60px;
  margin-top: -15px;
  padding-left: 10px;
}

#header .logo {
  border-radius: 10px;
  height: 60px;
  width: 60px;
  padding: 3px;
}

#header .logo h1 {
  font-size: 26px;
  padding: 0;
  line-height: 1;
  font-weight: 700;
}

#header .logo h1 a,
#header .logo h1 a:hover {
  color: #fff;
  text-decoration: none;
}

#header .logo img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media (max-width: 992px) {
  #header {
    top: 10px;
  }

  #header.header-scrolled,
  #header .header-container {
    height: 50px;
    width: 95%;
    padding-left: 5px;
  }

  #header .logo {
    height: 45px;
    width: 45px;
  }

  #header .logo h1 {
    font-size: 24px;
  }
}

/*--------------------------------------------------------------
  # Navigation Menu
  --------------------------------------------------------------*/
/**
  * Desktop Navigation 
  */
.navbar {
  padding: 0;
}

.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar li {
  position: relative;
}

.navbar a,
.navbar a:focus {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 30px;
  color: #36343a;
  transition: 0.3s;
  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;
  transition: 0.3s;
}

.navbar a i,
.navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
}

.navbar a:hover,
.navbar .active,
.navbar .active:focus,
.navbar li:hover>a {
  color: #0d6efd;
}

.navbar .getstarted,
.navbar .getstarted:focus {
  background: #0d6efd;
  padding: 10px 25px;
  margin-left: 30px;
  margin-right: 15px;
  border-radius: 50px;
  color: #fff;
}

.navbar .getstarted:hover,
.navbar .getstarted:focus:hover {
  color: #fff;
  cursor: pointer;
}

.navbar .dropdown ul {
  display: block;
  position: absolute;
  left: 14px;
  top: calc(100% + 30px);
  margin: 0;
  padding: 10px 0;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
  transition: 0.3s;
}

.navbar .dropdown ul li {
  min-width: 200px;
  font-size: 13px;
  text-transform: capitalize;
}

.navbar .dropdown ul a {
  padding: 10px 20px;
  text-transform: none;
  font-weight: 500;
}

.navbar .dropdown ul a i {
  font-size: 12px;
}

.navbar .dropdown ul a:hover,
.navbar .dropdown ul .active:hover,
.navbar .dropdown ul li:hover>a {
  color: #0d6efd;
}

.navbar .dropdown:hover>ul {
  opacity: 1;
  top: 100%;
  visibility: visible;
}

.navbar .dropdown .dropdown ul {
  top: 0;
  left: calc(100% - 30px);
  visibility: hidden;
}

.navbar .dropdown .dropdown:hover>ul {
  opacity: 1;
  top: 0;
  left: 100%;
  visibility: visible;
}

@media (max-width: 1366px) {
  .navbar .dropdown .dropdown ul {
    left: -90%;
  }

  .navbar .dropdown .dropdown:hover>ul {
    left: -100%;
  }
}

/**
  * Mobile Navigation 
  */
.mobile-nav-toggle {
  color: black;
  font-size: 28px;
  cursor: pointer;
  display: none;

  transition: 0.5s;
  padding-left: 10px;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }

  .navbar ul {
    display: none;
  }
}

.navbar-mobile {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: white;
  transition: 0.3s;
  z-index: 999;
}

.navbar-mobile .mobile-nav-toggle {
  position: absolute;
  top: 15px;
  right: 15px;
}

.navbar-mobile ul {
  display: block;
  position: absolute;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  padding: 10px 0;
  background-color: #fff;
  overflow-y: auto;
  transition: 0.3s;
}

.navbar-mobile a,
.navbar-mobile a:focus {
  padding: 10px 20px;
  font-size: 15px;
  color: #36343a;
}

.navbar-mobile a:hover,
.navbar-mobile .active,
.navbar-mobile li:hover>a {
  color: #0d6efd;
}

.navbar-mobile .getstarted,
.navbar-mobile .getstarted:focus {
  margin: 15px;
}

.navbar-mobile .dropdown ul {
  position: static;
  display: none;
  margin: 10px 20px;
  padding: 10px 0;
  z-index: 99;
  opacity: 1;
  visibility: visible;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
}

.navbar-mobile .dropdown ul li {
  min-width: 200px;
}

.navbar-mobile .dropdown ul a {
  padding: 10px 20px;
}

.navbar-mobile .dropdown ul a i {
  font-size: 12px;
}

.navbar-mobile .dropdown ul a:hover,
.navbar-mobile .dropdown ul .active:hover,
.navbar-mobile .dropdown ul li:hover>a {
  color: #0d6efd;
}

.navbar-mobile .dropdown>.dropdown-active {
  display: block;
}

.pop-up-contact {
  display: grid;
  place-content: center;
  place-items: center;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.8);
}

.popup-form {
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 50px;
}

.popup-form i {
  cursor: pointer;
  position: absolute;
  right: 26%;
  margin-top: -30px;
  font-size: 20px;
  color: #0d6efd;
}

.formsubmit {
  padding: 30px;
}

.form-input {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-input input {
  width: 300px;
  border: none;
  border-bottom: 1px solid #0d6efd;
  background: transparent;
}

::placeholder {
  color: #fff;
}

.router-link-active.router-link-exact-active {
  color: #0d6efd;
}

.input-message {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #0d6efd;
}

.submit {
  text-align: center;
}

.submit input {
  padding: 3px 10px;
  width: 50%;
  background: transparent;
  color: #fff;
  border: 3px solid #0d6efd;
}

.submit input:hover {
  padding: 3px 10px;
  width: 50%;
  background: #0d6efd;
  color: #fff;
  border: 3px solid #0d6efd;
  transition: 0.5s;
}

@media (max-width: 768px) {
  .form-input {
    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
  }

  .popup-form i[data-v-12c3dba6] {
    cursor: pointer;
    position: absolute;
    right: 12%;

    margin-top: 25px;
    font-size: 20px;
    color: #0d6efd;
  }
}
</style>
