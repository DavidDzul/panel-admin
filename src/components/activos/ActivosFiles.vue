<template>
  <v-row no-gutters class="my-3" v-if="Object.keys(fileList).length">
    <v-col v-for="(file, i) in fileList" :key="i" cols="12" md="4">
      <v-card flat class="text-center">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn
              :color="getColor(file)"
              class="mx-auto"
              icon
              x-large
              v-bind="props"
            >
              <v-icon x-large>mdi-file</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item :href="fileUrl(file.url)" target="_blank">
              <v-list-item-title>
                <v-icon x-large>mdi-download</v-icon>
                Descargar</v-list-item-title
              >
            </v-list-item>
            <!-- <v-list-item>
              <v-list-item-title>Eliminar</v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
        <v-card-subtitle class="my-2">{{ file.name }}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { API_URL } from "@/constants";
export default {
  name: "Images",
  computed: {
    fileList() {
      return this.$store.state.assets.selectAsset.files;
    },
  },
  data: () => ({
    valid: false,
    created: true,
  }),
  methods: {
    fileUrl(data) {
      if (data) {
        return API_URL + "storage/" + data;
      }
    },
    deletePhoto(id) {
      this.$store.dispatch("assets/removeImage", id);
    },
    getColor(file) {
      const filename = file.name;
      const extension = filename.split(".").pop();
      switch (extension) {
        case "pdf":
          return "red";
        case "docx":
          return "blue";
        case "xlsx":
          return "green";
        default:
          break;
      }
    },
  },
};
</script>
