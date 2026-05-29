import axios from "axios";

const api = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 10000,
});

export async function buscarCEP(cep) {
  try {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      throw new Error("CEP inválido");
    }

    const response = await api.get(`/${cepLimpo}/json`);

    if (response.data.erro) {
      throw new Error("CEP não encontrado");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}