<template>
  <b-col cols="3">
    <b-card
      bg-variant="secondary"
      text-variant="white"
      class="text-center mb-3"
    >
      <h6>{{ title }}</h6>
      <div>
        <i
          class="fas fa-newspaper fa-3x"
          style="color: green"
          @click="viewContrato(idContrato)"
        ></i>
      </div>
      <div>
        <i
          class="fas fa-newspaper fa-3x"
          style="color: green"
          @click="startContrato()"
        ></i>
      </div>
    </b-card>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "AdminOptionBox",
  props: ["idContrato", "title"],
  computed: {
    ...mapGetters({ user: "auth/getPerfil" })
  },
  methods: {
    viewContrato(id) {
      const contrato = this.contratos.find(contrato => contrato._id === id);
      this.$fire({
        title: contrato.name,
        html: this.generateTemplate(contrato)
      });
    },
    generateTemplate(contrato) {
      let response = `
          <p><b>Contrato: </b> ${contrato.name}</p>
          <p><b>Lista de clausulas:</b></p>          
      `;
      for (const clausula of contrato.clausulas) {
        response += `<p>${clausula.clausula}</p>`;
      }
      return response;
    },
    startContrato() {
      router.push({
        name: "contrato",
        params: { contratoId: this.idContrato }
      });
    }
  }
};
</script>
