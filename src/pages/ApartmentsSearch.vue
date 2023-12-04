<script>
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import axios from "axios";

export default {
  data() {
    return {
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
      let getAddress = document.getElementById("address").value;
      services
        .geocode({
          key: this.apiKey,
          query: getAddress,
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

    autocompleteAddress() {
      var options = {
        searchOptions: {
          key: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
          language: "en-EN",
          limit: 5,
        },
        autocompleteOptions: {
          key: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
          language: "it-IT",
        },
      };
      var ttSearchBox = new SearchBox(services, options);
      var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
      let address_search = document.getElementById("address_search");
      address_search.append(searchBoxHTML);

      ttSearchBox.on("tomtom.searchbox.resultselected", function (data) {
        console.log(data.data.result.address.freeformAddress);
        let choiceAddress = document.getElementById("address");
        choiceAddress.value = data.data.result.address.freeformAddress;
      });
    },
  },

  mounted() {
    this.autocompleteAddress();
    this.geocoding();
  },
};
</script>

<template>
  <!-- <link
    rel="stylesheet"
    type="text/css"
    href="https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.12/SearchBox.css"
  /> -->
  <link
    rel="stylesheet"
    href="../../node_modules/@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css"
  />
  <div class="wrapper my-5">
    <div class="container mt-5">
      <h2 class="text-center">Search:</h2>
      <label for="address" class="form-label">Address</label>
      <div id="address_search"></div>
      <input type="hidden" class="form-control" id="address" name="address" />
      <br />
      <label for="rooms">rooms</label>
      <input
        type="number"
        class="form-control"
        name="rooms"
        id="rooms"
        min="1"
        v-model="rooms"
      /><br />

      <label for="beds">beds</label>
      <input
        type="number"
        class="form-control"
        name="beds"
        id="beds"
        min="1"
        v-model="beds"
      />

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
      <span>{{ this.radius }} km</span> <br />
      <button class="btn btn-primary mt-3" @click="geocoding()">Search</button>
    </div>

    <h2 class="text-center">Results:</h2>
    <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 80%;
  margin: auto;
  border-radius: 10px;
  min-height: 500px;

  background-color: lightgrey;
}
</style>
