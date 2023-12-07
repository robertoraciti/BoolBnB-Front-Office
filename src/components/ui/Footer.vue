<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <footer>
    <div class="container-fluid border border-primary">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="navbar-brand" href="/"
            ><img src="../img/BoolBnB-logo.png"
          /></a>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'advanced-search' }"
            >Advanced Search</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'advanced-filter' }"
            >Advanced filter</router-link
          >
        </li>
        <li class="nav-item">
          <a
            href="http://localhost:8000/login"
            class="nav-link"
            aria-current="page"
            >Login</a
          >
        </li>
        <li class="nav-item">
          <a
            href="http://localhost:8000/register"
            class="nav-link"
            aria-current="page"
            >Register</a
          >
        </li>
        <li class="nav-item">
          <font-awesome-icon
            :icon="['fab', 'facebook']"
            class="mx-2 nav-link" />
        </li>
        <li class="nav-item">
          <font-awesome-icon
            :icon="['fab', 'instagram']"
            class="mx-2 nav-link" />
        </li>
      </ul>
    </div>
    <div class="container footer-pic mt-5"></div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin: auto;
}

a:hover,
router-link:hover {
  text-decoration: underline;
}

.footer-pic {
  background: url("../img/footer-art.svg") no-repeat;
  height: 160px;
}
</style>
