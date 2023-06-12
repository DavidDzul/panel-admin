<template>
  <v-layout id="app">
    <NavBar />
    <NavMenu />
    <v-main>
      <LoadingOverlay :loading="loading" />
      <Alert />
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import NavMenu from "@/components/NavMenu.vue";
import NavBar from "@/components/NavBar.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import Alert from "@/components/helpers/Alert.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    NavBar,
    NavMenu,
    LoadingOverlay,
    Alert,
  },
  computed: {
    ...mapState({ loading: "loading" }),
  },
};
</script>

<style>
body {
  background-color: #fafafa;
}
</style>
