import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState(0);

  function somar() {
    const soma = Number(num1) + Number(num2);
    setResultado(soma);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Calculadora</Text>

      <TextInput
        style={styles.input}
        placeholder="Número 1"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        placeholder="Número 2"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <TouchableOpacity style={styles.botao} onPress={somar}>
        <Text style={styles.textoBotao}>Somar</Text>
      </TouchableOpacity>

      <Text style={styles.resultado}>Resultado: {resultado}</Text>
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
