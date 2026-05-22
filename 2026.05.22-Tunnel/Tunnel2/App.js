// Importa o hook useState do React
import { useState } from "react";

// Importa componentes do React Native
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Image,
} from "react-native";

// Importa a câmera e o controle de permissões do Expo Camera
import { CameraView, useCameraPermissions } from "expo-camera";

// Função principal do aplicativo
export default function App() {

  // Hook responsável pelas permissões da câmera
  const [permission, requestPermission] = useCameraPermissions();

  // Estado que armazena o conteúdo lido do QR Code
  const [conteudoQRCode, setConteudoQRCode] = useState("");

  // Estado que controla se já foi escaneado um QR Code
  const [escaneado, setEscaneado] = useState(false);

  // Enquanto as permissões estão carregando
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Carregando permissões...</Text>
      </View>
    );
  }

  // Caso a câmera ainda não tenha permissão
  if (!permission.granted) {
    return (
      <View style={styles.container}>

        {/* Texto explicando a necessidade da câmera */}
        <Text style={styles.texto}>
          Precisamos da permissão da câmera para ler o QR Code.
        </Text>

        {/* Botão para solicitar permissão */}
        <Button title="Permitir câmera" onPress={requestPermission} />
      </View>
    );
  }

  // Função executada quando um QR Code é lido
  async function lerQRCode({ data }) {

    // Impede novas leituras
    setEscaneado(true);

    // Salva o conteúdo do QR Code
    setConteudoQRCode(data);

    // Verifica se o conteúdo é um link
    if (data.startsWith("http://") || data.startsWith("https://")) {

      // Abre automaticamente o link
      await Linking.openURL(data);
    }
  }

  // Função para permitir nova leitura
  function lerNovamente() {

    // Libera o scanner novamente
    setEscaneado(false);

    // Limpa o conteúdo anterior
    setConteudoQRCode("");
  }

  // Verifica se o conteúdo do QR Code é uma imagem
  const ehImagem =
    conteudoQRCode.endsWith(".png") ||
    conteudoQRCode.endsWith(".jpg") ||
    conteudoQRCode.endsWith(".jpeg") ||
    conteudoQRCode.endsWith(".gif");

  // Interface principal do aplicativo
  return (
    <View style={styles.container}>

      {/* Título do aplicativo */}
      <Text style={styles.titulo}>Leitor de QR Code</Text>

      {/* Área da câmera */}
      <View style={styles.cameraArea}>

        {/* Componente da câmera */}
        <CameraView
          style={styles.camera}

          // Define a câmera traseira
          facing="back"

          // Permite ler apenas QR Codes
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}

          // Executa a leitura somente se ainda não foi escaneado
          onBarcodeScanned={escaneado ? undefined : lerQRCode}
        />
      </View>

      {/* Área que mostra os resultados */}
      <View style={styles.resultado}>

        {/* Texto de identificação */}
        <Text style={styles.label}>Conteúdo do QR Code:</Text>

        {/* Exibe o conteúdo lido */}
        <Text style={styles.conteudo}>
          {conteudoQRCode || "Nenhum QR Code lido ainda."}
        </Text>

        {/* Se for imagem, mostra a imagem */}
        {ehImagem && (
          <Image

            // URL da imagem
            source={{ uri: conteudoQRCode }}

            // Estilo da imagem
            style={styles.imagem}

            // Ajusta a imagem sem distorcer
            resizeMode="contain"
          />
        )}

        {/* Botão exibido após leitura */}
        {escaneado && (
          <Button title="Ler outro QR Code" onPress={lerNovamente} />
        )}
      </View>
    </View>
  );
}

// Estilos do aplicativo
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },

  // Estilo do título
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  // Texto de mensagens
  texto: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  // Área da câmera
  cameraArea: {
    height: 350,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 20,
  },

  // Estilo da câmera
  camera: {
    flex: 1,
  },

  // Área do resultado
  resultado: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },

  // Texto do label
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  // Texto do conteúdo
  conteudo: {
    fontSize: 16,
    marginBottom: 20,
  },

  // Estilo da imagem exibida
  imagem: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
});