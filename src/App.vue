<script>
import NavbarUi from "./components/ui/NavbarUi.vue";
import Footer from "./components/ui/Footer.vue";
export default {
  components: { NavbarUi, Footer },
};
</script>

<template>
  <header>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Afacad:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </header>
  <NavbarUi></NavbarUi>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="scss"></style>
