<template>
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">
    <video autoplay muted loop id="bg-video">
      <source src="../assets/video1.mp4" type="video/mp4" />
    </video>

    <div
      class="container text-center position-relative overlay"
      data-aos="zoom-in-up"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <span style="color: #fff"
        >Welcome To National Collage Of Chest Physican</span
      >
      <h1>
        Education and Research In <br />"Respiratory Disease & Allied Sciences"
      </h1>
      <hr />
      <p class="mt-2"></p>
      <br />
      <a href="#contact_form" class="mt-5 btn-get-started scrollt">Join Us</a>
    </div>
  </section>

  <!-- ----------------------Cards Section------------------------------------ -->
  <div class="container mt-5">
    <h3>
      Welcome To NCCP (INDIA) <span style="color: #0d6efd">---</span><br /><span
        class="sub-heading"
        >National College of Chest Physicians</span
      >
    </h3>
    <hr />
    <div class="card-section">
      <div
        class="card-1"
        data-aos="zoom-out"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div class="card-img">
          <img src="../assets/jamila-polatova-7261803_1280.jpg" />
          <p>
            <router-link class="router" to="/about"
              >Who We Are <span>→</span></router-link
            >
          </p>
        </div>
      </div>

      <div
        class="card-1"
        data-aos="zoom-out"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div class="card-img">
          <img src="../assets/about/about3.jpg" />
          <p>
            <router-link class="router" to="/Constitution"
              >Our Constitution <span>→</span></router-link
            >
          </p>
        </div>
      </div>
      <div
        class="card-1"
        data-aos="zoom-out"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div class="card-img">
          <img src="../assets/about/about1.jpg" />
          <p>
            <router-link class="router" to="/nccp_publications"
              >NCCP Publications<span>→</span></router-link
            >
          </p>
        </div>
      </div>
      <div
        class="card-1"
        data-aos="zoom-out"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div class="card-img">
          <img src="../assets/about/about2.jpg" />
          <p>
            <router-link class="router" to="/NAPCON2020"
              >Our Events<span>→</span></router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- --------call Action--------------- -->
  <section id="cta" class="mt-5 cta">
    <div class="container">
      <div class="text-center" data-aos="zoom-in">
        <h3>National Collage Of Chest Physicians</h3>
        <p>
          A professional Society For Continuing
          <b
            ><u
              >Education & Research in Respiratory Disease & Allied Sciences</u
            ></b
          >
        </p>
        <a class="cta-btn" href="#contact_form">Get a query</a>
      </div>
    </div>
  </section>

  <div class="mt-5 content1">
    <div class="container events_scroll">
      <h3>
        Our Events <i class="bi bi-calendar-event"></i><br /><span
          class="sub-heading"
          >National College of Chest Physicians</span
        >
      </h3>
      <hr />

      <div class="mt-5 side-tab">
        <div class="side-button">
          <button
            class="button"
            :class="{ active: activeTab === 'newest_event' }"
            @click="setActiveTab('newest_event')"
          >
            <i class="bi bi-calendar4-event"></i> Newest Events
          </button>
          <button
            class="button"
            :class="{ active: activeTab === 'popular_event' }"
            @click="setActiveTab('popular_event')"
          >
            <i class="bi bi-calendar4-event"></i>Popular Events
          </button>
          <button
            class="button"
            :class="{ active: activeTab === 'feature_event' }"
            @click="setActiveTab('feature_event')"
          >
            <i class="bi bi-calendar4-event"></i>Featured Events
          </button>
        </div>
        <div class="side-content">
          <div class="p-2 newest_div" v-show="activeTab === 'newest_event'">
            <div
              class="award_image_allDiv"
              v-for="(award, index) in awardsData"
              :key="index"
            >
              <div class="image_upload">
                <img :src="award.awardImg" />
                <h5
                  class="mt-2 text-center"
                  style="font-size: 14px; color: #0d6efd"
                >
                  NAPCON {{ award.awardYear }}
                </h5>
                <h5 class="mt-2 text-center" style="font-size: 12px">
                  {{ award.awardName }}
                </h5>
              </div>
            </div>
          </div>

          <div class="p-2 popular_div" v-show="activeTab === 'popular_event'">
            <div
              class="award_image_allDiv"
              v-for="(award, index) in awardsData"
              :key="index"
            >
              <div class="image_upload">
                <img :src="award.awardImg" />
                <h5
                  class="mt-2 text-center"
                  style="font-size: 14px; color: #0d6efd"
                >
                  NAPCON {{ award.awardYear }}
                </h5>
                <h5 class="mt-2 text-center" style="font-size: 12px">
                  {{ award.awardName }}
                </h5>
              </div>
            </div>
          </div>

          <div class="p-2 feature_div" v-show="activeTab === 'feature_event'">
            <div
              class="award_image_allDiv"
              v-for="(award, index) in awardsData"
              :key="index"
            >
              <div class="image_upload">
                <img :src="award.awardImg" />
                <h5
                  class="mt-2 text-center"
                  style="font-size: 14px; color: #0d6efd"
                >
                  NAPCON {{ award.awardYear }}
                </h5>
                <h5 class="mt-2 text-center" style="font-size: 12px">
                  {{ award.awardName }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ----------contact section---------------- -->
  <div class="container" style="margin-top: 70px">
    <div class="contact_section" id="contact_form">
      <contact_us />
    </div>
  </div>
</template>

<script>
import contact_us from "../components/HomeContactUs.vue";

export default {
  name: "HomePage", // optional, better for debugging
  components: {
    contact_us,
  },
  data() {
    return {
      activeTab: "newest_event",
      imgs: [
        { img: require("@/assets/about/about1.jpg"), text: "Who We Are" },
        { img: require("@/assets/about/about2.jpg"), text: "Our Awards" },
        {
          img: require("@/assets/about/about3.jpg"),
          text: "NCCP Publications",
        },
        { img: require("@/assets/about/about1.jpg"), text: "Our Constitution" },
      ],
      awardsData: [
        {
          awardImg: require("../assets/Event_images/newest_event/thumb-napcon-20.jpg"),
          awardYear: "2020",
          awardName: "Virtual Conferance",
        },
        {
          awardImg: require("../assets/Event_images/newest_event/thumb-napcon-19.jpg"),
          awardYear: "2019",
          awardName: "Kochi",
        },
        {
          awardImg: require("../assets/Event_images/newest_event/thumb-napcon-18.jpg"),
          awardYear: "2018",
          awardName: "Kochi",
        },
        {
          awardImg: require("../assets/Event_images/newest_event/thumb-napcon-17.jpg"),
          awardYear: "2017",
          awardName: "Kochi",
        },
        {
          awardImg: require("../assets/Event_images/newest_event/event5.jpg"),
          awardYear: "2016",
          awardName: "Kochi",
        },
        {
          awardImg: require("../assets/Event_images/newest_event/event4.jpg"),
          awardYear: "2015",
          awardName: "Kochi",
        },
        {
          awardImg: require("../assets/Event_images/newest_event/event2.jpg"),
          awardYear: "2014",
          awardName: "Kochi",
        },
        {
          awardImg: require("../assets/Event_images/newest_event/event2.jpg"),
          awardYear: "2013",
          awardName: "Kochi",
        },
      ],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.carousel img {
  width: 100%;
  height: auto;
}
.carousel h3,
.carousel p {
  text-align: center;
}
/*--------------------------------------------------------------
# Hero Section
--------------------------------------------------------------*/
#hero {
  width: 100%;
  height: 100vh;
  background-size: cover;
  position: relative;
}

#bg-video {
  min-width: 100%;
  min-height: 100vh;
  max-width: 100%;
  max-height: 100vh;
  object-fit: cover;
  z-index: -1;
  position: absolute;
}

#hero:before {
  content: "";
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

#hero h1 {
  margin: 0 0 0px 0;
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
  color: #fff;
  letter-spacing: 2px;
}

#hero p {
  color: #fff;
}

