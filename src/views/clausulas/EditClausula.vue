<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar clausula" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="clausula.clausula"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="cláusula"
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control"
                placeholder="descrição"
                cols="30"
                rows="10"
                v-model="clausula.descricao"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-success mr-2">
              <i class="fas fa-save"></i> ATUALIZAR
            </button>
            <router-link
              :to="{ name: 'listClausulas' }"
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
import { EDIT_clausula } from "@/store/clausulas/clausula.constants";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "EditClausula",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      clausula: {}
    };
  },
  computed: {
    ...mapGetters("clausula", ["getclausulaById", "getMessage"])
  },
  methods: {  
    update() {
      this.$store
        .dispatch(`clausula/${EDIT_clausula}`, this.$data.clausula)
        .then(
          () => {
            this.$alert(this.getMessage, "clausula atualizada!", "success");
            router.push({ name: "listClausulas" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.clausula = this.getclausulaById(this.$route.params.clausulaId);
  }
};
</script>
