<script>
import AppCard from "./components/AppCard.vue";

export default {
  data() {
    return {
      title: "Hello guest",
    };
  },

  props: {
    apartments: Array,
  },

  components: {
    AppCard,
  },
};
</script>

<template>
  <div class="container">
    <h2>AppList</h2>
    <div class="row row-cols-3 g-4">
      <AppCard v-for="apartment in apartments" :apartment="apartment" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
