import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  ImageComponent, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Image 
      source={{ url: 'https://picsum.photos/200'}}
      style={stylefoto}/>


      <Text style={styles.nome}>Meu App!gdfgdfgdfg</Text>
      
      <Text style={styles.descricao}>
        Estudante aprendendo React Native
      </Text>

      <Button title="Seguir"/>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050404',
    alignItems: 'center',
    justifyContent: 'left',
  },
  titulo: {
    fontSize: 50,
    color: 'blue',
  }
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  nome:{
    fontSize:24,
    fontWeight: 'bold',
    marginTop: 10
  },
  descricao: {
    fontSize: 16,
    marginBottom: 20
  }
});
