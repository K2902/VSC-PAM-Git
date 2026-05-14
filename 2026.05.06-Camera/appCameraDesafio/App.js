import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);

  const [facing, setFacing] = useState('back');

  // Foto atual
  const [foto, setFoto] = useState(null);

  // Desafio 4 -> Array de fotos
  const [fotos, setFotos] = useState([]);

  // Desafio 5 -> Controle da tela da galeria
  const [mostrarGaleria, setMostrarGaleria] = useState(false);

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

  function trocarCamera() {
    setFacing(facing === 'back' ? 'front' : 'back');
  }

  async function tirarFoto() {
    if (cameraRef.current) {
      const fotoTirada = await cameraRef.current.takePictureAsync();

      // Foto atual
      setFoto(fotoTirada.uri);

      // Desafio 4 -> Guardar várias fotos no array
      setFotos((prevFotos) => [...prevFotos, fotoTirada.uri]);
    }
  }

  // =========================
  // DESAFIO 5 -> GALERIA
  // =========================
  if (mostrarGaleria) {
    return (
      <SafeAreaView style={styles.galeriaContainer}>
        <Text style={styles.tituloGaleria}>GALERIA</Text>

        <ScrollView contentContainerStyle={styles.galeria}>
          {fotos.map((item, index) => (
            <Image
              key={index}
              source={{ uri: item }}
              style={styles.fotoGaleria}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => setMostrarGaleria(false)}
        >
          <Text style={styles.textoBotao}>Voltar para câmera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // =========================
  // DESAFIO 2 -> MELHORAR LAYOUT
  // =========================
  if (foto) {
    return (
      <SafeAreaView style={styles.containerFoto}>
        <Text style={styles.tituloFoto}>Sua Foto</Text>

        <Image source={{ uri: foto }} style={styles.foto} />

        <View style={styles.areaFotoBotoes}>
          <TouchableOpacity
            style={styles.botaoNovaFoto}
            onPress={() => setFoto(null)}
          >
            <Text style={styles.textoBotao}>Nova Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoGaleria}
            onPress={() => setMostrarGaleria(true)}
          >
            <Text style={styles.textoBotao}>Abrir Galeria</Text>
          </TouchableOpacity>
        </View>
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

      {/* DESAFIO 3 -> CONTADOR DE FOTOS */}
      <View style={styles.contadorContainer}>
        <Text style={styles.contadorTexto}>
          Fotos tiradas: {fotos.length}
        </Text>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={trocarCamera}
        >
          <Text style={styles.textoBotao}>Trocar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoFoto}
          onPress={tirarFoto}
        >
          <Text style={styles.textoBotao}>Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoGaleria}
          onPress={() => setMostrarGaleria(true)}
        >
          <Text style={styles.textoBotao}>Galeria</Text>
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
    borderRadius: 12,
    marginTop: 20,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  areaBotoes: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  botaoSecundario: {
    backgroundColor: '#6b7280',
    padding: 15,
    borderRadius: 12,
    width: 100,
  },

  botaoFoto: {
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 12,
    width: 100,
  },

  botaoGaleria: {
    backgroundColor: '#9333ea',
    padding: 15,
    borderRadius: 12,
    width: 120,
  },

  // =========================
  // DESAFIO 2 -> FOTO
  // =========================
  containerFoto: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  tituloFoto: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  foto: {
    width: '100%',
    height: '65%',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },

  areaFotoBotoes: {
    marginTop: 20,
    width: '100%',
    gap: 15,
  },

  botaoNovaFoto: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
  },

  // =========================
  // DESAFIO 3 -> CONTADOR
  // =========================
  contadorContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  contadorTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // =========================
  // DESAFIO 5 -> GALERIA
  // =========================
  galeriaContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
  },

  tituloGaleria: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  galeria: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  fotoGaleria: {
    width: '48%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },
});