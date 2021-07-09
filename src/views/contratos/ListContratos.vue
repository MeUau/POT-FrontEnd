<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Lista de Contratos" />
      <!--MENU DE TOPO-->
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'home' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
          >
            <i class="fas fa-bars"></i> VOLTAR
          </router-link>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
      <!--TABLE-->
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <table class="table table-striped">
            <!-- cabeçalho -->
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortN === 1"
                    @click="sortNome()"
                  ></i>
                  <i class="fas fa-arrow-down" v-else @click="sortNome()"></i>
                </th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <!-- lista de contratos -->
            <tbody>
              <tr v-for="contrato of contratos" :key="contrato._id">
                <td class="pt-4">{{ contrato.name }}</td>
                <td>
                  <button
                    @click="viewContrato(contrato._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_CONTRATOS } from "@/store/contratos/contrato.constants";
import { mapGetters } from "vuex";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";

export default {
  name: "ListContratos",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      contratos: [],
      sortN: 1
    };
  },
  computed: {
    ...mapGetters("contrato", ["getContratos", "getMessage"])
  },
  methods: {
    fetchContratos() {
      this.$store.dispatch(`contrato/${FETCH_CONTRATOS}`).then(
        () => {
          this.contratos = this.getContratos;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    startContrato() {
      router.push({
        name: "contrato",
        params: { contratoId: this.idContrato }
      });
    },
    sortNome() {
      this.contratos.sort(this.compareNames);
      this.sortN *= -1;
    },
    compareNames(q1, q2) {
      if (q1.name > q2.name) return 1 * this.sortN;
      else if (q1.name < q2.name) return -1 * this.sortN;
      else return 0;
    },
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
    }
  },
  created() {
    this.fetchContratos();
  }
};
</script>
