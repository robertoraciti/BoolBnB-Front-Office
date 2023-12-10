<script>
import axios from "axios";
import { store } from "../../data/store.js";
import authService from "../../auth.js";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    isAuthenticated() {
      // Utilizza il modulo di autenticazione per verificare la presenza del token
      return authService.getToken() !== null;
    },
  },

  methods: {
    login() {
      const token = document.head.querySelector('meta[name="csrf-token"]');
      if (token) {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
      }
      axios
        .post(
          "http://localhost:8000/api/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              Authorization: "Bearer " + authService.getToken(),
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          // Gestisci il successo del login
          console.log(response.data.message);
          const token = response.data.access_token;
          const user = response.data.user;

          // Memorizza il token nel localStorage
          authService.setToken(token);
          authService.setUser(user);

          window.location.reload();
        })
        .catch((error) => {
          console.error("Errore di login:", error.response.data.message);
        });
    },
  },

  mounted() {
    console.log("Is authenticated:", this.isAuthenticated);
  },
};
</script>

<template>
  <div
    class="modal fade"
    :id="'loginModal'"
    tabindex="-1"
    aria-labelledby="loginModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="loginModalLabel">Login</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <form @submit.prevent="login">
          <div class="modal-body">
            <label>Email:</label>
            <input v-model="email" type="email" required />
            <label>Password:</label>
            <input v-model="password" type="password" required />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <a class="nav-link" href="/"></a>
            <button
              type="submit"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
