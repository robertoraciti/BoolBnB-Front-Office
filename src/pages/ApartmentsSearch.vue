<script>
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import axios from "axios";

import AppCard from "../components/apartments/AppCard.vue";

export default {
  data() {
    return {
      apiKey: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
      lng: this.$route.params.lng,
      lat: this.$route.params.lat,
      radius: 20,
      rooms: 1,
      beds: 1,
      services: [],
      apartmentsList: [],
    };
  },

  computed: {
    activeFilters() {
      const activeServices = [];

      this.services.forEach((service) => {
        if (service.active) activeServices.push(service.id);
      });

      return {
        activeServices,
      };
    },
  },

  components: { AppCard },

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

          this.getApartmentList();
        });
    },
    // Chimata axios filter apartments
    getApartmentList() {
      axios
        .post(
          `http://127.0.0.1:8000/api/search/${this.lat}/${this.lng}/${this.radius}/${this.rooms}/${this.beds}`,
          this.activeFilters,
          console.log(this.activeFilters)
        )
        .then((res) => {
          this.apartmentsList = res.data;
        });
    },

    fetchServices() {
      axios.get("http://127.0.0.1:8000/api/services").then((response) => {
        this.services = response.data.map((service) => {
          return {
            ...service,
            active: false,
          };
        });
      });
    },

    toggleService(service) {
      service.active = !service.active;
      this.getApartmentList();
    },

    autocompleteAddress() {
      var options = {
        searchOptions: {
          key: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
          language: "en-GB",
          limit: 5,
        },
        autocompleteOptions: {
          key: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
          language: "en-GB",
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

  created() {
    this.fetchServices();
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

      <div class="col-3">
        <h4>Select the services</h4>

        <span
          v-for="service in services"
          :key="service.id"
          :class="{
            disabled: !service.active,
          }"
          @click="toggleService(service)"
          class="badge mx-1 clickable service"
        >
          {{ service.name }}
        </span>
      </div>
      <button class="btn btn-primary mt-3" @click="geocoding()">Search</button>
    </div>

    <!-- <h2 class="text-center">Results:</h2>
    <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p> -->
    <div class="col-9">
      <div class="row row-cols-2 g-3">
        <AppCard
          v-for="(apartment, index) in apartmentsList"
          :key="apartment.id"
          :apartment="apartment"
          :isDetail="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 80%;
  margin: auto;
  border-radius: 10px;
  min-height: 500px;
  margin-top: 150px;

  background-color: lightgrey;
}

.disabled {
  background-color: #555 !important;
}

.clickable {
  cursor: pointer;
}

.service {
  background-color: rgb(114, 114, 189);
}
</style>
