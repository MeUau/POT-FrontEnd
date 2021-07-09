import POT_API_URL from "./config.js";

export const contratoService = {
  async getContratos(token) {
    const response = await fetch(`${POT_API_URL}/contratos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async addContrato(token, payload) {
    const response = await fetch(`${POT_API_URL}/contratos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async editContrato(token, payload) {
    const response = await fetch(`${POT_API_URL}/contratos/${payload._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async removeContrato(token, id) {
    const response = await fetch(`${POT_API_URL}/contratos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  }
};

function handleResponses(code) {
  let message = "";
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!";
      break;
    case 409:
      message = "Já existe um utilizador com este username!";
      break;
    default:
      message = "Mensagem desconhecida";
      break;
  }
  return message;
}

export default contratoService;
