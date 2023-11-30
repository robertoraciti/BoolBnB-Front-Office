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
  <div class="container">
    <h5 class="my-5">Apartment Detail</h5>
    <h2>{{ apartment.name }}</h2>
    <h5>{{ apartment.address }}</h5>

    <div>
      <p class="fw-bold mt-5">{{ apartment.price }} € night</p>
    </div>
    <div class="mt-5">
      <img :src="apartment.cover_image" alt="" class="h-50 w-100" />
    </div>
    <div class="mt-5">
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
  </div>
</template>

<style lang="scss" scoped></style>
