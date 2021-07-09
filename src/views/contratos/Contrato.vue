<template>
  <section class="page-section">
    <b-container>
      <HeaderPage :title="'Contrato: ' + contrato.name" />
      <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="1"></b-col>
      </b-row>
      <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="10">
          <div>
            <b-card no-body>
              <b-tabs pills card vertical>
                <b-tab
                  :disabled="currentClausula !== index + 1"
                  v-for="(clausula, index) in contrato.clausulas"
                  :key="clausula.id"
                  :title="'Clausula #' + (index + 1)"
                >
                  <b-card :title="clausula.clausula">
                    <b-card-text v-html="clausula.descricao" />
                  </b-card>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "Terreno",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      contrato: "",
      option: "",
      currentClausula: 1,
      artigosClausula: []
    };
  },
  computed: {
    ...mapGetters("auth", ["getPerfil"]),
    ...mapGetters("user", ["getUsersById"]),
    ...mapGetters("contrato", ["getContratoById"])
  },
  methods: {
    setArtigo() {
      this.artigosClausula.push(this.option);
      this.currentClausula += 1;
    }
  },
  created() {
    this.contrato = this.getContratoById(this.$route.params.contratoId);
  }
};
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
