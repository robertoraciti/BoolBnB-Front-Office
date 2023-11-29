<script>
import axios from "axios";
import AppCard from "./components/AppCard.vue";

export default {
  components: {
    AppCard,
  },

  created() {
    axios.get("http://localhost:8000/api/apartments").then((response) => {
      console.log(response.data.data);
    });
  },
};
</script>

<template>
  <AppCard />
</template>

<style scoped></style>