#hero .btn-get-started {
  background: #0d6efd;
  border: none;
  padding: 10px 50px;
  text-decoration: none;
  color: #fff;
  border-radius: 45px;
}

#hero .btn-get-started:hover {
  background: none;
  border: 2px solid #0d6efd;
}

@media (min-width: 1024px) {
  #hero {
    background-attachment: fixed;
  }
}

@media (max-width: 768px) {
  #hero h1 {
    margin: 0 0 0px 0;
    font-size: 40px;
    font-weight: 600;
    line-height: 50px;
    color: #fff;
    letter-spacing: 2px;
  }
}
/*About Section Css*/
.about-section {
  padding: 50px;
}

.about-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.about {
  width: 100%;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  padding: 2px;
}

.images {
  height: 200px;
  width: 100%;
  padding: 15px;
}
.images img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.text {
  padding: 2px 20px;
}

.read-more {
  padding: 5px 20px;
  background-color: #0d6efd;
  color: #fff;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 5px;
}
/* News Event */

.box {
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
}

.tab-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  position: relative;
}

/* tab list 會動的底線 */
.tab-list::before {
  content: "";
  display: block;
  height: 2px;
  width: 33.333%;
  position: absolute;
  bottom: 0;
  background-color: #aaa;
  transition: 0.3s;
}

