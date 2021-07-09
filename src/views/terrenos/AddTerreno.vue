<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="ADICIONAR TERRENO" />
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <!-- nome -->
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="nome do terreno"
                required
              />
            </div>
            <!-- cultura -->
            <div class="form-group">
              <select
                id="sltCultura"
                class="form-control form-control-lg"
                v-model="cultura"
              >
                <option value>-- Selecione a cultura --</option>
                <option value="Cereal">Cereal</option>
                <option value="Autoctone">Autóctone</option>
                <option value="Pomar">Pomar</option>
                <option value="Olival">Olival</option>
                <option value="Estufa">Estufa</option>
              </select>
            </div>
            <!-- descrição -->
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="descrição"
                cols="30"
                rows="3"
                v-model="descricao"
              ></textarea>
            </div>
            <!-- área -->
            <div class="form-group">
              <div class="form-group">
                <input
                  v-model="area"
                  type="text"
                  onmouseenter="(this.type='number')"
                  onmouseleave="(this.type='text')"
                  min="10"
                  max="1000000"
                  class="form-control form-control-lg"
                  id="txtArea"
                  placeholder="área em m2"
                  required
                />
              </div>
            </div>
            <!-- url da fotografia -->
            <div class="form-group">
              <input
                v-model="urlPhoto"
                type="url"
                class="form-control form-control-lg"
                id="txtPhoto"
                placeholder="link para foto (URL)"
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <button
              @click="goBack()"
              type="button"
              tag="cancelar"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </button>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_TERRENO } from "@/store/terrenos/terreno.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddTerreno",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      area: 0,
      cultura: "",
      descricao: "",
      urlPhoto: "",
      proprietario: "",
      contrato: "",
      parceiro: ""
    };
  },
  computed: {
    ...mapGetters("terreno", ["getMessage"])
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    add() {
      this.$store.dispatch(`terreno/${ADD_TERRENO}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Terreno adicionado!", "success");
          router.push({ name: "manageTerrenos" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
