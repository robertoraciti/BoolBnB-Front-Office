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
  <div class="col-12 col-sm-6 col-md-2 my-0">
    <div class="card h-100 border-0">
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
          <h5>{{ apartment.address }}</h5>
          <!-- <p class="small">{{ apartment.address }}</p> -->
        </RouterLink>
        <p>{{ apartment.description }}</p>
        <div class="my-3">
          <div>
            <span class="price">{{ apartment.price }} €</span>
            / Night
          </div>
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

.card-body a {
  text-decoration: none;
  color: black;
}

.price {
  font-weight: 700;
  font-size: 18px;
}

.ccard {
  height: 450px;
}

.debug {
  border: 1px solid red;
}
</style>
