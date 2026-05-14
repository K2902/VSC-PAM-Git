import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storageKeys';

export async function salvarUsuario(usuario) {
  await AsyncStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(usuario));
}

export async function buscarUsuario() {
  const dados = await AsyncStorage.getItem(STORAGE_KEYS.USUARIO);
  return dados ? JSON.parse(dados) : null;
}

export async function salvarPosts(posts) {
  await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
}

export async function buscarPosts() {
  const dados = await AsyncStorage.getItem(STORAGE_KEYS.POSTS);
  return dados ? JSON.parse(dados) : [];
}

export async function limparTudo() {
  await AsyncStorage.removeItem(STORAGE_KEYS.USUARIO);
  await AsyncStorage.removeItem(STORAGE_KEYS.POSTS);
}
