import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Botao from '../components/Botao';
import { buscarUsuarioLogado, logout } from '../storage/devgramStorage';

export default function HomeScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarUsuarioLogado();
      setUsuario(dados);
    }
    carregar();
  }, []);

  async function sair() {
    Alert.alert(
      'Sair',
      'Deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Welcome');
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo ao DevGram 👋</Text>

      {usuario && (
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>
              {usuario.nome.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.nome}>{usuario.nome}</Text>
          <Text style={styles.info}>Turma: {usuario.turma}</Text>
          {usuario.bio ? <Text style={styles.bio}>{usuario.bio}</Text> : null}
        </View>
      )}

      <Botao titulo="📰  Ver Feed" onPress={() => navigation.navigate('Feed')} />
      <Botao titulo="✏️  Criar Novo Post" onPress={() => navigation.navigate('NovoPost')} />
      <Botao titulo="👤  Meu Perfil" onPress={() => navigation.navigate('Perfil')} />
      <Botao titulo="Sair da conta" variante="perigo" onPress={sair} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#F3F4F6',
    gap: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarLetra: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  info: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  bio: {
    marginTop: 10,
    color: '#4B5563',
    fontSize: 14,
    textAlign: 'center',
  },
});
