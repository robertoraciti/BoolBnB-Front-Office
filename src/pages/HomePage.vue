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
  <div class="container">
    <h1>Homepage</h1>
    <HomepageSearch></HomepageSearch>
    <AppList></AppList>
  </div>
</template>

<style lang="scss"></style>
