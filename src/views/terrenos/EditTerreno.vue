<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Terreno" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <!-- terreno.name -->
            <div class="form-group">
              <input
                v-model="terreno.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="name"
              />
            </div>
            <!-- terreno.cultura -->
            <div class="form-group">
              <select
                id="sltCultura"
                class="form-control form-control-lg"
                v-model="terreno.cultura"
              >
                <option value>-- Selecione a cultura --</option>
                <option value="Cereal">Cereal</option>
                <option value="Autoctone">Autóctone</option>
                <option value="Pomar">Pomar</option>
                <option value="Olival">Olival</option>
                <option value="Estufa">Estufa</option>
              </select>
            </div>
            <!-- terreno.descricao -->
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="descrição"
                cols="30"
                rows="10"
                v-model="terreno.descricao"
              ></textarea>
            </div>
            <!-- área -->
            <div class="form-group">
              <input
                v-model="terreno.area"
                type="text"
                onmouseenter="(this.type='number')"
                onmouseleave="(this.type='text')"
                min="10"
                max="1000000"
                class="form-control form-control-lg"
                id="txtArea"
                placeholder="área em m2"
              />
            </div>
            <!-- terreno-fotografia -->
            <div class="form-group">
              <input
                v-model="terreno.urlPhoto"
                type="url"
                class="form-control form-control-lg"
                id="txtPhoto"
                placeholder="link para foto"
              />
            </div>
            <!-- submit -->
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <button class="btn btn-outline-danger btn-lg mr-2">
              <i class="fas fa-window-close" @click="goBack()"></i> CANCELAR
            </button>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_TERRENO } from "@/store/terrenos/terreno.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditTerreno",
  components: {
    HeaderPage
  },
  props: ["terrenoId"],
  data: () => {
    return {
      terreno: {}
    };
  },
  computed: {
    ...mapGetters("terreno", ["getTerrenosById", "getMessage"])
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    update() {
      this.$store.dispatch(`terreno/${EDIT_TERRENO}`, this.$data.terreno).then(
        () => {
          this.$alert(this.getMessage, "Terreno atualizado!", "success");
          // router.push({ name: "manageTerrenos" });
          this.goBack();
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.terreno = this.getTerrenosById(this.$route.params.terrenoId);
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>
