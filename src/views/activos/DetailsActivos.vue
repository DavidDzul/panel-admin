<template>
  <v-container>
    <Breadcrumbs :items="items" />

    <v-row class="pa-5">
      <v-col cols="12" md="6">
        <span class="text-h6 font-weight-bold">N.º Control: </span>
        <span class="text-h6 font-weight-regular">
          {{ selectAsset.controlNumber }}
        </span>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" class="text-right">mdi-dots-vertical</v-icon>
          </template>
          <v-list>
            <v-list-item @click="openPhotoUpload">
              <v-list-item-title>Nueva foto de activo</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title>Eliminar activo</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-expansion-panels v-model="panel" multiple>
      <v-progress-circular
        v-if="load"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <v-expansion-panel>
        <v-expansion-panel-title>Detalles del activo</v-expansion-panel-title>
        <v-expansion-panel-text>
          <Form></Form>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title
          ><template v-slot:default="{ expanded }">
            <v-row no-gutters> Fotos </v-row>
            <v-fade-transition leave-absolute>
              <v-btn
                v-if="expanded"
                class="text-none mr-5"
                color="blue-darken-4"
                variant="outlined"
                @click="openPhotoUpload"
              >
                Nueva Foto
              </v-btn>
            </v-fade-transition>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text> <ActivosImages /> </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>Documentos</v-expansion-panel-title>
        <v-expansion-panel-text> Documentos </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>

  <v-file-input
    ref="fileInput"
    class="d-none"
    accept="image/*"
    @change="changePhoto"
  ></v-file-input>
  <v-dialog
    v-model="imageDialog"
    max-width="800px"
    persistent
    @keydown.stop.esc="closePhotoDialog"
  >
    <v-card>
      <v-img :src="previewUrl" contain max-height="600px"></v-img>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          :disabled="loadingImage"
          @click="closePhotoDialog"
        >
          Cancelar
        </v-btn>
        <v-btn color="primary" text :loading="loadingImage" @click="savePhoto">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Breadcrumbs from "@/components/helpers/Breadcrumbs.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Form from "@/components/activos/Form.vue";
import ActivosImages from "@/components/activos/ActivosImages.vue";
export default {
  name: "Details",
  components: {
    Breadcrumbs,
    Form,
    ActivosImages,
  },
  computed: {
    assets() {
      return this.$store.state.assets.entities;
    },
    selectedId() {
      return parseInt(this.$route.params.id) || 0;
    },
    selectAsset() {
      return this.$store.state.assets.selectAsset;
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
    showPhotoDialog() {
      return this.$store.state.assets.showAddImage;
    },
    loadingImage() {
      return this.$store.state.assets.loadingImage;
    },
  },
  watch: {
    showPhotoDialog: function (val) {
      this.imageDialog = val;
    },
  },
  data: () => ({
    load: false,
    panel: [],
    imageDialog: false,
    previewUrl: "",
    file: null,
  }),
  methods: {
    openPhotoUpload() {
      // eslint-disable-next-line
      this.$refs.fileInput.click();
    },
    changePhoto(event) {
      if (event) {
        console.log(event);
        this.previewUrl = (window.URL || window.webkitURL).createObjectURL(
          event.target.files[0]
        );
        this.file = event.target.files[0];
        this.$store.commit("assets/showAddImageDialog");
      } else {
        this.previewUrl = "";
        this.file = null;
      }
    },
    closePhotoDialog() {
      this.$store.commit("assets/closeAddImageDialog");
      this.previewUrl = "";
      this.file = null;
    },
    savePhoto() {
      if (this.file) {
        this.$store.dispatch("assets/createImage", {
          url: this.file,
          id_asset: this.selectedId,
        });
      }
    },
  },
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
