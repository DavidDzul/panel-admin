<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-img
          :width="240"
          class="mx-auto"
          :src="require('@/assets/logo.png')"
        ></v-img>
        <br />
        <v-text-field
          v-model="form.email"
          label="Correo electrónico"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :append-inner-icon="pass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="pass ? 'text' : 'password'"
          label="Contraseña"
          @click:append-inner="pass = !pass"
        ></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-2"
          >INICIAR SESIÓN</v-btn
        >
      </v-form>
    </v-sheet>
    <LoadingOverlay :loading="loading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
  components: {
    LoadingOverlay,
  },
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    },
  },
  data: () => ({
    pass: false,
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async login() {
      await this.$store.dispatch("auth/login", this.form);
    },
  },
};
</script>
