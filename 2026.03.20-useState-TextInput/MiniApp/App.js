import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [texto, setTexto] = useState('');
  const [exibir, setExibir] = useState('');

  function mostrarTexto() {
    setExibir(texto);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Desafio 1</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite aqui"
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity style={styles.botao} onPress={mostrarTexto}>
        <Text style={styles.textoBotao}>Mostrar</Text>
      </TouchableOpacity>

      <Text style={styles.resultado}>{exibir}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, width: '80%', padding: 10, marginBottom: 10 },
  botao: { backgroundColor: '#7E57C2', padding: 10 },
  textoBotao: { color: '#fff' },
  resultado: { marginTop: 20, fontSize: 18 }
});