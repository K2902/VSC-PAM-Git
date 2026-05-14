import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Botao from '../components/Botao';
import { buscarPosts, buscarUsuario, salvarPosts } from '../storage/devgramStorage';

export default function NovoPostScreen({ navigation }) {
  const [texto, setTexto] = useState('');

  async function publicar() {
    if (!texto.trim()) {
      Alert.alert('Atenção', 'Digite algo para publicar.');
      return;
    }

    const usuario = await buscarUsuario();

    if (!usuario) {
      Alert.alert('Erro', 'Usuário não encontrado.');
      navigation.replace('Login');
      return;
    }

    const postsAtuais = await buscarPosts();

    const novoPost = {
      id: Date.now(),
      usuario: usuario.nome,
      texto,
      likes: 0,
      comentarios: [],
      criadoEm: new Date().toISOString(),
    };

    const novosPosts = [...postsAtuais, novoPost];

    await salvarPosts(novosPosts);

    Alert.alert('Sucesso', 'Post publicado!');
    setTexto('');
    navigation.navigate('Feed');
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
      />

      <Botao titulo="Publicar" onPress={publicar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#F3F4F6',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#111827',
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    height: 160,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 14,
  },
});
