import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
//import email from 'react-native-email';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [emailAddress, setEmailAddress] = useState(''); 
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviarEmail = () => {
    if (!nome || !emailAddress || !mensagem) {
      Alert.alert('Por Favor', 'Preencha os campos obrigatórios.');
      return;
    }

    const to = ['contatorotaifpr@gmail.com']; 
    //email(to, {
      //subject: 'Contato via App',
      //body: `Nome: ${nome}\nEmail: ${emailAddress}\nTelefone: ${telefone}\nMensagem: ${mensagem}`
    //}).catch(console.error);

    setNome('');
    setEmailAddress('');
    setTelefone('');
    setMensagem('');
    Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
  };

  return (
    <ScrollView>
      <Header/>
      <View style={styles.linhaVermelha} />
      <View style={styles.banner}>
        <Image source={require("../assets/images/SouAluno/Faixa.png")} style={styles.bannerimg}/>
        <Text style={styles.bannerText}>Mural dos Estudantes</Text>
      </View>

      <View style={styles.informativo}>
        <Text style={styles.loginTitulo}> Envie sua Dúvida ou sugestão para nós. Assim que possível ela será respondida.</Text>
      </View>

      <View>
        <Text style={styles.descforms}>Nome:</Text><Text style={styles.descasterisco}>*</Text>
        <TextInput style={styles.emailforms} placeholder="Digite seu Nome" keyboardType="default" autoCapitalize="none" value={nome}  onChangeText={setNome}/>
        <Text style={styles.descforms}>E-mail:</Text><Text style={styles.descasterisco}>*</Text>
        <TextInput style={styles.emailforms} placeholder="Digite seu Email" keyboardType="email-address" autoCapitalize="none" value={emailAddress} onChangeText={setEmailAddress}/>
        <Text style={styles.descforms}>Telefone/Whatsapp:</Text><Text style={styles.descasteriscophone}>*</Text>
        <TextInput style={styles.emailforms} placeholder="Digite seu Telefone/Whatsapp" keyboardType="email-address" autoCapitalize="none" value={telefone} onChangeText={setTelefone}/>
        <Text style={styles.descforms}>Mensagem:</Text><Text style={styles.descasteriscomessage}>*</Text>
        <TextInput style={styles.emailforms} placeholder="Digite sua Mensagem" multiline keyboardType="default"  autoCapitalize="none" value={mensagem} onChangeText={setMensagem}/>
        <Text style={styles.descsenha}>Campos Obrigatórios</Text>
        <TouchableOpacity style={styles.botao} onPress={enviarEmail}>
          <Text style={styles.textobotao}>ENVIAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rodape}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: { 
    height: 87,
  },
  bannerimg: {
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
  tituloforms: {
    padding: 20,
    textAlign: "center",
    fontSize: 24,
    color: "black",
  },
  descforms: {
    margin: 5,
    fontSize: 20,
    color: "gray",
  },
  descsenha: {
    textAlign: "center",
    margin: 5,
    fontSize: 20,
    color: "red",
  },
  descasterisco: {
    margin: 5,
    marginTop: -34,
    marginLeft: 68,
    fontSize: 20,
    color: "red",
  },
  descasteriscophone: {
    margin: 5,
    marginTop: -34,
    marginLeft: 190,
    fontSize: 20,
    color: "red",
  },
  descasteriscomessage: {
    margin: 5,
    marginTop: -34,
    marginLeft: 115,
    fontSize: 20,
    color: "red",
  },
  emailforms: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    margin: 10,
    fontSize: 20,
  },
  botao: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "green",
    width: 150,
    padding: 10,
    borderRadius: 30,   
  },
  textobotao: {
    fontSize: 26,
    color: "white",
  },
  rodape: {
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
