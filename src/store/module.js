import emailService from "@/api/email.service";
import {
  // Actions
  SEND_EMAIL,
  // Mutations
  SET_MESSAGE
} from "./constants";

// Lista de estados para definição de avatars de acordo com a área tratada
const state = {
  message: "",
  userLevels: [
    { level: 1, name: "Extintor", avatar: "Level1", min: 0, max: 10000 },
    { level: 2, name: "Autotanque", avatar: "Level2", min: 10001, max: 20000 },
    { level: 3, name: "Hidrante", avatar: "Level3", min: 20001, max: 30000 },
    { level: 4, name: "Helicóptero", avatar: "Level4", min: 30001, max: 40000 },
    {
      level: 5,
      name: "Avião",
      avatar: "Level5",
      min: 40001,
      max: Number.MAX_SAFE_INTEGER
    }
  ]
};

const getters = {
  getUserLevelByArea: state => area => {
    // <!-- emendar -> somar as áreas de todos os contratos
    return state.userLevels.find(
      userLevel => area >= userLevel.min && area <= userLevel.max
    );
  }
};

const actions = {
  [SEND_EMAIL]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      emailService.sendEmail(rootState.auth.token, payload).then(
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
