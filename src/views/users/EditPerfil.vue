<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar perfil" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="user.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreva o name"
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="descrição"
                cols="30"
                rows="10"
                v-model="user.descricao"
              ></textarea>
            </div>
            <div class="form-group">
              <input
                v-model="user.location.distrito"
                type="text"
                class="form-control form-control-lg"
                id="txtDistrito"
                placeholder="Distrito"
              />
            </div>
            <div class="form-group">
              <input
                v-model="user.location.freguesia"
                type="text"
                class="form-control form-control-lg"
                id="txtFreguesia"
                placeholder="Freguesia"
              />
            </div>
            <div class="form-group">
              <input
                v-model="user.location.concelho"
                type="text"
                class="form-control form-control-lg"
                id="txtConcelho"
                placeholder="Concelho"
              />
            </div>

            <div class="form-group">
              <input
                v-model="user.auth.password"
                type="password"
                class="form-control form-control-lg"
                id="txtPassword"
                placeholder="password"
              />
            </div>
            <div class="form-group">
              <input
                v-model="user.auth.password"
                type="password"
                class="form-control form-control-lg"
                id="txtConfirmPassword"
                placeholder="confirme password"
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{ name: 'perfil' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
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
import { EDIT_USER } from "@/store/users/user.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditPerfil",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      user: {}
    };
  },
  computed: {
    ...mapGetters("auth", ["getPerfil"])
  },
  methods: {
    update() {
      this.$store.dispatch(`user/${EDIT_USER}`, this.$data.user).then(
        () => {
          this.$alert(this.getMessage, "Perfil atualizado!", "success");
          router.push({ name: "perfil" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.user = this.getPerfil;
  }
};
</script>
