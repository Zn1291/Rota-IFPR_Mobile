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
      <View style={styles.banner}>
        <Image source={require("../assets/images/faixacinza.png")}  style={styles.bannerimg}/>
        <Text style={styles.bannerText}>Mural dos Estudantes</Text>
      </View>

        <View style={styles.informativo}>
          <View style={styles.botoes}>
          <TouchableOpacity>
          <Text style={styles.botoestexto}> Meus dados</Text>  
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/murallogin")}>
          <Text style={styles.botoestexto}> Sair do Mural</Text>
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botoefilter}>Recentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botoefilter}>Antigas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botoefilter}>Fixados</Text>  
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
    height:89,
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
  },
  
  botoes:{
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    display: "flex",
    alignSelf: "center",
  },

  botoestexto:{
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
    marginRight: 30,
  },

  section:{
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
  },

  botao:{
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "gray",
    width: 120,
    margin: 5,
    marginLeft: 10,
    borderRadius: 30,   
  },

  botoefilter:{
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
    marginRight: 15,
  },

  rodape:{
    marginTop: 485,
    backgroundColor: "#009F48",
    padding: 30,
  },

});