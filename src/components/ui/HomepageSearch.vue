<script>
import axios from "axios";
import loginForm from "../modals/LoginForm.vue";
import authService from "../../auth.js";
import { store } from "../../data/store";

export default {
  data() {
    return {
      apiKey: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
      query: "",
      user: null,
      suggestions: [],
      lng: "",
      lat: "",
      radius: "20",
      apartmentsList: [],
    };
  },
  components: { loginForm },

  methods: {
    getApartmentList() {
      axios
        .get(
          `http://127.0.0.1:8000/api/search/${store.coordinates.lat}/${store.coordinates.lng}/${this.radius}`
        )
        .then((res) => {
          console.log(res);
          this.apartmentsList = res.data;
        });
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
      store.coordinates.lng = suggestion.position.lon;
      store.coordinates.lat = suggestion.position.lat;
      store.coordinates.query = this.query;
      console.log("Latitude:", lat);
      console.log("Longitude:", lon);
    },
    loadUserData() {
      // Ottieni i dati dell'utente dal servizio di autenticazione
      this.user = authService.getUser();
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>

<template>
  <div class="wrapper container">
    <div class="title-jumbo py-3">
      <h1>Your dream house is just a click away...</h1>
    </div>

    <div class="d-flex justify-content-center">
      <div class="w-50 mx-4 searchb">
        <div class="input-location">
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
      </div>
      <input
        type="hidden"
        class="form-control w-25"
        id="address"
        name="address"
      />
      <div></div>
      <RouterLink
        class="button ms-margin"
        :to="{
          name: 'advanced-search',
        }"
      >
        Filtered Search
      </RouterLink>
    </div>

    <div class="container mt-5">
      <p v-for="(apartment, index) in apartmentsList">{{ apartment.name }}</p>
    </div>
  </div>
  <loginForm></loginForm>
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
  text-decoration: none;
  color: black;
}

.button:hover {
  background-color: rgba(0, 0, 0, 0.615);
  color: #a3c422;
}

.searchb {
  width: 35% !important;
  // overflow: auto;
  max-height: 200px;
}
.searchb ul {
  overflow: auto;
  max-height: 150px;
}

.searchb ul li {
  border-radius: 20px;
  text-align: start;
}
.input-location {
  text-align: center;
  margin-top: 10px;
}

/* Input styling */
input {
  border-radius: 20px;
  width: 100%;
  padding: 8px;
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

.ms-margin {
  margin-top: 13px;
  max-height: 41px;
}
</style>
