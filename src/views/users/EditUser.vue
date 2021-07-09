<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Utilizador" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <!-- "user.name" -->
            <div class="form-group">
              <input
                v-model="user.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="name"
              />
            </div>
            <!-- "user.type" -->
            <div class="form-group">
              <select
                id="sltType"
                class="form-control form-control-lg"
                v-model="user.type"
              >
                <option value>-- Selecione o type de utilizador --</option>
                <option value="admin">Administrador</option>
                <option value="user">Parceiro</option>
                <option value="user">Proprietário</option>
              </select>
            </div>
            <!-- "user.descricao" -->
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="Descrição"
                cols="30"
                rows="10"
                v-model="user.descricao"
              ></textarea>
            </div>
            <!-- "user.location.distrito" -->
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
                v-model="user.location.concelho"
                type="text"
                class="form-control form-control-lg"
                id="txtConcelho"
                placeholder="Concelho"
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
                v-model="user.auth.username"
                type="text"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="username"
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
              :to="{ name: 'listUsers' }"
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
  name: "EditUser",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      user: {}
    };
  },
  computed: {
    ...mapGetters("user", ["getUsersById", "getMessage"])
  },
  methods: {
    update() {
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
        this.$store.dispatch(`user/${EDIT_USER}`, this.$data.user).then(
          () => {
            this.$alert(this.getMessage, "Utilizador atualizado!", "success");
            router.push({ name: "listUsers" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
      }
    },
    created() {
      this.user = this.getUsersById(this.$route.params.userId);
    }
  }
};
</script>
