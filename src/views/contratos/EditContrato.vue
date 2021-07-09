<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Contrato" />
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="contrato.name"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="name do contrato"
              />
            </div>

            <div v-if="contrato.clausulas.length">
              <div class="row">
                <div class="col-md-9">
                  <h4>Lista de clausulas</h4>
                </div>
                <div class="col-md-3">
                  <h4>Ações</h4>
                </div>
              </div>
            </div>
            <div
              v-for="(clausula, index) in contrato.clausulas"
              :key="clausula.id"
            >
              <div class="form-group">
                <div class="row">
                  <div class="col-md-9">
                    <select
                      v-model="clausula.id"
                      :key="index"
                      class="form-control"
                    >
                      <option
                        v-for="q in myclausulas"
                        :key="q._id"
                        :value="q._id"
                        >{{ q.clausula }}</option
                      >
                    </select>
                  </div>
                  <div class="col-md-3">
                    <button
                      @click="removeClausulas(index)"
                      type="button"
                      class="btn btn-outline-danger mr-2"
                    >
                      <i class="fas fa-trash"></i> REMOVER
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              @click="addClausulas"
              type="button"
              class="btn btn-outline-success mr-2"
            >
              <i class="fas fa-plus-square"></i> ADICIONAR CLÁUSULAS
            </button>
            <button type="submit" class="btn btn-outline-success mr-2">
              <i class="fas fa-save"></i> ATUALIZAR
            </button>
            <router-link
              :to="{ name: 'manageContratos' }"
              tag="button"
              class="btn btn-outline-danger"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_CONTRATO } from "@/store/contratos/contrato.constants";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue";
import { FETCH_CLAUSULAS } from "@/store/clausulas/clausula.constants";
import { mapGetters } from "vuex";

export default {
  name: "EditContrato",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      contrato: {},
      myclausulas: []
    };
  },
  computed: {
    ...mapGetters("contrato", ["getContratoById", "getMessage"]),
    ...mapGetters("clausula", ["getClausulas"])
  },
  methods: {
    addClausulas() {
      this.contrato.clausulas.push({ id: "" });
    },
    removeClausulas(index) {
      this.contrato.clausulas.splice(index, 1);
    },
    update() {
      this.$store
        .dispatch(`contrato/${EDIT_CONTRATO}`, this.$data.contrato)
        .then(
          () => {
            this.$alert(this.getMessage, "Contrato atualizado!", "success");
            router.push({ name: "manageContratos" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.contrato = this.getContratoById(this.$route.params.contratoId);
    this.$store.dispatch(`clausula/${FETCH_CLAUSULAS}`).then(
      () => {
        this.myclausulas = this.getClausulas;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  }
};
</script>
