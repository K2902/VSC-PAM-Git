import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function App() {
  const [valor, setValor] = useState(20);

  // função com parâmetro
  function alterarValor(numero) {
    setValor(valor + numero);
  }

  // função só de lógica
  function calcular(valorAtual, operacao) {
    if (operacao === 'dobrar') return valorAtual * 2;
    if (operacao === 'metade') return valorAtual / 2;
    return valorAtual;
  }

  function executar(operacao) {
    const novoValor = calcular(valor, operacao);
    setValor(novoValor);
  }

  function resetar() {
    setValor(20);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Exercício 7</Text>
      <Text style={styles.valor}>{valor}</Text>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => alterarValor(2)}>
          <Text style={styles.texto}>+2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => alterarValor(-2)}>
          <Text style={styles.texto}>-2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => executar('dobrar')}>
          <Text style={styles.texto}>Dobrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => executar('metade')}>
          <Text style={styles.texto}>Metade</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.reset} onPress={resetar}>
        <Text style={styles.texto}>Resetar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold' },
  valor: { fontSize: 40, margin: 20 },
  linha: { flexDirection: 'row', marginBottom: 10 },
  botao: { backgroundColor: '#6A5ACD', padding: 15, margin: 5, borderRadius: 10 },
  reset: { backgroundColor: '#FF7043', padding: 15, borderRadius: 10 },
  texto: { color: '#fff', fontWeight: 'bold' }
});