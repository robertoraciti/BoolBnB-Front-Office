<script>
import tt from "@tomtom-international/web-sdk-services";
import axios from "axios";

export default {
  data() {
    return {
      addressToSearch: "",
      apiKey: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
      lng: "",
      lat: "",
      radius: "20000",
      rooms: 1,
      beds: 1,
      apartmentsList: [],
      apartmentsCoordinates: [],
    };
  },

  methods: {
    geocoding() {
      tt.services
        .geocode({
          key: this.apiKey,
          query: this.addressToSearch,
          bestResult: true,
        })
        .then((res) => {
          this.lng = res.position.lng;
          this.lat = res.position.lat;
          console.log(this.lng);
          console.log(this.lat);
          this.getApartmentList();
        });
    },

    // Chimata axios filter apartments
    // getApartmentList() {
    //   axios
    //     .get(
    //       `http://127.0.0.1:8000/api/search/${this.lat}/${this.lng}/${this.radius}/${this.rooms}/${this.beds}`
    //     )
    //     .then((res) => {
    //       this.apartmentsList = res.data;
    //     });
    // },

    getApartmentList() {
      axios
        .get(
          `http://127.0.0.1:8000/api/search/${this.addressToSearch}/${this.lat}/${this.lng}/${this.radius}`
        )
        .then((res) => {
          console.log(res.data);
          this.apartmentsList = res.data;
        });
    },
  },

  created() {
    this.geocoding();
    this.getApartmentList();
  },
};
</script>
<template>
  <div class="wrapper my-5">
    <div class="container mt-5">
      <h2>Ricerca:</h2>
      <br />
      <input
        type="text"
        name="search"
        id="search"
        class="mt-2"
        v-model="addressToSearch"
        @keyup.enter="geocoding(), getApartmentList()"
      />
    </div>

    <div class="container mt-5">
      <h2>Risultati:</h2>
      <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
