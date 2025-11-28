<template>
<div id="app">
     <menuSection v-if="showHeaderFooter" />
           <router-view></router-view>
     <footerSection v-if="showHeaderFooter" />
</div>
</template>

<script>
import menuSection from './components/menuSection'
import footerSection from './components/footerSection.vue'



export default {
  name: 'App',
  components: {
  menuSection,
  footerSection,

  },

  computed: {
    showHeaderFooter() {
      return this.$route.meta.showHeaderFooter !== false;
    }
  }
}
</script>

<style>
html, body{
  width: 100vw;
  overflow-x: hidden;
}
</style>
