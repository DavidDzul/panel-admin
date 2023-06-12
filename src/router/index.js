import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import axios from "axios";
import store from "../store";
import PassThrough from "@/views/layouts/PassThrough.vue";
import Activos from "@/views/activos/Activos.vue"
import DetailsActivos from "@/views/activos/DetailsActivos.vue";
import CreateActivos from "@/views/activos/CreateActivos.vue"
import { RouterView } from "vue-router";
import hello from "@/views/hello/Hello.vue"

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "Inicio",
        component: hello
      }
    ]
  },
  {
    path: "/activos",
    name: "Activos",
    component: Home,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "ListaActivos",
        component: Activos
      },
      {
        path: "form",
        name: "FormularioActivo",
        component: CreateActivos,

      },
      {
        path: ":id",
        name: "DetalleActivo",
        component: DetailsActivos,
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.state.auth.token !== "") {
      if (store.state.auth.loggedIn) {
        next();
      } else {
        await store.dispatch('auth/getProfile', store.state.auth.token);
        if (!store.state.auth.loggedIn) {
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      }
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (store.state.auth.token !== "") {
      if (store.state.auth.loggedIn) {
        next({
          path: "/",
        });
      } else {
        await store.dispatch('auth/getProfile', store.state.auth.token);
        if (!store.state.auth.loggedIn) {
          next();
        } else {
          next({
            path: "/",
          });
        }
      }
    } else {
      next();
    }
  } else {
    next()
    return
  }
})

export default router;
