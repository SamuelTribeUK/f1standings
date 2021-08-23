import { createApp } from "vue";
import App from "./App.vue";
import BaseCard from "./components/UI/BaseCard.vue";

createApp(App)
  .component("base-card", BaseCard)
  .mount("#app");
