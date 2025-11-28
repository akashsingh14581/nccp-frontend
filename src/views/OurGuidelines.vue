<template>
  <div>
    <BannerSection :title="bannerContent" />
    <div class="container">
      <h3>
        Administration Guidelines for NCCP India (National College of Chest
        Physician)
      </h3>
      <hr />

      {{ bannerContent }}
    </div>
  </div>
</template>

<script>
import BannerSection from "../components/BannerSection.vue";

export default {
  components: {
    BannerSection,
  },
  data() {
    return {
      bannerContent: "Our Guidelines",
    };
  },
};
</script>