.tab-item {
  flex: 1;
  text-align: center;
  transition: 0.3s;
  opacity: 0.5;
}

.tab-toggle {
  display: none;
}

.tab-content {
  display: none;
}

.tab-toggle:nth-child(1):checked ~ .tab-list .tab-item:nth-child(1),
.tab-toggle:nth-child(2):checked ~ .tab-list .tab-item:nth-child(2),
.tab-toggle:nth-child(3):checked ~ .tab-list .tab-item:nth-child(3) {
  opacity: 1;
}

/* tab bar 底線位移控制 */
.tab-toggle:nth-child(2):checked ~ .tab-list::before {
  transform: translateX(100%);
}

.tab-toggle:nth-child(3):checked ~ .tab-list::before {
  transform: translateX(200%);
}

/* 內容顯示控制 */
.tab-toggle:nth-child(1):checked ~ .tab-container .tab-content:nth-child(1),
.tab-toggle:nth-child(2):checked ~ .tab-container .tab-content:nth-child(2),
.tab-toggle:nth-child(3):checked ~ .tab-container .tab-content:nth-child(3) {
  display: block;
}

.tab-trigger {
  display: block;
  padding: 10px 0;
}

.tab-container {
  padding: 15px 30px;
}

.newst-event {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 30px;
  text-align: center;
}

.event-img {
  height: 200px;
  width: 100%;
}

.event-img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.about-us {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
  padding: 20px;
}
.text-content p {
  text-align: justify;
}

.read-btn button {
  padding: 10px 30px;
  width: 20%;
  background: #0d6efd;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
}

.image-content {
  text-align: center;
}

.img-1 {
  height: 200px;
  width: 100%;
}
.img-1 img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

img:hover {
  opacity: 0.6;
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.5s;
}

