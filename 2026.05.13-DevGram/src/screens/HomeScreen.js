import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Botao from '../components/Botao';
import { buscarUsuario, limparTudo } from '../storage/devgramStorage';

export default function HomeScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarUsuario();
      setUsuario(dados);
    }

    carregar();
  }, []);

  async function sair() {
    await limparTudo();
    Alert.alert('Pronto', 'Dados apagados do aparelho.');
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao DevGram 👋</Text>

      {usuario && (
        <View style={styles.card}>
          <Text style={styles.nome}>{usuario.nome}</Text>
          <Text style={styles.info}>Turma: {usuario.turma}</Text>
          <Text style={styles.bio}>{usuario.bio}</Text>
        </View>
      )}

      <Botao titulo="Ver Feed" onPress={() => navigation.navigate('Feed')} />
      <Botao titulo="Criar Novo Post" onPress={() => navigation.navigate('NovoPost')} />
      <Botao titulo="Meu Perfil" onPress={() => navigation.navigate('Perfil')} />
      <Botao titulo="Sair e Limpar Dados" variante="perigo" onPress={sair} />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 6,
  },
  bio: {
    marginTop: 10,
    color: '#111827',
  },
});
