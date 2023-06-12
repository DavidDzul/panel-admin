<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="login__container fill-height">
          <v-col class="login__screen flex-shrink-1 flex-grow-1 flex-md-grow-0">
            <v-card rounded="0" flat min-height="100%" class="d-flex flex-wrap">
              <v-card-text style="align-self: center">
                <v-img
                  :width="240"
                  class="mx-auto"
                  :src="require('@/assets/logo.png')"
                ></v-img>
                <v-card-title class="title-form">
                  CONTROL DE ACTIVOS
                </v-card-title>
                <v-sheet class="mx-auto">
                  <v-form fast-fail @submit.prevent="login">
                    <br />
                    <v-text-field
                      v-model="form.email"
                      label="Correo electrónico"
                      :rules="validateEmail"
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
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="login__cover d-none d-md-flex flex-md-grow-1"> </v-col>
        </v-row>
      </v-container>
      <Alert />
      <LoadingOverlay :loading="loading" />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import Alert from "@/components/helpers/Alert.vue";

export default {
  components: {
    LoadingOverlay,
    Alert,
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
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "This field is required";
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }
      // All is good
      return true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight&family=Montserrat:wght@400;500;700&display=swap");
.login__screen {
  display: flex;
  flex-direction: column;
  flex-basis: 435px;
  max-width: inherit;
}
.login__screen-logo {
  max-width: 320px;
  margin-bottom: 90px;
}
.login__screen-form {
  max-width: 350px;
}
.login__screen-footer {
  width: 100%;
  background-color: #ededed;
  border-top: #a4a4a4 2px solid;
}
.login__screen-footer-header {
  flex-basis: 435px;
  flex-grow: 0;
}

.login__cover {
  background-image: url("https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.title-form {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
  text-transform: uppercase;
  color: #042552;
}
</style>
