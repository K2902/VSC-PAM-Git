import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Botao from '../components/Botao';
import { login, buscarUsuarioLogado } from '../storage/devgramStorage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function verificarSessao() {
      const usuario = await buscarUsuarioLogado();
      if (usuario) {
        navigation.replace('Home');
      }
    }
    verificarSessao();
  }, []);

  async function entrar() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha seu email e senha.');
      return;
    }

    setCarregando(true);
    try {
      await login(email.trim().toLowerCase(), senha);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#5B21B6" />

      <View style={styles.header}>
        <Text style={styles.logoText}>DevGram</Text>
        <Text style={styles.subtitulo}>Entre na sua conta</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            placeholderTextColor="#9CA3AF"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <View style={styles.botaoWrap}>
            <Botao
              titulo={carregando ? 'Entrando...' : 'Entrar'}
              onPress={entrar}
            />
          </View>
        </View>

        <View style={styles.rodapeRow}>
          <Text style={styles.rodapeTexto}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.rodapeLink}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.voltarBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltarTexto}>← Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#7C3AED',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 36,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingTop: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  botaoWrap: {
    marginTop: 4,
  },
  rodapeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  rodapeTexto: {
    color: '#6B7280',
    fontSize: 15,
  },
  rodapeLink: {
    color: '#7C3AED',
    fontSize: 15,
    fontWeight: '700',
  },
  voltarBtn: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  voltarTexto: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});
