import axios from "axios";
import router from "@/router";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const alert = {
    namespaced: true,
    state: {
        message: "",
        status: "warning",
    },
    getters: {
        message(state) {
            return state.message || "";
        },
        status(state) {
            return state.status;
        },
    },
    mutations: {
        setAlert(state, payload) {
            state.message = payload.message;
            state.status = payload.status;
        },
        resetState(state) {
            Object.assign(state, defaultState());
        },
    },
};

export default alert