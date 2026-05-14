import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import Botao from "../components/Botao";
import {
  buscarPosts,
  buscarUsuarioLogado,
  salvarPosts,
} from "../storage/devgramStorage";

export default function NovoPostScreen({ navigation }) {
  const [texto, setTexto] = useState("");
  const POST_MAXSIZE = 300;

  async function publicar() {
    try {
      if (!texto.trim()) {
        Alert.alert("Atenção", "Digite algo para publicar.");
        return;
      }

      const usuario = await buscarUsuarioLogado();

      if (!usuario) {
        Alert.alert("Erro", "Usuário não encontrado.");
        navigation.replace("Welcome");
        return;
      }

      const postsAtuais = await buscarPosts();

      const novoPost = {
        id: Date.now(),
        usuario: usuario.nome,
        texto: texto.trim(),
        likes: 0,
        comentarios: [],
        criadoEm: new Date().toISOString(),
      };

      const novosPosts = [...postsAtuais, novoPost];

      await salvarPosts(novosPosts);

      Keyboard.dismiss();
      Alert.alert("Post publicado!");
      setTexto("");
      navigation.navigate("Feed");
    } catch (erro) {
      console.error(erro);
      Alert.alert("Ops..", "Não foi possivel publicar D;");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>O que você está pensando?</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Digite seu post..."
        value={texto}
        onChangeText={setTexto}
        multiline
        maxLength={POST_MAXSIZE}
      />

      <Text style={styles.textContador}>
        {texto.length}/{POST_MAXSIZE}
      </Text>

      <Botao titulo="Publicar" onPress={publicar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#F3F4F6",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#111827",
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    height: 160,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 14,
  },
  textContador: {
    textAlign: "right",
    marginBottom: 14,
    fontWeight: "bold",
  },
});
