// Final
<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-5">
        <router-link
          :to="{ name: 'home' }"
          tag="img"
          :src="require('@/assets/pot_line.png')"
          style="width: 250px; height: 50px"
          title="Página principal do Pot"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-5">
          <!-- Menu -->
          <div v-if="isUserLoggedIn"><b-nav-item :to="{ name: 'terrenos' }" >TERRENOS</b-nav-item></div>
          <div v-if="isUserLoggedIn"><b-nav-item :to="{ name: 'contratos' }" >CONTRATOS</b-nav-item></div>
          <div v-if="isUserLoggedIn"><b-nav-item :to="{ name: 'parcerias' }"  >PARCERIAS</b-nav-item></div>
          <!-- IN and OUT -->
          <div v-if="!isUserLoggedIn"><b-nav-item :to="{ name: 'login' }">LOGIN</b-nav-item></div>
          <div v-if="isUserLoggedIn"><b-nav-item :to="{ name: 'logout' }">LOGOUT</b-nav-item></div>
          <!-- Avatar -->
          <div v-if="isUserLoggedIn && getTipoUtilizador === 'user'">
            <b-nav-item :to="{ name: 'perfil' }" :disabled="!isUserLoggedIn">
              <img
                class="avatar"
                :src="
                  require(`@/assets/avatars/L${
                    this.getUserLevelByArea(this.getPerfil.level.area).level
                  }.png`)
                "
                :title="getPerfilName"
              />
            </b-nav-item>
          </div>
          <div v-if="isUserLoggedIn && getTipoUtilizador === 'admin'"><b-nav-item :to="{ name: 'admin' }" >ADMIN</b-nav-item></div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserLevelByArea"]),
    ...mapGetters("auth", [
      "isUserLoggedIn",
      "getPerfilName",
      "getTipoUtilizador",
      "getPerfil"
    ])
  }
};
</script>
