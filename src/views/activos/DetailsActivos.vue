<template>
  <v-container>
    <Breadcrumbs :items="items" />
    <v-expansion-panels v-model="panel" multiple>
      <v-progress-circular
        v-if="load"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <v-expansion-panel>
        <v-expansion-panel-title>DETALLES DEL ACTIVO</v-expansion-panel-title>
        <v-expansion-panel-text>
          <Form></Form>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>FOTOS</v-expansion-panel-title>
        <v-expansion-panel-text> Fotos </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>DOCUMENTOS</v-expansion-panel-title>
        <v-expansion-panel-text> Documentos </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import Breadcrumbs from "@/components/helpers/Breadcrumbs.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Form from "@/components/activos/Form.vue";
export default {
  name: "Details",
  components: {
    Breadcrumbs,
    Form,
  },
  computed: {
    selectedId() {
      return parseInt(this.$route.params.id) || 0;
    },
    items() {
      return [
        {
          text: "Control de activos",
          disabled: false,
          to: "/activos",
        },
        {
          text: "Detalles de activo",
          disabled: true,
          to: `/activos/${this.selectedId}`,
        },
      ];
    },
  },
  data: () => ({
    load: false,
    panel: [],
  }),
  async created() {
    await this.$store.dispatch("assets/getAsset", this.selectedId);
  },
};
</script>
