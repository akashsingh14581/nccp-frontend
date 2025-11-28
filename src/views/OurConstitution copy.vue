<template>
  <BannerSection title="Our Constitution" />

  <div class="container">
    <h2>Our Constitution</h2>
    <hr />
    <div class="constituton-content">
      <div>
        <div class="text-center content">
          <h2>
            CONSTITUTION OF THE NATIONAL COLLEGE OF CHEST PHYSICIANS (INDIA)
          </h2>
          <h2>Registered under societies Registration Act of 1860</h2>
          <h2>(Registration No. S/1421)</h2>
        </div>

        <div class="content1 mt-5">
          <div class="container">
            <h2
              style="
                background-color: #0d6efd;
                font-size: 20px;
                color: #fff;
                padding: 10px;
                border-radius: 5px;
              "
            >
              MEMORANDUM OF COLLEGE
            </h2>
            <div class="side-tab mt-5">
              <div class="side-button">
                <button
                  class="button"
                  @click="setActiveTab('name')"
                  :class="{ active: activeTab === 'name' }"
                >
                  Name
                </button>
                <button
                  class="button"
                  @click="setActiveTab('office')"
                  :class="{ active: activeTab === 'office' }"
                >
                  Office
                </button>
                <button
                  class="button"
                  @click="setActiveTab('object')"
                  :class="{ active: activeTab === 'object' }"
                >
                  Objects
                </button>
                <button
                  class="button"
                  @click="setActiveTab('method')"
                  :class="{ active: activeTab === 'method' }"
                >
                  Methods
                </button>
              </div>
              <div class="side-content">
                <div
                  class="name-div p-2 btn-divs"
                  v-show="activeTab === 'name'"
                >
                  <ul>
                    The name of the Organisation is “The National College of
                    Chest Physicians (India)” hereinafter called the “College”.
                    The term Chest Physician for the purpose covers disciplines
                    like Respiratory Medicine, Cardiology, Thoracic Surgery, and
                    all other allied clinical and basic medical sciences
                    pertaining to Chest.
                  </ul>
                </div>

                <div
                  class="office-div p-2 btn-divs"
                  v-show="activeTab === 'office'"
                >
                  The registered office of the College shall be located for the
                  present Vallabhbhai Patel Chest Institute, Delhi University
                  Campus, Delhi-110 007
                </div>

                <div
                  class="object-div p-2 btn-divs"
                  v-show="activeTab === 'object'"
                >
                  <h3 class="text-center">
                    The objects and purposes of the College shall be :
                  </h3>
                  <br />
                  <ul>
                    <li>
                      To advance knowledge, stimulate scientific and practical
                      interests, promote research and disseminate knowledge and
                      recognise merit among individuals and organizations in the
                      speciality of Chest Diseases.
                    </li>

                    <li>
                      To act as a liaison body between Indian and International
                      workers in the field.
                    </li>

                    <li>
                      To do and perform all other acts, matters and things that
                      may assist ip or be necessary for the fulfilment of the
                      above aims and objects of the College.
                    </li>
                  </ul>
                </div>

                <div
                  class="method-div p-2 btn-divs"
                  v-show="activeTab === 'method'"
                >
                  <h3 class="text-center">
                    For the attainment and furtherence of these objects, the
                    College may :
                  </h3>
                  <br />
                  <li>
                    Hold periodical conferences of the members of the College
                    and the medical profession in general
                  </li>
                  <li>
                    Arrange, from time to time, congresses, conferences,
                    lectures, refresher courses, discussions and demonstrations
                    on any aspect of the medical and allied sciences concerned
                    in the speciality.
                  </li>
                  <li>
                    Publish and circulate a Journal which shall be the official
                    organ of the College of a character consistent with the
                    objects of the College.
                  </li>
                  <li>
                    Publish from time to time transactions and other papers
                    embodying medical researches conducted by the members or
                    under the auspices of the College.
                  </li>
                  <li>
                    Encourage research in medical and allied sciences through
                    grants out of the funds of the College, by the establishment
                    of scholarships, prizes or awards, and in such other manner
                    as may, from time to time, be determined by the College.
                  </li>
                  <li>
                    Purchase, take lease of or otherwise acquire, hold, manage,
                    let, sell, exchange, mortgage or otherwise dispose of
                    movable or immovable property of every description and all
                    rights or privileges necessary or convenient for the purpose
                    of the College and in particular any land, building,
                    furniture, household or other effects, utensils, books,
                    newspapers, periodicals, instruments, appliances, apparatus,
                    fittings, conveyance, and accommodation and when deemed
                    necessary and desirable in the interest of the College,
                    sell, demise, let, hire out, mortgage, transfer, or
                    otherwise dispose of the same.
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-4">
    <h2>Awards</h2>
    <hr />
    <p>
      These awards will have a certificate or any other form of presentation as
      decided by the Govering Council of the College -
    </p>
    <div class="card-container">
      <div class="card" v-for="(card, index) in awardData" :key="index">
        <h3>{{ card.heading }}</h3>
        <hr />
        <p>{{ card.subparagraph }}</p>
        <button class="read-btn" @click="toggleFuction(index)">
          Read More →
        </button>
      </div>
    </div>
  </div>

  <!-- ----swiper--------- -->
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";

