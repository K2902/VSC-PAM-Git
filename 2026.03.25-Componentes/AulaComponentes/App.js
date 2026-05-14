import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Contato from './src/componentes/Contato';

export default function App() {
  return (
    <View style={styles.container}>
      <Contato nome="João" telefone="99974-1345" idade={25} cidade='São Paulo'/>
      <Contato nome="Maria" telefone="99985-9384" idade={30} cidade='Londrina'/>
      <Contato nome="Pedro" telefone="99842-4818" idade={28} cidade='Bastos'/>
      <Contato nome="Kátia" telefone="99684-4718" idade={18} cidade='Marília'/>
      <Contato nome="Ariane" telefone="99897-3223" idade={21} cidade='Tupã'/>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgb(2, 102, 19)',
        padding: 15,
        marginTop: 10,
        borderRadius: 8
    
    },
    nome:{
        fontSize: 16,
        fontWeight: 'bold'
    }
})

//