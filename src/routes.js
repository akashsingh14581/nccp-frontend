import { createRouter, createWebHistory } from 'vue-router';
import { toast } from 'vue3-toastify';
import AboutUs from './views/AboutUs.vue';
import HomePage from './views/HomePage.vue';
import OurGuidelines from './views/OurGuidelines.vue';
import OurConstitution from './views/OurConstitution.vue';
import ExecutiveMembers from './views/ExecutiveMembers.vue';
// import NapCon2020 from './views/NapCon2020.vue';
import conferenCes from './views/conferenCes.vue';
import RulesandRegulations from './views/RulesandRegulations.vue';
import PresidentPage from './views/PresidentPage.vue';
import insertData from './components/insertData.vue';
import DashBoard from './components/DashBoard.vue'
import LogIn from './components/LogIn.vue';
import HonoraryMembers from './views/HonoraryMembers.vue'
import OrdinaryFellowMembers from './views/OrdinaryFellowMembers.vue'
import uploadLifeMembersExcel from './components/uploadLifeMembersExcel.vue'
import LifeMembers from './views/LifeMembers.vue'
import LifeFellowmembers from './views/LifeFellowmembers.vue'
import NapconNccp from './views/NapconNccp.vue'
import ShowData from './views/ShowData.vue'
import uploadLifeFellowMembersExcel from './components/uploadLifeFellowMembersExcel.vue';
import uploadOrdinaryMembersExcel from './components/uploadOrdinaryMembersExcel.vue';
import uploadExecutiveMembersExcel from './components/uploadedExecutiveMemberExcel.vue';
import uploadPresidentAndSecretaryMembersExcel from './components/uploadPresidentAndSecretaryExcel.vue'
import uploadHonoraryMembersExcel from './components/uploadHonoraryMembersExcel.vue'
import NotFound from './views/404.vue';
import Award_section from './views/Award_section.vue';
// import our_gallery from './views/our_gallery.vue';
import nccp_publications from './views/nccp_publications.vue'
import nccp_education from './views/nccp_education.vue'
import create_email_template from './components/create_email_template.vue'
// import EventPage from './views/EventPage.vue';
import NapconYear from './views/NapconYear.vue';
import NapconEventDetail from './views/NapconEventDetail.vue'
import Award from './components/AwardManagement.vue';
// Award component form
import ramanForm from './components/award-from-submit-data/ramanForm.vue'
import text_editor from './components/text_editor.vue';
import CreateEvent from './components/EventWizard.vue';
import CreatedEvents from './components/CreatedEvents.vue';
import EventImages from './components/EventGallery.vue';

const routes = [
  {
    name: 'HomePage',
    path: '/',
    component: HomePage,
  },
  {
    name: 'AboutUs',
    path: '/about',
    component: AboutUs,
  },
  {
    path: '/Guidelines',
    component: OurGuidelines,
  },
  {
    path: '/Constitution',
    component: OurConstitution,
  },
  {
    name: 'ExecutiveMembers',
    path: '/ExecutiveMembers',
    component: ExecutiveMembers,
  },
  // {
  //   path: '/NAPCON2020',
  //   component: NapCon2020,
  // },
  {
    path: '/conference',
    component: conferenCes,
  },
  {
    path: '/Rules&Regulations',
    component: RulesandRegulations,
  },
  {
    name: 'PresidentPage',
    path: '/President_And_Secretaries',
    component: PresidentPage,
  },

  {
    path: '/insertdata',
    component: insertData,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  {
    path: '/login',
    component: LogIn,
    meta: { showHeaderFooter: false }
  },
  {
    path: '/admin_dashboard',
    component: DashBoard,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  {
    path: '/award',
    component: Award,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
      {
    path: '/created-event',
    component: CreatedEvents,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
    {
    path: '/create-event',
    component: CreateEvent,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },

    {
    path: '/event-images/:eventId',
    name: 'EventImages',
    component: EventImages,
    props: true
  },
  {
    path: '/Nccp_Honorary_Members',
    component: HonoraryMembers
  },

  {
    path: '/Nccp_Ordinary_Members',
    component: OrdinaryFellowMembers
  },
  {
    path: '/Nccp_Life_Members',
    component: LifeMembers,
  },
  {
    path: '/Nccp_Life_Fellow_Members',
    component: LifeFellowmembers
  },
  {
    path: '/Napcon_Nccp',
    component: NapconNccp,
  },
  {
    path: '/show',
    component: ShowData,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  {
    path: '/upload-life-fellow-members-Excel-file',
    component: uploadLifeFellowMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  {
    path: '/upload-life-members-Excel-file',
    component: uploadLifeMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  {
    path: '/upload-ordinary-members-Excel-file',
    component: uploadOrdinaryMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
   {
    path: '/upload-executive-members-Excel-file',
    component: uploadExecutiveMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
     {
    path: '/upload-president-secretary-members-Excel-file',
    component: uploadPresidentAndSecretaryMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
       {
    path: '/upload-honorary-members-Excel-file',
    component: uploadHonoraryMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  {
    path: '/Ramanaward',
    component: ramanForm,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },

  {
    path: '/nccp_publications',
    component: nccp_publications,
  },
  {
    path: '/nccp_education',
    component: nccp_education,
  },
  // {
  //   path: '/our_gallery',
  //   component: our_gallery,
  // },
  // {
  //   path: '/events/:id',
  //   name: 'EventPage',
  //   component: EventPage,
  //   meta: { showHeaderFooter: true }
  // },
    {
    path: '/napcon/:year',
    name: 'NapconYear',
    component: NapconYear,
    meta: { showHeaderFooter: true }
  },
      {
    path: '/napcon/event/:id',
    name: 'NapconEventDetail',
    component: NapconEventDetail,
    meta: { showHeaderFooter: true }
  },
  {
    name: 'Award_section',
    path: '/awards/:id',
    component: Award_section,
    props: true,
  },
  {
    path: '/create_email_template',
    component: create_email_template,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  {
    path: '/text_editor',
    component: text_editor,
    meta: { requiresAuth: true, showHeaderFooter: false }
  },
  // Catch-all route for 404 page
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: { showHeaderFooter: false }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

// Route Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  const userRole = localStorage.getItem('userRole');
  const currentTime = new Date().getTime();

  // Check if user is authenticated and token is valid
  const isAuthenticated = token && tokenExpiration && currentTime < parseInt(tokenExpiration);

  // If route requires authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Not authenticated - redirect to login
      toast.error('Please login to access this page');
      next('/login');
      return;
    }

    // Check if user has admin role for admin routes
    if (to.path.includes('admin') || to.path.includes('dashboard') ||
      to.path.includes('upload') || to.path.includes('insertdata')) {
      if (userRole !== 'admin') {
        toast.error('Admin access required');
        next('/');
        return;
      }
    }
  }

  // If user is already authenticated and tries to access login page
  if (to.path === '/login' && isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      next('/admin_dashboard');
    } else {
      next('/');
    }
    return;
  }

  // Clear expired token
  if (token && tokenExpiration && currentTime > parseInt(tokenExpiration)) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');

    if (to.meta.requiresAuth) {
      toast.error('Session expired. Please login again.');
      next('/login');
      return;
    }
  }

  next();
});

export default router;