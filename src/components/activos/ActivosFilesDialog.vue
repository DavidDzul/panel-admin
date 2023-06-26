<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="800" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Almanecar documentos</span>
        </v-card-title>
        <v-card-text>
          <v-file-input
            label="Seleccionar archivo"
            variant="underlined"
            @change="changeFile"
          ></v-file-input>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text :disabled="sendLoading" @click="close">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            :disabled="invalid"
            :loading="sendLoading"
            @click="save"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "UserDialogForm",
  computed: {
    ...mapState("assets", {
      show: "showAddFile",
      loading: "loadingFile",
      asset: "selectAsset",
    }),
  },
  watch: {
    show: function (val) {
      this.dialog = val;
    },
    loading: function (val) {
      this.sendLoading = val;
    },
  },
  data: () => ({
    dialog: false,
    sendLoading: false,
    invalid: true,
    txtBtn: "",
    txtTile: "",
    file: null,
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    changeFile(event) {
      if (event) {
        this.invalid = false;
        this.file = event.target.files[0];
      } else {
        this.file = null;
        this.invalid = false;
      }
    },
    async save() {
      if (this.file) {
        this.$store.dispatch("assets/createFile", {
          url: this.file,
          id_asset: this.asset.id,
        });
      }
    },
  },
};
</script>
