import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Vuelidate from "vuelidate";
import FlashMessage from "@smartweb/vue-flash-message";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTag, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import router from "./router";

import store from "./store";

import "./assets/styles/index.css";

Vue.use(Vuelidate);
Vue.use(FlashMessage);

library.add(faTag);
library.add(faTags);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Globally register all `_base`-prefixed components
import "./components/Globals/_globals";

Vue.config.productionTip = false;

window.globalVue = new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit("auth/initStore");
  }
}).$mount("#app");

window.globalVue.flashMessage.setStrategy("multiple");

// Saves the store as a global variable while running Cypress tests
if (window.Cypress) {
  window.__store__ = store;
}
