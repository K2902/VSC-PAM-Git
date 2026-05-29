import axios from "axios";

const API_KEY = "SUA_CHAVE_OPENWEATHER";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});

export async function buscarClima(cidade) {
  try {
    const response = await api.get("/weather", {
      params: {
        q: cidade,
        appid: API_KEY,
        units: "metric",
        lang: "pt_br",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Cidade não encontrada");
  }
}