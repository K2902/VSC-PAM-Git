import axios from "axios";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { buscarCEP } from "../services/cepApi";

export default function CepScreen() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  async function consultar() {
  try {
    const data = await buscarCEP(cep);

    setEndereco(`
Rua: ${data.logradouro}
Bairro: ${data.bairro}
Cidade: ${data.localidade}
Estado: ${data.uf}
`);
  } catch (error) {
    setEndereco(error.message);
  }
}

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite o CEP"
        onChangeText={setCep}
      />

      <Button title="Consultar" onPress={consultar} />

      <Text>{endereco}</Text>
    </View>
  );
}