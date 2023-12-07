<script>
import NavbarUi from "./components/ui/NavbarUi.vue";
import Footer from "./components/ui/Footer.vue";
export default {
  components: { NavbarUi, Footer },
};
</script>

<template>
  <NavbarUi></NavbarUi>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="scss"></style>
