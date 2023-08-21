<template>
  <v-expansion-panels v-model="panel" multiple accordion>
    <v-progress-circular
      v-if="load"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-expansion-panel>
      <v-expansion-panel-title>Detalles del activo</v-expansion-panel-title>
      <v-expansion-panel-text>
        <Form :asset="asset"></Form>
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
              @click.stop="openPhotoUpload"
            >
              AGREGAR
            </v-btn>
          </v-fade-transition>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text> <ActivosImages /> </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title
        ><template v-slot:default="{ expanded }">
          <v-row no-gutters> Documentos </v-row>
          <v-fade-transition leave-absolute>
            <v-btn
              v-if="expanded"
              class="text-none mr-5"
              color="blue-darken-4"
              variant="outlined"
              @click.stop="showAddFileDialog"
            >
              AGREGAR
            </v-btn>
          </v-fade-transition>
        </template></v-expansion-panel-title
      >
      <v-expansion-panel-text>
        <ActivosFiles />

        <ActivosFilesDialog @close="closeAddFileDialog" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Form from "@/components/activos/Form.vue";
import ActivosImages from "@/components/activos/ActivosImages.vue";
import ActivosFilesDialog from "@/components/activos/ActivosFilesDialog.vue";
import ActivosFiles from "@/components/activos/ActivosFiles.vue";

export default {
  name: "ActivosDetailsPanels",
  props: {
    asset: {
      type: Object,
      required: true,
      default: {},
    },
  },
  components: {
    Form,
    ActivosImages,
    ActivosFilesDialog,
    ActivosFiles,
  },
  computed: {
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
    ...mapMutations("assets", {
      showAddFileDialog: "showAddFileDialog",
      closeAddFileDialog: "closeAddFileDialog",
    }),
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
          id_asset: this.asset.id,
        });
      }
    },
  },
};
</script>
