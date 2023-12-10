<script>
import axios from "axios";
import { store } from "../data/store";

// import mappa
import tomMap from "../components/tomtom/map.vue";

// cose da far importare
import messageForm from "../components/modals/MessageForm.vue";

export default {
  data() {
    return {
      apartment: null,

      error: {
        hasError: false,
        message: "",
      },
    };
  },
  components: { messageForm, tomMap },

  methods: {
    async incrementViews() {
      const apartment = this.$route.params.id;
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/view/increment/${apartment}`
        );
        console.log(`http://127.0.0.1:8000/api/view/increment/${apartment}`);
        console.log("Visualizzazioni incrementate con successo!");
      } catch (error) {
        console.error(
          "Errore durante l'incremento delle visualizzazioni:",
          error
        );
      }
    },
    fetchDetail() {
      axios
        .get(store.api.baseUrl + "apartments/" + this.$route.params.id)
        .then((response) => {
          this.apartment = response.data;
          console.log(this.apartment);
        })
        .catch((error) => {
          this.$router.push({ name: "not-found" });
        });
    },
  },

  created() {
    this.fetchDetail();
    this.incrementViews();
  },
};
</script>

<template>
  <!-- buttons -->
  <div class="container d-flex justify-content-between msmargin">
    <RouterLink
      class="button-2"
      :to="{
        name: 'home',
      }"
      >Go Back</RouterLink
    >
    <!-- <button
      type="button"
      class="btn btn-success"
      data-bs-toggle="modal"
      :data-bs-target="'#messageModal-' + apartment.id"
    >
      Send message
    </button> -->
  </div>

  <!-- pic - detail -->

  <div
    class="container w-100 mt-5 d-flex justify-content-around col-sm-12 col-md-4"
  >
    <div class="row col-sm-1 col-md-2 w-100 d-flex flex-column flex-md-row">
      <div class="col p-1 me-4 frame">
        <div class="frame">
          <div class="p-1">
            <img :src="apartment.cover_image" alt="" class="" />
          </div>
        </div>
      </div>
      <!-- card info -->
      <div class="col card-frame p-0">
        <div class="main-info text-center">
          <h2 class="under-green d-inline">{{ apartment.name }}</h2>
          <h5 class="mt-2">{{ apartment.address }}</h5>
        </div>
        <div class="p-2">
          <p>{{ apartment.description }}</p>
        </div>
        <div class="mt-3">
          <ul class="row row-cols-2 mx-2 no-p">
            <li class="col ms-border">
              <strong>{{ apartment.rooms }}</strong> Rooms
            </li>
            <li class="col ms-border">
              <strong>{{ apartment.beds }} </strong> Beds
            </li>
            <li class="col ms-border">
              <strong>{{ apartment.bathrooms }}</strong> Baths
            </li>
            <li class="col ms-border">
              <strong>{{ apartment.mq }}</strong> Mq
            </li>
          </ul>
        </div>
        <div class="container mt-5">
          <div class="row row-cols-2">
            <div v-for="service in apartment.services" class="col">
              <font-awesome-icon
                :icon="'fa-solid fa-' + service.icon"
                class="me-2"
              />
              {{ service.name }}
            </div>
          </div>
          <div>
            <p class="fw-bold mt-5 fs-5">{{ apartment.price }} € night</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row container m-auto my-4">
    <!-- blocco foto camera -->
    <div class="col-6 mt-4">
      <h2 class="ms-3">see more...</h2>

      <div class="d-flex justify-content-between mt-3">
        <div class="col-8 p-3">
          <img src="../components/img/roompic1.webp" alt="" />
          <div class="mt-4">
            <p>
              Welcome to boolbnb apartment, it is our concern to provide, within
              each of our apartments, a welcome gift consisting of a basket
              equipped with all household supplies like hairdryer and hygiene
              products such as shampoo , balm body cream and bubble bath, as a
              welcome gift. <br />
            </p>
            <p>Your pleasure, is our pleasure.</p>
          </div>
        </div>

        <div class="col-4">
          <div class="p-3">
            <img src="../components/img/roompic4.webp" alt="" />
          </div>
          <div class="p-3">
            <img src="../components/img/roompic2.webp" alt="" />
          </div>
          <div class="p-3">
            <img src="../components/img/roompic3.webp" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- blocco mappa -->
    <div class="col-6">
      <div class="d-flex justify-content-between my-4">
        <h2>Contact host</h2>
        <button
          type="button"
          class="button"
          data-bs-toggle="modal"
          :data-bs-target="'#messageModal-' + apartment.id"
        >
          Send message
        </button>
      </div>

      <tomMap :apartment="apartment" />
    </div>
  </div>

  <!-- <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    :data-bs-target="'#messageModal-' + apartment.id"
  >
    Send message
  </button> -->

  <messageForm :apartment="apartment"></messageForm>
</template>

<style lang="scss" scoped>
.msmargin {
  margin-top: 100px;
}

.no-p {
  padding: 0;
}
.main-info {
  color: black;
  background-color: #dcd2c3;
}
div {
  img {
    object-fit: fill;
    width: 100%;
    // height: 100%;
  }
}
ul {
  list-style: none;
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

.button-2 {
  background-color: #dcd2c3;
  border: 1px solid black;
  padding: 5px 35px;
  border-radius: 20px;
  font-weight: 400;
  color: black;
  text-decoration: none;

  &:hover {
    // background-color: rgba(0, 0, 0, 0.332);
    background-color: #a3c422;
    color: black;
  }
}

.frame {
  border: 2px solid #dcd2c3;
  border-radius: 15px;
}

.frame img {
  border-radius: 15px;
}

.card-frame {
  border: 2px solid #dcd2c3;
  border-radius: 0 0 15px 15px;
}

.under-green {
  border-bottom: 2px solid #a3c422;
}
.debug {
  border: 1px solid red;
}
</style>
