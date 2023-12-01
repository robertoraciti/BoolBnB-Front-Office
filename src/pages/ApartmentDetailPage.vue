<script>
import axios from "axios";
import { store } from "../data/store";

export default {
  data() {
    return {
      apartment: null,

      error: {
        hasError: false,
        message: "",
      },
    };
  },

  created() {
    console.log(store.api.baseUrl + "apartments/" + this.$route.params.id);
    axios
      .get(store.api.baseUrl + "apartments/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        this.apartment = response.data;
      })
      .catch((error) => {
        this.$router.push({ name: "not-found" });
      });
  },
};
</script>

<template>
  <RouterLink
    class="btn btn-danger ms-5 mt-3"
    :to="{
      name: 'home',
    }"
    >Go Back</RouterLink
  >
  <div class="container mt-5 d-flex justify-content-around">
    <div class="row">
      <div class="col-5">
        <img :src="apartment.cover_image" alt="" />
      </div>
      <div class="col-5 border no-p border-danger">
        <div class="main-info">
          <h2>{{ apartment.name }}</h2>
          <h5>{{ apartment.address }}</h5>
        </div>

        <div class="mt-5 p-2">
          <p>{{ apartment.description }}</p>
        </div>
        <div class="text-center mt-5">
          <div class="row">
            <div class="col">{{ apartment.rooms }} Rooms</div>
            <div class="col">{{ apartment.beds }} Beds</div>
            <div class="col">{{ apartment.bathrooms }} Bathrooms</div>
            <div class="col">{{ apartment.mq }} Mq</div>
          </div>
        </div>
        <div class="container mt-5">
          <div class="row row-cols-2">
            <div v-for="service in apartment.services" class="col">
              <font-awesome-icon :icon="'fa-solid fa-' + service.icon" />
              {{ service.name }}
            </div>
          </div>
          <div>
            <p class="fw-bold mt-5">{{ apartment.price }} € night</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-p {
  padding: 0;
}
.main-info {
  color: white;
  background-color: red;
}

img {
  object-fit: cover;
  width: 100%;
}
</style>
