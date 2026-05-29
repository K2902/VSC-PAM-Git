import { useEffect, useState } from "react";
import { Text, View, Linking, TouchableOpacity  } from "react-native";
import { CameraView, useCameraPermissions} from "expo-camera";

export default function QrCodeScreen() {
  const [permission, requestPermission] =
    useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission?.granted) {
    return <Text>Permissão da câmera necessária.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={
          scanned
            ? undefined
            : ({ data }) => {
                setScanned(true);
                setContent(data);
              }
        }
      />

      <Text style={{ padding: 20 }}>
        Conteúdo: {content}
      </Text>
      <Button
  title="Ler Novamente"
  onPress={() => {
    setScanned(false);
    setContent("");
  }}
/>
    </View>
    
    
  );
  <TouchableOpacity
  onPress={() => Linking.openURL(content)}
>
  <Text
    style={{
      color: "blue",
      textDecorationLine: "underline"
    }}
  >
    Abrir Link
  </Text>
</TouchableOpacity>


}