<template>
  <section id="Banner-Section" class="mt-5 Banner-Section">
    <div class="container">
      <div class="mt-5 text-center" data-aos="zoom-in">
        <h1>{{ title }}</h1>
        <h4>(National College Of Chest Physician)</h4>
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable */
export default {
  name: "BannerSection",
  props: {
    title: String,
      required: false
  },
};
</script>
<style>
.Banner-Section {
background: linear-gradient(
    to top,                          /* direction changed */
    rgba(0, 0, 0, 0.85),             /* bottom = darker */
    rgba(0, 0, 0, 0.4),              /* mid */
    rgba(0, 0, 0, 0.15)              /* top = lighter */
  ),
  url("@/assets/bg-image.avif") center center / cover no-repeat fixed;

  background-size: cover;
  height: 410px;
  position: relative;
  top: -50px;
  display: grid;
  place-items: center;
}

.Banner-Section h1 {
  color: #fff;
  font-weight: 600;
}

.Banner-Section h4 {
  color: #fff;
}

.Banner-Section .about-btn {
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

.Banner-Section .about-btn:hover {
  background: #3b71ca;
  border: 2px solid #3b71ca;
}
</style>
