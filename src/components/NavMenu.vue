<template>
  <v-navigation-drawer class="bg-navbar" v-model="navDrawer">
    <!-- <v-list>
      <v-list-subheader>
        <p>Menú principal</p>
      </v-list-subheader>
      <v-list-item v-for="(item, i) in links" :key="i" :to="item.link">
        <v-list-item :prepend-icon="item.icon" :title="item.text"></v-list-item>
      </v-list-item>
    </v-list> -->

    <v-list>
      <v-list-subheader><p>Menú principal</p></v-list-subheader>

      <v-list-item
        v-for="(item, i) in links"
        :key="i"
        :value="item"
        active-color="primary"
        :to="item.link"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout" block color="secondary">
          <p class="font-weight-bold">Cerrar sesión</p>
        </v-btn>
      </div>
    </template> -->
  </v-navigation-drawer>
</template>

<script>
import Vue from "vue";
import store from "../store";
import { mapState } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapState({
      navDrawer: "navigationDrawer",
    }),
  },
  data: () => ({
    links: [
      {
        text: "Inicio",
        icon: "mdi-home",
        link: "/",
      },
      {
        text: "Control de activos",
        icon: "mdi-laptop",
        link: "/activos",
      },
    ],
  }),
  methods: {
    logout: function () {
      store.dispatch("auth/logout");
    },
  },
};
</script>
