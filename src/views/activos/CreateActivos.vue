<template>
  <v-container>
    <Breadcrumbs :items="items" />
    <Form></Form>
  </v-container>
</template>

<script>
import Breadcrumbs from "@/components/helpers/Breadcrumbs.vue";
import Form from "@/components/activos/Form.vue";
export default {
  name: "CreateForm",
  components: {
    Breadcrumbs,
    Form,
  },
  computed: {
    items() {
      return [
        {
          text: "Control de activos",
          disabled: false,
          to: "/activos",
        },
        {
          text: "Nuevo activo",
          disabled: true,
          to: "/activos/form",
        },
      ];
    },
  },
};
</script>
