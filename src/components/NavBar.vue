<template>
  <v-app-bar color="secondary">
    <v-app-bar-nav-icon @click="changeDrawer"></v-app-bar-nav-icon>
    <!-- <v-img
      class="mx-2"
      :src="require('@/assets/logo-white.png')"
      max-height="60"
      max-width="30"
    ></v-img> -->
    <v-toolbar-title class="mx-0">Administración</v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <!-- <v-btn color="primary" v-bind="props">
            <v-avatar :image="require('@/assets/logo.png')">
            </v-avatar>
          </v-btn> -->

          <v-avatar
            class="mr-3"
            color="white"
            v-bind="props"
            style="cursor: pointer"
          >
            AD
          </v-avatar>
        </template>
        <v-list>
          <!-- <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-account-settings</v-icon>
              Configuración</v-list-item-title
            >
          </v-list-item> -->
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon>mdi-exit-to-app</v-icon> Cerrar Sesión</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import store from "../store";
export default {
  name: "NavBar",
  methods: {
    changeDrawer() {
      this.$store.commit("changeNavDrawer");
    },
    logout: function () {
      store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped></style>
