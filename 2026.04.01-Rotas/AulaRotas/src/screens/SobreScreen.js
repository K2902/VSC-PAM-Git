import { View, Text, Button} from 'react-native'

export default function SobreScreen({navigation}){
    return (
        <View>
            <Text> Tela Sobre</Text>
            
            <Button title="Voltar" onPress={() => navigation.goBack()}
            />
        </View>
    )
}