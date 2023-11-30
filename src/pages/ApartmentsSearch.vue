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
      radius: "20",
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
          console.log(res);
          this.lng = res.position.lng;
          this.lat = res.position.lat;

          this.getApartmentList();
        });
    },
    // Chimata axios filter apartments
    getApartmentList() {
      axios
        .get(
          `http://127.0.0.1:8000/api/search/${this.lat}/${this.lng}/${this.radius}/${this.rooms}/${this.beds}`
        )
        .then((res) => {
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
      <h2>Search:</h2>
      <br />
      <label for="address">Address</label>
      <input
        type="text"
        name="address"
        id="address"
        class="mt-2"
        v-model="addressToSearch"
      />
      <br />
      <label for="rooms">rooms</label>
      <input
        type="number"
        name="rooms"
        id="rooms"
        min="1"
        v-model="rooms"
      /><br />

      <label for="beds">beds</label>
      <input type="number" name="beds" id="beds" min="1" v-model="beds" />
    </div>

    <label for="radius" class="form-label">Radius</label>
    <input
      type="range"
      class="form-range"
      id="radius"
      min="20"
      max="100"
      step="10"
      v-model="radius"
      @click.left="geocoding()"
    />
    <span>{{ this.radius }} km</span>

    <button class="btn btn-primary" @click="geocoding()">Search</button>

    <div class="container mt-5">
      <h2>Results:</h2>
      <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 80%;
  margin: auto;
  border-radius: 10px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: lightgrey;
}
</style>
