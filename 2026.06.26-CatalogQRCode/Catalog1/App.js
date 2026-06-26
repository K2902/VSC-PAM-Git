import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [escaneado, setEscaneado] = useState(false);
  const [produto, setProduto] = useState(null);
  const [ultimaLeitura, setUltimaLeitura] = useState("");

  const produtos = [
    {
      codigo: "1001",
      nome: "Amazon Alexa",
      descricao: "Assistente virtual inteligente.",
      preco: "R$ 349,90",
      estoque: 15,
      cor: "#5E35B1",
      imagem: require("./assets/produtos/alexa.png"),
    },
    {
      codigo: "1002",
      nome: "Fone de Ouvido Bluetooth",
      descricao: "Fone sem fio com cancelamento de ruído.",
      preco: "R$ 199,90",
      estoque: 30,
      cor: "#009688",
      imagem: require("./assets/produtos/fonedeouvido.png"),
    },
    {
      codigo: "1003",
      nome: "Smartphone",
      descricao: "Tela AMOLED de 6.5 polegadas.",
      preco: "R$ 2.499,90",
      estoque: 8,
      cor: "#1565C0",
      imagem: require("./assets/produtos/smartphone.png"),
    },
    {
      codigo: "1004",
      nome: "Smartwatch",
      descricao: "Monitor cardíaco e GPS integrado.",
      preco: "R$ 799,90",
      estoque: 20,
      cor: "#F57C00",
      imagem: require("./assets/produtos/smartwatch.png"),
    },
    {
    codigo: "1005",
    nome: "Monitor",
    descricao: "Monitor Full HD de 24 polegadas.",
    preco: "R$ 899,90",
    estoque: 12,
    cor: "#455A64",
    imagem: require("./assets/produtos/monitor.png"),
  },
  {
    codigo: "1006",
    nome: "Ar Condicionado",
    descricao: "Ar-condicionado Split 12.000 BTUs.",
    preco: "R$ 2.199,90",
    estoque: 6,
    cor: "#00ACC1",
    imagem: require("./assets/produtos/arcondicionado.png"),
  },
  ];

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setEscaneado(true);

    const encontrado = produtos.find(
      (item) => item.codigo === data
    );

    if (encontrado) {
      setProduto(encontrado);
    } else {
      setProduto(null);
    }

    const agora = new Date();

    setUltimaLeitura(
      agora.toLocaleDateString("pt-BR") +
        " " +
        agora.toLocaleTimeString("pt-BR")
    );
  };

  if (!permission) {
    return (
      <View style={styles.centralizado}>
        <Text>Solicitando permissão...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centralizado}>
        <Text>É necessário permitir o acesso à câmera.</Text>

        <Button
          title="Permitir câmera"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const corTela = produto ? produto.cor : "#202124";

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: corTela },
      ]}
    >
      {!escaneado ? (
        <>
          <Text style={styles.titulo}>
            Leitor de Produtos
          </Text>

          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={
              escaneado
                ? undefined
                : handleBarCodeScanned
            }
          />

          <Text style={styles.info}>
            Aponte a câmera para o QR Code do produto.
          </Text>
        </>
      ) : (
        <View style={styles.resultado}>
          <Text style={styles.titulo}>Resultado</Text>

          {produto ? (
            <>
              <Image
                source={produto.imagem}
                style={styles.imagem}
              />

              <Text style={styles.texto}>
                <Text style={styles.negrito}>
                  Código:
                </Text>{" "}
                {produto.codigo}
              </Text>

              <Text style={styles.texto}>
                <Text style={styles.negrito}>
                  Nome:
                </Text>{" "}
                {produto.nome}
              </Text>

              <Text style={styles.texto}>
                <Text style={styles.negrito}>
                  Descrição:
                </Text>{" "}
                {produto.descricao}
              </Text>

              <Text style={styles.texto}>
                <Text style={styles.negrito}>
                  Preço:
                </Text>{" "}
                {produto.preco}
              </Text>

              <Text style={styles.texto}>
                <Text style={styles.negrito}>
                  Estoque:
                </Text>{" "}
                {produto.estoque}
              </Text>
            </>
          ) : (
            <Text style={styles.naoEncontrado}>
              Produto não encontrado.
            </Text>
          )}

          <Text style={styles.data}>
            Última leitura:
          </Text>

          <Text style={styles.data}>
            {ultimaLeitura}
          </Text>

          <View style={{ marginTop: 25 }}>
            <Button
              title="Nova leitura"
              color="#222"
              onPress={() => {
                setEscaneado(false);
                setProduto(null);
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  camera: {
    width: "100%",
    height: 420,
    borderRadius: 15,
    overflow: "hidden",
  },

  titulo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  info: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },

  resultado: {
    alignItems: "center",
  },

  imagem: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 20,
  },

  texto: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 3,
  },

  negrito: {
    fontWeight: "bold",
  },

  naoEncontrado: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },

  data: {
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
  },

  centralizado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});