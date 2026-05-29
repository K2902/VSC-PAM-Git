import axios from "axios";

const api = axios.create({
  baseURL: "https://open.er-api.com/v6",
  timeout: 10000,
});

export async function converterMoedas(valor) {
  try {
    const response = await api.get("/latest/BRL");

    return {
      usd: valor * response.data.rates.USD,
      eur: valor * response.data.rates.EUR,
      gbp: valor * response.data.rates.GBP,
    };
  } catch (error) {
    throw new Error("Erro ao consultar cotação");
  }
}