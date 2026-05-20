import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [conteudoQRCode, setConteudoQRCode] = useState("");
  const [escaneado, setEscaneado] = useState(false);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>
          Precisamos da permissão da câmera para ler o QR Code.
        </Text>

        <Button title="Permitir câmera" onPress={requestPermission} />
      </View>
    );
  }

  function lerQRCode({ data }) {
    setEscaneado(true);
    setConteudoQRCode(data);
  }

  function lerNovamente() {
    setEscaneado(false);
    setConteudoQRCode("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Leitor de QR Code</Text>

      <View style={styles.cameraArea}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={escaneado ? undefined : lerQRCode}
        />
      </View>

      <View style={styles.resultado}>
        <Text style={styles.label}>Conteúdo do QR Code:</Text>

        <Text style={styles.conteudo}>
          {conteudoQRCode || "Nenhum QR Code lido ainda."}
        </Text>

        {escaneado && (
          <Button title="Ler outro QR Code" onPress={lerNovamente} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  texto: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

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

  resultado: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  conteudo: {
    fontSize: 16,
    marginBottom: 20,
  },
});
