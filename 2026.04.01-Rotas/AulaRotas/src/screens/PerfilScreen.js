import{ View, Text, Button} from 'react-native'

export default function PerfilScreen({navigation}){
    return(
        <View> 
            <Text>Perfil Teresa da Silva</Text>

            <Button title="Voltar" onPress={()=>navigation.goBack()}
            />

        </View>
    )
}