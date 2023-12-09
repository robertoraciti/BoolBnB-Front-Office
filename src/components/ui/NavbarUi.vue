<script>
import loginForm from "../modals/LoginForm.vue";
import authService from "../../auth.js";
import axios from "axios";
export default {
  data() {
    return {
      user: null,
    };
  },
  components: { loginForm },
  methods: {
    async logout() {
      const token = document.head.querySelector('meta[name="csrf-token"]');
      if (token) {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
      }
      try {
        axios.post("http://127.0.0.1:8000/api/logout");
        // Rimuovi il token e i dati utente dopo il logout
        authService.removeToken();
        authService.removeUser();
        // Esegui altre azioni post-logout, se necessario
        console.log(authService.getToken());
        window.location.reload();
      } catch (error) {
        console.error("Errore durante il logout:", error);
      }
    },
    loadUserData() {
      // Ottieni i dati dell'utente dal servizio di autenticazione
      this.user = authService.getUser();
    },
  },
  computed: {
    isAuthenticated() {
      // Utilizza il modulo di autenticazione per verificare la presenza del token
      return authService.getToken() !== null;
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top text-black">
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
        <div></div>
        <div v-if="user" class="d-flex align-items-center">
          <a class="nav-link" href="http://localhost:8000/admin/apartments">
            <h5 class="me-3">{{ user.name }}</h5>
          </a>
          <button v-if="isAuthenticated" class="btn btn-danger" @click="logout">
            Logout
          </button>
        </div>
        <div v-else>
          <ul class="navbar-nav">
            <li class="nav-item">
              <button
                type="button"
                class="button-1 nav-link"
                data-bs-toggle="modal"
                :data-bs-target="'#loginModal'"
              >
                Login
              </button>
            </li>
            <li class="nav-item">
              <a
                href="http://localhost:8000/register"
                class="nav-link"
                aria-current="page"
                ><button type="button" class="button-2">Register</button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <loginForm></loginForm>
</template>

<style lang="scss" scoped>
a,
router-link {
  color: black;
}

nav {
  // background-color: #dcd2c38b;
  background-color: #ede5e5c2;
  padding: 0;
}
.button-1 {
  background-color: #a3c422;
  border: 1px solid black;
  padding: 5px 35px;
  border-radius: 20px;
  font-weight: 400;
  color: black;

  &:hover {
    background-color: rgba(0, 0, 0, 0.332);
    color: #dcd2c3;
  }
}

.button-2 {
  background-color: #dcd2c3;
  border: 1px solid black;
  padding: 5px 35px;
  border-radius: 20px;
  font-weight: 400;
  color: black;

  &:hover {
    background-color: rgba(0, 0, 0, 0.332);
    color: #dcd2c3;
  }
}
</style>
