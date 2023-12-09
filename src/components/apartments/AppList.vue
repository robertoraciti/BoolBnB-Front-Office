<script>
import AppCard from "./AppCard.vue";
import HomepageSearch from "../ui/HomepageSearch.vue";
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      apartments: [],
      endpoint: store.api.baseUrl + "apartments",
      pagination: {
        links: null,
      },
      //  uri: store.api.baseUrl + "apartments",
    };
  },
  //   props: { type_id: Number },
  components: { AppCard, HomepageSearch },
  methods: {
    fetchProjects(uri = this.endpoint) {
      console.log(uri);
      axios.get(uri).then((response) => {
        this.apartments = response.data.data;
        this.pagination.links = response.data.links;
      });
    },
  },
  // TODO in case of filter
  computed: {
    // endpoint() {
    //   return store.api.baseUrl + "apartments";
    // ? store.api.baseUrl + "portfolio-by-type/" + this.type_id
    // : store.api.baseUrl + "apartments";
    // },
  },
  created() {
    this.fetchProjects();
  },
};
</script>
<template>
  <div class="">
    <div class="">
      <!-- <div class="debug container-fluid">
        <HomepageSearch></HomepageSearch>
      </div> -->

      <!-- <img src="../img/offgrid.jpg" alt="" /> -->
    </div>
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center">
        <li
          v-for="link in pagination.links"
          @click="fetchProjects(link.url)"
          class="page-item"
          :class="link.active ? 'active' : ''">
          <a class="page-link" v-html="link.label"></a>
        </li>
      </ul>
    </nav> -->
  </div>
  <div class="container pb-5">
    <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center mt-3">
        <li
          v-for="link in pagination.links"
          @click="fetchProjects(link.url)"
          class="page-item"
          :class="link.active ? 'active' : ''"
        >
          <a class="page-link text-black" v-html="link.label"></a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="row g-4">
    <AppCard v-for="apartment in apartments" :apartment="apartment" />
  </div>
</template>
<style lang="scss" scoped>
.pagination:hover {
  cursor: pointer;
}

.debug {
  border: 1px solid red;
}

.page-item {
  border: none;
}

.pagination {
  --bs-pagination-active-bg: #a3c422;
  --bs-pagination-active-border-color: #a3c422;
}
</style>
