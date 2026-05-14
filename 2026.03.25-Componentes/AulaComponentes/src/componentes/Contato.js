import React from "react";
import { View, Text, StyleSheet, Button}   from 'react-native';

export default function Contato({ nome, telefone, idade, cidade}){
    return(
        <View style={styles.card}>
            <Text style={styles.nome}> {nome}</Text>
            <Text>Telefone: {telefone}</Text>
            <Text>Idade: {idade}</Text>
            <Text>Cidade: {cidade}</Text>

            <Button title="Ver contato" onPress={()=>alert(nome+' - '+ telefone)} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#bda627'
  }
});