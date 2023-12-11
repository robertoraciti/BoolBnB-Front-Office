import { createApp } from "vue";
import "./assets/scss/style.scss";
import * as bootstrap from "bootstrap";
import axios from "axios";
import authService from "../src/auth.js";

import { router } from "./router";

import App from "./App.vue";

/ import the fontawesome core /;
import { library } from "@fortawesome/fontawesome-svg-core";

/ import font awesome icon component /;
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/ import specific icons /;
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { faKitMedical } from "@fortawesome/free-solid-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import { faFireExtinguisher } from "@fortawesome/free-solid-svg-icons";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import { faSoap } from "@fortawesome/free-solid-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

/ add icons to the library */;
library.add(
  faUmbrellaBeach,
  faTv,
  faWifi,
  faCarSide,
  faTree,
  faKitMedical,
  faPaw,
  faKitchenSet,
  faFireExtinguisher,
  faFan,
  faSoap,
  faMugHot,
  faInstagram,
  faFacebook,
  faBed,
  faDoorOpen,
  faBarsStaggered,
  faMagnifyingGlass,
  faTwitter,
  faUser
);

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Sostituisci con l'URL del tuo backend Laravel
});

// Aggiungi un interceptor per gestire automaticamente il token nelle richieste
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
