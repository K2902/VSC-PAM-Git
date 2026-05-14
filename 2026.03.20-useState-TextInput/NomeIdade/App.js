import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [mensagem, setMensagem] = useState('');

  function gerarMensagem() {
    setMensagem(`Olá ${nome}, você tem ${idade} anos!`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      <TouchableOpacity style={styles.botao} onPress={gerarMensagem}>
        <Text style={styles.textoBotao}>Gerar</Text>
      </TouchableOpacity>

      <Text style={styles.resultado}>{mensagem}</Text>
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