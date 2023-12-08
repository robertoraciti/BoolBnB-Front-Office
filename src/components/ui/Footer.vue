<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <footer>
    <div class="container-fluid mt-5 pt-5">
      <!-- logo -->
      <div class="logo text-center">
        <a class="navbar-brand" href="/"
          ><img src="../img/BoolBnB-logo.png"
        /></a>
      </div>
      <!-- links -->
      <ul class="nav justify-content-center my-4">
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
      </ul>
    </div>
    <!-- footer - social -->
    <div class="text-center">
      <p>Follow us</p>
      <div class="d-flex justify-content-center">
        <font-awesome-icon
          :icon="['fab', 'instagram']"
          class="mx-2 nav-link ico fs-4"
        />
        <font-awesome-icon
          :icon="['fab', 'facebook']"
          class="mx-2 nav-link ico fs-4"
        />
      </div>
    </div>
    <div class="container footer-pic mt-3"></div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin: auto;
}

a:hover,
router-link:hover {
  font-weight: 600;
  color: #a3c422;
}

.footer-pic {
  background: url("../img/footer.png") no-repeat;
  height: 160px;
}

ul a {
  border-bottom: 1px solid #a3c422;
  color: black;
}

.ico {
  cursor: pointer;

  &:hover {
    color: #a3c422 !important;
  }
}
</style>
