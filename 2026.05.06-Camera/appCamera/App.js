// import React from ' react';
import React,{ useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
const [permission, requestPermission] = useCameraPermissions();

const cameraRef = useRef(null);
const [facing, setFacing] = useState('back');
const [foto, setFoto] = useState(null);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Carregando permissão...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.textoPermissao}>
          Precisamos da sua permissão para usar a câmera.
        </Text>

        <TouchableOpacity style={styles.botao} onPress={requestPermission}>
          <Text style={styles.textoBotao}>Permitir câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }



function trocarCamera(){
  if(facing === 'back'){
    setFacing('front');
  } else {
    setFacing('back');
  }
}

async function tirarFoto(){
  if(cameraRef.current){
    const fotoTirada = await cameraRef.current.takePictureAsync();
    setFoto(fotoTirada.uri);
  }
}

if (foto) {
    return (
      <SafeAreaView style={styles.containerFoto}>
        <Image source={{ uri: foto }} style={styles.foto} />

        <TouchableOpacity style={styles.botao} onPress={() => setFoto(null)}>
          <Text style={styles.textoBotao}>Tirar outra foto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botaoSecundario} onPress={trocarCamera}>
          <Text style={styles.textoBotao}>CHANGE CAMERA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoFoto} onPress={tirarFoto}>
          <Text style={styles.textoBotao}>TAKE A PICTURE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  textoPermissao: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  botao: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 50,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  areaBotoes: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderRadius: 50,
  },

  botaoSecundario: {
    backgroundColor: '#8a8b64',
    padding: 15,
    borderRadius: 50,
  },

  botaoFoto: {
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 10,
  },

  containerFoto: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  foto: {
    width: '100%',
    height: '75%',
    borderRadius: 15,
    marginBottom: 20,
  },
});