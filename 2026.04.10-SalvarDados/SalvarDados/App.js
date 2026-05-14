import React,{useState}from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App(){
  const [nome, setNome] = useState('')
  const [nomeSalvo, setNomeSalvo] = useState('')

  const salvarNome = async () => {
    try{
      await AsyncStorage.setItem('nome',nome)
      alert('Nome salvo com sucesso!')
    } catch (error){
      console.log(error)
    }
  }

  const carregarNome = async() =>{
    try {
      const valor = await AsyncStorage.getItem('nome')
      if(valor !== null){
        setNomeSalvo(valor)
      }
    } catch (error){
      console.log(error)
    }
  }

  const removerNome = async()=>{
    try {
      await AsyncStorage.removeItem('nome')
      setNomeSalvo('')
      alert('Nome removido!')
    }catch (error){
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nome Salvo!!</Text>
      <TextInput style={styles.input}
      placeholder="Digite seu nome"
      value = {nome}
      onChangeText={setNome}
      />

      <Button title='Salvar Nome' onPress={salvarNome}/>
      <Button title='Carregar Nome' onPress={carregarNome}/>
      <Button title='Remover Nome' onPress={removerNome}/>

      <Text style={styles.resultado}>
        Nome salvo:{nomeSalvo}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  resultado: {
    marginTop: 20,
    fontSize: 18
  }
})
