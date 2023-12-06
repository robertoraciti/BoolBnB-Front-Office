<script>
import axios from "axios";
import { store } from "../data/store";

// import { services } from "@tomtom-international/web-sdk-services";
// import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";

import AppCard from "../components/apartments/AppCard.vue";

export default {
  data() {
    return {
      filteredApartments: [],
      apartmentServices: [],
      // apiKey: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
      // lng: "",
      // lat: "",
      // radius: "20",
      // rooms: 1,
      // beds: 1,
      // apartmentsList: [],
      // apartmentsCoordinates: [],
    };
  },

  computed: {
    activeFilters() {
      const activeApartmentServices = [];

      this.apartmentServices.forEach((apartmentService) => {
        if (apartmentService.active)
          activeApartmentServices.push(apartmentService.id);
      });

      return {
        activeApartmentServices,
      };
    },
  },

  components: { AppCard },

  // mounted() {
  //   this.autocompleteAddress();
  //   this.geocoding();
  // },

  methods: {
    fetchApartments() {
      axios
        .post(
          store.api.baseUrl + "get-apartments-by-filters",
          this.activeFilters,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(store.api.baseUrl + "get-apartments-by-filters");
          this.filteredApartments = response.data.data;
          console.log(this.filteredApartments);
        });
    },

    fetchApartmentServices() {
      axios.get(store.api.baseUrl + "services").then((response) => {
        this.apartmentServices = response.data.map((apartmentService) => {
          return {
            ...apartmentService,
            active: false,
          };
        });
      });
    },

    toggleApartmentService(apartmentService) {
      apartmentService.active = !apartmentService.active;
      this.fetchApartments();
    },

    // geocoding() {
    //   let getAddress = document.getElementById("address").value;
    //   services
    //     .geocode({
    //       key: this.apiKey,
    //       query: getAddress,
    //       bestResult: true,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       this.lng = res.position.lng;
    //       this.lat = res.position.lat;

    //       this.getApartmentList();
    //     });
    // },
    // // Chimata axios filter apartments
    // getApartmentList() {
    //   axios
    //     .get(
    //       `http://127.0.0.1:8000/api/search/${this.lat}/${this.lng}/${this.radius}/${this.rooms}/${this.beds}`
    //     )
    //     .then((res) => {
    //       this.apartmentsList = res.data;
    //     });
    // },

    // autocompleteAddress() {
    //   var options = {
    //     searchOptions: {
    //       key: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
    //       language: "en-EN",
    //       limit: 5,
    //     },
    //     autocompleteOptions: {
    //       key: "k9U6D8g43D9rsDAaXC4vgkIc4Ko56P7d",
    //       language: "it-IT",
    //     },
    //   };
    //   var ttSearchBox = new SearchBox(services, options);
    //   var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    //   let address_search = document.getElementById("address_search");
    //   address_search.append(searchBoxHTML);

    //   ttSearchBox.on("tomtom.searchbox.resultselected", function (data) {
    //     console.log(data.data.result.address.freeformAddress);
    //     let choiceAddress = document.getElementById("address");
    //     choiceAddress.value = data.data.result.address.freeformAddress;
    //   });
    // },
  },

  created() {
    this.fetchApartmentServices();
    this.fetchApartments();
  },
};
</script>

<template>
  <div class="container">
    <h1 class="my-5">Advanced research</h1>
    <div class="row">
      <div class="col-3">
        <h4>Select the apartment services</h4>

        <span
          v-for="apartmentService in apartmentServices"
          :key="apartmentService.id"
          :class="{
            disabled: !apartmentService.active,
          }"
          @click="toggleApartmentService(apartmentService)"
          class="badge mx-1 clickable apartmentService"
        >
          {{ apartmentService.name }}
        </span>
      </div>
      <div class="col-9">
        <div class="row row-cols-2 g-3">
          <AppCard
            v-for="apartment in filteredApartments"
            :apartment="apartment"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- <link
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
  </div> -->
</template>

<style lang="scss" scoped>
.disabled {
  background-color: #555 !important;
}

.clickable {
  cursor: pointer;
}

.apartmentService {
  background-color: rgb(114, 114, 189);
}

// .wrapper {
//   width: 80%;
//   margin: auto;
//   border-radius: 10px;
//   min-height: 500px;

//   background-color: lightgrey;
// }
</style>
