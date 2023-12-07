<script>
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import axios from "axios";

export default {
  data() {
    return {
      apiKey: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
      lng: null,
      lat: null,
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
          this.lng = res.position.lng;
          this.lat = res.position.lat;
          console.log(res.address.freeformAddress);
          console.log(this.lat);
          this.getApartmentList();
        });
    },

    getApartmentList() {
      axios
        .get(
          `http://127.0.0.1:8000/api/search/${this.lat}/${this.lng}/${this.radius}`
        )
        .then((res) => {
          console.log(res);
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

    getCoordinates() {
      console.log("lat:", this.lat, "lng:", this.lng);
      return {
        name: "advanced-search",
        params: {
          lat: this.lat,
          lng: this.lng,
        },
      };
    },
  },

  mounted() {
    this.autocompleteAddress();
    this.geocoding();
  },
};
</script>

<template>
  <link
    rel="stylesheet"
    href="../../node_modules/@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css"
  />
  <div class="wrapper">
    <div class="container">
      <!-- <h2>Ricerca:</h2> -->

      <div id="address_search">
        <button @click="geocoding()">Search</button>
      </div>
      <RouterLink class="btn btn-warning" :to="getCoordinates()">
        Filtered Search
      </RouterLink>
      <input type="hidden" class="form-control" id="address" name="address" />
    </div>

    <div class="container mt-5">
      <!-- <h2>Risultati:</h2> -->
      <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 100px;
}
</style>
