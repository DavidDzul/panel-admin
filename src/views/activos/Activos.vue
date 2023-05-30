<template>
  <v-container>
    <Breadcrumbs :items="items" />
    <ActivosTable :assets="assets" :loading="loading" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import ActivosTable from "@/components/activos/ActivosTable.vue";
import Breadcrumbs from "@/components/helpers/Breadcrumbs.vue";
export default {
  name: "Home",
  components: {
    ActivosTable,
    Breadcrumbs,
  },
  computed: {
    ...mapState("assets", {
      loading: "loading",
    }),
    ...mapGetters("assets", {
      assets: "getAssets",
    }),
    items() {
      return [
        {
          text: "Control de activos",
          disabled: true,
          to: "/activos",
        },
      ];
    },
  },
  created() {
    this.fetchAssets();
  },
  methods: {
    ...mapActions("assets", {
      fetchAssets: "fetchAssets",
    }),
  },
};
</script>
