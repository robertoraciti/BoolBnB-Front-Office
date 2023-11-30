<script>
import axios from "axios";
import { store } from "../data/store";

import AppCard from "../components/apartments/AppCard.vue";

export default {
  data() {
    return {
      filteredApartments: [],
      services: [],
    };
  },

  computed: {
    activeFilters() {
      const activeServices = [];

      this.services.forEach((service) => {
        if (service.active) activeServices.push(service.id);
      });

      return {
        activeTags,
      };
    },
  },

  components: { AppCard },

  methods: {
    fetchPosts() {
      axios
        .post(
          store.api.baseUrl + "get-apartments-by-filters",
          this.activeFilters,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          this.filteredApartments = response.data.data;
        });
    },

    fetchServices() {
      axios.get(store.api.baseUrl + "services").then((response) => {
        this.services = response.data.map((service) => {
          return {
            ...service,
            active: false,
          };
        });
      });
    },

    toggleService(service) {
      service.active = !service.active;
      this.fetchApartments();
    },
  },

  created() {
    this.fetchServices();
    this.fetchApartments();
  },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">Advanced research</h1>
    <div class="row">
      <div class="col-3">
        <h4>Select the services</h4>

        <span
          v-for="service in services"
          :key="service.id"
          :class="{
            disabled: !service.active,
          }"
          @click="toggleService(service)"
          class="badge mx-1 clickable"
        >
          {{ service.name }}
        </span>
      </div>
      <div class="col-9">
        <div class="row row-cols-2 g-3">
          <AppCard
            v-for="apartment in filteredApartments"
            :key="apartment.id"
            :post="apartment"
            :isDetail="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .disabled {
//   background-color: #555 !important;
// }

// .clickable {
//   cursor: pointer;
// }
</style>
