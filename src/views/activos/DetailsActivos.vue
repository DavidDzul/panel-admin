<template>
  <v-container v-if="asset">
    <Breadcrumbs :items="items" />
    <v-row class="pa-5">
      <v-col cols="12" md="6">
        <span class="text-h6 font-weight-bold">N.º Control: </span>
        <span class="text-h6 font-weight-regular">
          {{ asset.controlNumber }}
        </span>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" class="text-right">mdi-dots-vertical</v-icon>
          </template>
          <v-list>
            <!-- <v-list-item @click="openPhotoUpload">
              <v-list-item-title>Nueva foto de activo</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider> -->
            <v-list-item>
              <v-list-item-title>Eliminar activo</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <ActivosDetailsPanels :asset="asset" />
  </v-container>
</template>

<script>
import Breadcrumbs from "@/components/helpers/Breadcrumbs.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import ActivosDetailsPanels from "@/components/activos/ActivosDetailsPanels.vue";
export default {
  name: "Details",
  components: {
    Breadcrumbs,
    ActivosDetailsPanels,
  },
  computed: {
    selectedId() {
      return parseInt(this.$route.params.id) || 0;
    },
    ...mapState("assets", {
      asset: "selectAsset",
    }),
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
    imageDialog: false,
    previewUrl: "",
    file: null,
  }),
  async created() {
    if (this.assets) {
      await this.$store.commit(
        "assets/selectAsset",
        this.assets[this.selectedId]
      );
    } else {
      await this.$store.dispatch("assets/getAsset", this.selectedId);
    }
  },
};
</script>
