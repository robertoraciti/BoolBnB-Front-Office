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
      <div class="text-center pt-5"></div>
      <HomepageSearch></HomepageSearch>
    </div>
    <div class="container-fluid p-5 text-center">
      <h6>search for the perfection</h6>
      <div class="pb-5">
        <img src="../components/img/keyy.png" alt="" class="key me-4" />
        <button type="button" class="btn btn-dark">
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'advanced-search' }"
            >Advanced Research</router-link
          >
        </button>
      </div>
      <AppList></AppList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbo {
  background-image: url(../components/img/jumbo2.png);
  margin: 0;
  padding: 0;
  height: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.key {
  width: 100px;
}
</style>
