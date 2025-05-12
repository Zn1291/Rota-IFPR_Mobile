import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, TextInput, Alert, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';



export default function LoginMural() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  }
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleLogin = () => {
  Alert.alert('Login', `Email: ${email}\nSenha: ${senha}`);
  }  

  return (
    <ScrollView>
      <Header/>
      <View style={styles.linhaVermelha} />
      <View style={styles.banner}>
        <Image source={require("../assets/images/SouAluno/Faixa.png")}  style={styles.bannerimg}/>
        <Text style={styles.bannerText}>Mural dos Estudantes</Text>
      </View>

        <View style={styles.informativo}>
          <View>
          <Text style={styles.loginTitulo}> Informe seu email acadêmico e senha para acessar o Mural dos Estudantes</Text>
          </View>
        </View>

      <View > 
        <View> 
          <Text style={styles.tituloforms}>LOGIN</Text>
          <Text style={styles.descforms}>Login: (Email Institucional) </Text>
          <TextInput style={styles.emailforms} placeholder="Digite seu e-mail" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail}/>
          <Text style={styles.descforms}>Senha: </Text>
          <TextInput style={styles.senhaforms} placeholder="Digite sua senha" secureTextEntry={!mostrarSenha}
 value={senha} onChangeText={setSenha}/>
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Ionicons style={styles.senhaicon} name={mostrarSenha ? 'eye-off' : 'eye'} size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/redefinirsenhamural")}>
          <Text style={styles.descsenha}>Esqueci minha Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textobotao}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => router.push("/muraldosestudantes")}>
            <Text style={styles.textobotao}>[BETA - ACESSAR MURAL] </Text>
          </TouchableOpacity>
        </View>
      </View>
  
    <View style={styles.rodape}>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner:{ 
    height:87,
  },
  bannerimg:{
    width: 415,
  },
  bannerText: {
    marginLeft: 30,
    marginTop: -60,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  informativo: {
    backgroundColor: '#E2E2E2',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding: 20,
  },

  loginTitulo: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },

  tituloforms:{
    padding:20,
    textAlign: "center",
    fontSize: 24,
    color: "black",
  },

  descforms:{
    margin: 10,
    fontSize: 20,
    color: "gray",
  },

  descsenha:{
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    color: "gray",
  },

  emailforms:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    margin: 10,
    fontSize: 20,
  },

  senhaforms:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    margin: 10,
    fontSize: 20,
  },

  senhaicon:{
    marginTop: -48,
    marginLeft: 360,
  },

  botao:{
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "green",
    width: 150,
    padding: 10,
    borderRadius: 30,   
  },

  textobotao:{
    fontSize: 26,
    color:"white",
  },

  rodape:{
    marginTop: 50,
    backgroundColor: "#009F48",
    padding: 30,
  },

  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 1,
  },

});