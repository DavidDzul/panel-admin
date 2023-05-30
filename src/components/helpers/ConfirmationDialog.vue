<template>
  <v-dialog
    v-model="dialog"
    max-width="420px"
    @click:outside.stop="cancel"
    @keydown.stop.esc="cancel"
    persistent
  >
    <v-card>
      <v-card-title color="#385F73">
        {{ options.title }}
      </v-card-title>
      <v-card-text>
        {{ options.body }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="cancel"> Cancelar </v-btn>
        <v-btn color="primary" text @click="confirm"> Confirmar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
export default {
  name: "ConfirmationDialog",
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    options: {
      title: "",
      body: "",
    },
  }),
  methods: {
    open(options) {
      this.options = Object.assign(this.options, options);
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm() {
      this.resolve?.(true);
      this.close();
    },
    cancel() {
      this.resolve?.(false);
      this.close();
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
