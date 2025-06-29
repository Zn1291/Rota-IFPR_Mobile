import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, TextInput, Alert, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function LoginMural() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  }

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoginError(null);
    if (!email || !senha) {
      setLoginError("Por favor, preencha email e senha.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log('Usuário logado com sucesso:', user.email);

      Alert.alert('Sucesso', `Login realizado com o email: ${user.email}`, [
        { text: 'OK', onPress: () => router.push('/muraldosestudantes') }
      ]);

    } catch (error: any) {
      console.error('Erro ao fazer login:', error);

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError("Email ou senha inválidos.");
      } else if (error.code === 'auth/invalid-email') {
        setLoginError("Formato de email inválido.");
      }
      else {
        setLoginError("Erro ao tentar login. Tente novamente.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Image source={require("../assets/images/SouAluno/Faixa.png")}  style={styles.bannerimg}/>
          <Text style={styles.bannerText}>Mural dos Estudantes</Text>
        </View>

        <View style={styles.informativo}>
          <View>
            <Text style={styles.loginTitulo}> Informe seu email acadêmico e senha para acessar o Mural dos Estudantes</Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={styles.tituloforms}>LOGIN</Text>

            {loginError ? <Text style={styles.errorMessage}>{loginError}</Text> : null}

            <Text style={styles.descforms}>Login: (Email Institucional) </Text>
            <TextInput
              style={styles.emailforms}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.descforms}>Senha: </Text>
            <TextInput
              style={styles.senhaforms}
              placeholder="Digite sua senha"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons style={styles.senhaicon} name={mostrarSenha ? 'eye-off' : 'eye'} size={28} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/redefinirsenhamural")}>
              <Text style={styles.descsenha}>Esqueceu sua senha?</Text>
              <Text style={styles.descsenha}>Precisa cadastar uma conta?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={handleLogin}>
              <Text style={styles.textobotao}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoDireto} onPress={() => router.push('/muraldosestudantes')}>
              <Text style={styles.textobotaoDireto}>Acesso Direto ao Mural</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.rodape}>      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  banner:{
    height:87,
  },
  bannerimg:{
    width: '100%',
    height:89,
    resizeMode: 'cover',
    position: 'absolute',
  },
  bannerText: {
    marginLeft: 30,
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    position: 'relative',
    zIndex: 1,
  },

  informativo: {
    backgroundColor: '#E2E2E2',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding: 20,
    marginTop: -2,
  },

  loginTitulo: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    marginBottom: 5,
    lineHeight: 26,
  },

  tituloforms:{
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 24,
    color: "black",
    fontWeight: 'bold',
  },

  descforms:{
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    color: "gray",
  },

  descsenha:{
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "gray",
  },

  emailforms:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginHorizontal: 10,
    padding: 10,
    fontSize: 18,
  },

  senhaforms:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginHorizontal: 10,
    padding: 10,
    fontSize: 18,
  },

  senhaicon:{
    marginTop: -40,
    marginRight: 20,
    alignSelf: 'flex-end',
    zIndex: 1,
  },

  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
  },

  botao:{
    marginTop: 15,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "black",
    width: 250,
    padding: 12,
    borderRadius: 30,
  },

  textobotao:{
    fontSize: 18,
    color:"white",
    fontWeight: 'bold',
  },

  botaoDireto: {
    marginTop: 15,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "black",
    width: 250,
    padding: 12,
    borderRadius: 30,
  },

  textobotaoDireto: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
  },

  rodape:{
    backgroundColor: "#009F48",
    padding: 30,
  },
});
