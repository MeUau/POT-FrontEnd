<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de cláusulas" />
      <!--MENU DE TOPO-->
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addClausulas' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
            ><i class="fas fa-plus-square"></i> ADICIONAR CLÁUSULA</router-link
          >
          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
            ><i class="fas fa-bars"></i> MENU PRINCIPAL</router-link
          >
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>

      <!--TABLE-->
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  CLÁUSULAS
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortC === 1"
                    @click="sortClausula()"
                  ></i>
                  <i
                    class="fas fa-arrow-down"
                    v-else
                    @click="sortClausula()"
                  ></i>
                </th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="clausula of clausulas" :key="clausula._id">
                <td class="pt-4">{{ clausula.clausula }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'editClausulas',
                      params: { clausulaId: clausula._id }
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2"
                    ><i class="fas fa-edit"></i> EDITAR</router-link
                  >
                  <button
                    @click="viewClausula(clausula._id)"
                    type="button"
                    class="btn btn-outline-warning mr-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                  <button
                    @click="removeClausulas(clausula._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import {
  FETCH_CLAUSULAS,
  REMOVE_clausula
} from "@/store/clausulas/clausula.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "listClausulas",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      clausulas: [],
      sortC: 1
    };
  },
  computed: {
    ...mapGetters("clausula", ["getClausulas", "getMessage"])
  },
  methods: {
    fetchclausulas() {
      this.$store.dispatch(`clausula/${FETCH_CLAUSULAS}`).then(
        () => {
          this.clausulas = this.getClausulas;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sortClausula() {
      this.clausulas.sort(this.compareClausulas);
      this.sortC *= -1;
    },
    compareClausulas(u1, u2) {
      if (u1.clausula > u2.clausula) return 1 * this.sortC;
      else if (u1.clausula < u2.clausula) return -1 * this.sortC;
      else return 0;
    },
    viewClausula(id) {
      const clausula = this.clausulas.find(clausula => clausula._id === id);
      this.$fire({
        title: clausula.clausula,
        html: this.generateTemplate(clausula)
      });
    },
    generateTemplate(clausula) {
      let response = `
          <p><b>Descrição:</b> ${clausula.descricao}</p>`;
      return response;
    },
    removeClausulas(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a clausula?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`clausula/${REMOVE_clausula}`, id).then(() => {
            this.$alert(this.getMessage, "clausula removida!", "success");
            this.fetchclausulas();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchclausulas();
  }
};
</script>