import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  function mostrarMensagem() {
    setMensagem(`Olá ${nome}`);
  }

  return (
    <View style={styles.container}>

      <Image 
        source={{ uri: 'https://picsum.photos/200'}}
        style={styles.foto}
      />

      <Text style={styles.nome}>Meu App!</Text>
      
      <Text style={styles.descricao}>
        Estudante aprendendo React Native
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        onChangeText={setNome}
        value={nome}
      />

      <Button title="Mostrar" onPress={mostrarMensagem} />

      <Text style={styles.resultado}>{mensagem}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050404',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  nome:{
    fontSize:24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff'
  },
  descricao: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff'
  },
  resultado: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff'
  }
});