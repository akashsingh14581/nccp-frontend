<template>
  <div>
    <BannerSection :title="NewData.heading" />
    <div class="container">
      <h3>{{ NewData.heading }}</h3>
      <hr>
      <p>The Association / College has awards to encourage research activities in the field of T.B. and Respiratory
        Diseases as well as their contribution to the specialty.</p>

      <div class="section-award">
        <h4>{{ NewData.headingTwo }}</h4>
        <p v-html="NewData.content"></p>
      </div>


    </div>
  </div>

</template>


<script>
import BannerSection from '@/components/BannerSection.vue';
export default {
  components: {
    BannerSection,
  },

  data() {
    return {
      NewData: [],
      awardsFullData: [

        {

          heading: 'Parke Davis/NCCP(I) Chest Oration',
          headingTwo: '(A) WARNER NCCP (I) ORATION (renamed as PARKE-DAVIS NCCP (I) CHEST ORATION in 1992)',
          subparagraph: 'This was instituted in 1972 as “Warner Chest Oration” with the purpose promoting scientific research in the field of Chest Diseases, and in particular in field of allergy. ',
          content: 'An eminent scientist working in Pulmonology created the Raman Vishwanathan Endowment Fund of the National College of Chest Physicians of India with the objective of arranging the Raman Vishwanathan Memorial Lecture every year. The first lecture was delivered in 1989. The following eminent scientists of Pulmonology have delivered the lecture so far.<br><br>It has been renamed in 2012 as “NCCP (I) – Prof. Raman Vishwanathan Memorial Chest Oration”.'

        },

        {
          heading: 'Raman Viswanathan Memorial Lecture',
          headingTwo: '(B) RAMAN VISHWANATHAN MEMORIAL ORATION / LECTURE',
          content: 'An eminent scientist working in Pulmonology created the Raman Vishwanathan Endowment Fund of the National College of Chest Physicians of India with the objective of arranging the Raman Vishwanathan Memorial Lecture every year. The first lecture was delivered in 1989. The following eminent scientists of Pulmonology have delivered the lecture so far.<br><br>It has been renamed in 2012 as “NCCP (I) – Prof. Raman Vishwanathan Memorial Chest Oration”.',
          subparagraph: 'Raman Viswanathan Memorial Lecture was started in 1989, to honour and perpetuate the memory of Late Col. Raman Viswanathan, founder Director, V.P. Chest Institute, a great scientist...'

        },

        {
          heading: 'NCCP (I) CIPLA CHEST ORATION',
          headingTwo: '(C) NCCP(I) CIPLA CHEST ORATION',
          content: 'NCCP (I) Cipla Chest Oration was created with the objective of arranging oration every year by an eminent scientist working in the field of Pulmonology, preferably on Bronchial Asthma. This award was sponsored by MIS Cipla (India) Ltd. The first oration was delivered in 1997. Following persons have so far received this awards :-',
          subparagraph: ' NCCP (I) Cipla Chest Oration was created with the objective of arranging oration every year by an eminent scientist working in the field of Pulmonology, preferably on Bronchial Asthma...'

        },

        {
          heading: 'NCCP(I) German Remedies Chest Oration',
          headingTwo: '(D) NCCP (I) GERMAN REMEDIES CHEST ORATION',
          content: 'German Remedies Chest Oration was created with the objective of awarding oration every year by an eminent scientist working in the field of Pulmonary Medicine. The award will not be given to the recipient of Warner Chest Orators. NCCP (I) – Parke Davis Orators, NCCP (I) – Cipla Chest Orators to encourage new persons. This award was sponsored by M/S German Remedies Ltd. The first oration was delivered in 2002. Following persons have so far received this award.<br<<br>The name of the Award has been changed from 2014 as "NCCP (I) – Prof. A. S. Paintal, Dr. R. C. Jain Memorial Chest Oration".',
          subparagraph: ' This awards was created in 2002 by the financial support of MIS German Remedies. The awards was given every year to an eminent scientist working in the field of Pulmonology. Following...'

        },
        {
          heading: 'NCCP(I) Lupin Chest Oration',
          headingTwo: '(E) NCCP (I) LUPIN CHEST ORATION',
          content: 'Lupin Chest Oration was created with the objective of awarding oration every year by an eminent scientist working in the field of Pulmonary Medicine. The award will not be given to the recipient of Warner Chest Orators, NCCP (I) Parke Davis Orators, Raman Viswanathan Memorial Oration, NCCP (I) – Cipla Chest Orators and NCCP (I) – German Remedies Chest Oration to encourage new persons. This award was sponsored by M/S. Lupin Ltd. The first oration was delivered in 2005. Following persons have so far received this award.<br><br>The name of the Award has been changed from 2014 as "NCCP (I) – Prof. P. S. Shankar - Prof. K. C. Mohanty Chest Oration".',
          subparagraph: ' The award was created in 2005 by financial support of M/s Lupin India Ltd. The award is given every year to eminent Pulmonologist. Following persons have received the award:'

        },
        {
          heading: 'Young Scientist Award of NCCP(I)',
          headingTwo: '(G) NCCP(I) Young Scientist Award',
          content: 'he award is given to the young scientist under 35 years of age, who is the first author and isjudged by presenting his paper in that award category during the NAPCON. This award was started in 1997. From 2005 this award has been increased from one to three awards and presently the cash prize of the award is 1st Cash Price for Rs.5000/-, 2nd Cash Prize for Rs.3000/- and 3rd Cash Prize for Rs.2000/- to encourage young talents. From 2012, all the papers selected under this category (maximum 9) will be given Rs.5000/- as travel grant from NCCP(I).<br><br> The name of the Award has been changed to "NCCP (I) – Prof. S. N. Gaur Young Scientists Award".',
          subparagraph: 'To encourage research in young scientists, a cash prize of Rs. 1000/- will be given to the best paper presented by him in the annual Conference of the College. He should be the first...'

        },

      ],
    }
  },

  mounted() {
    const indexValue = this.$route.params.id;
    this.NewData = this.awardsFullData[indexValue];
    console.log(this.NewData);
  }
}
</script>


<style scoped>
.section-award {
  background: rgb(241, 241, 241);
  padding: 20px 30px;
}

.section-award h4 {
  color: #0d6efd;
}

@media(max-width: 768px) {
  .section-award {
    background: rgb(241, 241, 241);
    padding: 0px 10px;
  }
}
</style>