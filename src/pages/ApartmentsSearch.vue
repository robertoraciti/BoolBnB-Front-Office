<script>
import { services } from "@tomtom-international/web-sdk-services";
import { store } from "../data/store.js";
import axios from "axios";

import AppCard from "../components/apartments/AppCard.vue";

export default {
  data() {
    return {
      apiKey: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
      query: store.coordinates.query,
      suggestions: [],
      lng: store.coordinates.lng,
      lat: store.coordinates.lat,
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
    this.getApartmentList();
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
      <h2 class="text-center pt-5">Filtered Search</h2>
      <div class="d-flex">
        <!-- location radius -->
        <div class="input-location ms-0 col-10">
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

          <!-- radius -->
          <div class="w-75 m-auto p-3">
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
          </div>
        </div>

        <!-- rooms bed -->
        <div class="col-5">
          <div class="d-flex justify-content-evenly pt-3">
            <div>
              <label for="rooms" class="me-4">Rooms:</label>
              <select id="rooms" v-model="rooms" class="custom-select">
                <option
                  v-for="option in roomOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
            <div>
              <label for="beds" class="me-4">Beds:</label>
              <select id="beds" v-model="beds" class="custom-select">
                <option
                  v-for="option in bedOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>

          <!-- services -->
          <div class="pt-5 text-center">
            <div class="pb-4">
              <h4 class="underline d-inline">Select the services</h4>
            </div>
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
        </div>
      </div>

      <div class="text-center mt-4">
        <button class="button mt-3" @click="getApartmentList">Search</button>
      </div>
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
  border-radius: 15px;
  min-height: 500px;
  margin-top: 100px;

  background-color: #ccc;
}

.disabled {
  background-color: #555 !important;
}

#location {
  border-radius: 20px;
}

.clickable {
  cursor: pointer;
}

.service {
  background-color: rgb(114, 114, 189);
}

.input-location {
  max-width: 650px;
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

.button {
  background-color: #a3c422;
  border: 1px solid black;
  padding: 5px 35px;
  border-radius: 20px;
  font-weight: 400;
  text-decoration: none;
  color: black;
}

.button:hover {
  background-color: rgba(0, 0, 0, 0.615);
  color: #a3c422;
}

label,
.underline {
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid #a3c422;
  margin-bottom: 20px;
}
</style>
