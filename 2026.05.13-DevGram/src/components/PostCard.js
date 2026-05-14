import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Botao from './Botao';
import ComentarioBox from './ComentarioBox';

export default function PostCard({ post, onCurtir, onComentar }) {
  const [comentario, setComentario] = useState('');

  function enviarComentario() {
    if (!comentario.trim()) {
      return;
    }

    onComentar(post.id, comentario);
    setComentario('');
  }

  return (
    <View style={styles.card}>
      <Text style={styles.usuario}>@{post.usuario}</Text>
      <Text style={styles.texto}>{post.texto}</Text>

      <Text style={styles.data}>
        Criado em: {new Date(post.criadoEm).toLocaleString('pt-BR')}
      </Text>

      <Botao titulo={`❤️ Curtir (${post.likes})`} onPress={() => onCurtir(post.id)} />

      <Text style={styles.subtitulo}>Comentários</Text>

      {post.comentarios.length === 0 ? (
        <Text style={styles.semComentario}>Nenhum comentário ainda.</Text>
      ) : (
        post.comentarios.map((comentario) => (
          <ComentarioBox key={comentario.id} comentario={comentario} />
        ))
      )}

      <TextInput
        style={styles.input}
        placeholder="Digite um comentário..."
        value={comentario}
        onChangeText={setComentario}
      />

      <Botao titulo="Comentar" variante="secundario" onPress={enviarComentario} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  usuario: {
    fontWeight: 'bold',
    color: '#7C3AED',
    fontSize: 16,
    marginBottom: 8,
  },
  texto: {
    fontSize: 17,
    color: '#111827',
    marginBottom: 10,
  },
  data: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  subtitulo: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },
  semComentario: {
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
});
