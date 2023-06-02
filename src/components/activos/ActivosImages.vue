<template>
  <v-carousel
    height="400"
    hide-delimiter-background
    hide-delimiters
    style="background-color: #f7f7f7"
    v-if="Object.keys(selectAsset).length"
  >
    <v-carousel-item v-for="(item, i) in selectAsset" :key="i">
      <v-img
        :src="getImage(item.url)"
        max-width="500"
        height="600"
        cover
        style="position: relative; left: 50%; transform: translateX(-50%)"
      >
        <v-btn
          icon="mdi-delete"
          style="
            position: absolute;
            right: 0%;
            bottom: 0%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            text-align: center;
          "
          color="red"
          :loading="loadingImage"
          @click="deletePhoto(item.id)"
        ></v-btn>
      </v-img>
    </v-carousel-item>
  </v-carousel>
  <v-container v-else> No hay fotos almacenadas </v-container>
</template>

<script>
import { API_URL } from "@/constants";
export default {
  name: "Images",
  computed: {
    selectAsset() {
      return this.$store.state.assets.selectAsset.images;
    },
    loadingImage() {
      return this.$store.state.assets.loadingImage;
    },
  },
  data: () => ({
    valid: false,
    created: true,
  }),
  methods: {
    getImage(data) {
      if (data) {
        return API_URL + "storage/" + data;
      }
    },
    deletePhoto(id) {
      this.$store.dispatch("assets/removeImage", id);
    },
  },
};
</script>
