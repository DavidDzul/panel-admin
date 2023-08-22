import axios from "axios";
import router from "@/router";
import { API_URL } from "@/constants";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

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