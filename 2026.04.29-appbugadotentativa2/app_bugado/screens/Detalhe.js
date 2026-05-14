import React from 'react';
import { View, Text } from 'react-native';

export default function Detalhe({ route }) {

  const produto = route.params.item;

  return (
    <View>
      <Text>{produto.nome}</Text>
    </View>
  );
}