.img-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.img-div1 {
  height: 180px;
  width: 100%;
}
.img-div1 img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}
/*--------------------------------------------------------------
# Cta
--------------------------------------------------------------*/
.cta {
  background: linear-gradient(rgba(2, 2, 2, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/about/about1.jpg") fixed center center;
  background-size: cover;
  padding: 100px 0;
}

.cta h3 {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.cta p {
  color: #fff;
}
.events_scroll {
  background-color: #edf2f7;
  padding: 30px;
  border-radius: 10px;
}
.cta .cta-btn {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 8px 28px;
  border-radius: 25px;
  transition: 0.5s;
  margin-top: 10px;
  border: 2px solid #fff;
  color: #fff;
}

.cta .cta-btn:hover {
  background: #3b71ca;
  border: 2px solid #3b71ca;
}
/*----------sliderTab------------*/

.side-slider {
  width: 100%;
  height: 350px;
  padding: 20px;
  box-shadow: 2px 2px 5px gray;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  border-radius: 10px;
}

.left-side {
  border-right: 1px solid gray;
  grid-template-rows: repeat(3, 1fr);
  display: grid;
  gap: 20px;
  padding: 20px;
}
.left-side button {
  height: 50px;
  background-color: #0d6efd;
  outline: none;
  border: none;
  color: #ffff;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
}
.right-side {
  overflow: scroll;
  overflow-x: hidden;
  padding: 0px 10px;
  /*background: linear-gradient(to right, rgba(2, 36, 91, 1) 0%, rgba(2, 36, 91, 0) 100%);*/
}

.events {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 30px;
}

.events-div {
  background: linear-gradient(rgba(2, 2, 2, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/about/about1.jpg") center center;
  background-size: cover;
  padding: 70px 0;
  height: 230px;
  border-radius: 10px;
  text-align: center;
}

.events-div h3 {
  font-size: 16px;
  color: #ffff;
  text-align: center;
  font-weight: 700;
}

.view-btn {
  padding: 5px 20px;
  background-color: transparent;
  color: #fff;
  width: 100%;
}

.event-heading {
  position: sticky;
  top: 0;
}
.forms-field {
  padding: 50px;
  width: 100%;
  box-shadow: 10px 10px 30px gray;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.inputs-field {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 00px;
}
.inputs-field input {
  height: 35px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
  margin: 30px 0px;
}
textarea {
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
}

.btn-submit {
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #0d6efd;
  color: #ffff;
  font-weight: 700;
}

.img-formsection {
  background: linear-gradient(rgba(2, 2, 2, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/about/about2.jpg") center center;
  background-size: cover;
  width: 100%;
  border-radius: 10px;
  text-align: center;
  color: #ffff;
  font-weight: 700;
  padding: 100px;
  height: 450px;
  place-items: center;
  display: grid;
}
.img-formsection i {
  color: #0d6efd;
  position: relative;
  left: -10px;
}

.icons i {
  color: #0d6efd;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .about-us {
    display: grid;
    grid-template-columns: 1fr;
  }
  .read-btn button {
    padding: 10px 30px;
    width: 100%;
    background: #0d6efd;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  .side-slider {
    width: 100%;
    height: 350px;
    padding: 20px;
    box-shadow: 2px 2px 5px gray;
    display: grid;
    grid-template-columns: 1fr;
    border-radius: 10px;
  }

  .left-side {
    border-right: 1px solid gray;
    grid-template-columns: repeat(3, 1fr);
    display: grid;
    gap: 20px;
    padding: 20px;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .about-section {
    padding: 0px;
  }

  .forms-field {
    width: 100%;
    box-shadow: 10px 10px 30px gray;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr;
  }

  .inputs-field {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .inputs-field input {
    height: 35px;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
  }
  textarea {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
  }
}

/*------------adding ccssss-------------*/

.card-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 40px;
}

.card-img {
  height: 300px;
  width: 100%;
  position: relative;
}
.card-img p {
  position: relative;
  text-align: center;
  top: -44px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
}
.card-img p span {
  color: #0d6efd;
  font-weight: 800;
  animation: animate 3s linear infinite;
}

@keyframes animate {
  0% {
    position: relative;
  }
  50% {
    position: relative;
    transition: 0.7s;
    left: 5px;
  }
  100% {
    position: relative;
    transition: 0.7s;
    left: 10px;
  }
}

.router {
  color: #ffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 1px;
}
.card-img img {
  height: 100%;
  width: 100%;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
  border-radius: 3px;
}

.sub-heading {
  font-size: 15px;
  color: #0d6efd;
}

.side-tab {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 15px;
}

.side-button {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 30px;
  padding: 13px;
}

.side-button .active {
  background-color: #0d6efd; /* Define your active link styles */
  color: white;
}
.side-content {
  border-left: 0.4px solid gray;
  padding: 10px;
}

.button {
  border: none;
  outline: none;
  color: #000000;
  height: 46px;
  padding: 0px 10px;
  border-radius: 50px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
}
.button .active {
  background-color: #0d6efd;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
.button:hover {
  background-color: #0d6efd;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
.side-content h3 {
  font-size: 17px;
  text-align: justify;
}

.side-button i {
  margin-left: -20px;
  padding: 10px;
}

.side-content li {
  margin: 10px 0px;
}

.btn-divs {
}
.method-div li {
  list-style-type: num;
}

.bi-calendar-event {
  animation: animates 1s linear infinite;
  color: #0d6efd;
  padding: 5px;
}

@keyframes animates {
  0% {
    transform: translateX(1px);
  }
  100% {
    transform: translateX(2px);
  }
}

@media (max-width: 768px) {
  .card-section {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 40px;
  }
  .forms-field {
    padding: 0 !important;
    width: 100%;
    box-shadow: 10px 10px 30px gray;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .inputs-field {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0px 0px;
  }
  .inputs-field input {
    height: 30px;
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
    margin: 0px 0px;
  }
  textarea {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
  }
  .gettouch-form {
    display: none;
  }
  .side-button {
    display: grid;

    gap: 10px;
  }
  .side-tab {
    display: grid;
    grid-template-columns: 100%;
  }
  .button {
    border: none;
    outline: none;
    color: #000000;
    padding: 0px 0px;
    border-radius: 10px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    background-color: #fff;
    font-size: 12px;
    font-weight: 600;
  }
}

.newest_div,
.popular_div,
.feature_div {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  overflow: scroll;
  height: 300px;
  overflow-x: hidden;
}
.image_upload {
  height: 150px;
  width: 150px;
  border-radius: 10px;
}
.image_upload img {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.award_image_allDiv {
  height: 220px;
  width: 100%;
  padding: 6px;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
</style>
