import axios from "axios";
import router from "@/router";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const assets = {
    namespaced: true,
    state: {
        entities: null | [],
        loading: false,
        selectAsset: null | [],
        created: false,
    },
    getters: {
        getAssets(state) {
            return Object.keys(state.entities)
                .map(Number)
                .map((key) => state.entities[key]) || [];
        }
    },
    actions: {
        async fetchAssets({ commit }) {
            commit("setLoading");
            await axios
                .get("api/fetchAssets")
                .then((res) => {
                    commit("setAssets", res.data);
                    // commit("clearSelectAsset")
                })
                .catch(() => {
                    commit("setAssets", null);
                });
            commit("clearLoading");
        },
        async createAsset({ commit }, form) {
            commit("setLoading");
            await axios
                .post("api/createAsset", form)
                .then((res) => {
                    commit("alert/setAlert",
                        { message: res.data.msg, status: "success" },
                        { root: true });
                    router.push({ path: "/activos" });
                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error al guardar', status: "error" },
                        { root: true });
                });
            commit("clearLoading");
        },
        async getAsset({ commit }, id) {
            commit("setLoading");
            await axios
                .get(`api/getAsset/${id}`)
                .then((res) => {
                    commit("selectAsset", res.data.asset);
                })
                .catch(() => {
                    commit("selectAsset", null);
                });
            commit("clearLoading");
        },
        async updateAsset({ commit }, form) {
            commit("setLoading");
            await axios
                .post("api/updateAsset", form)
                .then((res) => {
                    commit("alert/setAlert",
                        { message: res.data.msg, status: "success" },
                        { root: true });
                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error al guardar', status: "error" },
                        { root: true });
                });
            commit("clearLoading");
        },
        async deleteAsset({ commit }, id) {
            commit("setLoading");
            await axios
                .delete(`api/deleteAsset/${id}`)
                .then((res) => {
                    commit("removeAsset", id)
                    commit("alert/setAlert",
                        { message: res.data.msg, status: "success" },
                        { root: true });
                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error al eliminar', status: "error" },
                        { root: true });
                });
            commit("clearLoading");
        },
    },
    mutations: {
        setAssets(state, assets) {
            state.entities = Object.assign(
                {},
                ...assets.map((asset) => ({ [asset.id]: asset }))
            );
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        selectAsset(state, data) {
            state.selectAsset = data;
        },
        clearSelectAsset(state) {
            state.selectAsset = []
        },
        removeAsset(state, id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: deletedAsset, ...entities } = state.entities;
            state.entities = {
                ...entities,
            };
        },
    },
};

export default assets