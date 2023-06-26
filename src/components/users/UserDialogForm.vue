<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="800" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ txtTile }} personal</span>
        </v-card-title>
        <v-card-text>
          <UpdateUserForm
            v-if="selectedUser"
            v-model="formUser"
            :item="selectedUser"
          />
          <CreateUserForm v-else v-model="formUser" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text :disabled="sendLoading" @click="close">
            Cancelar
          </v-btn>
          <v-btn color="primary" text :loading="sendLoading" @click="save">
            {{ txtBtn }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UpdateUserForm from "./UpdateUserForm.vue";
import CreateUserForm from "./CreateUserForm.vue";
export default {
  name: "UserDialogForm",
  components: {
    CreateUserForm,
    UpdateUserForm,
  },
  computed: {
    loading() {
      return this.$store.state.users.loading;
    },
    userForm() {
      return this.$store.state.users.userForm;
    },
    selectedUser() {
      return this.$store.state.users.selectedUser;
    },
  },
  watch: {
    userForm: function (val) {
      if (val) {
        if (this.selectedUser) {
          this.txtBtn = "Actualizar";
          this.txtTile = "Actualizar";
          this.formUser = {
            id: this.selectedUser.id,
            firstName: this.selectedUser.firstName,
            lastName: this.selectedUser.lastName,
            email: this.selectedUser.email,
            phone: this.selectedUser.phone,
            workPosition: this.selectedUser.workPosition,
            campus: this.selectedUser.campus,
            admin: 0,
            active: 1,
            password: "ImpulsoU",
          };
        } else {
          this.txtBtn = "Guardar";
          this.txtTile = "Agregar";
          this.formUser = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            workPosition: "",
            campus: "",
            admin: 0,
            active: 1,
            password: "ImpulsoU",
          };
        }
      }
      this.dialog = val;
    },
    loading: function (val) {
      this.sendLoading = val;
    },
  },
  data: () => ({
    dialog: false,
    sendLoading: false,
    txtBtn: "",
    txtTile: "",
    formUser: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      workPosition: "",
      campus: "",
      admin: 0,
      active: 1,
      password: "ImpulsoU",
    },
  }),
  methods: {
    close() {
      this.$store.commit("users/closeUserForm");
    },
    async save() {
      if (this.selectedUser) {
        await this.$store.dispatch("users/updateUser", this.formUser);
      } else {
        await this.$store.dispatch("users/createUser", this.formUser);
      }
    },
  },
};
</script>
