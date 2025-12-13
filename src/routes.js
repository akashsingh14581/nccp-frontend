import { createRouter, createWebHistory } from "vue-router";
import { toast } from "vue3-toastify";
const AboutUs = () => import("./views/AboutUs.vue");
const HomePage = () => import("./views/HomePage.vue");
const OurGuidelines = () => import("./views/OurGuidelines.vue");
const OurConstitution = () => import("./views/OurConstitution.vue");
const ExecutiveMembers = () => import("./views/ExecutiveMembers.vue");
// import NapCon2020 from './views/NapCon2020.vue';
const conferenCes = () => import("./views/conferenCes.vue");
const RulesandRegulations = () => import("./views/RulesandRegulations.vue");
const PresidentPage = () => import("./views/PresidentPage.vue");
const insertData = () => import("./components/insertData.vue");
const DashBoard = () => import("./components/DashBoard.vue");
const LogIn = () => import("./components/LogIn.vue");
const HonoraryMembers = () => import("./views/HonoraryMembers.vue");
const OrdinaryFellowMembers = () => import("./views/OrdinaryFellowMembers.vue");
const uploadLifeMembersExcel = () =>
  import("./components/uploadLifeMembersExcel.vue");
const LifeMembers = () => import("./views/LifeMembers.vue");
const LifeFellowmembers = () => import("./views/LifeFellowmembers.vue");
const NapconNccp = () => import("./views/NapconNccp.vue");
const ShowData = () => import("./views/ShowData.vue");
const uploadLifeFellowMembersExcel = () =>
  import("./components/uploadLifeFellowMembersExcel.vue");
const uploadOrdinaryMembersExcel = () =>
  import("./components/uploadOrdinaryMembersExcel.vue");
const uploadExecutiveMembersExcel = () =>
  import("./components/uploadedExecutiveMemberExcel.vue");
const uploadPresidentAndSecretaryMembersExcel = () =>
  import("./components/uploadPresidentAndSecretaryExcel.vue");
const uploadHonoraryMembersExcel = () =>
  import("./components/uploadHonoraryMembersExcel.vue");
const NotFound = () => import("./views/404.vue");
const Award_section = () => import("./views/Award_section.vue");
// import our_gallery from './views/our_gallery.vue';
const nccp_publications = () => import("./views/nccp_publications.vue");
const nccp_education = () => import("./views/nccp_education.vue");
const create_email_template = () =>
  import("./components/create_email_template.vue");
// import EventPage from './views/EventPage.vue';
const NapconYear = () => import("./views/NapconYear.vue");
const NapconEventDetail = () => import("./views/NapconEventDetail.vue");
const Award = () => import("./components/AwardManagement.vue");
// Award component form
const ramanForm = () =>
  import("./components/award-from-submit-data/ramanForm.vue");
const text_editor = () => import("./components/text_editor.vue");
const CreateEvent = () => import("./components/EventWizard.vue");
const CreatedEvents = () => import("./components/CreatedEvents.vue");
const EventImages = () => import("./components/EventGallery.vue");

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
  },
  {
    name: "AboutUs",
    path: "/about",
    component: AboutUs,
  },
  {
    path: "/Guidelines",
    component: OurGuidelines,
  },
  {
    path: "/Constitution",
    component: OurConstitution,
  },
  {
    name: "ExecutiveMembers",
    path: "/ExecutiveMembers",
    component: ExecutiveMembers,
  },
  // {
  //   path: '/NAPCON2020',
  //   component: NapCon2020,
  // },
  {
    path: "/conference",
    component: conferenCes,
  },
  {
    path: "/Rules&Regulations",
    component: RulesandRegulations,
  },
  {
    name: "PresidentPage",
    path: "/President_And_Secretaries",
    component: PresidentPage,
  },

  {
    path: "/insertdata",
    component: insertData,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/login",
    component: LogIn,
    meta: { showHeaderFooter: false },
  },
  {
    path: "/admin_dashboard",
    component: DashBoard,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/award",
    component: Award,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/created-event",
    component: CreatedEvents,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/create-event",
    component: CreateEvent,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },

  {
    path: "/event-images/:eventId",
    name: "EventImages",
    component: EventImages,
    props: true,
  },
  {
    path: "/Nccp_Honorary_Members",
    component: HonoraryMembers,
  },

  {
    path: "/Nccp_Ordinary_Members",
    component: OrdinaryFellowMembers,
  },
  {
    path: "/Nccp_Life_Members",
    component: LifeMembers,
  },
  {
    path: "/Nccp_Life_Fellow_Members",
    component: LifeFellowmembers,
  },
  {
    path: "/Napcon_Nccp",
    component: NapconNccp,
  },
  {
    path: "/show",
    component: ShowData,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/upload-life-fellow-members-Excel-file",
    component: uploadLifeFellowMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/upload-life-members-Excel-file",
    component: uploadLifeMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/upload-ordinary-members-Excel-file",
    component: uploadOrdinaryMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/upload-executive-members-Excel-file",
    component: uploadExecutiveMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/upload-president-secretary-members-Excel-file",
    component: uploadPresidentAndSecretaryMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/upload-honorary-members-Excel-file",
    component: uploadHonoraryMembersExcel,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/Ramanaward",
    component: ramanForm,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },

  {
    path: "/nccp_publications",
    component: nccp_publications,
  },
  {
    path: "/nccp_education",
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
    path: "/napcon/:year",
    name: "NapconYear",
    component: NapconYear,
    meta: { showHeaderFooter: true },
  },
  {
    path: "/napcon/event/:id",
    name: "NapconEventDetail",
    component: NapconEventDetail,
    meta: { showHeaderFooter: true },
  },
  {
    name: "Award_section",
    path: "/awards/:id",
    component: Award_section,
    props: true,
  },
  {
    path: "/create_email_template",
    component: create_email_template,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  {
    path: "/text_editor",
    component: text_editor,
    meta: { requiresAuth: true, showHeaderFooter: false },
  },
  // Catch-all route for 404 page
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    meta: { showHeaderFooter: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

// Route Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const userRole = localStorage.getItem("userRole");
  const currentTime = new Date().getTime();

  // Check if user is authenticated and token is valid
  const isAuthenticated =
    token && tokenExpiration && currentTime < parseInt(tokenExpiration);

  // If route requires authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Not authenticated - redirect to login
      toast.error("Please login to access this page");
      next("/login");
      return;
    }

    // Check if user has admin role for admin routes
    if (
      to.path.includes("admin") ||
      to.path.includes("dashboard") ||
      to.path.includes("upload") ||
      to.path.includes("insertdata")
    ) {
      if (userRole !== "admin") {
        toast.error("Admin access required");
        next("/");
        return;
      }
    }
  }

  // If user is already authenticated and tries to access login page
  if (to.path === "/login" && isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    if (userRole === "admin") {
      next("/admin_dashboard");
    } else {
      next("/");
    }
    return;
  }

  // Clear expired token
  if (token && tokenExpiration && currentTime > parseInt(tokenExpiration)) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");

    if (to.meta.requiresAuth) {
      toast.error("Session expired. Please login again.");
      next("/login");
      return;
    }
  }

  next();
});

export default router;
