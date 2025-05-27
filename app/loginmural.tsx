import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function LoginMural() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const [request, response, promptAsync] = Google.useAuthRequest({
  clientId: '1033696459638-82m028n9icrca9darv4v80asncub61li.apps.googleusercontent.com',
  androidClientId: '1033696459638-hub8cg9ee9e34e91rcp7r6k1nuq8b392.apps.googleusercontent.com',
  redirectUri: makeRedirectUri({
    scheme: 'rotaifpr', // usa o mesmo scheme definido no app.json
  }),
});

  useEffect(() => {
    if (response?.type === 'success') {
      setIsLoading(true);
      const { authentication } = response;
      if (authentication?.idToken) {
        const credential = GoogleAuthProvider.credential(authentication.idToken);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            const user = userCredential.user;
            Alert.alert('Sucesso', `Logado como: ${user.email}`, [
              { text: 'OK', onPress: () => router.push('/muraldosestudantes') }
            ]);
          })
          .catch((error) => {
            console.error('Erro ao logar com Google:', error);
            setLoginError("Erro ao logar com conta Google.");
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [response]);

  const handleLogin = () => {
    setLoginError('');
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        router.push('/muraldosestudantes');
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error.message);
        setLoginError('Email ou senha inválidos.');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login do mural dos estudantes</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {loginError ? <Text style={styles.erro}>{loginError}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textobotao}>Entrar com Email</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, !request && { backgroundColor: 'gray' }]}
        onPress={() => promptAsync()}
        disabled={!request || isLoading}
      >
        <Text style={styles.textobotao}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  textobotao: {
    color: '#fff',
    fontSize: 16,
  },
  erro: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});
