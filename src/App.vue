<script>
import axios from "axios";
import AppList from "./components/AppList.vue";

export default {
  components: {
    AppList,
  },

  created() {
    axios.get("http://localhost:8000/api/apartments").then((response) => {
      console.log(response.data.data);
    });
  },
};
</script>

<template>
  <AppList />
</template>

<style scoped></style>
