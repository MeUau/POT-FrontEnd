import clausulaService from "@/api/clausula.service";
import {
  // Actions
  FETCH_CLAUSULAS,
  ADD_clausula,
  EDIT_clausula,
  REMOVE_clausula,
  // Mutations
  SET_CLAUSULAS,
  SET_MESSAGE
} from "./clausula.constants";

const state = {
  clausulas: [],
  message: ""
};

const getters = {
  getClausulas: state => state.clausulas,
  getclausulaById: state => id => {
    return state.clausulas.find(clausula => clausula._id === id);
  },
  getMessage: state => state.message
};

const actions = {
  [FETCH_CLAUSULAS]: async ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      clausulaService.getClausulas(rootState.auth.token).then(
        res => {
          commit(SET_CLAUSULAS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_clausula]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      clausulaService.addClausulas(rootState.auth.token, payload).then(
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
  //CRITICO
  [EDIT_clausula]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      clausulaService.editClausulas(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `A cláusula ${res.body.clausula} foi atualizada com sucesso!`
          );
          resolve(res);
        },
        err => reject(err)
      );
    });
  },

  // [EDIT_clausula]: ({ rootState }, payload) => {
  //   return new Promise((resolve, reject) => {
  //     clausulaService.editClausulas(rootState.auth.token, 
  //       payload).then(.then(res => resolve(res), err => reject(err));
  //   });
  // },
  [REMOVE_clausula]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      clausulaService.removeClausulas(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, "sucesso!");
          resolve(res);
        },
        err => reject(err)
      );
    });
  }
};

export const mutations = {
  [SET_CLAUSULAS]: (state, clausulas) => {
    state.clausulas = clausulas;
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
