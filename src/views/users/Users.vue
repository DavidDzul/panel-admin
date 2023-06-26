<template>
  <v-container>
    <Breadcrumbs :items="items" />
    <UsersTable
      :users="users"
      @create="showCreateUser"
      @edit="showUpdateUser"
    />
    <UserDialogForm />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import UsersTable from "@/components/users/UsersTable.vue";
import Breadcrumbs from "@/components/helpers/Breadcrumbs.vue";
import UserDialogForm from "@/components/users/UserDialogForm.vue";

export default {
  name: "Users",
  components: {
    Breadcrumbs,
    UsersTable,
    UserDialogForm,
  },
  computed: {
    items() {
      return [
        {
          text: "Equipo operativo",
          disabled: true,
          to: "/usuarios",
        },
      ];
    },
    ...mapGetters("users", {
      users: "getUsers",
    }),
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions("users", {
      fetchUsers: "fetchUsers",
    }),
    ...mapMutations("users", {
      showCreateUser: "showCreateUser",
      showUpdateUser: "showUpdateUser",
    }),
  },
};
</script>
