// auth.js

export default {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  removeToken() {
    localStorage.removeItem("token");
  },

  getUser() {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  },

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser() {
    // Rimuovi i dati dell'utente dal localStorage
    localStorage.removeItem("user");
  },
};
