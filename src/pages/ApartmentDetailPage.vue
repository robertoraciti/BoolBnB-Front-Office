<script>
import axios from "axios";
import { store } from "../data/store";

// import mappa
import tomMap from "../components/tomtom/map.vue";

// cose da far importare
import messageForm from "../components/modals/MessageForm.vue";

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
  components: { messageForm, tomMap },

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
  <div class="container mt-3 d-flex justify-content-between">
    <RouterLink
      class="btn btn-primary ms-3"
      :to="{
        name: 'home',
      }"
      >Go Back</RouterLink
    >
    <button
      type="button"
      class="btn btn-success"
      data-bs-toggle="modal"
      :data-bs-target="'#messageModal-' + apartment.id"
    >
      Send message
    </button>
  </div>
  <div
    class="container w-75 mt-5 d-flex justify-content-around col-sm-12 col-md-4"
  >
    <div class="row col-sm-1 col-md-2 w-100 d-flex flex-column flex-md-row">
      <div class="col no-p me-4">
        <img :src="apartment.cover_image" alt="" class="" />
      </div>
      <div class="col border no-p border-primary">
        <div class="main-info">
          <h2>{{ apartment.name }}</h2>
          <h5>{{ apartment.address }}</h5>
        </div>

        <div class="p-2">
          <p>{{ apartment.description }}</p>
        </div>
        <div class="mt-3">
          <ul class="row row-cols-2 mx-2 no-p">
            <li class="col ms-border">
              <strong>{{ apartment.rooms }}</strong> Rooms
            </li>
            <li class="col ms-border">
              <strong>{{ apartment.beds }} </strong> Beds
            </li>
            <li class="col ms-border">
              <strong>{{ apartment.bathrooms }}</strong> Baths
            </li>
            <li class="col ms-border">
              <strong>{{ apartment.mq }}</strong> Mq
            </li>
          </ul>
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
      <div class="col">
        <tomMap :apartment="apartment" />
      </div>
    </div>
  </div>

  <!-- <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    :data-bs-target="'#messageModal-' + apartment.id"
  >
    Send message
  </button> -->

  <messageForm :apartment="apartment"></messageForm>
</template>

<style lang="scss" scoped>
.no-p {
  padding: 0;
}
.main-info {
  color: white;
  background-color: royalblue;
}
div {
  img {
    object-fit: fill;
    width: 100%;
    // height: 100%;
  }
}
ul {
  list-style: none;
}
</style>
