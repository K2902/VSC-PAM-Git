import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { WebView } from 'react-native-webview';

export default function App() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);

  const [endereco, setEndereco] = useState(null);

  const [regiao, setRegiao] = useState({
    latitude: -21.9347,
    longitude: -50.5138,
  });

  const [mapKey, setMapKey] = useState(0);

  async function buscarCEP() {
    try {
      const cepLimpo = cep.replace(/\D/g, '');

      if (cepLimpo.length !== 8) {
        Alert.alert('Erro', 'Digite um CEP válido.');
        return;
      }

      setLoading(true);

      const respostaCEP = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const dadosCEP = await respostaCEP.json();

      console.log('ViaCEP:', dadosCEP);

      if (dadosCEP.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setLoading(false);
        return;
      }

      setEndereco(dadosCEP);

      const enderecoCompleto =
        `${dadosCEP.logradouro || ''} ` +
        `${dadosCEP.bairro || ''} ` +
        `${dadosCEP.localidade} ` +
        `${dadosCEP.uf} Brasil`;

      console.log('Endereço enviado:', enderecoCompleto);

      const url =
  `https://nominatim.openstreetmap.org/search?` +
  `q=${encodeURIComponent(enderecoCompleto)}` +
  `&format=jsonv2` +
  `&limit=1`;

console.log("URL Nominatim:", url);

const respostaGeo = await fetch(url, {
  headers: {
    Accept: "application/json",
    "User-Agent": "CEPApp/1.0"
  }
});

const textoResposta = await respostaGeo.text();

console.log("Resposta bruta:", textoResposta);

const dadosGeo = JSON.parse(textoResposta);

      console.log('Nominatim:', dadosGeo);

      if (!dadosGeo || dadosGeo.length === 0) {
        Alert.alert(
          'Aviso',
          'Não foi possível localizar este endereço.'
        );

        setLoading(false);
        return;
      }

      const latitude = parseFloat(dadosGeo[0].lat);
      const longitude = parseFloat(dadosGeo[0].lon);

      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);

      Alert.alert(
        'Coordenadas encontradas',
        `Latitude: ${latitude}\nLongitude: ${longitude}`
      );

      setRegiao({
        latitude,
        longitude,
      });

      // força recriação completa da WebView
      setMapKey(prev => prev + 1);

      setLoading(false);
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Falha ao consultar os serviços.'
      );

      setLoading(false);
    }
  }

  const mapaHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

iframe {
  border: none;
  width: 100%;
  height: 100%;
}
</style>
</head>

<body>

<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=${
    regiao.longitude - 0.01
  }%2C${
    regiao.latitude - 0.01
  }%2C${
    regiao.longitude + 0.01
  }%2C${
    regiao.latitude + 0.01
  }&layer=mapnik&marker=${
    regiao.latitude
  }%2C${regiao.longitude}">
</iframe>

</body>
</html>
`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        Consulta de CEP
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={9}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={buscarCEP}
      >
        <Text style={styles.textoBotao}>
          BUSCAR
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          style={{ marginVertical: 20 }}
        />
      )}

      <View style={styles.mapa}>
        <WebView
          key={`${mapKey}-${regiao.latitude}-${regiao.longitude}`}
          originWhitelist={['*']}
          source={{ html: mapaHTML }}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
        />
      </View>

      <View style={styles.coordenadas}>
        <Text>
          Latitude: {regiao.latitude}
        </Text>

        <Text>
          Longitude: {regiao.longitude}
        </Text>
      </View>

      {endereco && (
        <View style={styles.card}>
          <Text style={styles.tituloEndereco}>
            Endereço Encontrado
          </Text>

          <Text style={styles.label}>
            Rua: {endereco.logradouro || 'Não informado'}
          </Text>

          <Text style={styles.label}>
            Bairro: {endereco.bairro || 'Não informado'}
          </Text>

          <Text style={styles.label}>
            Cidade: {endereco.localidade}
          </Text>

          <Text style={styles.label}>
            Estado: {endereco.uf}
          </Text>

          <Text style={styles.label}>
            CEP: {endereco.cep}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 15,
  },

  botao: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  mapa: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    overflow: 'hidden',
  },

  coordenadas: {
    marginTop: 10,
    marginBottom: 10,
  },

  card: {
    marginTop: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },

  tituloEndereco: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});