import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  function mostrarMensagem(){
    alert("Botão cLiCaDo! Bem-vindo ao React Native!");
  }
  /*return (
    <View>
      <Text>Aperte o botão</Text>
      <Button
      title='Clique aqui'
      onPress={mostrarMensagem}
      />
    </View>
  );*/
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Testando título do app</Text>

      <Text>Nome: Bruno</Text>
      <Text>Curso: Desenvolvimento 321973827</Text>
      <Button
      title='Entrar'
      onPress={mostrarMensagem}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     marginTop: 60,
     alignItems: 'center'
    /*flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',*/
  },
  titulo:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:20
  }
});
