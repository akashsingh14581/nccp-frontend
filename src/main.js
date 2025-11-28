import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'bootstrap/dist/js/bootstrap.js';
import CanvasJSChart from '@canvasjs/vue-charts';
import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Import AOS
import AOS from 'aos';

const app = createApp(App);

// Use plugins
app.use(router);
app.use(Toast);
app.use(CanvasJSChart);

// Mount app
app.mount('#app');

// ----- AOS GLOBAL INIT -----
AOS.init({
  duration: 500, // animation duration in ms
  once: true,    // animation only once while scrolling
});

// Refresh AOS on route change (optional but recommended)
router.afterEach(() => {
  setTimeout(() => {
    AOS.refresh();
  }, 100); // slight delay to ensure DOM rendered
});
