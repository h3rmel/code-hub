// #region Imports

import { createApp } from "vue";

import { router } from "@/router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";

import "./style.css";
import "primeicons/primeicons.css";

// #endregion

const app = createApp(App);

app.use(router).use(Toast).mount("#app");
