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
                <v-card-title class="title-form pb-5">
                  CONTROL DE ACTIVOS
                </v-card-title>
                <v-sheet class="mx-auto">
                  <Form :validation-schema="schema" @submit="login">
                    <Field name="email" v-slot="{ field, errors }">
                      <v-text-field
                        v-model="form.email"
                        label="Correo electrónico"
                        v-bind="field"
                        :error-messages="errors"
                        class="pb-1"
                      ></v-text-field>
                    </Field>
                    <Field name="password" v-slot="{ field, errors }">
                      <v-text-field
                        v-model="form.password"
                        :append-inner-icon="pass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="pass ? 'text' : 'password'"
                        label="Contraseña"
                        @click:append-inner="pass = !pass"
                        v-bind="field"
                        :error-messages="errors"
                      ></v-text-field>
                    </Field>
                    <v-btn type="submit" color="primary" block class="mt-2"
                      >INICIAR SESIÓN</v-btn
                    >
                  </Form>
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
import { Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    LoadingOverlay,
    Alert,
    Field,
    Form,
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
    schema: yup.object({
      email: yup
        .string()
        .required("El correo electrónico es requerido")
        .email("Correo electrónico invalido"),
      password: yup.string().required("La contraseña es requerida"),
    }),
  }),
  methods: {
    async login() {
      await this.$store.dispatch("auth/login", this.form);
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
