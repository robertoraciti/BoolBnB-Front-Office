<template>
  <form @submit.prevent="login">
    <label>Email:</label>
    <input v-model="email" type="email" required />
    <label>Password:</label>
    <input v-model="password" type="password" required />
    <button type=" submit">Login</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Gestisci il successo del login
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Errore di login:", error.response.data.message);
        });
    },
  },
};
// Gestisci l'errore di login
</script>
