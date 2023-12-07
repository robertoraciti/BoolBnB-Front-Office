import { createApp } from "vue";
import "./assets/scss/style.scss";
import * as bootstrap from "bootstrap";
import axios from "axios";

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
  faFacebook
);

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
