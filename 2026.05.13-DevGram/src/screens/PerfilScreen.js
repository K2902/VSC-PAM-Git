import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { buscarPosts, buscarUsuario } from '../storage/devgramStorage';

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const usuarioStorage = await buscarUsuario();
        const postsStorage = await buscarPosts();

        setUsuario(usuarioStorage);
        setPosts(postsStorage);
      }

      carregar();
    }, [])
  );

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado.</Text>
      </View>
    );
  }

  const meusPosts = posts.filter((post) => post.usuario === usuario.nome);

  const totalCurtidas = meusPosts.reduce((total, post) => {
    return total + post.likes;
  }, 0);

  const totalComentariosRecebidos = meusPosts.reduce((total, post) => {
    return total + post.comentarios.length;
  }, 0);

  const postMaisCurtido = meusPosts.length > 0
    ? [...meusPosts].sort((a, b) => b.likes - a.likes)[0]
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.cardPerfil}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>{usuario.nome[0]?.toUpperCase()}</Text>
        </View>

        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.turma}>{usuario.turma}</Text>
        <Text style={styles.bio}>{usuario.bio}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.cardInfo}>
          <Text style={styles.numero}>{meusPosts.length}</Text>
          <Text style={styles.label}>Posts</Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.numero}>{totalCurtidas}</Text>
          <Text style={styles.label}>Curtidas</Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.numero}>{totalComentariosRecebidos}</Text>
          <Text style={styles.label}>Comentários</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Post mais curtido</Text>

        {postMaisCurtido ? (
          <>
            <Text style={styles.postTexto}>{postMaisCurtido.texto}</Text>
            <Text style={styles.likes}>❤️ {postMaisCurtido.likes} curtidas</Text>
          </>
        ) : (
          <Text style={styles.vazio}>Você ainda não publicou nenhum post.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#F3F4F6',
  },
  cardPerfil: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarTexto: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  turma: {
    color: '#7C3AED',
    marginTop: 4,
    fontWeight: 'bold',
  },
  bio: {
    marginTop: 10,
    textAlign: 'center',
    color: '#4B5563',
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  cardInfo: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    elevation: 1,
  },
  numero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  label: {
    color: '#4B5563',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    elevation: 2,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
  },
  postTexto: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 10,
  },
  likes: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  vazio: {
    color: '#6B7280',
  },
});
