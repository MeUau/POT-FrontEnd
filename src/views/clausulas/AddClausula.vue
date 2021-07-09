<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar clausula" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="clausula"
                type="text"
                class="form-control"
                id="txtName"
                placeholder="Clausula"
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control"
                placeholder="Descrição"
                cols="30"
                rows="10"
                v-model="descricao"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-success mr-2">
              <i class="fas fa-save"></i> GRAVAR CLÁUSULA
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
import { ADD_clausula } from "@/store/clausulas/clausula.constants";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "AddClausula",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      clausula: "",
      descricao: "",
      active: true
    };
  },
  computed: {
    ...mapGetters("clausula", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`clausula/${ADD_clausula}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "clausula adicionada!", "success");
          router.push({ name: "listClausulas" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
