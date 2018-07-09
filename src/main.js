import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Firebase from "firebase";

const config = {
  apiKey: "AIzaSyCOraaD1lRuRa2mhFnYo-fUbel5P4-iYr8",
  authDomain: "slice-of-budapest.firebaseapp.com",
  databaseURL: "https://slice-of-budapest.firebaseio.com",
  projectId: "slice-of-budapest",
  storageBucket: "slice-of-budapest.appspot.com",
  messagingSenderId: "524213470589"
};

Firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
