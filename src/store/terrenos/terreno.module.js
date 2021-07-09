import terrenoService from "@/api/terreno.service";
import {
  // Actions
  FETCH_TERRENOS,
  ADD_TERRENO,
  EDIT_TERRENO,
  REMOVE_TERRENO,
  // Mutations
  SET_TERRENOS,
  SET_MESSAGE
} from "./terreno.constants";

const state = {
  terrenos: []
};

const getters = {
  getTerrenos: state => state.terrenos,
  getTerrenosById: state => id =>
    state.terrenos.find(terreno => terreno._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_TERRENOS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      terrenoService.getTerrenos(rootState.auth.token).then(
        res => {
          commit(SET_TERRENOS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_TERRENO]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      terrenoService.addTerreno(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O terreno ${res.body.name} foi adicionado com sucesso!`
          );
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [EDIT_TERRENO]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      terrenoService.editTerreno(rootState.auth.token, payload).then(
        res => {
          commit(
            SET_MESSAGE,
            `O terreno ${res.body.name} foi atualizado com sucesso!`
          );
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_TERRENO]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      terrenoService.removeTerreno(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `O terreno foi removido com sucesso!`);
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
  [SET_TERRENOS]: (state, terrenos) => {
    state.terrenos = terrenos;
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
