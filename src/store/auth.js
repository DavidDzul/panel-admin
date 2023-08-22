import axios from "axios";
import router from "@/router";
import store from "@/store";
import { API_URL } from "@/constants";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

const auth = {
    namespaced: true,
    state: {
        user: null,
        loggedIn: false,
        token: localStorage.getItem("token") || "",
        loading: false,
    },
    getters: {},
    mutations: {
        userLoad(state, user) {
            state.user = user;
            state.loggedIn = Boolean(user);
            state.token = localStorage.getItem("token") || "";
        },
        openLoading(state) {
            state.loading = true;
        },
        removeLoad(state) {
            state.loading = false;
        }
    },
    actions: {
        async login({ dispatch, commit }, credentials) {
            commit("openLoading");
            await axios.get("sanctum/csrf-cookie");
            await axios.post("api/login", credentials).then(async (res) => {
                localStorage.setItem('token', res.data.token)
                await dispatch("getProfile", res.data.token);
                await router.push({ path: "/" });
            }).catch((error) => {
                commit("alert/setAlert",
                    { message: "Credenciales incorrectas", status: "error" },
                    { root: true });
                commit("removeLoad");
            });
        },
        async logout({ commit }) {
            commit("openLoading", null, { root: true });
            await axios.post("api/logout").then(async () => {
                localStorage.removeItem('token')
                commit("userLoad", null);
                await router.push({ path: "/login" });
                commit("closeLoading", null, { root: true });
            }).catch(() => {
                commit("closeLoading", null, { root: true });
            });
        },
        async getProfile({ dispatch, commit }, token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await axios.get("sanctum/csrf-cookie");
            await axios
                .get("api/user")
                .then(async (res) => {
                    commit("userLoad", res.data);
                    await store.dispatch("users/fetchUsers");
                })
                .catch(() => {
                    commit("userLoad", null);
                });
            commit("removeLoad");
        },
    },
};

export default auth