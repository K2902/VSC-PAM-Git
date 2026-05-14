import React,{useState}from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App(){
  const [cidade, setCidade] = useState('')
  const [cidadeSalvo, setCidadeSalvo] = useState('')
  const [apelido, setApelido] = useState('')
  const [apelidoSalvo, setApelidoSalvo] = useState('')
  const [comida, setComida] = useState('')
  const [comidaSalvo, setComidaSalvo] = useState('')

  const salvarDados = async () => {
    try{
      await AsyncStorage.setItem('cidade',cidade)
      await AsyncStorage.setItem('apelido',apelido)
      await AsyncStorage.setItem('comida favorita',comida)
      alert('Dados salvos com sucesso!')
    } catch (error){
      console.log(error)
    }
  }

  const carregarDados = async() =>{
    try {
      const valor = await AsyncStorage.getItem('cidade')
      const valor2 = await AsyncStorage.getItem('apelido')
      const valor3 = await AsyncStorage.getItem('comida favorita')
      if((valor !== null)&&(valor2 !== null)&&(valor3 !== null)){
        setCidadeSalvo(valor)
        setApelidoSalvo(valor2)
        setComidaSalvo(valor3)
      }
    } catch (error){
      console.log(error)
    }
  }

  const removerDados = async()=>{
    try {
      await AsyncStorage.removeItem('cidade')
      await AsyncStorage.removeItem('apelido')
      await AsyncStorage.removeItem('comida favorita')
      setApelidoSalvo('')
      setCidadeSalvo('')
      setComidaSalvo('')
      alert('Dados removidos!')
    }catch (error){
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Salvando dados quando aperta botão</Text>
      <TextInput style={styles.input}
      placeholder="Digite a cidade"
      value = {cidade}
      onChangeText={setCidade}
      />
      <TextInput style={styles.input}
      placeholder="Digite o apelido"
      value = {apelido}
      onChangeText={setApelido}
      />
      <TextInput style={styles.input}
      placeholder="Digite sua comida favorita"
      value = {comida}
      onChangeText={setComida}
      />

      <Button title='Salvar Dados' onPress={salvarDados}/>
      <Button title='Carregar Dados' onPress={carregarDados}/>
      <Button title='Remover Dados' onPress={removerDados}/>

      <Text style={styles.resultado}>
        Cidade salva:{cidadeSalvo}{'\n'}
        Apelido salvo:{apelidoSalvo}{'\n'}
        Comida favorita salva:{comidaSalvo}{'\n'}
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
