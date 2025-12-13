<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    :pagination="{ clickable: true }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <SwiperSlide v-for="(img, i) in slides" :key="i">
      <img :src="img" alt="slider" loading="lazy" />
    </SwiperSlide>
  </swiper>
</template>

<script>
// images import 
import img1 from '@/assets/Slider/sliderImg1.webp'
import img2 from '@/assets/Slider/sliderImg2.webp'
import img3 from '@/assets/Slider/sliderImg3.webp'
import img4 from '@/assets/Slider/sliderImg4.webp'
import img5 from '@/assets/Slider/sliderImg5.webp'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default {
  name: "SliderComponent",

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
      slides: [img1, img2, img3, img4, img5],
    };
  },
};
</script>

<style scoped>
@import "./SliderComponent.css";
</style>
