import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Botao({ titulo, onPress, variante = 'primario' }) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        variante === 'secundario' && styles.secundario,
        variante === 'perigo' && styles.perigo,
      ]}
      onPress={onPress}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#7C3AED',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 6,
  },
  secundario: {
    backgroundColor: '#4B5563',
  },
  perigo: {
    backgroundColor: '#DC2626',
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
