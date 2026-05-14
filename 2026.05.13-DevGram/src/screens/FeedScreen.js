import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import Botao from '../components/Botao';
import { buscarPosts, buscarUsuario, salvarPosts } from '../storage/devgramStorage';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const postsStorage = await buscarPosts();
        const usuarioStorage = await buscarUsuario();

        setPosts(postsStorage);
        setUsuario(usuarioStorage);
      }

      carregar();
    }, [])
  );

  async function curtirPost(id) {
    const novosPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }

      return post;
    });

    setPosts(novosPosts);
    await salvarPosts(novosPosts);
  }

  async function comentarPost(postId, textoComentario) {
    if (!usuario) {
      return;
    }

    const novosPosts = posts.map((post) => {
      if (post.id === postId) {
        const novoComentario = {
          id: Date.now(),
          usuario: usuario.nome,
          texto: textoComentario,
        };

        return {
          ...post,
          comentarios: [...post.comentarios, novoComentario],
        };
      }

      return post;
    });

    setPosts(novosPosts);
    await salvarPosts(novosPosts);
  }

  return (
    <View style={styles.container}>
      <Botao titulo="Criar Novo Post" onPress={() => navigation.navigate('NovoPost')} />

      {posts.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTitulo}>Nenhum post ainda.</Text>
          <Text style={styles.vazioTexto}>Seja o primeiro a postar no DevGram!</Text>
        </View>
      ) : (
        <FlatList
          data={[...posts].reverse()}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onCurtir={curtirPost}
              onComentar={comentarPost}
            />
          )}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#F3F4F6',
  },
  lista: {
    paddingBottom: 20,
  },
  vazio: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  vazioTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  vazioTexto: {
    marginTop: 8,
    color: '#6B7280',
  },
});
