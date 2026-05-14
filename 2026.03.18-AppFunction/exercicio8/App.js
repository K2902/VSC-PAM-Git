import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function App() {
  const [pontos, setPontos] = useState(0);

  function alterarPontos(valor) {
    setPontos(pontos + valor);
  }

  function zerar() {
    setPontos(0);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Controle de Pontos</Text>

      <Text style={styles.valor}>{pontos}</Text>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => alterarPontos(10)}>
          <Text style={styles.texto}>+10</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => alterarPontos(50)}>
          <Text style={styles.texto}>+50</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => alterarPontos(-10)}>
          <Text style={styles.texto}>-10</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reset} onPress={zerar}>
          <Text style={styles.texto}>Zerar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  valor: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#3F51B5',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  reset: {
    backgroundColor: '#E53935',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});