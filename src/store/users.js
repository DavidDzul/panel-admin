import axios from "axios";
import router from "@/router";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const users = {
    namespaced: true,
    state: {
        entities: null || [],
        loading: false,
        selectUser: null || [],
        created: false,
        loadingSend: false,
        userForm: false,
        selectedUser: null,
        userEditDialog: false,
    },
    getters: {
        getUsers(state) {
            return Object.keys(state.entities)
                .map(Number)
                .map((key) => state.entities[key]) || [];
        },
        users(state) {
            return Object.keys(state.entities)
                .map(Number)
                .map((id) => {
                    return state.entities[id];
                });
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            await axios.get("api/fetchUsers")
                .then((res) => {
                    commit("saveUsers", res.data);
                })
                .catch(() => {
                    commit("saveUsers", null);
                });
        },
        async createUser({ commit }, form) {
            commit("setLoading");
            await axios
                .post("api/createUser", form)
                .then((res) => {
                    commit("alert/setAlert", { message: res.data.msg, status: "success" }, { root: true });
                    commit("addUser", res.data.user)
                    commit("closeUserForm")
                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error al guardar', status: "error" },
                        { root: true });
                });
            commit("clearLoading");
        },
        async updateUser({ commit }, form) {
            commit("setLoading");
            await axios
                .post("api/updateUser", form)
                .then((res) => {
                    commit("alert/setAlert",
                        { message: res.data.msg, status: "success" },
                        { root: true });
                    commit("updateUserData", res.data.user)

                })
                .catch(() => {
                    commit("alert/setAlert",
                        { message: 'Error al guardar', status: "error" },
                        { root: true });
                });
            commit("clearLoading");
        },
        async deleteUser({ commit }, id) {
            commit("setLoading");
            await axios
                .delete(`api/destroyUser/${id}`)
                .then((res) => {
                    commit("removeUser", id)
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
        saveUsers(state, users) {
            state.entities = Object.assign(
                {},
                ...users.map((user) => ({ [user.id]: user }))
            );
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        openUserForm(state) {
            state.userForm = true;
        },
        closeUserForm(state) {
            state.userForm = false;
        },
        addUser(state, user) {
            state.entities = { ...state.entities, [user.id]: user };
        },
        showCreateUser(state) {
            state.selectedUser = null;
            state.userForm = true;
        },
        showUpdateUser(state, user) {
            state.selectedUser = { ...user };
            state.userForm = true;
        },
        updateUserData(state, user) {
            const oldUser = state.entities[user.id];
            if (oldUser) {
                Object.keys(oldUser).forEach((key) => {
                    // @ts-ignore
                    oldUser[key] =
                        user[key];
                });
            }
            state.entities = { ...state.entities, [user.id]: user };
            state.userForm = false;
        },
        removeUser(state, id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: deletedUser, ...entities } = state.entities;
            state.entities = {
                ...entities,
            };
        },
    },
};

export default users