export default {
  components: {
    BannerSection,
  },

  data() {
    return {
      activeTab: "name",
      awardData: [
        {
          heading: "Parke Davis/NCCP(I) Chest Oration",
          heading2:
            "(A) WARNER NCCP (I) ORATION (renamed as PARKE-DAVIS NCCP (I) CHEST ORATION in 1992)",
          paragraph:
            "The Association / College has awards to encourage research activities in the field of T.B. and Respiratory Diseases as well as their contribution to the specialty.",
          subparagraph:
            "This was instituted in 1972 as “Warner Chest Oration” with the purpose promoting scientific research in the field of Chest Diseases, and in particular in field of allergy.",
          content:
            "The Warner Hindustan Ltd. through the Asthma, Bronchitis & Cancer Lung Foundation of India, funded annually an oration on any aspect of Chest Diseases, to be delivered at the time of the annual conference.<br>On the special request of the donors, the 151 oration was delivered in 1972 by Dr. Vishwanathan, who had perhaps the longest experience in the field of chest diseases. The name of the oration was changed to Parke-Davis / NCCP (I) Chest Oration since 1992, on the request of the organization since Warner Hindustan Company merged in Parke-Davis Company. The award was finally discontinued after 1995. The list of orators is given below.",
        },
        {
          heading: "Raman Viswanathan Memorial Lecture",
          subparagraph:
            "Raman Viswanathan Memorial Lecture was started in 1989, to honour and perpetuate the memory of Late Col. Raman Viswanathan, founder Director, V.P. Chest Institute, a great scientist...",
        },
        {
          heading: "NCCP(I) Cipla Chest Oration",
          subparagraph:
            "NCCP (I) Cipla Chest Oration was created with the objective of arranging oration every year by an eminent scientist working in the field of Pulmonology, preferably on Bronchial Asthma...",
        },
        {
          heading: "NCCP(I) German Remedies Chest Oration",
          subparagraph:
            "This awards was created in 2002 by the financial support of MIS German Remedies. The awards was given every year to an eminent scientist working in the field of Pulmonology. Following...",
        },
        {
          heading: "NCCP(I) Lupin Chest Oration",
          subparagraph:
            "The award was created in 2005 by financial support of M/s Lupin India Ltd. The award is given every year to eminent Pulmonologist. Following persons have received the award:",
        },
        {
          heading: "Young Scientist Award of NCCP(I)",
          subparagraph:
            "To encourage research in young scientists, a cash prize of Rs. 1000/- will be given to the best paper presented by him in the annual Conference of the College. He should be the first...",
        },
      ],
    };
  },

  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    toggleFuction(id) {
      this.$router.push({ name: "Award_section", params: { id: id } });
    },
  },

  computed: {
    isActive() {
      return (path) => {
        if (path === "/nameDiv") return this.nameDiv;
        else if (path === "/Office") return this.officeDiv;
        else if (path === "/Objects") return this.objectDiv;
        else if (path === "/Methods") return this.methodDiv;
        else return false;
      };
    },
  },
};
</script>

<style scoped>
.constituton-content {
  background-color: rgb(252, 252, 252);
  padding: 15px;
}

.content h2 {
  font-size: 16px;
  color: #3b71ca;
  font-weight: 700;
}
.side-tab {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
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
  padding: 14px 30px;
  border-radius: 50px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  background-color: #fff;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
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

.side-content li {
  margin: 10px 0px;
}

.btn-divs {
  overflow: scroll;
  height: 300px;
  overflow-x: hidden;
}
.method-div li {
  list-style-type: num;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  row-gap: 50px;
  padding: 2px;
}

.card {
  height: auto;
  width: 100%;
  padding: 12px;
  box-shadow: 1px 1px 10px #0d6efd;
}

.card h3 {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

.card p {
  text-align: justify;
}

.read-btn {
  width: 100%;
  padding: 10px 10px;
  border: none;
  outline: none;
  display: inline-block;
  color: #fff;
  position: relative;
  top: 30px;
  border-radius: 5px;
  background-color: #0d6efd;
}
</style>
