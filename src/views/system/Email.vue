<template>
  <div class="container">
    <HeaderPage title="Contactar proprietário" />
    <!--FORM-->
    <form @submit.prevent="send">
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <div class="form-group">
            <input
              v-model="name"
              value=""
              type="text"
              class="form-control form-control-lg"
              id="txtName"
              placeholder="escreve o teu nome"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="email"
              value=""
              type="email"
              class="form-control form-control-lg"
              id="txtName"
              placeholder="escreva o seu e-mail"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="subject"
              type="text"
              class="form-control form-control-lg"
              id="txtName"
              placeholder="escreva o assunto"
              required
            />
          </div>
          <div class="form-group">
            <textarea
              id="txtDescription"
              class="form-control form-control-lg"
              placeholder="Escreva a sua mensagem"
              cols="30"
              rows="10"
              v-model="message"
              value=""
            ></textarea>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <b-button type="submit" variant="success" class="p-2 mr-2">
            <i class="fas fa-envelope-square mr-2"></i>ENVIAR
          </b-button>
          <b-button type="reset" variant="danger" class="p-2 mr-2">
            <i class="fas fa-eraser mr-2"></i>LIMPAR
          </b-button>
          <b-button class="btn btn-info mr-2 p-2" @click="goBack()">
            <i class="fas fa-arrow-circle-left mr-2 "></i> VOLTAR
          </b-button>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
import { SEND_EMAIL } from "@/store/constants";
import { mapGetters } from "vuex";
import router from "@/router";
import HeaderPage from "@/components/HeaderPage.vue";
// CRITICO
export default {
  name: "contacto",
  props: ["title", "nome", "fromEmail"],
  data: function() {
    return {
      name: "",
      email: "1900415@estudante.uab.pt",
      subject: "contacto",
      message: "mensagem de teste!"
    };
  },
  components: {
    HeaderPage
  },
  computed: {
    ...mapGetters(["getMessage", "auth/isUserLoggedIn"])
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    send() {
      this.$store
        .dispatch(`${SEND_EMAIL}`, this.$data)
        .then(
          () => this.$alert(this.getMessage, "E-mail enviado!", "success"),
          err => this.$alert(`${err.message}`, "Erro", "error")
        );
    }
  }
};
</script>
