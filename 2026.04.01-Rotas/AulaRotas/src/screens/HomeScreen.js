import { View, Text, Button } from 'react-native'

export default function HomeScreen ({ navigation}) {
    return(
        <View>
            <Text> Tela Home</Text>

            <Button
            title="Ir para Perfil"
            onPress={()=>navigation.navigate('Perfil')}
            />
            <Button
                title="Ir para Sobre"
                onPress={()=> navigation.navigate('Sobre')}
                />
            <Button
            title="Ir para Contato"
            onPress={()=>navigation.navigate('Contato')}
            />
            
        </View>
    )
}