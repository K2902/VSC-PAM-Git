

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function AddItemScreen({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [mostrarLista, setMostrarLista] = useState(false);

  const produtosPreDefinidos = [
    "Arroz",
    "Feijão",
    "Leite",
    "Pão",
    "Ovos",
    "Macarrão",
    "Açúcar",
    "Café",
    "Carne",
    "Frango",
  ];

  function selecionarProduto(produto) {
    setNome(produto);
    setMostrarLista(false);
  }

  function adicionar() {
    if (!nome.trim()) {
      Alert.alert("Erro", "Adicione um item");
      return;
    }

    const novoItem = {
      id: Date.now().toString(),
      nome,
      comprado: false,
    };

    route.params.atualizar((listaAnterior) => {
      const existe = listaAnterior.some(
        (item) => item.nome.toLowerCase() === nome.toLowerCase()
      );

      if (existe) {
        Alert.alert("Aviso", "Item já existe");
        return listaAnterior;
      }

      return [...listaAnterior, novoItem];
    });

    setNome("");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite ou escolha um produto"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => setMostrarLista(!mostrarLista)}
      >
        <Text style={styles.botaoTextoSecundario}>
          Mostrar lista de produtos
        </Text>
      </TouchableOpacity>

      {mostrarLista && (
      <FlatList
        style={styles.lista}
        data={produtosPreDefinidos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemLista}
            onPress={() => selecionarProduto(item)}
    >
              <Text style={styles.itemTexto}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTexto}>Adicionar Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center", 
    backgroundColor:"#ecebeb",
  },

  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor:"#fff",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoSecundario: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },

  botaoTextoSecundario: {
    color: "#fff",
    fontSize: 14,
  },

  itemTexto: {
    fontSize: 16,
  },

  lista: {
  width: "100%",
  backgroundColor: "#c9c9c9",
  borderRadius: 10,
  padding: 5,
},

itemLista: {
  backgroundColor: "#ebe8e8",
  padding: 12,
  borderRadius: 8,
  marginBottom: 5,
},
});

