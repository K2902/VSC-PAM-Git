import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [cidade, setCidade] = useState('')
  const [cidadeSalvo, setCidadeSalvo] = useState('')
  const [apelido, setApelido] = useState('')
  const [apelidoSalvo, setApelidoSalvo] = useState('')
  const [comida, setComida] = useState('')
  const [comidaSalvo, setComidaSalvo] = useState('')

  const salvarDados = async () => {
    try {
      await AsyncStorage.setItem('cidade', cidade)
      await AsyncStorage.setItem('apelido', apelido)
      await AsyncStorage.setItem('comida favorita', comida)
      alert('Dados salvos com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  const carregarDados = async () => {
    try {
      const valor = await AsyncStorage.getItem('cidade')
      const valor2 = await AsyncStorage.getItem('apelido')
      const valor3 = await AsyncStorage.getItem('comida favorita')

      if (valor) setCidadeSalvo(valor)
      if (valor2) setApelidoSalvo(valor2)
      if (valor3) setComidaSalvo(valor3)
    } catch (error) {
      console.log(error)
    }
  }

  const removerDados = async () => {
    try {
      await AsyncStorage.removeItem('cidade')
      await AsyncStorage.removeItem('apelido')
      await AsyncStorage.removeItem('comida favorita')

      setCidadeSalvo('')
      setApelidoSalvo('')
      setComidaSalvo('')

      alert('Dados removidos!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>📱 Meus Dados</Text>

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Apelido"
          value={apelido}
          onChangeText={setApelido}
        />

        <TextInput
          style={styles.input}
          placeholder="Comida favorita"
          value={comida}
          onChangeText={setComida}
        />

        <TouchableOpacity style={[styles.botao, styles.salvar]} onPress={salvarDados}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.carregar]} onPress={carregarDados}>
          <Text style={styles.textoBotao}>Carregar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.remover]} onPress={removerDados}>
          <Text style={styles.textoBotao}>Remover</Text>
        </TouchableOpacity>

        <View style={styles.resultadoBox}>
          <Text style={styles.resultadoTitulo}>📌 Dados salvos</Text>

          <Text style={styles.resultadoItem}>
            Cidade: {cidadeSalvo || '-'}
          </Text>

          <Text style={styles.resultadoItem}>
            Apelido: {apelidoSalvo || '-'}
          </Text>

          <Text style={styles.resultadoItem}>
            Comida: {comidaSalvo || '-'}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#6C63FF'
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },

  input: {
    backgroundColor: '#f1f3f6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16
  },

  botao: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  salvar: {
    backgroundColor: '#4CAF50'
  },

  carregar: {
    backgroundColor: '#2196F3'
  },

  remover: {
    backgroundColor: '#F44336'
  },

  resultadoBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10
  },

  resultadoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  resultadoItem: {
    fontSize: 16,
    marginBottom: 5
  }
})