import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Botao from '../components/Botao';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5B21B6" />

      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>📲</Text>
        </View>
        <Text style={styles.logoText}>DevGram</Text>
        <Text style={styles.tagline}>A rede social da turma</Text>
        <Text style={styles.descricao}>
          Compartilhe seus aprendizados, poste sobre as aulas{'\n'}e conecte-se com seus colegas.
        </Text>
      </View>

      <View style={styles.footer}>

        <Botao
          titulo="Entrar na conta"
          onPress={() => navigation.navigate('Login')}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <Botao
          titulo="Criar conta grátis"
          variante="secundario"
          onPress={() => navigation.navigate('Registro')}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C3AED',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoIcon: {
    fontSize: 48,
  },
  logoText: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontWeight: '500',
  },
  descricao: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 22,
  },
  footer: {
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 28,
    paddingBottom: 36,
    gap: 12,
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 4,
  },
  badgeText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  rodape: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
});
