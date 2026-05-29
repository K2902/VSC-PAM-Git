import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function ImcScreen() {
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");

  function calcular() {
  const pesoNum = parseFloat(peso);
  const alturaNum = parseFloat(altura);

  if (!pesoNum || !alturaNum) {
    setResultado("Preencha peso e altura corretamente");
    return;
  }

  const imc = pesoNum / (alturaNum * alturaNum);

  let classificacao = "";

  if (imc < 18.5) classificacao = "Abaixo do peso";
  else if (imc < 25) classificacao = "Peso normal";
  else if (imc < 30) classificacao = "Sobrepeso";
  else if (imc < 35) classificacao = "Obesidade Grau I";
  else if (imc < 40) classificacao = "Obesidade Grau II";
  else classificacao = "Obesidade Grau III";

  setResultado(
    `${nome}\nIMC: ${imc.toFixed(2)}\n${classificacao}`
  );
}

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nome" onChangeText={setNome} />
      <TextInput
  placeholder="Peso (kg)"
  keyboardType="numeric"
  value={peso}
  onChangeText={setPeso}
/>

<TextInput
  placeholder="Altura (m) Ex: 1.75"
  keyboardType="numeric"
  value={altura}
  onChangeText={setAltura}
/>

      <Button title="Calcular" onPress={calcular} />

      <Text>{resultado}</Text>
    </View>
  );

//   const alturaMetros = parseFloat(altura) / 100;
// const imc = pesoNum / (alturaMetros * alturaMetros);
}