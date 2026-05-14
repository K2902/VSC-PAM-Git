import { View, Text, TouchableOpacity } from 'react-native';

export default function TelaInicial({ navigation }) {
  return (
    <View>
      <TouchableOpacity>
        onPress={() =>
          navigation.navigate('Detalhe', { nome: 'Nome desconhecido' })
        }
    
        <Text>Ir para Detalhe</Text>
      </TouchableOpacity>
    </View>
  );
}
