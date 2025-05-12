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
          <Text style={styles.redefinirTitulo}> O Rota IFPR utiliza a mesma senha da conta google.</Text>
          <Text style={styles.redefinirtexto}> Como o Rota utiliza a mesma senha do email Estudantil do IFPR, caso você tenha esquecido sua senha você pode redefinir direto na página de login do Google.</Text>
          <Text style={styles.redefinirtexto}>Precisa redefinir sua senha do google?</Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&ec=GAlAwAE&hl=pt_BR&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S722285033%3A1746577450544442")}>
            <Text style={styles.botaogoogle}>Clique Aqui</Text>  
          </TouchableOpacity>
          </View>
          <Image source={require("../assets/images/senhagoogle.png")} style={styles.imagem}/>
          <Text style={styles.redefinirtexto}>Após redefinir sua senha clique no botão abaixo para voltar a tela de login e acessar o Mural dos Estudantes</Text>
          <TouchableOpacity onPress={() => router.push("/murallogin")}>
          <Text style={styles.botao}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.firstacess}>
        <Text style={styles.redefinirTitulo}> Não sabe qual é seu email Institucional?</Text>
        <Text style={styles.redefinirtexto}> Não se preocupa, o Rota te ajuda, navegue até a página de Plataformas clicando no botão abaixo que lá te explicamos como conseguir fazer o 1º acesso no email</Text>
        <TouchableOpacity onPress={() => router.push("/plataformaserecursos")}>
          <Text style={styles.botao}>Plataformas e Recursos</Text>
        </TouchableOpacity>
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

  redefinirTitulo: {
    textAlign: "center",
    fontSize: 24,
    color: "#26764D",
    marginBottom: 5,
  },

  redefinirtexto: {
    textAlign: "center",
    fontSize: 16,
    color: "blaxk",
    marginBottom: 10,
  },

  imagem:{
    alignSelf: "center",
    height: 160,
    width: 380,
    margin: 15,
    borderWidth: 1,
    borderColor: "gray",
  },

  botao:{
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "green",
    width: 150,
    padding: 10,
    borderRadius: 30,   
  },

  botaogoogle:{
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#343434",
    width: 150,
    padding: 10,
    borderRadius: 30,   
  },

  textobotao:{
    fontSize: 26,
    color:"white",
  },

  firstacess:{
    marginTop: 30,
    marginBottom: -30,
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