import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ComentarioBox({ comentario }) {
  return (
    <View style={styles.box}>
      <Text style={styles.usuario}>@{comentario.usuario}</Text>
      <Text style={styles.texto}>{comentario.texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
  },
  usuario: {
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 2,
  },
  texto: {
    color: '#111827',
  },
});
