<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Terrenos" />
      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <!-- addTerreno -->
          <router-link
            :to="{ name: 'addTerreno' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR TERRENO
          </router-link>
          <!-- Menu admin -->
          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
          >
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <!--TABLE-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <table class="table table-striped">
            <!-- cabeçalho -->
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NAME
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortN === 1"
                    @click="sortNames()"
                  ></i>
                  <i class="fas fa-arrow-down" v-else @click="sortNames()"></i>
                </th>
                <th scope="col">
                  CULTURA
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortC === 1"
                    @click="sortCultura()"
                  ></i>
                  <i
                    class="fas fa-arrow-down"
                    v-else
                    @click="sortCultura()"
                  ></i>
                </th>
                <th scope="col">
                  ÁREA (m<sup>2</sup>)
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortA === 1"
                    @click="sortArea()"
                  ></i>
                  <i class="fas fa-arrow-down" v-else @click="sortArea()"></i>
                </th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <!-- lista de terrenos -->
            <tbody>
              <tr v-for="terreno of terrenos" :key="terreno._id">
                <td class="pt-4">{{ terreno.name }}</td>
                <td class="pt-4">{{ terreno.cultura }}</td>
                <td class="pt-4">{{ terreno.area }}</td>
                <td>
                  <!-- viewTerreno -->
                  <button
                    @click="viewTerreno(terreno._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                  <!-- editTerreno -->
                  <router-link
                    :to="{
                      name: 'editTerreno',
                      params: { terrenoId: terreno._id }
                    }"
                    tag="button"
                    class="btn btn-outline-warning mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <!-- removeTerreno -->
                  <button
                    @click="removeTerreno(terreno._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import {
  FETCH_TERRENOS,
  REMOVE_TERRENO
} from "@/store/terrenos/terreno.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageTerrenos",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      terrenos: [],
      sortN: -1,
      sortA: 1,
      sortC: -1
    };
  },
  computed: {
    ...mapGetters("terreno", ["getTerrenos", "getMessage"])
  },
  methods: {
    fetchTerrenos() {
      this.$store.dispatch(`terreno/${FETCH_TERRENOS}`).then(
        () => {
          this.terrenos = this.getTerrenos;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sortNames() {
      this.terrenos.sort(this.compareNames);
      this.sortN *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortN;
      else if (u1.name < u2.name) return -1 * this.sortN;
      else return 0;
    },
    sortCultura() {
      this.terrenos.sort(this.compareCultura);
      this.sortC *= -1;
    },
    compareCultura(u1, u2) {
      if (u1.cultura > u2.cultura) return 1 * this.sortC;
      else if (u1.cultura < u2.cultura) return -1 * this.sortC;
      else return 0;
    },
    sortArea() {
      this.terrenos.sort(this.compareArea);
      this.sortA *= -1;
    },
    compareArea(u1, u2) {
      if (u1.area > u2.area) return 1 * this.sortA;
      else if (u1.area < u2.area) return -1 * this.sortA;
      else return 0;
    },

    viewTerreno(id) {
      const terreno = this.terrenos.find(terreno => terreno._id === id);

      this.$fire({
        title: terreno.name,
        html: this.generateTemplate(terreno),
        imageUrl: terreno.urlPhoto,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: terreno.name + "sem imagem conhecida"
      });
    },
    generateTemplate(terreno) {
      let response = `
          <h4>Cultura:</b> ${terreno.cultura}</h4>
          <h5>(área:</b> ${terreno.area} m<sup>2</sup>)</h5>
          <p>${terreno.descricao}</p> `;
      return response;
    },

    removeTerreno(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o terreno?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`terreno/${REMOVE_TERRENO}`, id).then(() => {
            this.$alert(this.getMessage, "Terreno removido!", "success");
            this.fetchTerrenos();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchTerrenos();
  }
};
</script>
