<template>
  <b-container fluid>
    <!-- Header -->
    <header class="masthead bg-secondary text-white text-center">
      <b-row>
        <b-col>
          <img class="masthead-avatar mb-2" src="@/assets/pot.png" />
          <p class="masthead-subheading font-weight-light">
            Parcerias de Ordenamento do Território
          </p>
        </b-col>
      </b-row>
    </header>

    <!-- Rules section -->
    <section class="page-section bg-primary" id="comoParticipar">
      <b-container fluid>
        <h4
          class="
            page-section-heading
            text-center text-uppercase text-secondary
            mb-5
          "
        >
          COMO PARTICIPAR
        </h4>
        <b-row class="mt-5 mb-5">
          <b-col cols="2"></b-col>
          <!-- Enter POT -->
          <b-col class="text-center">
            <b-button
              variant="outline-primary"
              class="p-2 mr-2"
              @click="enterPOT()"
            >
              <i class="fas fa-file-signature fa-5x" style="color: white"></i>
            </b-button>
            <p class="text-center">
              1 - <strong>REGISTE-SE</strong> na comunidade POT (Parcerias de
              Ordenamento do Território).
            </p>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <b-button
              variant="outline-primary"
              class="p-2 mr-2"
              @click="showTerrenos()"
            >
              <i class="fas fa-map-marked-alt fa-5x" style="color: white"></i>
            </b-button>
            <p class="text-center">
              2 - Selecione <strong>TERRENOS</strong> disponíveis.
            </p>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>
        <b-row class="mb-5">
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <!-- emendar -->
            <b-button
              variant="outline-primary"
              class="p-2 mr-2"
              @click="showContratos()"
            >
              <i class="fas fa-handshake fa-5x" style="color: white"></i>
            </b-button>
            <p>
              3 - Aceite as cláusulas do <strong>CONTRATO</strong> de parceria.
            </p>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <!-- showParcerias -->
            <b-button
              variant="outline-primary"
              class="p-2 mr-2"
              @click="showParcerias()"
            >
              <i class="fas fa-tractor fa-5x" style="color: white"></i>
            </b-button>
            <p>
              4 - Faça a gestão das suas <strong>PARCERIAS</strong> conforme
              contratado.
            </p>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Footer -->
    <footer class="footer text-center">
      <div class="container">
        <div class="row">
          <!-- Footer Location -->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">
              Programação web <br />
              avançada
            </h4>
            <p class="lead mb-0">
              <a href="mailto:1900415@estudante.uab.pt" target="_blank"
                >Estudante</a
              >
              <br /><a href="mailto:1900415@estudante.uab.pt" target="_blank"
                >Professor</a
              >
            </p>
          </div>

          <!-- Footer Social Icons -->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">
              APONTADORES <br />
              RELACIONADOS
            </h4>
            <a
              class="btn btn-outline-light btn-social mx-1"
              href="http://mapas.dgterritorio.pt/cadastro/cartacadastral/index.html"
            >
              <i class="fas fa-fw fa-map-marked-alt"></i>
            </a>
            <a
              class="btn btn-outline-light btn-social mx-1"
              href="https://www.portaldasfinancas.gov.pt/pt/menu.action?pai=657&segId=EP"
            >
              <i class="fas fa-fw fa-file-alt"></i>
            </a>
            <a
              class="btn btn-outline-light btn-social mx-1"
              href="https://dre.pt/web/guest/pesquisa/-/search/basic?q=contratos+de+arrendamento+rural"
            >
              <i class="fas fa-fw fa-info-circle"></i>
            </a>
          </div>

          <!-- Footer About Text -->
          <div class="col-lg-4">
            <h4 class="text-uppercase mb-4">
              Parcerias de Ordenamento do Território
            </h4>
            <p class="lead mb-0">
              POT é baseado na aplicação pedagógica ANIMALEC incluida no
              <a
                href="https://www.fca.pt/pt/catalogo/informatica/tecnologias-programacao-web/desenvolvimento-avancado-para-a-web/"
                target="_blank"
                >livro "DESENVOLVIMENTO AVANÇADO PARA A WEB" de Ricardo Queirós
                e Filipe Portela</a
              >
              e usa um tema de Bootstrap com licença MIT, gratuito e criado por
              <a href="http://startbootstrap.com" target="_blank"
                >StartBootstrap</a
              >.
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Copyright Section -->
    <section class="copyright py-4 text-center text-white">
      <div class="container">
        <small>Copyright &copy; POT 2021</small>
      </div>
    </section>

    <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes) -->
    <div class="scroll-to-top d-lg-none position-fixed">
      <a
        class="js-scroll-trigger d-block text-center text-white rounded"
        href="#page-top"
      >
        <i class="fa fa-chevron-up"></i>
      </a>
    </div>
  </b-container>
</template>

<script>
import { FETCH_TERRENOS } from "@/store/terrenos/terreno.constants";
import { FETCH_USERS } from "@/store/users/user.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["getMessage", "auth/isUserLoggedIn"])
  },
  methods: {
    showTerrenos() {
      if (this.isUserLoggedIn) {
        router.push({ name: "terrenos" });
      }
    },
    showContratos() {
      if (this.isUserLoggedIn) {
        router.push({ name: "contratos" });
      }
    },
    showParcerias() {
      if (this.isUserLoggedIn) {
        router.push({ name: "parcerias" });
      }
    },
    enterPOT() {
      if (!this.isUserLoggedIn) {
        router.push({ name: "login" });
      }
    },
    created() {
      if (this.isUserLoggedIn) {
        this.$store.dispatch(`terreno/${FETCH_TERRENOS}`);
        this.$store.dispatch(`user/${FETCH_USERS}`);
      }
    }
  }
};
</script>
