import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { listarProdutos } from '../services/api';

export default function Home({ navigation }) {

  const [produtos, setProdutos] = useState();
  const [nome, setNome] = useState('');

  function carregar() {
    const dados = listarProdutos
    setProdutos(dados);
  }

  function adicionar() {
    produtos.push({ nome: nome });
  }

  return (
    <View>
      <Text>Lista</Text>

      <Button title="Carregar" onPress={carregar} />

      {produtos.map((p, i) => (
        <Text key={i} onPress={() => navigation.navigate('Detalhe')}>
          {p.nme}
        </Text>
      ))}

      <TextInput value={nome} onChangeText={setNome} />

      <Button title="Salvar" onPress={salvarProduto} />
    </View>
  );
}
