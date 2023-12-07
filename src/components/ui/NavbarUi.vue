<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg fixed-top border-bottom border-primary bg-white text-black"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="../img/BoolBnB-logo.png" /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarNav"
      >
        <div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                class="nav-link"
                aria-current="page"
                :to="{ name: 'home' }"
                >Home</router-link
              >
            </li>
            <!-- <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{ name: 'apartments' }"
              >Apartments</router-link
            >
          </li> -->
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
          </ul>
        </div>
        <div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                href="http://localhost:8000/login"
                class="nav-link"
                aria-current="page"
                ><button type="button" class="btn btn-outline-primary">
                  Login
                </button>
              </a>
            </li>
            <li class="nav-item">
              <a
                href="http://localhost:8000/register"
                class="nav-link"
                aria-current="page"
                ><button type="button" class="btn btn-outline-danger">
                  Register
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a,
router-link {
  color: black;
}

nav {
  padding: 0;
}

.pz {
  padding: 0;
}
</style>
