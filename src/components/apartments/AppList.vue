<script>
import AppCard from "./AppCard.vue";
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
  components: { AppCard },
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
  <div class="container">
    <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center">
        <li
          v-for="link in pagination.links"
          @click="fetchProjects(link.url)"
          class="page-item"
          :class="link.active ? 'active' : ''"
        >
          <a class="page-link" v-html="link.label"></a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="row row-cols-3 g-4">
    <AppCard v-for="apartment in apartments" :apartment="apartment" />
  </div>
  <div class="container">
    <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center mt-5">
        <li
          v-for="link in pagination.links"
          @click="fetchProjects(link.url)"
          class="page-item"
          :class="link.active ? 'active' : ''"
        >
          <a class="page-link" v-html="link.label"></a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
.pagination:hover {
  cursor: pointer;
}
</style>
