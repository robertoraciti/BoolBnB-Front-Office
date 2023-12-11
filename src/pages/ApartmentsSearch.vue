<script>
import { services } from "@tomtom-international/web-sdk-services";
import { store } from "../data/store.js";
import axios from "axios";

import AppCard from "../components/apartments/AppCard.vue";
import AppList from "../components/apartments/AppList.vue";

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

  components: { AppCard, AppList },

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

  <div class="wrapper p-2">
    <div class="frame">
      <div class="container">
        <h2 class="text-center pt-5">
          Research
          <font-awesome-icon
            icon="fa-solid fa-bars-staggered"
            class="ms-2 fs-4 green"
          />
        </h2>

        <div class="row d-flex">
          <div class="col-sm-6 input-location">
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
              <span>{{ this.radius }} km</span>
            </div>
          </div>
          <div class="col-sm-6 text-center">
            <!-- rooms -->

            <div class="mt-2">
              <label for="rooms" class="me-4"
                ><font-awesome-icon
                  icon="fa-solid fa-door-open"
                  class="me-2"
                />Rooms:</label
              >
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
            <!-- beds -->
            <div class="mt-2">
              <label for="beds" class="me-4"
                ><font-awesome-icon
                  icon="fa-solid fa-bed"
                  class="me-2"
                />Beds:</label
              >
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
            <!-- services -->
            <div class="mt-2">
              <h4><u class="underline">Select the services</u></h4>

              <span
                v-for="service in services"
                :key="service.id"
                :class="{
                  disabled: !service.active,
                }"
                @click="toggleService(service)"
                class="badge mx-1 my-1 clickable service"
              >
                {{ service.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="text-center mt-4">
            <button class="button" @click="getApartmentList">
              Search
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                class="ms-2 small"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- <h2 class="text-center">Results:</h2>
    <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p> -->
      <div class="col-12">
        <div class="row g-4">
          <AppCard
            v-for="apartment in apartmentsList"
            :key="apartment.id"
            :apartment="apartment"
            :isDetail="false"
          />
        </div>
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
  border: 2px solid #f1ebeb;
}

.frame {
  border: 2px solid #f1ebeb;
  min-height: 700px;
  border-radius: 15px;
}

.small {
  font-size: 13px !important;
}

.green {
  color: #a3c422;
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
  background-color: #a3c422;
  border-radius: 15px;
  font-size: 14px;
}

.mybadge {
  border-radius: 10px;
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
  overflow: auto;
  max-height: 150px;
}

li {
  cursor: pointer;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  margin-bottom: 5px;
  transition: background-color 0.3s ease;
  border-radius: 20px;
  text-align: start;
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
  margin-bottom: 70px;
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

u {
  text-decoration: none;
}
</style>
