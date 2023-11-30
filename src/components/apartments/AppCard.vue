<script>
import axios from "axios";
import AppCard from "./AppCard.vue";
import { store } from "../../data/store";
import ApartmentDetail from "../../pages/ApartmentDetailPage.vue";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      title: "Apartment Card",
    };
  },
  props: {
    apartment: Object,
  },
  components: { ApartmentDetail, RouterLink },
};
</script>

<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <img :src="apartment.cover_image" alt="" class="h-50 w-100" />
        <h4>{{ apartment.name }}</h4>
        <p>{{ apartment.description }}</p>
        <p class="mt-auto">
          <strong>{{ apartment.price }} € </strong> a Notte
        </p>
      </div>
      <!-- <RouterLink
        class="d-flex justify-content-center align-self-center btn btn-primary px-3 my-2"
        :to="{ name: 'apartment' }"
        >Dettagli
      </RouterLink> -->
    </div>
  </div>
</template>

<style scoped></style>
