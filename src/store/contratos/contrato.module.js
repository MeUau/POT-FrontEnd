import contratoService from "@/api/contrato.service";
import {
  // Actions
  FETCH_CONTRATOS,
  ADD_CONTRATO,
  EDIT_CONTRATO,
  REMOVE_CONTRATO,
  // Mutations
  SET_CONTRATOS,
  SET_MESSAGE
} from "./contrato.constants";

const state = {
  contratos: [],
  message: ""
};

const getters = {
  getContratos: state => state.contratos,
  getContratoById: state => id => {
    return state.contratos.find(contrato => contrato._id === id);
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_CONTRATOS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      contratoService.getContratos(rootState.auth.token).then(
        res => {
          commit(SET_CONTRATOS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_CONTRATO]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      contratoService.addContrato(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "sucesso!");
          resolve(res.body);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [EDIT_CONTRATO]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      contratoService.editContrato(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "sucesso!");
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [REMOVE_CONTRATO]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      contratoService.removeContrato(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, "sucesso!");
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  }
};

export const mutations = {
  [SET_CONTRATOS]: (state, contratos) => {
    state.contratos = contratos;
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
