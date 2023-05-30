<template>
  <v-row class="text-center mx-0 my-2" align="center" justify="center">
    <v-col cols="2">
      <h4 style="vertical-align: middle">Listado de activos</h4>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col cols="7">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <router-link :to="`/activos/form`">
        <v-btn color="secondary"> AGREGAR ACTIVO </v-btn>
      </router-link>
    </v-col>
  </v-row>
  <br />
  <v-data-table
    :headers="headers"
    :items="assets"
    :search="search"
    :loading="loading"
    class="elevation-1"
    density="compact"
  >
    <template v-slot:item.assetype="{ item }">
      {{
        (item = "EQUIPMENT"
          ? "Equipo de Cómputo"
          : (item = "FURNITURE"
              ? "Mobiliario y Equipo de Oficina"
              : (item = "EVENTS"
                  ? "Equipo para eventos"
                  : (item = "AUDIO" ? "Equipo de Audio" : ""))))
      }}
    </template>
    <template v-slot:item.campus="{ item }">
      {{
        (item = "MERIDA"
          ? "Mérida"
          : (item = "OXKUTZCAB"
              ? "Oxkutzcab"
              : (item = "TIZIMIN"
                  ? "Tizimín"
                  : (item = "VALLADOLID" ? "Valladolid" : ""))))
      }}
    </template>
    <template #[`item.actions`]="{ item }">
      <v-tooltip text="Ver detalles" location="bottom">
        <template v-slot:activator="{ props }">
          <router-link :to="`/activos/${item.props.title.id}`">
            <v-btn icon variant="text" v-bind="props"
              ><v-icon small> mdi-eye</v-icon></v-btn
            >
          </router-link>
        </template>
      </v-tooltip>
      <!-- <v-tooltip text="Editar" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            variant="text"
            v-bind="props"
            @click="selectAsset(item.props.title)"
            ><v-icon small> mdi-pencil</v-icon></v-btn
          >
        </template>
      </v-tooltip> -->
      <v-tooltip text="Eliminar" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            @click="
              confirmDeleteActivo(
                item.props.title.controlNumber,
                item.props.title.id
              )
            "
            icon
            variant="text"
            v-bind="props"
            ><v-icon color="red" small> mdi-delete</v-icon></v-btn
          >
        </template>
      </v-tooltip>
    </template>
  </v-data-table>
  <ConfirmationDialog ref="confirmationDialog" />
</template>

<script>
import router from "@/router";
import { useRouter } from "vue-router";
import ConfirmationDialog from "../helpers/ConfirmationDialog.vue";
import { deleteAssetTitle, deleteAssetBody } from "@/constants";

export default {
  name: "Activos",
  components: { ConfirmationDialog },
  props: {
    assets: {
      type: Object,
      required: false,
      default: {},
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    search: "",
    headers: [
      {
        align: "start",
        key: "controlNumber",
        sortable: false,
        title: "N.º de control",
      },
      { key: "assetype", title: "Tipo" },
      { key: "companyBrand", title: "Marca" },
      { key: "personCharge", title: "Responsable" },
      { key: "campus", title: "Sede" },
      { align: "center", key: "actions", title: "Opciones" },
    ],
  }),
  methods: {
    navigate() {
      router.push({ name: "FormularioActivo" });
    },
    confirmDeleteActivo(controlNumber, id) {
      this.$refs?.confirmationDialog
        ?.open({
          title: deleteAssetTitle,
          body: deleteAssetBody(controlNumber),
        })
        .then((res) => {
          if (res) {
            this.removeActivo(id);
          }
        })
        .catch();
    },
    removeActivo(id) {
      this.$store.dispatch("assets/deleteAsset", id);
    },
  },
};
</script>
