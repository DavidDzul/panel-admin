import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import '@mdi/font/css/materialdesignicons.css'
// Vuetify
import 'vuetify/styles'
// import "@/scss/main.scss";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import custom from "./plugins/vuetify";

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);
app.use(custom);
app.mount("#app")