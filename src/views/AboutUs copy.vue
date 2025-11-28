<template>
  <div>
    <BannerSection :title="bannerContent" />
    <div class="container">
      <h3>A Brief History</h3>
      <hr />
      <div class="about-us">
        <div class="right-div">
          <p>
            The Indian Association of Chest Diseases was established in the year
            1959, with fifty-eight founder members. It was formally inaugurated
            at the time of Indian Science Congress by the Late Sir Arcot
            Lakshamanaswami Mudaliar, Vice Chancellor, Madras University, in
            January, 1959. Dr. V.K.R.V. Rao, Vice Chancellor, University of
            Delhi, presided. Soon after the inauguration, the first business
            meeting was held under the Presidentship of Late Dr. A. V. Baliga.
          </p>
          <p>
            The Association is a registered body functioning essentially for the
            promotion of the cause of chest diseases and allied sciences.
            According to the rules of the Association, the first elected members
            of the Governing Body including the Chairman held office for five
            years. Later, the rules provided for election of office bearers of
            the Governing Body as follows: “While the Chairman, Secretary and
            Treasurer will hold office for 3 years, the members of the Governing
            Body along with the Governors of the National Chapter of the
            American College of Chest Physicians will hold office for 2 years”.
            In 1968, it was resolved that due to the help and cooperation
            extended by the Vallabhbhai Patel Chest Institute, the Director of
            the Institute will be the ex-officio member of the Governing Body.
          </p>

          <p>
            The first annual conference was held in January, 1960 jointly with
            the Association of Physicians of India and other specialist
            organisations at New Delhi. Subsequent annual conferences were also
            held jointly with the Association of Physicians of India till 1963,
            in which year the Association sponsored the VII International
            Congress on Chest Diseases in New Delhi. The following year, the
            Association held its fourth annual conference independently at New
            Delhi. The President of the Royal College of Physicians, Edinburgh,
            was a special invitee and guest of honour and he presided over the
            symposium on ‘Recent Advances in the Chemotherapy of Tuberculosis’
            in New Delhi, open not only to the specialists but also to the
            general practitioners. The Association held special symposium on
            ‘Respiratory Allergy’ in New Delhi in 1967.
          </p>
          <button @click="showcontentfunction()" class="btn">
            {{ showcontent ? "Read Less ←" : "Read More →" }}
          </button>
          <div v-show="showcontent">
            <p class="mt-2">
              In 1974, the Association held its annual conference jointly with
              the Tuberculosis Association of India.
            </p>
            <p>
              As part of the aims and objectives of the Association, a Journal,
              namely ‘Indian Journal of Chest Diseases’ was started and the
              first issue came out on July 1, 1959. The journal was quarterly
              published jointly with the Vallabhbhai Patel Chest Institute,
              Delhi University. In 1976, in keeping with the progressive
              thinking, the name of the journal was changed to the ‘Indian
              Journal of Chest Diseases and Allied Sciences.’ The Indian Journal
              of Chest Diseases and Allied Sciences is the official publication
              and is published jointly with the Vallabhbhai Patel Chest
              Institute, Delhi. This journal has been widely acclaimed at both
              national and international levels.
            </p>
            <p>
              At the annual meeting of the Association held in 1964 both, the
              Governing Body and the General Body, decided to institute a prize
              for the best article on any aspect of chest diseases published in
              either Indian or foreign periodicals, by a young scientist below
              40 year of age. In order to give encouragement to our scientists
              it was decided to extend the prize to the best paper presentation
              at the annual conference. To maintain a high standard, the prize
              can even be omitted for that year, if the quality of no paper
              comes up to the required standards in any such conference.
            </p>

            <h4 class="text-center bg-primary text-white p-2">
              INDIAN ASSOCIATION FOR CHEST DISEASES was renamed as
            </h4>
            <h4 class="text-center bg-primary text-white p-2">
              NATIONAL COLLEGE OF CHEST PHYSICIANS (India) in 1981
            </h4>

            <p>
              The Indian Association for Chest Diseases (IACD) in its meeting
              held on November 15, 1979-subsequently ratified by the General
              Body meeting held on November 6, 1979, unanimously decided to
              change the name of IACD to National College of Chest Physicians
              (India) and to make consequential changes/amendments in the
              memorandum of the Association, and its rules and regulations.
              Accordingly, a sub-committee, duly constituted for this purpose,
              re-drafted the memorandum, and the rules and regulations which
              were approved by the prescribed authority in a special meeting
              convened on June 30, 1980 and duly confirmed at a subsequent
              special meeting of the General Body held on August 14, 1980 at the
              office of the Tuberculosis Association of India, 3 Red Cross Road,
              New Delhi. The National College of Chest Physicians (India) thus
              came into being in January, 1981.
            </p>

            The Association/College has held 33 conferences with A.P.I. since
            its inception in 1959. Since the 28th Annual Conference in Delhi,
            the College has organized its annual conferences independently
            (NACCON). These conferences have proved to be highly successful and
            have been chaired by the President of NCCP(I). From 1999, the
            NCCP(I) with ICS is having about Joint conferences – NAPCON. <br />

            <h4 class="text-center bg-primary text-white p-2 mt-2">
              Fellowships of the National College of Chest Physicians of India
            </h4>
            <p>
              It was initially decided that all existing fellows of the American
              College of Chest Physicians would be taken as the Founder Fellows
              of the National College of Chest Physicians (India).<br />

              It was further decided that the selection of new fellows would be
              restricted to eminent scientists engaged in the chest specialty
              and allied sciences. The application of the candidate for
              fellowship will be scrutinized by a high power Credential
              Committee and its recommendations should be duly approved by the
              Governing Council and then by the General Body. The College has on
              its roll approximately 1500 Members and Fellows.<br />

              The NCCP(I) has a website nccpindia.com. The NCCP (I) has
              published a Directory of College having detailed information about
              every fellow and member of the college, which is updated after
              every 5 year.<br />

              The Joint venture of NCCP (I) and ICS i.e. NAPCON has been a grand
              success providing opportunity to every person in the specialty to
              come under one roof and to achieve the maximum scientific benefit.
              The NAPCON has been attended by eminent persons from American
              Thoracic Society (ATS), American College of Chest Physicians
              (ACCP), European Respiratory Society (ERS), Asia Pacific Society
              of Respirology, Chest Specialists from abroad and from
              neighbouring Asian countries, NRIs. Etc. I wish this joint venture
              to continue in times to come and all persons of this Specialty
              remain united.
            </p>
          </div>
        </div>

        <div class="content">
          <div style="height: 400px; width: 100%">
            <img
              src="../assets/about_vector/about-doctor.png"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
      <hr />
      <div class="btn_tabs">
        <div class="buttons">
          <button
            @click="setActiveTab('Fellowships')"
            :class="{ active: activeTab === 'Fellowships' }"
          >
            Fellowships of NCCP
          </button>
          <button
            @click="setActiveTab('Chapters')"
            :class="{ active: activeTab === 'Chapters' }"
          >
            Chapters
          </button>
          <button
            @click="setActiveTab('Zones')"
            :class="{ active: activeTab === 'Zones' }"
          >
            Zones
          </button>
        </div>
        <div class="contents">
          <div v-show="activeTab === 'Fellowships'">
            <p>
              It was initially decided that all existing fellows of the American
              College of Chest Physicians would be taken as the Founder Fellows
              of the National College of Chest Physicians (India).
            </p>

            <p>
              It was further decided that the selection of new fellows would be
              restricted to eminent scientists engaged in the chest specialty
              and allied sciences. The application of the candidate for
              fellowship will be scrutinized by a high power Credential
              Committee and its recommendations should be duly approved by the
              Governing Council and then by the General Body. The College has on
              its roll approximately 1500 Members and Fellows.
            </p>
            <p>
              The NCCP(I) has a website nccpindia.com. The NCCP (I) has
              published a Directory of College having detailed information about
              every fellow and member of the college, which is updated after
              every 5 year. The Joint venture of NCCP (I) and ICS i.e. NAPCON
              has been a grand success providing opportunity to every person in
              the specialty to come under one roof and to achieve the maximum
              scientific benefit. The NAPCON has been attended by eminent
              persons from American Thoracic Society (ATS), American College of
              Chest Physicians (ACCP), European Respiratory Society (ERS), Asia
              Pacific Society of Respirology, Chest Specialists from abroad and
              from neighbouring Asian countries, NRIs. Etc. I wish this joint
              venture to continue in times to come and all persons of this
              Specialty remain united.
            </p>
          </div>

          <div v-show="activeTab === 'Chapters'">
            <p style="text-align: justify">
              At present the college has a few Chapters created under different
              Zones:
            </p>
            <li>North Zone – Delhi Chapter at Delhi</li>
            <li>Central Zone – UP Chapter at Kanpur</li>
            <li>West Zone – Rajasthan at Jaipur</li>
            <li>Gujarat Chapter at Ahemedabad</li>
            <li>Maharashtra Chapter at Nagpur (to be created this year)</li>
          </div>

          <div v-show="activeTab === 'Zones'">
            <p style="text-align: justify">
              According to the constitution of NCCP (India), there will be a
              Chapter for each of the Five Zones, provided there are at least 15
              Fellows/members in the Zone. Five Zones as recognised w.e.f.
              27.7.89 are as follows -
            </p>
            <li>
              North Zone - Comprising of Jammu and Kashmir, Himachal Pradesh,
              Punjab, Haryana, Chandigarh and Delhi/New Delhi.
            </li>
            <li>
              East Zone - Comprising of West Bengal, Bihar, Orissa, Arunachal
              Pradesh, Sikkim, Assam, Nagaland, Manipur, Mizoram, Tripura.
            </li>
            <li>
              Central Zone - Comprising of Uttar Pradesh and Madhya Pradesh.
            </li>
            <li>
              South Zone - Comprising of Tamil Nadu, Kamataka, Pondicherry,
              Kerala, Andaman & Nicobar and Andhra Pradesh.
            </li>
            <li>
              West Zone - Comprising of Maharashtra, Gujarat, Goa and Rajasthan.
            </li>
            <p>
              <b
                >The Zonal Chairman will be responsible for the promotion of
                academic and scientific activities in their region. The Chapter
                will have its own regulations for the proper functioning in the
                Zone.</b
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSection from "@/components/BannerSection.vue";

