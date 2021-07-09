import Vue from "vue";
import Vuex from "vuex";

import moduleBase from "./module";
import moduleAuth from "./auth/auth.module";
import moduleUser from "./users/user.module";
import moduleTerreno from "./terrenos/terreno.module";
import moduleContrato from "./contratos/contrato.module";
import moduleClausula from "./clausulas/clausula.module";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: moduleBase.getters,
  mutations: moduleBase.mutations,
  state: moduleBase.state,
  actions: moduleBase.actions,
  modules: {
    auth: moduleAuth,
    terreno: moduleTerreno,
    user: moduleUser,
    contrato: moduleContrato,
    clausula: moduleClausula
  }
});
