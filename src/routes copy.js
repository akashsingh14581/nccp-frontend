
import { createRouter, createWebHistory } from 'vue-router';
import AboutUs from './views/AboutUs.vue';
import HomePage from './views/HomePage.vue';
import OurGuidelines from './views/OurGuidelines.vue';
import OurConstitution from './views/OurConstitution.vue';
import ExecutiveMembers from './views/ExecutiveMembers.vue';
import NapCon2020 from './views/NapCon2020.vue';
import conferenCes from './views/conferenCes.vue';
import RulesandRegulations from './views/RulesandRegulations.vue';
import PresidentPage from './views/PresidentPage.vue';
import Parke from './views/AwardsSection.vue';
import insertData from './components/insertData.vue';
import DashBoard from './components/DashBoard.vue'
import LogIn from './components/LogIn.vue';
import HonoraryMembers from './views/HonoraryMembers.vue'
import HonoraryMembersForm from './components/HonoraryMembersForm.vue'
import OrdinaryFellowMembers from './views/OrdinaryFellowMembers.vue'
import uploadLifeMembersExcel from './components/uploadLifeMembersExcel.vue'
import LifeMembers from './views/LifeMembers.vue'
import LifeFellowmembers from './views/LifeFellowmembers.vue'
import NapconNccp from './views/NapconNccp.vue'
import NAPCONFORM from './components/NAPCONFORM.vue'
import ShowData from './views/ShowData.vue'
import uploadLifeFellowMembersExcel from './components/uploadLifeFellowMembersExcel.vue';
import uploadOrdinaryMembersExcel from './components/uploadOrdinaryMembersExcel.vue';
import NotFound from './views/404.vue';
import Award_section from './views/Award_section.vue';
import our_gallery from './views/our_gallery.vue';
import nccp_publications from './views/nccp_publications.vue'
import nccp_education from './views/nccp_education.vue'
// import lifeFellowform from './components/lifeFellowform.vue'
import create_email_template from './components/create_email_template.vue'
import EventPage from './views/EventPage.vue';

//Award component form
import ramanForm from './components/award-from-submit-data/ramanForm.vue'
import text_editor from './components/text_editor.vue'
//Awards
// import cipla_chest from './views/Awards/cipla_chest.vue';
// import german_remedies from './views/Awards/german_remedies.vue';
// import lupin_chest from './views/Awards/lupin_chest.vue';
// import parke_devis from './views/Awards/parke_devis.vue';
// import raman_vishwanathan from './views/Awards/raman_vishwanathan.vue';
// import young_scientist from './views/Awards/young_scientist.vue';

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
  {
    path: '/NAPCON2020',
    component: NapCon2020,
  },
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
    name: 'hello',
    path: '/parke/:id',
    component: Parke,
  },
  {
    path: '/insertdata',
    component: insertData,
  },
  {
    path: '/login',
    component: LogIn,
    meta: { showHeaderFooter: false }
  },

  {
    path: '/admin_dashboard',
    component: DashBoard,
    meta: { showHeaderFooter: false }
  },
  {
    path: '/Nccp_Honorary_Members',
    component: HonoraryMembers
  },

  {
    path: '/hmf',
    component: HonoraryMembersForm
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
    path: '/nmd',
    component: NAPCONFORM
  },
  {
    path: '/show',
    component: ShowData
  },

  {
    path: '/upload-life-fellow-members-Excel-file',
    component: uploadLifeFellowMembersExcel,
    meta: { showHeaderFooter: false }
  },

  {
    path: '/upload-life-members-Excel-file',
    component: uploadLifeMembersExcel,
    meta: { showHeaderFooter: false }
  },
  {
    path: '/upload-ordinary-members-Excel-file',
    component: uploadOrdinaryMembersExcel,
    meta: { showHeaderFooter: false }
  },


  // Catch-all route for 404 page
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: { showHeaderFooter: false }
  },


  {
    path: '/Ramanaward',
    component: ramanForm
  },

  {
    path: '/nccp_publications',
    component: nccp_publications,

  },
  {
    path: '/nccp_education',
    component: nccp_education,

  },
  {
    path: '/our_gallery',
    component: our_gallery,

  },
  {
    path: '/events/:year',
    name: 'EventPage',       // optional but recommended
    component: EventPage,
    meta: { showHeaderFooter: true }  // taaki header/footer show ho jaaye
  },

  {
    name: 'Award_section',
    path: '/awards/:id',
    component: Award_section
  },


  {
    path: '/create_email_template',
    component: create_email_template,
    meta: { showHeaderFooter: false }
  },
  {
    path: '/text_editor',
    component: text_editor,
    meta: { showHeaderFooter: false }
  },
];
// admin


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  const currentTime = new Date().getTime();
  if (token && tokenExpiration && currentTime < tokenExpiration) {
    if (to.path === '/') {
      next('/admin_dashboard');
    } else {
      next();
    }
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');

    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({ path: '/admin', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  }
});



export default router;
