import { authService } from "@/api/auth.service.js";
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_INFO,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  SET_MESSAGE
} from "./auth.constants";

import { STORAGE_ACCESS_TOKEN, STORAGE_USER_PERFIL } from "../constants";

const state = {
  message: "",
  token:
    localStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    sessionStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    "",
  perfil: JSON.parse(
    localStorage.getItem(STORAGE_USER_PERFIL) ||
      sessionStorage.getItem(STORAGE_USER_PERFIL) ||
      "{}"
  )
};

// getters
const getters = {
  isUserLoggedIn: state => state.token != "",
  getPerfilName: state => state.perfil.name,
  getTipoUtilizador: state => state.perfil.type,
  getPerfil: state => state.perfil,
  getMessage: state => state.message
};

// actions - invcação
const actions = {
  [AUTH_LOGIN]: async ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      authService
        .login(payload)
        .then(res => {
          commit(AUTH_LOGIN_SUCCESS, {
            token: res.token,
            perfil: res.perfil
          });
          commit(SET_MESSAGE, `Bem-vindo, ${res.perfil.name}!`);
          resolve(res);
        })
        .catch(err => reject(err));
    });
  },
  // Register2 - Chama o interface do serviço
  [AUTH_REGISTER]: async ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      authService
        .register(payload)
        .then(res => {
          commit(
            SET_MESSAGE,
            `O utilizador ${res.body.name} foi adicionado com sucesso!`
          );
          resolve(res);
        })
        .catch(err => reject(err));
    });
  },

  [AUTH_INFO]: async ({ commit }) => {
    commit(SET_MESSAGE, await authService.getInfo());
  }
};

// mutations
export const mutations = {
  // Grava em state o token e o perfil do utilizador autenticado
  [AUTH_LOGIN_SUCCESS]: (state, data) => {
    state.token = data.token;
    localStorage.STORAGE_ACCESS_TOKEN = data.token;
    state.perfil = data.perfil;
    localStorage.STORAGE_USER_PERFIL = JSON.stringify(data.perfil);
  },

  [AUTH_LOGOUT_SUCCESS]: state => {
    state.token = "";
    state.perfil = {};
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_USER_PERFIL);
  },
  [AUTH_REGISTER_SUCCESS]: (state, data) => {
    state.register = data;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

//When you set property namespaced true in your modules,
//you are forcing that all actions, mutations and getters are called with module name in front of their name.
//For example “auth/getToken”, auth will be the module name and getToken will be the action.
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
