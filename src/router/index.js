import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import Apartments from "../pages/ApartmentsPage.vue";
import ApartmentDetail from "../pages/ApartmentDetailPage.vue";
// import PortfolioByType from "../pages/PortfolioByTypePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: HomePage,
    },
    {
      name: "apartments",
      path: "/apartments",
      component: Apartments,
    },
    {
      name: "apartment",
      path: "/apartment/:id",
      component: ApartmentDetail,
    },
    // {
    //   path: "/project/type/:type_id",
    //   name: "portfolio-by-type",
    //   component: PortfolioByType,
    // },
  ],
});

export { router };
