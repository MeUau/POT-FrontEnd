<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Utilizador" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <!-- "name" -->
            <div class="form-group">
              <input
                v-model="user.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="name"
              />
            </div>
            <!-- "type" -->
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
            <!-- "descricao" -->
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
            <!-- "location.distrito" -->
            <div class="form-group">
              <input
                v-model="user.location.distrito"
                type="text"
                class="form-control form-control-lg"
                id="txtdistrito"
                placeholder="Distrito"
              />
            </div>
            <!-- "location.concelho" -->
            <div class="form-group">
              <input
                v-model="user.location.concelho"
                type="text"
                class="form-control form-control-lg"
                id="txtConcelho"
                placeholder="Concelho"
              />
            </div>
            <!-- "location.freguesia" -->
            <div class="form-group">
              <input
                v-model="user.location.freguesia"
                type="text"
                class="form-control form-control-lg"
                id="txtFreguesia"
                placeholder="Freguesia"
              />
            </div>
            <!-- "auth.username" -->
            <div class="form-group">
              <input
                v-model="user.auth.username"
                type="text"
                value="1900415@estudante.uab.pt"
                class="form-control form-control-lg"
                id="txtEmail"
                placeholder="username"
              />
            </div>
            <!-- "auth.password" -->
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
                placeholder="confirme a password"
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
              :to="{ name: 'listUsers' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_USER } from "@/store/users/user.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddUser",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      auth: { username: "", password: "" },
      location: { freguesia: "", distrito: "", concelho: "" },
      level: { area: 0 },
      active: true,
      type: "",
      descricao: ""
    };
  },
  computed: {
    ...mapGetters("user", ["getMessage"])
  },
  methods: {
    add() {
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
        this.$store.dispatch(`user/${ADD_USER}`, this.$data).then(
          () => {
            this.$alert(this.getMessage, "Utilizador adicionado!", "success");
            router.push({ name: "listUsers" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
      }
    }
  }
};
</script>
