import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';

export default function App() {
  const [paisDigitado, setPaisDigitado] = useState('');
  const [letra, setLetra] = useState('');
  const [pais, setPais] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function buscarPais() {
    if (paisDigitado.trim() === '') {
      setErro('Digite o nome de um país.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      const resposta = await fetch(
        `https://restcountries.com/v3.1/name/${paisDigitado}?fullText=true`
      );

      if (!resposta.ok) {
        throw new Error();
      }

      const dados = await resposta.json();

      setPais(dados[0]);
    } catch {
      setErro('País não encontrado.');
      setPais(null);
    } finally {
      setCarregando(false);
    }
  }

  async function buscarPaisAleatorio() {
  try {
    setCarregando(true);
    setErro('');

    const resposta = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,latlng,subregion,population,languages,currencies,maps'
    );

    if (!resposta.ok) {
      throw new Error('Erro na API');
    }

    const dados = await resposta.json();
    console.log(dados)

    // Filtra apenas países válidos
    const paisesValidos = dados.filter(
      (p) =>
        p?.name?.common &&
        p?.flags?.png
    );

    // Sorteia um país
    const indiceAleatorio = Math.floor(
      Math.random() * paisesValidos.length
    );

    const aleatorio = paisesValidos[indiceAleatorio];

    console.log('País sorteado:', aleatorio.name.common);

    setPais(aleatorio);
  } catch (error) {
    console.log('ERRO:', error);

    setErro('Erro ao buscar país aleatório.');
    setPais(null);
  } finally {
    setCarregando(false);
  }
}

  async function buscarPorLetra() {
    if (letra.trim() === '') {
      setErro('Digite uma letra.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      const resposta = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,latlng,subregion,population,languages,currencies,maps');

      const dados = await resposta.json();

      const filtrados = dados.filter((p) =>
        p.name.common
          .toLowerCase()
          .startsWith(letra.toLowerCase())
      );

      if (filtrados.length === 0) {
        throw new Error();
      }

      const aleatorio =
        filtrados[Math.floor(Math.random() * filtrados.length)];

      setPais(aleatorio);
    } catch {
      setErro('Nenhum país encontrado com essa letra.');
      setPais(null);
    } finally {
      setCarregando(false);
    }
  }

  function formatarNumero(numero) {
    return Number(numero).toLocaleString('pt-BR');
  }

  function obterIdiomas() {
    if (!pais?.languages) return 'Não informado';

    return Object.values(pais.languages).join(', ');
  }

  function obterMoedas() {
    if (!pais?.currencies) return 'Não informado';

    return Object.values(pais.currencies)
      .map(
        (moeda) =>
          `${moeda.name} (${moeda.symbol || 'Sem símbolo'})`
      )
      .join(', ');
  }

  function obterFronteiras() {
    if (!pais?.borders) return 'Nenhuma';

    return pais.borders.join(', ');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🌎 Guia de Países</Text>

      <Text style={styles.subtitulo}>
        Explore países do mundo usando a API REST Countries
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o país em inglês"
        value={paisDigitado}
        onChangeText={setPaisDigitado}
      />

      <TouchableOpacity style={styles.botao} onPress={buscarPais}>
        <Text style={styles.textoBotao}>Buscar País</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoAleatorio}
        onPress={buscarPaisAleatorio}
      >
        <Text style={styles.textoBotao}>
          🎲 País Aleatório
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Digite uma letra (Ex: B)"
        value={letra}
        onChangeText={setLetra}
        maxLength={1}
      />

      <TouchableOpacity
        style={styles.botaoLetra}
        onPress={buscarPorLetra}
      >
        <Text style={styles.textoBotao}>
          🔤 País Aleatório por Letra
        </Text>
      </TouchableOpacity>

      {carregando && (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{ marginTop: 20 }}
        />
      )}

      {erro !== '' && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      {pais && (
        <View style={styles.card}>
          <Image
            source={{ uri: pais.flags.png }}
            style={styles.bandeira}
          />

          <Text style={styles.emoji}>
            {pais.flag}
          </Text>

          <Text style={styles.nomePais}>
            {pais.name.common}
          </Text>

          <Text style={styles.nomeOficial}>
            {pais.name.official}
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.info}>
              🏛 Capital: {pais.capital?.[0] || 'Não informado'}
            </Text>

            <Text style={styles.info}>
              🌍 Região: {pais.region}
            </Text>

            <Text style={styles.info}>
              🧭 Sub-região: {pais.subregion || 'Não informado'}
            </Text>

            <Text style={styles.info}>
              👥 População:{' '}
              {formatarNumero(pais.population)}
            </Text>

            <Text style={styles.info}>
              📏 Área: {formatarNumero(pais.area)} km²
            </Text>

            <Text style={styles.info}>
              🗣 Idiomas: {obterIdiomas()}
            </Text>

            <Text style={styles.info}>
              💰 Moedas: {obterMoedas()}
            </Text>

            <Text style={styles.info}>
              ⏰ Fuso horário:{' '}
              {pais.timezones?.join(', ')}
            </Text>

            <Text style={styles.info}>
              🌐 Domínio:{' '}
              {pais.tld?.join(', ') || 'Não informado'}
            </Text>

            <Text style={styles.info}>
              🚧 Fronteiras: {obterFronteiras()}
            </Text>

            <Text style={styles.info}>
              ⚽ FIFA: {pais.fifa || 'Não informado'}
            </Text>

            <Text style={styles.info}>
              🗺 Coordenadas:{' '}
              {pais.latlng?.join(', ')}
            </Text>

            <Text style={styles.info}>
              🌐 Independente:: {' '}
              {pais.independent ? 'Sim' : 'Não'}
            </Text>
          </View>

          {pais.maps?.googleMaps && (
            <TouchableOpacity
              style={styles.botaoMapa}
              onPress={() =>
                Linking.openURL(pais.maps.googleMaps)
              }
            >
              <Text style={styles.textoBotao}>
                Abrir no Google Maps
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
  },

  subtitulo: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
    color: '#475569',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  botaoAleatorio: {
    backgroundColor: '#7C3AED',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  botaoLetra: {
    backgroundColor: '#EA580C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  erro: {
    color: '#DC2626',
    marginTop: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginTop: 25,
    borderRadius: 18,
    padding: 20,
    elevation: 5,
  },

  bandeira: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 15,
  },

  emoji: {
    fontSize: 50,
    textAlign: 'center',
  },

  nomePais: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F172A',
  },

  nomeOficial: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 20,
  },

  infoBox: {
    gap: 10,
  },

  info: {
    fontSize: 16,
    color: '#334155',
  },

  botaoMapa: {
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
});
