import axios from "axios";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { converterMoedas } from "../services/currencyApi";

export default function CurrencyScreen() {
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");

  async function converter() {
  try {
    const numero = parseFloat(valor);

    if (!numero) {
      setResultado("Digite um valor válido");
      return;
    }

    const moedas = await converterMoedas(numero);

    setResultado(`
Dólar: ${moedas.usd.toFixed(2)}
Euro: ${moedas.eur.toFixed(2)}
Libra: ${moedas.gbp.toFixed(2)}
`);
  } catch (error) {
    setResultado(error.message);
  }
}

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Valor em Reais"
        keyboardType="numeric"
        onChangeText={setValor}
      />

      <Button title="Converter" onPress={converter} />

      <Text>{resultado}</Text>
    </View>
  );
}