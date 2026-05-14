import React from 'react';
import {View, Text} from 'react-native';

export default function TelaDetalhe({route}){
    const{nome} = route.params;
    return(
        <View>
            <Text>Nome:</Text>
        </View>
    );
}