import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, Button, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App(){
  const[nome, setNome] = useState('')
  const[idade, setIdade] = useState('')
  const[lista, setLista] = useState([])

  useEffect(()=>{
    carregar()
  },[])
  
  async function adicionar(){
    if(!nome)return
    const novaLista = [...lista,{
      id: Date.now().toString(),
      nome: nome, 
      idade: idade
    }]

    setLista(novaLista)
    setNome('')
    setIdade('')

    await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista))
  }

  async function carregar(){
    const dados = await AsyncStorage.getItem('usuarios')

    if(dados){
      setLista(JSON.parse(dados))
    }
  }

  async function limparTudo(){
    await AsyncStorage.removeItem('usuarios')
    setLista([])
  }
  async function editarUsuario(){
      try{
        const dadosAtuais = await AsyncStorage.getItem('usuarios');
        const listaEdit = dadosAtuais ? JSON.parse(dadosAtuais):[];
        const listaAtualizada = listaEdit.map(item => {
          if (item.nome === nome){
            return{...item, 
              nome: nome,
              idade: idade
            };
          }
          return item;
        });

        setLista(listaAtualizada);
        await AsyncStorage.setItem('usuarios', JSON.stringify(listaAtualizada));
        console.log('Item editado com sucesso!');
      } catch (e){
        console.error('Erro ao editar:', e);
      }
  }
  
  return (
    <View style={{padding:20}}>
      <Text style={{ fontSize: 20}}>
        Cadastro de Usuários
      </Text>

      <TextInput
      placeholder='Digite o nome'
      value={nome}
      onChangeText={setNome}
      style={{borderWidth:1, marginBottom: 10}}
      />

      <TextInput
      placeholder='Digite a idade'
      value={idade}
      onChangeText={setIdade}
      style={{borderWidth:1, marginBottom: 10}}
      />

      <Button title='Adicionar' onPress={adicionar}/>
      <Button title='Limpar Tudo' onPress={limparTudo}/>
      <Button title='Editar' onPress={editarUsuario}/>

      <FlatList
      data={lista}
      keyExtractor={(item) => item.id}
      renderItem={({item})=>(
        <Text>{item.nome} - {item.idade} anos</Text>
      )}
      />

    </View>
  )
}