export default {
  components: {
    BannerSection,
  },
  data() {
    return {
      showcontent: false,
      activeTab: "Fellowships",
      bannerContent: "Who We Are",
    };
  },

  methods: {
    showcontentfunction() {
      this.showcontent = !this.showcontent;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
p {
  text-align: justify;
}

.about-us {
  display: grid;
  grid-template-columns: 65% 35%;
  padding: 0 !important;
}

.button-tab {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.active {
  background-color: #0d6efd !important;
  color: #fff !important;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
}

.tab-btn {
  border: 1px solid #0d6efd;
  color: black;
  font-weight: 700;
  background-color: transparent;
}

.tab-btn:hover {
  background-color: #0d6efd !important;
  color: #fff !important;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
}

.content li {
  margin: 10px 0px;
}

.btn {
  padding: 10px 30px;
  border: 1px solid black;
}
.btn:hover {
  padding: 10px 30px;
  border: none;
  background: #0d6efd;
  color: white;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px;
}

.buttons .active {
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  background: #007bff !important;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.buttons button {
  border: 1px solid #007bff !important;
  padding: 10px 30px;
  border-radius: 5px;
  background: transparent;
  color: #000;
  font-size: 15px;
  font-weight: 600;
}
.btn_tabs {
  background: #edf2f7;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
@media (max-width: 768px) {
  .about-us {
    display: grid;
    grid-template-columns: 100%;
    padding: 0 !important;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 20px;
  }
}
</style>
