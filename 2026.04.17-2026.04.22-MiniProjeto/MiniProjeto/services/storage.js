
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "listaCompras";

export async function salvarLista(lista) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(lista));
  } catch (e) {
    console.log("Erro ao salvar");
  }
}

export async function carregarLista() {
  try {
    const dados = await AsyncStorage.getItem(KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    console.log("Erro ao carregar");
    return [];
  }
}

