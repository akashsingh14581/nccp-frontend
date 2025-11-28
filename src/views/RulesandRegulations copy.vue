<template>
  <BannerSection title="Rules & Regulations" />
  <div class="container parent-div">
    <h3>Rules & Regulations</h3>
    <hr />
    <div class="content">
      <div class="first">
        <h5>
          <i class="bi bi-person-fill" style="color: blue"></i> Membership
          <br /><span style="font-size: 14px"
            >The College shall consist of Ordinary Members, Life Members,
            Fellows and Honora Fellows.
          </span>
        </h5>
        <div class="buttons">
          <button
            @click="setActiveTab('ordinary')"
            :class="{ active: activeTab === 'ordinary' }"
          >
            Ordinary Members
          </button>
          <button
            @click="setActiveTab('life')"
            :class="{ active: activeTab === 'life' }"
          >
            Life Members
          </button>
          <button
            @click="setActiveTab('honorary')"
            :class="{ active: activeTab === 'honorary' }"
          >
            Honorary Fellows
          </button>
          <button
            @click="setActiveTab('fellows')"
            :class="{ active: activeTab === 'fellows' }"
          >
            Fellows
          </button>
        </div>

        <div class="contents">
          <div v-show="activeTab === 'ordinary'">
            <p>
              Any person possessing a medical degree recognis4 by the Indian
              Medical Council Act, as amended in 1957 or a postgraduate /
              Doctorate degree in basic medical sciences and who is in active
              practice (or has shown scientific or practical interest in the
              speciality may be propose for membership of the college. They
              should be preferably in possession. postgraduate qualifications.
            </p>

            <p>
              Applications for admission to membership shall be made to the
              Secretary of the College in the prescribed form together with
              enrolment and annual fees and shall be the signatures of two
              Fellows Members who are prepared, from personal knowledge to
              support the candidature. The fees after deducting incidental
              charges will I refunded in case the application is rejected or as
              approved by the Governing Council of the Collage.
            </p>
          </div>

          <div v-show="activeTab === 'life'">
            <p style="text-align: justify">
              Any person who is eligible for ordinary membership may be, if he
              so desires, made a Life Member on the payment of a lumpsum
              equivalent to 10 years of annual subscription in lieu of annual
              subscription provided all conditions as laid down for Ordinary
              Membership are satisfied.
            </p>
          </div>

          <div v-show="activeTab === 'honorary'">
            <p style="text-align: justify">
              The number of Honorary Fellows shall be limited to 100 and they
              will be persons elected in recognition of their knowledge of, or
              contribution to the study of the speciality. They will be
              recommended by the Council for approval by the College at the
              annual General Body Meeting. They will however not have the right
              to Vote. Not more than 3 such fellows shall be elected in anyone
              year.
            </p>
          </div>
          <div v-show="activeTab === 'fellows'">
            <p style="text-align: justify">
              Such members of the College as have distinguished themselves in
              the speciality for at least 5 years after postgraduation are
              eligible tI consideration of the award of Fellowship. The award of
              Fellowship shall be decided by the Credential Committee governed
              by the Regulations framed by the Council from time to time. All
              Fellows are entitled to suffix FNCCP(I) to their names during
              their active fellowship of the college. Fellowship is considered
              only after becoming life member of the College.
            </p>
          </div>
        </div>
      </div>
      <div class="second">
        <div class="img-div">
          <img src="../assets/about_vector/about3.svg" />
        </div>
      </div>
    </div>
    <hr />
    <!-- ---------------subscription-------------------- -->
    <div v-for="(card1, index) in subscription" :key="index">
      <h3>Subscription</h3>
      <p v-html="card1.subscriptionContent"></p>
    </div>
    <hr />
    <!-- ------------------Collage Year------------------------------ -->
    <div class="collage-year">
      <h3>College Year</h3>
      <ul v-for="(card2, index) in year" :key="index">
        <li>
          <b>{{ card2.bold }}</b
          >{{ card2.yearContent }}
        </li>
      </ul>
    </div>
    <hr />
    <div class="collage-year">
      <h3>Privileges of Members/Fellows</h3>
      <ul v-for="(card3, index) in year2" :key="index">
        <li>
          <b>{{ card3.bold }}</b
          >{{ card3.yearContent2 }}
        </li>
      </ul>
    </div>
    <hr />
    <div class="collage-year">
      <h3>Removal of the Member/Fellow and re-admission</h3>
      <div v-for="(card4, index) in year3" :key="index">
        <p v-html="card4.yearContent3"></p>
      </div>
    </div>
    <hr />
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
      activeTab: "ordinary", // Default active tab
      subscription: [
        {
          subscriptionContent:
            "The annual subscription for the present payable by each member is Rs. 150/- only due in advance on 1st of April each year. The enrolment fee will be Rs. 100/- only. Life members shall pay a lump sum equal to ten years subscription (i.e. Rs. 1500/-) in lieu of annual subscription. These may be modified from time to time. </br></br>Members elected as Fellows will pay Rs. 1500/- as Fellowship fee in addition to all other subscriptions, on admission as Fellows or as may be modified from time to time. </br></br>Annual subscription for the Journal (from non-members) shall be as fixed from time to time by the Governing Council.",
        },
      ],
      year: [
        {
          yearContent:
            "The year of the College shall correspond to the financial year as defined by the Government of India, i.e. 1st April to 31st March, or as modified from time to time.",
        },
        {
          yearContent:
            "The financial year will also be the same (1st April to 31st March).",
        },
        {
          yearContent:
            "There shall be a register in which the names of all the Members and Fellows of the College shall be entered.",
        },
        {
          yearContent:
            "The College will publish a Directory of Fellows/Members after every 5 years consisting of names, addresses, qualifications, and other details.",
        },
        {
          bold: "Arrears - ",
          yearContent:
            "The annual subscription received from any fellow/member after 31st March for the preceding financial year will be treated as payment of arrears and will not be entitled to any publication (Journal etc.) of the College for the preceding year. Any fellow/member who pays the annual subscription late, but during the same financial year, is entitled to the publication only after the date of his payment.",
        },
      ],
      year2: [
        {
          yearContent2:
            "To be entitled to a copy of the Constitution of the College and subsequent amendments and alterations, free of charge.",
        },
        {
          yearContent2:
            "To be present and vote at all annual General Body meetings.",
        },
        {
          yearContent2:
            "To receive all publications and proceedings of the College.",
        },
        {
          yearContent2:
            "To introduce visitors to annual general body and other meetings of the College.",
        },
        {
          yearContent2:
            "Honorary Fellows shall be entitled to attend and take part in the Scientific Meetings and receive a copy of the Journal of the College on payment of annual subscription for the Journal of the College.",
        },
      ],
      year3: [
        {
          yearContent3:
            "Any member/fellow may withdraw from the College by signifying his wish to do so by a letter addressed to the Secretary. When any member/fellow shall have omitted to pay the subscription for three successive years, the Treasurer shall send him a registered letter informing the amount due from him and shall have his name struck off the rolls of member/fellow unless the amount is paid within three months of the receipt of such letter.</br>Any person who has ceased to be a member/fellow due to the above reasons may be made a member/fellow only on payment of fresh enrolment fee, and life membership fee.</br>Any member/fellow of the College who wilfully disobeys rules or orders of College or the Councilor having unwillingly committed any breach of orders, persists any disobedience or breach of orders after being admonished by the President or if for any reasons, it appears to the Council that the name of a member/fellow should remain on the rolls, he shall be liable to be removed from the College. Whenever there appears cause as aforesaid for the removal of a member/fellow from the College, the Council after due deliberations shall determine by ballot the opinion of the Council and if 3/4th of member/fellow present and voting at such meeting, vote for removal of such member/fellow, he shall be removed from the College. Such member/fellow shall not be eligible for re-election until the expiry of two years. On terminal of membership of fellow for any reason, he shall be debarred from suffixing FNCCJ to their name.",
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

<style scoped>
.content {
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 30px;
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
.img-div {
  height: 400px;
  width: 100%;
}

.img-div img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.contents p {
  text-align: justify;
  margin: 10px 10px;
}

@media (max-width: 768px) {
  .content {
    display: grid;
    grid-template-columns: 100%;
    gap: 30px;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 20px;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 20px;
  }
}
</style>
