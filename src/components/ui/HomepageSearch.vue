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

  <div class="wrapper container">
    <div class="title-jumbo py-3">
      <h1>Your dream house is just a click away...</h1>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="w-50 mx-4 searchb"><div id="address_search"></div></div>
      <!-- searchbar type hidden -->
      <input
        type="hidden"
        class="form-control w-25"
        id="address"
        name="address"
      />
      <div>
        <button class="button mt-2" @click="geocoding()">Search</button>
      </div>
      <!-- <RouterLink
        class="btn btn-warning"
        :to="{
          name: 'advanced-search',
        }"
      >
        Filtered Search
      </RouterLink> -->
    </div>

    <div class="container mt-5">
      <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding-top: 250px;
}

.title-jumbo {
  color: black;
  text-align: center;
}

.debug {
  border: 1px solid red;
}

.button {
  background-color: #a3c422;
  border: 1px solid black;
  padding: 5px 35px;
  border-radius: 20px;
  font-weight: 400;
}

.button:hover {
  background-color: rgba(0, 0, 0, 0.615);
  color: #a3c422;
}

.searchb {
  width: 35% !important;
}
</style>
