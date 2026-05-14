import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Botao from '../components/Botao';
import { buscarUsuario, salvarUsuario } from '../storage/devgramStorage';

export default function LoginScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    async function verificarUsuario() {
      const usuario = await buscarUsuario();

      if (usuario) {
        navigation.replace('Home');
      }
    }

    verificarUsuario();
  }, []);

  async function entrar() {
    if (!nome.trim() || !turma.trim()) {
      Alert.alert('Atenção', 'Preencha pelo menos nome e turma.');
      return;
    }

    const usuario = {
      nome,
      turma,
      bio: bio || 'Estudante de React Native',
    };

    await salvarUsuario(usuario);
    navigation.replace('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DevGram</Text>
      <Text style={styles.subtitulo}>A rede social da sala</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Turma"
        value={turma}
        onChangeText={setTurma}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Botao titulo="Entrar no DevGram" onPress={entrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#7C3AED',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
});
