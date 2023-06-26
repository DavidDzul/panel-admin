<template>
  <v-row class="text-center mx-0 my-2" align="center" justify="center">
    <v-col cols="2">
      <h4 style="vertical-align: middle">Equipo operativo</h4>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col cols="7">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-btn color="primary" @click="createUser()"> AGREGAR USUARIO </v-btn>
    </v-col>
  </v-row>
  <br />
  <v-data-table
    :headers="headers"
    :items="users"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:item.campus="{ item }">
      {{
        item.columns.campus == "MERIDA"
          ? "Mérida"
          : item.columns.campus == "OXKUTZCAB"
          ? "Oxkutzcab"
          : item.columns.campus == "TIZIMIN"
          ? "Tizimín"
          : item.columns.campus == "VALLADOLID"
          ? "Valladolid"
          : ""
      }}
    </template>

    <template #[`item.actions`]="{ item }">
      <v-tooltip text="Editar" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            variant="text"
            @click="editUser(item.props.title)"
            v-bind="props"
            ><v-icon small> mdi-pencil</v-icon></v-btn
          >
        </template>
      </v-tooltip>
      <v-tooltip text="Eliminar" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            @click="confirmDeleteUser(item.columns.firstName, item.columns.id)"
            icon
            variant="text"
            v-bind="props"
            ><v-icon color="red" small> mdi-delete</v-icon></v-btn
          >
        </template>
      </v-tooltip>
    </template>
  </v-data-table>
  <ConfirmationDialog ref="confirmationDialog" />
</template>

<script>
import router from "@/router";
import { useRouter } from "vue-router";
import ConfirmationDialog from "../helpers/ConfirmationDialog.vue";
import { deleteUser, deleteUserBody } from "@/constants";
export default {
  name: "UsersTable",
  components: { ConfirmationDialog },
  props: {
    users: {
      type: Object,
      required: false,
      default: {},
    },
  },
  data: () => ({
    search: "",
    headers: [
      {
        align: "start",
        key: "id",
        sortable: false,
        title: "ID",
      },
      { key: "firstName", sortable: false, title: "Nombre" },
      { key: "lastName", sortable: false, title: "Apellido" },
      { key: "workPosition", sortable: false, title: "Puesto" },
      { key: "campus", sortable: false, title: "Sede" },
      { align: "center", key: "actions", sortable: false, title: "Opciones" },
    ],
  }),
  methods: {
    createUser() {
      this.$emit("create");
    },
    editUser(id) {
      this.$emit("edit", id);
    },
    confirmDeleteUser(name, id) {
      this.$refs?.confirmationDialog
        ?.open({
          title: deleteUser,
          body: deleteUserBody(name),
        })
        .then((res) => {
          if (res) {
            this.removeUser(id);
          }
        })
        .catch();
    },
    removeUser(id) {
      this.$store.dispatch("users/deleteUser", id);
    },
  },
};
</script>
