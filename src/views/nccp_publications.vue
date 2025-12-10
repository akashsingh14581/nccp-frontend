<template>
  <div>
    <BannerSection title="Nccp Publications" />
    <div
      class="container"
      style="background-color: #edf2f7; padding: 20px; border-radius: 10px"
    >
      <h3>Welcome to NCCP (India) Publications</h3>
      <hr />
      <h5 class="nccp_subheading">National College of Chest Physicians</h5>

      <div class="publication_book mt-5">
        <div v-for="card in cards" :key="card">
          <div class="img_div">
            <img :src="card.images" style="border-radius: 10px" loading="lazy" alt="publication" />
          </div>
          <p class="text-center" v-html="card.paragraph"></p>
        </div>
      </div>
      <h5 class="nccp_subheading mt-5">
        For NCCP (INDIA) Publications - download the followings !!!
      </h5>
      <hr />
      <p>
        We are happy to serve you better, for Healthcare Blletins you can
        download as per your choice:-
      </p>

      <p>
        <b>Lung Bulletin </b>- Innagural Issue (January-June 2020) Theme -
        <span style="color: #007bff"><b>Pulmonary Hypertension</b></span>
      </p>
      <p>
        <b>Lung Bulletin</b>- Second Issue (July-December 2020) Theme -
        <span style="color: #007bff"><b>Pulmonary Function Tests</b></span>
      </p>
      <p>
        <b>Lung Bulletin</b>- Third Issue (January-June 2021) Theme -
        <span style="color: #007bff"><b>All About Oxygen Therapy</b></span>
      </p>
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
      cards: [
        {
          images: require("@/assets/publications/lung-bulletin-1.jpg"),
        },

        {
          images: require("@/assets/publications/lung-bulletin-2.jpg"),
        },
        {
          images: require("@/assets/publications/lung-bulletin-3.jpg"),
        },
      ],
    };
  },
  methods: {
    openPDF(pdfPath) {
      window.open(pdfPath, "_blank");
    },
  },
};
</script>

<style scoped>
.nccp_subheading {
  background: #007bff;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
}

.publication_book {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.img_div {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.img_div img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .publication_book {
    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
  }
}
</style>
