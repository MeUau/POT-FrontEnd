<template>
  <section class="page-section">
    <b-container>
      <HeaderPage :title="user.name.toUpperCase()" />
      <b-card class="overflow-hidden mt-5" style="max-width: 1540px">
        <b-row>
          <b-col md="6" align="center">
            <b-card-img
              style="width: 200px"
              :src="
                require(`@/assets/avatars/${
                  this.getUserLevelByArea(user.level.area).avatar
                }.png`)
              "
              class="rounded-0 mb-2"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="PERFIL" align="center">
              <b-card-text align="left">
                <strong>Username:</strong> {{ user.auth.username }}
                <br />
                <strong>Data de registo:</strong>
                {{ formatDate(user.registration_date) }}
                <br />
                <strong>Tipo de utilizador: </strong>
                {{ user.type === "user" ? "Parceiro" : "Administrador" }}
                <br />
                <br />
                <h5>Dados pessoais</h5>
                <br />
                <strong>Name: </strong>{{ user.name }}
                <br />
                <strong>Distrito:</strong> {{ user.location.distrito }} |
                <strong>Concelho:</strong> {{ user.location.concelho }} |
                <strong>Freguesia:</strong> {{ user.location.freguesia }}
                <br />
                <strong>Descrição:</strong> {{ user.descricao }}
                <br />
                <br />
                <h5>Hall of Fame</h5>
                <br />
                <strong>Nível atual:</strong>
                {{ this.getUserLevelByArea(user.level.area).level }}º ({{
                  this.getUserLevelByArea(user.level.area).name
                }})
                <br />
                <strong>Área:</strong> {{ user.level.area }}
              </b-card-text>
              <br />
              <b-button
                variant="outline-success"
                class="mr-2 mt-2"
                @click="editPerfilData()"
              >
                <i class="fas fa-user-edit"></i> EDITAR PERFIL
              </b-button>
              <b-button
                variant="outline-warning"
                class="mr-2 mt-2"
                @click="showParcerias()"
              >
                <i class="fas fa-hands-helping"></i> VER PARCERIAS
              </b-button>
              <b-button
                variant="outline-danger"
                class="mr-2 mt-2"
                @click="logout()"
              >
                <i class="fas fa-sign-out-alt"></i> LOGOUT
              </b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </section>
</template>

<script>
import { AUTH_LOGOUT_SUCCESS } from "@/store/auth/auth.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
import router from "@/router";
export default {
  components: {
    HeaderPage
  },
  data: function() {
    return {
      avatar: {}
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByArea"]),
    ...mapGetters({ user: "auth/getPerfil" })
  },
  methods: {
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
    },
    formatDate(paramDate) {
      const date = new Date(paramDate);
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getUTCDate()
      );
    },
    showParcerias() {
      router.push({ name: "parcerias" });
    },
    editPerfilData() {
      router.push({ name: "editPerfil" });
    }
  }
};
</script>
