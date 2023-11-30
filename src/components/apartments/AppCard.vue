<script>
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      title: "Apartment Card",
      name: "App",
    };
  },
  props: {
    apartment: Object,
  },
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
          <strong>{{ apartment.price }} € </strong> Night
        </p>
      </div>
      <div class="container">
        <div v-for="service in apartment.services">
          <font-awesome-icon icon="fa-solid fa-mug-hot" />
          {{ service.icon }}
        </div>
      </div>
      <RouterLink
        class="d-flex justify-content-center align-self-center btn btn-primary px-3 my-2"
        :to="{
          name: 'apartment',
          params: {
            id: apartment.id,
          },
        }"
        >Details
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
