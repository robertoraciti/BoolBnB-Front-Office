import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import Apartments from "../pages/ApartmentsPage.vue";
import ApartmentDetail from "../pages/ApartmentDetailPage.vue";
import ApartmentsSearch from "../pages/ApartmentsSearch.vue";
import AdvancedFilters from "../pages/ApartmentsAdvancedFiltersPage.vue";

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
    {
      name: "advanced-search",
      path: "/advanced-search",
      component: ApartmentsSearch,
    },
    {
      name: "advanced-filter",
      path: "/advanced-filter",
      component: AdvancedFilters,
    },
    // {
    //   path: "/project/type/:type_id",
    //   name: "portfolio-by-type",
    //   component: PortfolioByType,
    // },
  ],
});

export { router };
