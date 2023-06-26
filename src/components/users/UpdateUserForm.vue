<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          variant="underlined"
          v-model="inputModel.firstName"
          label="Nombre(s)"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          variant="underlined"
          v-model="inputModel.lastName"
          label="Apellido(s)"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          variant="underlined"
          v-model="inputModel.email"
          type="email"
          label="Correo electrónico"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          variant="underlined"
          v-model="inputModel.phone"
          label="Número de celular"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          variant="underlined"
          v-model="inputModel.campus"
          label="Sede"
          :items="listSede"
          item-title="name"
          item-value="value"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          variant="underlined"
          v-model="inputModel.workPosition"
          label="Puesto de trabajo"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from "vue";
export default {
  name: "UpdateUserForm",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const inputModel = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", { ...this.modelValue, [key]: value });
      },
    });
    return { inputModel };
  },
  data: () => ({
    listSede: [
      { name: "Mérida", value: "MERIDA" },
      { name: "Valladolid", value: "VALLADOLID" },
      { name: "Tizimín", value: "TIZIMIN" },
      { name: "Oxkutzcab", value: "OXKUTZCAB" },
    ],
  }),
};
</script>
