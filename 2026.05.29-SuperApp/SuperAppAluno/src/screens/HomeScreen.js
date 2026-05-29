import { View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Calculadora IMC" onPress={() => navigation.navigate("IMC")} />
      <Button title="QR Code" onPress={() => navigation.navigate("QR Code")} />
      <Button title="Lista de Tarefas" onPress={() => navigation.navigate("Tarefas")} />
      <Button title="Conversor" onPress={() => navigation.navigate("Moedas")} />
      <Button title="Consulta CEP" onPress={() => navigation.navigate("CEP")} />
      <Button title="Clima" onPress={() => navigation.navigate("Clima")} />
      <Button title="Perfil" onPress={() => navigation.navigate("Perfil")} />
    </View>
  );
}