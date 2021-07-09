<template>
  <b-container fluid>
    <!-- Header -->
    <header class="masthead bg-secondary text-white text-center">
      <img class="masthead-avatar mb-2" src="@/assets/pot.png" />
      <b-row class="mt-5 mb-5">
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-map-marked-alt fa-3x"></i>
          <br />
          <kbd><strong>Regra #01</strong></kbd>
          <br />Selecione <strong>TERRENOS</strong> disponíveis.
        </b-col>
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-comment fa-3x"></i>
          <br />
          <kbd><strong>Regra #02</strong></kbd>
          <br />Fale com o <strong>PROPRIETÁRIO</strong> para esclarecer
          qualquer dúvida.
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row class="mb-5">
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-handshake fa-3x"></i>
          <br />
          <kbd><strong>Regra #03</strong></kbd>
          <br />Aceite as cláusulas do <strong>CONTRATO</strong> de parceria.
        </b-col>
        <b-col cols="2"></b-col>
        <b-col class="text-center">
          <i class="fas fa-tractor fa-3x"></i>
          <br />
          <kbd>Regra #04</kbd>
          <br />Faça a gestão das suas <strong>PARCERIAS</strong> conforme
          contratado.
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-button
            variant="outline-light"
            size="lg"
            class="p-2 mr-2"
            @click="showMain()"
          >
            <i class="fas fa-home mr-2"></i>PÁGINA PRINCIPAL
          </b-button>
        </b-col>
      </b-row>
    </header>
  </b-container>
</template>

<script>
import router from "@/router";
export default {
  name: "Help",
  methods: {
    showMain() {
      router.push({ name: "home" });
    }
  }
};
</script>
