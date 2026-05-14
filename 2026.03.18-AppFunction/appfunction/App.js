import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, SafeAreaViewBase } from 'react-native';

export default function App() {
  const [valor, setValor] = useState(10);

  function somarUm(){
    setValor(valor +1);
  }

  function subtrairUm(){
    setValor(valor -1);
  }

  function resetar(){
    setValor(10);
  }

  function alterarValor(numero){
    setValor(valor+numero);
  }

  function calcularNovoValor(valorAtual, operacao){
    if (operacao === 'dobrar') return valorAtual * 2;
    if (operacao === 'metade') return valorAtual / 2;
    if (operacao === 'triplicar') return valorAtual * 3;
    return valorAtual;
  }

  function executarOperacao(operacao){
    const novoValor = calcularNovoValor(valor, operacao);
    setValor(novoValor);
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Funções no React Native</Text>
      <Text style={styles.subtitulo}>Valor atual:</Text>
      <Text style={styles.valor}>{valor}</Text>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={somarUm}>
          <Text style={styles.textoBotao}>+1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={subtrairUm}>
          <Text style={styles.textoBotao}>-1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => alterarValor(5)}>
          <Text style={styles.textoBotao}>+5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => alterarValor(-5)}>
          <Text style={styles.textoBotao}>-5</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => executarOperacao('dobrar')}>
          <Text style={styles.textoBotao}>Dobrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => executarOperacao('triplicar')}>
          <Text style={styles.textoBotao}>Triplicar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => executarOperacao('metade')}>
          <Text style={styles.textoBotao}>Metade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoReset} onPress={resetar}>
          <Text style={styles.textoBotao}>Resetar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: '#555',
  },
  valor: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 24,
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#7E57C2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  botaoReset: {
    backgroundColor: '#EF6C00',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



/*
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
*/
