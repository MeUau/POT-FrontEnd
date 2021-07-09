// Final
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Login" />

      <!--FORM-->
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <form @submit.prevent="login">
            <!-- username -->
            <div class="form-group">
              <input
                type="text"
                v-model="username"
                class="form-control form-control-lg"
                id="exampleInputEmail1"
                placeholder="username"
              />
            </div>
            <!-- password -->
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                class="form-control form-control-lg"
                id="exampleInputPassword1"
                placeholder="password"
              />
            </div>
            <button type="submit" class="btn btn-success mr-2">
              <i class="fas fa-sign-in-alt"></i> ENTRAR
            </button>
            <!-- registar -->
            <router-link
              :to="{ name: 'register' }"
              tag="button"
              class="btn btn-danger"
            >
              <i class="fas fa-file-signature"></i> REGISTAR
            </router-link>
            <!-- goBack -->
            <b-button class="btn btn-info ml-2" @click="goBack()">
              <i class="fas fa-arrow-circle-left"></i> VOLTAR
            </b-button>
          </form>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { MODULE_BASE, AUTH_LOGIN } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {
    HeaderPage
  },
  // objeto data vinculado as caixas de texto
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["getMessage"]),
    ...mapGetters(["getMessage", "auth/isUserLoggedIn"])
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    // após a submissão é chamado este método
    login() {
      this.$store
        // ação invocada pelo método dispatch referenciada pelo caminho absoluto e
        // passado um payload com o objeto data
        // Esta ação é assincrona mas o store.dispatch manipula as
        // promises desenvolvidas pelas ações
        .dispatch(`${MODULE_BASE}/${AUTH_LOGIN}`, this.$data)
        // o objeto promisse é manipulado pelo metodo then() invocador
        .then(() => {
          this.$alert(this.getMessage, "Login", "success");
          router.push({ name: "home" });
        })
        .catch(err => {
          this.$alert(`${err.message}`, "Erro", "error");
        });
    }
  }
};
</script>
