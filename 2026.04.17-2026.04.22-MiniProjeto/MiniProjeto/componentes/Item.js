

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Item({ item, onToggle, onRemove }) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.areaTexto}
        onPress={() => onToggle(item.id)}
      >
        <Text style={[styles.texto, item.comprado && styles.comprado]}>
          {item.nome}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Text style={styles.remover}>X</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
  borderRadius: 8,
  marginBottom: 5,
  backgroundColor: "#fff",
},
  areaTexto: {
    flex: 1, 
  },
  texto: {
    fontSize: 18,
  },
  comprado: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  remover: {
    color: "red",
    fontWeight: "bold",
    padding: 10,
  },
});

