<script>
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      title: "Apartment Card",
      name: "App",
    };
  },
  props: {
    apartment: Object,
  },
};
</script>

<template>
  <div class="col-sm-6 col-md-2 total-card">
    <div class="card h-100 border-0" style="position: relative">
      <div class="card-body ccard">
        <RouterLink
          class=""
          style="
            --bs-btn-padding-y: 0.25rem;
            --bs-btn-padding-x: 0.5rem;
            --bs-btn-font-size: 0.75rem;
          "
          :to="{
            name: 'apartment',
            params: {
              id: apartment.id,
            },
          }"
        >
          <img :src="apartment.cover_image" alt="" class="h-50 w-100 rounded" />
          <h5 class="mt-2">{{ apartment.name }}</h5>
          <!-- <p class="small">{{ apartment.address }}</p> -->
        </RouterLink>
        <p>{{ apartment.address }}</p>
        <div class="my-3">
          <div>
            <span class="price">{{ apartment.price }} €</span>
            / Night
          </div>
        </div>
        <div
          v-if="apartment.visibility === 1"
          class="text-warning h5"
          style="position: absolute; top: 20px; right: 30px"
        >
          <font-awesome-icon icon="fa-solid fa-star" class="mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.small {
  font-size: 12px;
}
h4,
h5,
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.total-card {
  width: 300px;
}

.card-body a {
  text-decoration: none;
  color: black;
}

.price {
  font-weight: 700;
  font-size: 18px;
  padding-bottom: 2px;
  border-bottom: 1px solid #a3c422;
}

.ccard {
  height: 550px;
}

.debug {
  border: 1px solid red;
}
</style>
