<template>
  <v-snackbar v-model="snackbar" :color="status" :timeout="3000">
    <div class="d-block">{{ message }}</div>
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    snackbar: false,
    subscription: undefined,
  }),
  computed: {
    ...mapGetters("alert", {
      show: "show",
      message: "message",
      errors: "errors",
      status: "status",
    }),
    icon() {
      switch (this.status) {
        case "success":
          return "mdi-check";
        case "error":
          return "mdi-close";
        case "warning":
          return "mdi-alert";
        default:
          return "";
      }
    },
  },
  created() {
    this.subscription = store.subscribe((mutation) => {
      if (mutation.type === "alert/setAlert") {
        this.snackbar = true;
      }
    });
  },
  beforeDestroy() {
    this.subscription?.();
  },
};
</script>
