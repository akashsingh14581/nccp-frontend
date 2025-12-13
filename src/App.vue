<template>
  <div id="app">
    <menuSection v-if="showHeaderFooter" @open-contact="showContact = true" />
    <router-view></router-view>
    <footerSection v-if="showHeaderFooter" />

     <!-- Contact Form Overlay -->
    <ContactUs 
      v-if="showContact" 
      @close="showContact = false"
    />
  </div>
</template>

<script>
import menuSection from './components/menuSection'
import footerSection from './components/footerSection.vue'
import ContactUs from './components/core/ContactUs/ContactUs.vue';


export default {
  name: 'App',
  components: {
    menuSection,
    footerSection,
    ContactUs
  },
  data(){
    return {
      showContact:false
    }
  },
  computed: {
    showHeaderFooter() {
      return this.$route.meta.showHeaderFooter !== false;
    }
  }
}
</script>

<style>
html,
body {
  width: 100vw;
  overflow-x: hidden;
}
</style>
