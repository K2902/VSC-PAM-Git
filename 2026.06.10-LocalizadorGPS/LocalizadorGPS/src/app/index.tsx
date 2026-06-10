import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [cidade, setCidade] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [tipoMapa, setTipoMapa] = useState<
    'standard' | 'satellite' | 'hybrid'
  >('standard');

  const [regiao, setRegiao] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [localAtual, setLocalAtual] = useState<any>(null);

  useEffect(() => {
    obterLocalizacao();
  }, []);

  async function obterLocalizacao() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const novaRegiao = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    setRegiao(novaRegiao);
    setLocalAtual(novaRegiao);
  }

  async function buscarCidade() {
    if (!cidade.trim()) return;

    try {
      const resultado = await Location.geocodeAsync(cidade);
console.log(resultado);

      if (!resultado.length) {
        Alert.alert('Cidade não encontrada');
        return;
      }

      setRegiao({
        latitude: resultado[0].latitude,
        longitude: resultado[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch {
      Alert.alert('Erro ao buscar cidade');
    }
  }

  function salvarFavorito() {
    if (!cidade.trim()) return;

    if (!favoritos.includes(cidade)) {
      setFavoritos([...favoritos, cidade]);
    }
  }

  async function abrirFavorito(nomeCidade: string) {
    const resultado = await Location.geocodeAsync(nomeCidade);

    if (!resultado.length) return;

    setRegiao({
      latitude: resultado[0].latitude,
      longitude: resultado[0].longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  }

  function alterarMapa() {
    if (tipoMapa === 'standard') {
      setTipoMapa('satellite');
    } else if (tipoMapa === 'satellite') {
      setTipoMapa('hybrid');
    } else {
      setTipoMapa('standard');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Localizador GPS</Text>

      <TextInput
  style={styles.input}
  placeholder="Digite uma cidade"
  placeholderTextColor="#666"
  value={cidade}
  onChangeText={setCidade}
/>
      

      <Button title="Buscar Cidade" onPress={buscarCidade} />

      <View style={styles.espaco} />

      <Button
        title="Salvar nos Favoritos"
        onPress={salvarFavorito}
      />

      <View style={styles.espaco} />

      <Button
        title="Voltar para Minha Localização"
        onPress={() => localAtual && setRegiao(localAtual)}
      />

      <View style={styles.espaco} />

      <Button
        title={`Tipo: ${tipoMapa}`}
        onPress={alterarMapa}
      />

      <Text>
        Latitude: {regiao.latitude.toFixed(6)}
      </Text>

      <Text>
        Longitude: {regiao.longitude.toFixed(6)}
      </Text>

      {/* <MapView
        style={styles.mapa}
        region={regiao}
        mapType={tipoMapa}
      >
        <Marker coordinate={regiao} />
      </MapView> */}

      <MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
  showsUserLocation={true}
  showsMyLocationButton={true}
/>

      <Text style={styles.subtitulo}>Favoritos</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() => abrirFavorito(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  subtitulo: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },

input: {
  borderWidth: 1,
  borderColor: '#999',
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  backgroundColor: '#fff',
  color: '#000',
},  

  mapa: {
    width: '100%',
    height: 300,
    marginTop: 10,
    marginBottom: 10,   
  },

  espaco: {
    height: 10,
  },
});