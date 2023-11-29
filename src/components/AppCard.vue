<script>
export default {
  data() {
    return {
      title: "Apartment Card",
    };
  },

  props: {
    apartment: Object,
  },
};
</script>

<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h4>{{ apartment.name }}</h4>
        <p>{{ apartment.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
