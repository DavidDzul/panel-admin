<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon> {{ items.icon }} </v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    items: { type: Array, required: true },
  },
};
</script>
