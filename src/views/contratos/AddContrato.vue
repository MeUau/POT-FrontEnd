<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Contrato" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Título do Contrato"
              />
            </div>
            <div v-if="clausulas.length">
              <div class="row">
                <div class="col-md-9">
                  <h4>Lista de clausulas</h4>
                </div>
                <div class="col-md-3">
                  <h4>Ações</h4>
                </div>
              </div>
            </div>
            <div v-for="(clausula, index) in clausulas" :key="clausula._id">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-9">
                    <select
                      v-model="clausula.id"
                      :key="index"
                      class="form-control"
                    >
                      <option
                        v-for="c in getClausulasActivas"
                        :key="c._id"
                        :value="c._id"
                        >{{ c.clausula }}</option
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
              <i class="fas fa-check"></i> ADICIONAR CLÁUSULAS
            </button>
            <button type="submit" class="btn btn-outline-success mr-2">
              <i class="fas fa-save"></i> GRAVAR CONTRATO
            </button>
            <router-link
              :to="{ name: 'manageContratos' }"
              tag="button"
              class="btn btn-outline-danger"
              ><i class="fas fa-window-close"></i> CANCELAR</router-link
            >
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_CONTRATO } from "@/store/contratos/contrato.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { FETCH_CLAUSULAS } from "@/store/clausulas/clausula.constants";
import router from "@/router";

import { mapGetters } from "vuex";

export default {
  name: "AddContrato",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      clausulas: [],
      myClausulas: []
    };
  },
  computed: {
    ...mapGetters("contrato", ["getMessage"]),
    ...mapGetters("clausula", ["getClausulas"]),
    getClausulasActivas() {
      return this.myClausulas.filter(clausula => clausula.active);
    }
  },
  methods: {
    setPlaceHolder: index => {
      return `insira o ${index}º artigo`;
    },
    addClausulas() {
      this.clausulas.push({ id: "" });
    },
    removeClausulas(index) {
      this.clausulas.splice(index, 1);
    },
    add() {
      this.clausulas = this.clausulas.map(clausula => clausula["id"]);
      this.$store
        .dispatch(`contrato/${ADD_CONTRATO}`, {
          name: this.name,
          clausulas: this.clausulas
        })
        .then(
          () => {
            this.$alert(this.getMessage, "Contrato adicionado!", "success");
            router.push({ name: "manageContratos" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.$store.dispatch(`clausula/${FETCH_CLAUSULAS}`).then(
      () => {
        this.myClausulas = this.getClausulas;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  }
};
</script>
