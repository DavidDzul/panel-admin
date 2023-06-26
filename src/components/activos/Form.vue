<template>
  <v-card class="mx-auto elevation-0" prepend-icon="mdi-laptop">
    <template v-slot:title>
      <strong> {{ titleText }} </strong>
    </template>
    <v-card-text>
      <v-form v-model="valid" class="mx-5 my-5" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.acquisitionDate"
              label="Fecha de adquisición"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.providerName"
              label="Nombre de proveedor"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.invoiceNumber"
              label="Número de factura"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              variant="underlined"
              v-model="form.assetype"
              label="Tipo de bien"
              :items="listAssets"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.companyBrand"
              label="Marca"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.model"
              label="Modelo"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea
              variant="underlined"
              v-model="form.description"
              rows="2"
              label="Descripción del bien"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.serialNumber"
              label="No. de serie"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.AcquisitionValue"
              label="Valor de adquisición"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              variant="underlined"
              v-model="form.state"
              label="Estado fisico actual"
              :items="listStatus"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col>
          <!-- <v-col cols="12" md="4">
            <v-autocomplete
              variant="underlined"
              v-model="form.campus"
              label="Sede"
              :items="listSede"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col> -->
          <v-col cols="12" md="4">
            <v-autocomplete
              variant="underlined"
              v-model="form.use"
              label="Uso"
              :items="listUse"
              item-title="name"
              item-value="value"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" v-if="form.use === 'OTHER'">
            <v-text-field
              variant="underlined"
              v-model="form.otherUse"
              label="Otro uso"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.location"
              label="Ubicación fisica del bien"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              variant="underlined"
              v-model="form.userId"
              label="Nombre de persona responsable"
              :items="users"
              item-title="firstName"
              item-value="id"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea
              variant="underlined"
              v-model="form.observation"
              rows="2"
              label="Observaciones"
            ></v-textarea>
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
import { mapGetters } from "vuex";
export default {
  name: "Form",
  props: {
    asset: {
      type: Object,
      required: false,
    },
  },
  computed: {
    loading() {
      return this.$store.state.assets.loading;
    },
    ...mapGetters("users", {
      users: "getUsers",
    }),
  },
  watch: {
    loading: function (val) {
      this.sendLoading = val;
    },
  },
  // setup(props) {
  //   watch(
  //     () => props.asset,
  //     (val) => {
  //       console.log(val);
  //     }
  //   );
  // },
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
      // campus: "",
      userId: "",
      observation: "",
    },
  }),
  methods: {
    async submit() {
      if (this.created) {
        await this.$store.dispatch("assets/createAsset", this.form);
      } else {
        Object.assign(this.form, { id: this.asset.id });
        await this.$store.dispatch("assets/updateAsset", this.form);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.asset) {
        this.txtBtn = "ACTUALIZAR";
        this.titleText = "ACTUALIZAR ACTIVO";
        this.created = false;
        this.form.acquisitionDate = this.asset.acquisitionDate;
        this.form.providerName = this.asset.providerName;
        this.form.invoiceNumber = this.asset.invoiceNumber;
        this.form.assetype = this.asset.assetype;
        this.form.companyBrand = this.asset.companyBrand;
        this.form.model = this.asset.model;
        this.form.description = this.asset.description;
        this.form.serialNumber = this.asset.serialNumber;
        this.form.AcquisitionValue = this.asset.AcquisitionValue;
        this.form.state = this.asset.state;
        this.form.location = this.asset.location;
        this.form.use = this.asset.use;
        this.form.otherUse = this.asset.otherUse;
        this.form.userId = this.asset.id_user;
        this.form.observation = this.asset.observation;
        // this.form.campus = this.asset.campus;
        // this.form.personCharge = this.asset.personCharge;
        // this.form.personPosition = this.asset.personPosition;
      } else {
        this.titleText = "AGREGAR ACTIVO";
      }
    }, "500");
  },
};
</script>
