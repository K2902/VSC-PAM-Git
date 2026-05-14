import { View, Text, Button } from "react-native";

export default function ContatoScreen ({navigation}) {
    return (
        <View>
            <Text> Tela Contato</Text>

            <Button title="Voltar" onPress={() => navigation.goBack()}
            />
        </View>
    )
}