<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Registo" />

      <!--FORM-->
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <form @submit.prevent="register">
            <!-- Nome -->
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Nome"
              />
            </div>
            <!-- Descrição -->
            <div class="form-group">
              <input
                v-model="descricao"
                type="text"
                class="form-control form-control-lg"
                id="txtDescricao"
                placeholder="Descrição"
              />
            </div>
            <!-- Distrito -->
            <div class="form-group">
              <input
                v-model="location.distrito"
                type="text"
                class="form-control form-control-lg"
                id="txtDistrito"
                placeholder="Distrito"
              />
            </div>
            <!-- Concelho -->
            <div class="form-group">
              <input
                v-model="location.concelho"
                type="text"
                class="form-control form-control-lg"
                id="txtConcelho"
                placeholder="Concelho"
              />
            </div>
            <!-- Freguesia -->
            <div class="form-group">
              <input
                v-model="location.freguesia"
                type="text"
                class="form-control form-control-lg"
                id="txtFreguesia"
                placeholder="Freguesia"
              />
            </div>
            <!-- username -->
            <div class="form-group">
              <input
                v-model="auth.username"
                type="text"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="username"
              />
            </div>
            <!-- password -->
            <div class="form-group">
              <input
                v-model="auth.password"
                type="password"
                class="form-control form-control-lg"
                id="txtPassword"
                placeholder="password"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                id="txtConfirmPassword"
                placeholder="confirme a sua password"
              />
            </div>
            <button type="submit" class="btn btn-success mr-2">
              <i class="fas fa-file-signature"></i> REGISTAR
            </button>
            <router-link
              :to="{ name: 'login' }"
              tag="button"
              class="btn btn-danger"
            >
              <i class="fas fa-window-close"></i> CANCELAR</router-link
            >
          </form>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { AUTH_REGISTER } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "Register",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      level: { area: 0 },
      active: true,
      name: "",
      type: "user",
      descricao: "",
      location: { freguesia: "", concelho: "", distrito: "" },
      auth: { username: "", password: "" }
    };
  },
  computed: {
    ...mapGetters("auth", ["getMessage"])
  },
  methods: {
    register() {
      if (
        document.querySelector("#txtPassword").value !==
        document.querySelector("#txtConfirmPassword").value
      ) {
        this.$alert(
          "Campos password não coincidem",
          "Erro de validação do formulário",
          "error"
        );
      } else {
        this.$store
          // Register1 - invoca a ação
          .dispatch(`auth/${AUTH_REGISTER}`, this.$data)
          .then(() => {
            this.$alert(this.getMessage, "Registo", "success");
            router.push({ name: "home" });
          })
          .catch(err => {
            this.$alert(err.message, "Erro", "error");
          });
      }
    }
  }
};
</script>
