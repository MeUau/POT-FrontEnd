<template>
  <section class="page-section">
    <b-container>
      <HeaderPage :title="terreno.name" />
      <b-row>
        <b-col>
          <b-card class="overflow-hidden" style="max-width: 1540px">
            <b-row>
              <b-col md="6" align="center">
                <b-card-img
                  :src="terreno.urlPhoto"
                  class="rounded-0 mb-2"
                ></b-card-img>
                <br />
              </b-col>
              <b-col md="6">
                <b-card-body
                  :title="terreno.name + ' (' + terreno.cultura + ')'"
                >
                  <b-card-text align="left">
                    <!-- Area -->
                    <i class="fas fa-tractor fa-lg ml-2"></i>
                    {{ terreno.area }}
                  </b-card-text>
                  <b-card-text>
                    <b>Descrição:</b>
                    {{ terreno.descricao }}
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";
export default {
  name: "Terreno",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      terreno: ""
    };
  },
  computed: {
    ...mapGetters("terreno", ["getTerrenosById", "getMessage"]),
    ...mapGetters("auth", ["getPerfil"]),
    ...mapGetters("user", ["getUsersById", "getNameById"]),
    ...mapGetters(["getUserLevelByArea"])
  },
  created() {
    this.terreno = this.getTerrenosById(this.$route.params.terrenoId);
  }
};
</script>
