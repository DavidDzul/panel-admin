import axios from "axios";
import router from "@/router";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const assets = {
    namespaced: true,
    state: {
        entities: null || [],
        loading: false,
        selectAsset: null || [],
        created: false,
        showAddImage: false,
        loadingImage: false,
        showAddFile: false,
        loadingFile: false,
    },
    getters: {
        getAssets(state) {
            return Object.keys(state.entities)
                .map(Number)
                .map((key) => state.entities[key]) || [];
        },
    },
    actions: {
        async fetchAssets({ commit }) {
            commit("setLoading");
            await axios
                .get("api/fetchAssets")
                .then((res) => {
                    commit("setAssets", res.data);
                    commit("clearSelectAsset")
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
        async createImage({ commit }, data) {
            commit("setLoadingImage");
            await axios
                .post("api/createImage", data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'content-type': 'multipart/form-data',
                    }
                })
                .then((res) => {
                    commit("addAssetImage", res.data.image)
                    commit("closeAddImageDialog")
                    commit("alert/setAlert",
                        { message: res.data.msg, status: "success" },
                        { root: true });
                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error en el servidor', status: "error" },
                        { root: true });
                });
            commit("clearLoadingImage");
        },
        async removeImage({ commit }, id) {
            commit("setLoadingImage");
            await axios
                .delete(`api/deleteImage/${id}`)
                .then((res) => {
                    commit("deleteAssetImage", res.data.image)
                    commit("alert/setAlert",
                        { message: res.data.msg, status: "success" },
                        { root: true });
                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error al eliminar', status: "error" },
                        { root: true });
                });
            commit("clearLoadingImage");
        },
        async createFile({ commit }, data) {
            commit("setLoadingFile");
            await axios
                .post("api/createFile", data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'content-type': 'multipart/form-data',
                    }
                })
                .then((res) => {
                    commit("addAssetFile", res.data.file)
                    commit("closeAddFileDialog")
                    commit("alert/setAlert",
                        { message: res.data.msg, status: "success" },
                        { root: true });
                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error en el servidor', status: "error" },
                        { root: true });
                });
            commit("clearLoadingFile");
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
        showAddImageDialog(state) {
            state.showAddImage = true;
        },
        closeAddImageDialog(state) {
            state.showAddImage = false;
        },
        setLoadingImage(state) {
            state.loadingImage = true;
        },
        clearLoadingImage(state) {
            state.loadingImage = false;
        },
        addAssetImage(state, image) {
            if (state.selectAsset) {
                state.selectAsset = {
                    ...state.selectAsset,
                    images: [image, ...state.selectAsset.images],
                };

                if (state.entities) {
                    state.entities[state.selectAsset.id] = {
                        ...state.entities[state.selectAsset.id],
                        images: [image, ...state.entities[state.selectAsset.id].images],
                    };
                }
            }
        },
        deleteAssetImage(state, image) {
            if (state.selectAsset) {
                state.selectAsset = {
                    ...state.selectAsset,
                    images: state.selectAsset.images.filter((key) => {
                        return key.id !== image.id;
                    }),
                };
            }
        },
        showAddFileDialog(state) {
            state.showAddFile = true;
        },
        closeAddFileDialog(state) {
            state.showAddFile = false;
        },
        setLoadingFile(state) {
            state.loadingFile = true;
        },
        clearLoadingFile(state) {
            state.loadingFile = false;
        },
        addAssetFile(state, file) {
            if (state.selectAsset) {
                state.selectAsset = {
                    ...state.selectAsset,
                    files: [file, ...state.selectAsset.files],
                };

                // if (state.entities) {
                //     state.entities[state.selectAsset.id] = {
                //         ...state.entities[state.selectAsset.id],
                //         files: [file, ...state.entities[state.selectAsset.id].files],
                //     };
                // }
            }
        },
    },
};

export default assets