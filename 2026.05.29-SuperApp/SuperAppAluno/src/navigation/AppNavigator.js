import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ImcScreen from "../screens/ImcScreen";
import QrCodeScreen from "../screens/QrCodeScreen";
import TasksScreen from "../screens/TasksScreen";
import CurrencyScreen from "../screens/CurrencyScreen";
import CepScreen from "../screens/CepScreen";
import WeatherScreen from "../screens/WeatherScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="IMC" component={ImcScreen} />
        <Stack.Screen name="QR Code" component={QrCodeScreen} />
        <Stack.Screen name="Tarefas" component={TasksScreen} />
        <Stack.Screen name="Moedas" component={CurrencyScreen} />
        <Stack.Screen name="CEP" component={CepScreen} />
        <Stack.Screen name="Clima" component={WeatherScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}