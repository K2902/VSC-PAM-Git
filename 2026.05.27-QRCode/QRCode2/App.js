// app.js

// IMPORTAÇÕES
import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Image,
  Vibration,
  Alert,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

// APP
export default function App() {

  // PERMISSÃO DA CÂMERA
  const [permission, requestPermission] =
    useCameraPermissions();

  // CONTEÚDO QR
  const [conteudoQRCode, setConteudoQRCode] =
    useState("");

  // CONTROLE DE LEITURA
  const [escaneado, setEscaneado] =
    useState(false);

  // COR DE FUNDO
  const [corFundo, setCorFundo] =
    useState("#f2f2f2");

  // FLASH
  const [flashLigado, setFlashLigado] =
    useState(false);

  // IMAGEM
  const [imagemUrl, setImagemUrl] =
    useState(null);

  // CARREGANDO
  if (!permission) {

    return (
      <View style={styles.container}>
        <Text>Carregando permissões...</Text>
      </View>
    );
  }

  // SEM PERMISSÃO
  if (!permission.granted) {

    return (
      <View style={styles.container}>

        <Text style={styles.texto}>
          Precisamos da câmera para ler QR Codes
        </Text>

        <Button
          title="Permitir câmera"
          onPress={requestPermission}
        />

      </View>
    );
  }

  // MUDA COR DO FUNDO
  function mudarCorFundo() {

    const cores = [
      "#0000ff", // azul
      "#ff0000", // vermelho
      "#000000", // preto
    ];

    const corAleatoria =
      cores[Math.floor(Math.random() * cores.length)];

    setCorFundo(corAleatoria);
  }

  // FUNÇÃO DE LEITURA
  async function lerQRCode({ data }) {

    console.log("QR Lido:", data);

    // BLOQUEIA NOVAS LEITURAS
    setEscaneado(true);

    // SALVA TEXTO
    setConteudoQRCode(data);

    // VIBRA O CELULAR
    Vibration.vibrate([300, 200, 300]);

    // MUDA COR
    mudarCorFundo();

    // LIGA FLASH
    setFlashLigado(true);

    // DESLIGA FLASH
    setTimeout(() => {
      setFlashLigado(false);
    }, 3000);

    // LIMPA IMAGEM
    setImagemUrl(null);

    // VERIFICA SE É IMAGEM
    const ehImagem =

      data.toLowerCase().includes(".png") ||
      data.toLowerCase().includes(".jpg") ||
      data.toLowerCase().includes(".jpeg") ||
      data.toLowerCase().includes(".gif") ||
      data.toLowerCase().includes("images") ||
      data.toLowerCase().includes("img");

    // SE FOR LINK
    if (
      data.startsWith("http://") ||
      data.startsWith("https://")
    ) {

      // SE FOR IMAGEM
      if (ehImagem) {

        // MOSTRA IMAGEM
        setImagemUrl(data);
      }

      // SE FOR SITE
      else {

        // ABRE SITE
        await Linking.openURL(data);
      }
    }

    // SE FOR TEXTO
    else {

      Alert.alert(
        "Texto QR Code",
        data
      );
    }
  }

  // LER NOVAMENTE
  function lerNovamente() {

    setEscaneado(false);

    setConteudoQRCode("");

    setImagemUrl(null);
  }

  return (

    <View
      style={[
        styles.container,
        { backgroundColor: corFundo }
      ]}
    >

      {/* TÍTULO */}
      <Text style={styles.titulo}>
        QR Code Inteligente
      </Text>

      {/* CAMERA */}
      <View style={styles.cameraArea}>

        <CameraView
          style={styles.camera}

          facing="back"

          enableTorch={flashLigado}

          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}

          onBarcodeScanned={
            escaneado
              ? undefined
              : lerQRCode
          }
        />

      </View>

      {/* RESULTADO */}
      <View style={styles.resultado}>

        <Text style={styles.label}>
          Conteúdo do QR Code:
        </Text>

        <Text style={styles.conteudo}>
          {
            conteudoQRCode ||
            "Nenhum QR Code lido ainda."
          }
        </Text>

        {/* MOSTRA IMAGEM */}
        {imagemUrl && (

          <Image
            source={{ uri: imagemUrl }}
            style={styles.imagem}
            resizeMode="contain"
          />

        )}

        {/* BOTÃO */}
        {escaneado && (

          <Button
            title="Ler outro QR Code"
            onPress={lerNovamente}
          />

        )}

      </View>

    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({

  // CONTAINER
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  // TÍTULO
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },

  // TEXTO
  texto: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  // CAMERA
  cameraArea: {
    height: 350,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 20,
  },

  camera: {
    flex: 1,
  },

  // RESULTADO
  resultado: {
    backgroundColor: "#ffffffdd",
    padding: 20,
    borderRadius: 15,
  },

  // LABEL
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  // CONTEÚDO
  conteudo: {
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },

  // IMAGEM
  imagem: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },

});