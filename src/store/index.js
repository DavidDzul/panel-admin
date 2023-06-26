import { createStore } from "vuex";
import auth from "./auth";
import assets from "./assets";
import alert from "./alert";
import users from "./users";

const store = createStore({
  state: {
    navigationDrawer: true,
    loading: false,
  },
  mutations: {
    openLoading(state) {
      state.loading = true;
    },
    closeLoading(state) {
      state.loading = false;
    },
    changeNavDrawer(state) {
      state.navigationDrawer = !state.navigationDrawer;
    },
  },
  modules: {
    auth: auth,
    assets: assets,
    alert: alert,
    users: users
  }
})

export default store
