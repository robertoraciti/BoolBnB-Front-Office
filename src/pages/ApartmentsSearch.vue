<script>
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import axios from "axios";

import AppCard from "../components/apartments/AppCard.vue";

export default {
  data() {
    return {
      apiKey: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
      query: "",
      suggestions: [],
      lng: "",
      lat: "",
      radius: 20,
      rooms: 1,
      beds: 1,
      roomOptions: [1, 2, 3, 4, 5, 6, 7, 8],
      bedOptions: [1, 2, 3, 4, 5, 6, 7, 8],
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
    // Chiamata axios filter apartments
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
      axios.get("http://localhost:8000/api/services").then((response) => {
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

    async handleInput() {
      if (this.query.length >= 3) {
        try {
          const response = await axios.get(
            `https://api.tomtom.com/search/2/search/${encodeURIComponent(
              this.query
            )}.json?key=k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d`
          );
          this.suggestions = response.data.results;
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        this.suggestions = [];
      }
    },
    handleSuggestionClick(suggestion) {
      // Handle the click event on a suggestion
      this.query = suggestion.address.freeformAddress;
      this.suggestions = []; // Clear suggestions after selecting one

      const { lat, lon } = suggestion.position;
      this.lng = suggestion.position.lon;
      this.lat = suggestion.position.lat;
      console.log("Latitude:", lat);
      console.log("Longitude:", lon);
      let getAddress = document.getElementById("location");
      console.log(getAddress);
    },
  },

  created() {
    this.fetchServices();
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
      <div class="input-location">
        <label for="location">Location:</label>
        <input
          type="text"
          id="location"
          v-model="query"
          @input="handleInput"
          placeholder="Enter location"
        />

        <ul v-if="suggestions.length">
          <li
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="handleSuggestionClick(suggestion)"
          >
            {{ suggestion.address.freeformAddress }}
          </li>
        </ul>
      </div>
      <br />
      <div>
        <label for="rooms">Rooms:</label>
        <select id="rooms" v-model="rooms" class="custom-select">
          <option v-for="option in roomOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <label for="beds">Beds:</label>
        <select id="beds" v-model="beds" class="custom-select">
          <option v-for="option in bedOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
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
        @click.left="getApartmentList"
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
      <button class="btn btn-primary mt-3" @click="getApartmentList">
        Search
      </button>
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

.input-location {
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
}

/* Input styling */
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

/* Suggestions list styling */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  margin-bottom: 5px;
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #e0e0e0;
}

custom-select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
