<script>
import AppList from "../components/apartments/AppList.vue";
import HomepageSearch from "../components/ui/HomepageSearch.vue";

export default {
  data() {
    return {};
  },
  components: { AppList, HomepageSearch },
};
</script>

<template>
  <div class="">
    <!-- <h1>Homepage</h1> -->
    <div class="jumbo">
      <HomepageSearch></HomepageSearch>
    </div>
    <div class="container-fluid my-5">
      <h1>prova</h1>
      <AppList></AppList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbo {
  background-image: url(../components/img/jmb2.png);
  margin: 0;
  padding: 0;
  height: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
