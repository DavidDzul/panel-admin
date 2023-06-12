<template>
  <v-card
    class="mx-auto"
    prepend-icon="mdi-laptop"
    :class="created == false ? 'elevation-0' : ''"
  >
    <template v-slot:title>
      <strong> {{ titleText }} </strong>
    </template>
    <v-card-text>
      <v-form v-model="valid" class="mx-5 my-5" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.acquisitionDate"
              label="Fecha de adquisición"
              type="date"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.providerName"
              label="Nombre de proveedor"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.invoiceNumber"
              label="Número de factura"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="form.assetype"
              label="Tipo de bien"
              :items="listAssets"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.companyBrand"
              label="Marca"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.model"
              label="Modelo"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea
              v-model="form.description"
              label="Descripción del bien"
              required
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.serialNumber"
              label="No. de serie"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.AcquisitionValue"
              label="Valor de adquisición"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="form.state"
              label="Estado fisico actual"
              :items="listStatus"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.location"
              label="Ubicación fisica del bien"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="form.use"
              label="Uso"
              :items="listUse"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4" v-if="form.use === 'OTHER'">
            <v-text-field
              v-model="form.otherUse"
              label="Otro uso"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="form.campus"
              label="Sede"
              :items="listSede"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.personCharge"
              label="Nombre de Persona responsable"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.personPosition"
              label="Puesto de Persona responsable"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" offset="8">
            <v-btn
              :loading="sendLoading"
              type="submit"
              block
              class="mt-2"
              color="warning"
            >
              <v-icon class="mr-2">mdi-content-save</v-icon>
              {{ txtBtn }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Form",
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
    loading() {
      return this.$store.state.assets.loading;
    },
    selectAsset() {
      return this.$store.state.assets.selectAsset;
    },
  },
  watch: {
    loading: function (val) {
      this.sendLoading = val;
    },
  },
  data: () => ({
    valid: false,
    created: true,
    sendLoading: false,
    txtBtn: "GUARDAR",
    titleText: "",
    listAssets: [
      { name: "Equipo de Cómputo", value: "EQUIPMENT" },
      { name: "Mobiliario y Equipo de Oficina", value: "FURNITURE" },
      { name: "Equipo para eventos", value: "EVENTS" },
      { name: "Equipo de Audio", value: "AUDIO" },
    ],
    listStatus: [
      { name: "Bueno", value: "GOOD" },
      { name: "Excelente", value: "EXCELLENT" },
      { name: "Regular", value: "REGULAR" },
      { name: "No sirve", value: "FUNCTIONLESS" },
    ],
    listUse: [
      { name: "Formación Integral", value: "FORMATION" },
      { name: "Operativo", value: "OPERATIONAL" },
      { name: "Otro", value: "OTHER" },
    ],
    listSede: [
      { name: "Mérida", value: "MERIDA" },
      { name: "Valladolid", value: "VALLADOLID" },
      { name: "Tizimín", value: "TIZIMIN" },
      { name: "Oxkutzcab", value: "OXKUTZCAB" },
    ],
    form: {
      acquisitionDate: "",
      providerName: "",
      invoiceNumber: "",
      assetype: "",
      companyBrand: "",
      model: "",
      description: "",
      serialNumber: "",
      AcquisitionValue: "",
      state: "",
      location: "",
      use: "",
      otherUse: "",
      campus: "",
      personCharge: "",
      personPosition: "",
    },
  }),
  methods: {
    async submit() {
      if (this.created) {
        await this.$store.dispatch("assets/createAsset", this.form);
      } else {
        Object.assign(this.form, { id: this.selectAsset.id });
        await this.$store.dispatch("assets/updateAsset", this.form);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (Object.keys(this.selectAsset).length) {
        this.txtBtn = "ACTUALIZAR";
        this.titleText = "Actualizar Activo";
        this.created = false;
        this.form.acquisitionDate = this.selectAsset.acquisitionDate;
        this.form.providerName = this.selectAsset.providerName;
        this.form.invoiceNumber = this.selectAsset.invoiceNumber;
        this.form.assetype = this.selectAsset.assetype;
        this.form.companyBrand = this.selectAsset.companyBrand;
        this.form.model = this.selectAsset.model;
        this.form.description = this.selectAsset.description;
        this.form.serialNumber = this.selectAsset.serialNumber;
        this.form.AcquisitionValue = this.selectAsset.AcquisitionValue;
        this.form.state = this.selectAsset.state;
        this.form.location = this.selectAsset.location;
        this.form.use = this.selectAsset.use;
        this.form.otherUse = this.selectAsset.otherUse;
        this.form.campus = this.selectAsset.campus;
        this.form.personCharge = this.selectAsset.personCharge;
        this.form.personPosition = this.selectAsset.personPosition;
      } else {
        this.titleText = "Agregar Nuevo Activo";
      }
    }, "500");
  },
};
</script>
