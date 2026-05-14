

import React, { useState, useEffect } from "react";
import { View, FlatList, Button, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { salvarLista, carregarLista } from "../services/storage";
import Item from './../componentes/Item';

export default function HomeScreen({ navigation }) {
  const [lista, setLista] = useState([]);
  const total = lista.length;

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await carregarLista();
    setLista(dados);
  }

  async function atualizar(novaListaOuFuncao) {
    const novaLista =
      typeof novaListaOuFuncao === "function"
        ? novaListaOuFuncao(lista)
        : novaListaOuFuncao;

    setLista(novaLista);
    await salvarLista(novaLista);
  }

  function toggleItem(id) {
    const novaLista = lista.map((item) =>
      item.id === id ? { ...item, comprado: !item.comprado } : item
    );
    atualizar(novaLista);
  }

  function removerItem(id) {
    const novaLista = lista.filter((item) => item.id !== id);
    atualizar(novaLista);
  }

 function limparLista() {
    Alert.alert(
      "Confirmar",
      "Deseja apagar toda a lista?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: () => atualizar([]),
        },
      ]
    );
  }

  const restantes = lista.filter((i) => !i.comprado).length;

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Restantes: {restantes}</Text>

     <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Adicionar Item", { atualizar })}
      >
        <Text style={styles.botaoTexto}> Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item item={item} onToggle={toggleItem} onRemove={removerItem} />
        )}
      />

      <TouchableOpacity style={styles.botaoLimpar} onPress={limparLista}>
        <Text style={styles.botaoTexto}> Limpar Lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 20,
    backgroundColor: "#ecebeb",
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
  },
  botao: {
  backgroundColor: "#4CAF50",
  padding: 12,
  borderRadius: 8,
  marginVertical: 10,
  alignItems: "center",
  width: "80%",        
  alignSelf: "center",
},

botaoLimpar: {
  backgroundColor: "#E53935",
  padding: 10,
  borderRadius: 8,
  marginVertical: 10,
  alignItems: "center",
  width: "80%",
  alignSelf: "center",
},

botaoTexto: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
});

