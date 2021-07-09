<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Logout" />
      <!-- logout -->
      <b-button variant="outline-danger" class="mr-2 mt-2" @click="logout()">
        <i class="fas fa-sign-out-alt"></i> LOGOUT
      </b-button> 
      <!-- goBack -->
      <b-button class="btn btn-info ml-2" @click="goBack()">
        <i class="fas fa-arrow-circle-left"></i> VOLTAR
      </b-button>
    </b-container>
  </section>
</template>

<script>
import { AUTH_LOGOUT_SUCCESS } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";
export default {
  name: "Logout",
  components: {
    HeaderPage
  },
  computed: {
    ...mapGetters("auth", ["getMessage"])
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    // após a submissão é chamado este método
    logout() {
      this.$confirm(
        "Se sim, clique em OK",
        "Quer mesmo sair do POT?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.commit(`auth/${AUTH_LOGOUT_SUCCESS}`);
          router.push({ name: "home" });
        },
        () => {
          this.$alert("Está de volta!", "Informação", "info");
        }
      );
    }
  }
};
</script>
