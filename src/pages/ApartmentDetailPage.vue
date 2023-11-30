<script></script>

<template>
  <div class="container">
    <div class="card h-100">
      <div class="card-body">
        <img :src="apartment.cover_image" alt="" class="h-50 w-50" />
        <h4>{{ apartment.name }}</h4>
        <p>{{ apartment.description }}</p>
        <p class="mt-auto">
          <strong>{{ apartment.price }} € </strong> Night
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
