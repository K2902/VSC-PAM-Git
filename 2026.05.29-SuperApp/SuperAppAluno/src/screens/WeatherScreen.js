import axios from "axios";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { buscarClima } from "../services/weatherApi";

const API_KEY = "SUA_API_KEY";

export default function WeatherScreen() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState("");

  async function consultar() {
  try {
    const data = await buscarClima(cidade);

    setClima(`
Temperatura: ${data.main.temp}°C
Umidade: ${data.main.humidity}%
Condição: ${data.weather[0].description}
`);
  } catch (error) {
    setClima(error.message);
  }
}

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Cidade"
        onChangeText={setCidade}
      />

      <Button title="Consultar" onPress={consultar} />

      <Text>{clima}</Text>
    </View>
  );
}