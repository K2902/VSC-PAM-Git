import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet} from "react-native";

export default function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);

  async function buscarCep(){
      if((cep.length < 8)||(cep.length > 8)){
      alert("Digite um CEP válido");
      setCep(""); // Limpa o CEP
      setCep.requestFocus() // Opcional: foca no campo novamente
      return;
    }

    console.log("teste");

    try {
    const resposta = await
    fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    
    // Quando o CEP não existe
      if (dados.erro) {
        alert("CEP não encontrado");

        // Limpa o campo
        setCep("");

        // Limpa resultado antigo
        setEndereco(null);

        return;
      }

      console.log(dados);
      
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);

      alert("CEP não encontrado");

      // Limpa campo
      setCep("");

      // Limpa endereço antigo
      setEndereco(null);
    }

    // const resposta = await
    // fetch(`https://viacep.com.br/ws/${cep}/json/`);
    // const dados = await resposta.json();

    console.log(dados);
    
    setEndereco(dados);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar CEP</Text>
      
      <TextInput
      style={styles.input}
      placeholder="Digite o CEP"
      value = {cep}
      onChangeText={setCep}
      keyboardType="numeric"
      />

      <Button title="Buscar" onPress={buscarCep}/>
      
      {endereco && (
        <View style={styles.resultado}>
          <Text>Rua: {endereco.logradouro}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.localidade}</Text>
          <Text>Estado: {endereco.uf}</Text>
          <Text>DDD: {endereco.ddd}</Text>
          </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  titulo: {fontSize: 22, marginBottom: 20, textAlign: "center"},
  input: {borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8},
  resultado: {marginTop: 20}
});