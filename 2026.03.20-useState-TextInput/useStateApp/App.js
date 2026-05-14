import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { use, useState } from 'react';
//rimport { TextInput } from 'react-native-web';

export default function App() {
  const [contador, setContador] = useState(0);
  const [nome, setNome] = useState('');
  
  return (
      <View style={styles.container}>
      <Text style={styles.texto}>Valor: {contador}</Text>
      
      <View>
      <TextInput
      placeholder='Digite seu nome'
      onChangeText={(texto) => setNome(texto)}
      />
      <Text> Olá, {nome}</Text>
      </View>

      <View style={styles.botoes}>
      <View style={styles.botao}>
      <Button
      title="Aumentar"
      onPress={() => setContador(contador+1)}
      />
      </View>

      <View style={styles.botao}>

      <Button
      title="Diminuir"
      onPress={() => setContador(contador-1)}
      />
      </View>
      </View>
      <StatusBar style="auto"/>/
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  botoes: {
    width: '60%',
    gap: 10,
  },
  botao: {
    marginVertical: 5,
  },
});
