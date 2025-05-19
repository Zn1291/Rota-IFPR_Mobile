import { Header } from "../components/Header";
import React from "react";
import { Text, View, StyleSheet, ImageBackground, Image, Button, TouchableOpacity } from "react-native";
import { Link, router } from 'expo-router';

export default function Index() {
  return (
    <>
      <Header/>
      <View style={{ flex: 1 }}>

        <View style={estilos.linhaVermelha} />

        <ImageBackground
          source={require("../assets/images/PáginaInicial/banner.png")}
          style={estilos.imgPagInicial}
        >
          <Image
            source={require("../assets/images/PáginaInicial/ROTA_IFPR.png")}
            style={estilos.rotaLogo}
          />

          <View style={estilos.conteudoPrincipal}>
            <View style={estilos.Opacidade}>
              <Text style={estilos.textoTitulo}>BEM VINDO AO ROTA IFPR</Text>
              <Text style={estilos.textoInicial}>
                Aqui você encontrará um guia completo para tudo o que precisa
                saber sobre o curso de gestão da Tecnologia da Informação (GTI).
              </Text>
              <Text style={estilos.textoInicial}>
                Se você é um aluno do IFPR Campus Pinhais ou está considerando se
                tornar um, aqui é o lugar certo para começar a sua jornada.
              </Text>
              <Text style={estilos.textoInicial}>
                Seja parte da comunidade GTI e construa o seu futuro conosco!
              </Text>

              <View style={estilos.section}>
              <TouchableOpacity onPress={() => router.push("/")}>
              <View style={estilos.Botoes}>
              <Image source={require("../assets/images/PáginaInicial/quero-ser.png")} style={estilos.imagembotoes}/> 
              <Text style={estilos.Botoestexto}>Quero Ser Aluno</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/sou_aluno")}>
              <View style={estilos.Botoes}>
              <Image source={require("../assets/images/PáginaInicial/sou-aluno.png")} style={estilos.imagembotoes}/> 
              <Text style={estilos.Botoestexto}> Sou Aluno</Text>
              </View>
              </TouchableOpacity>
              </View>

            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

/**Estilos usados na página */
const estilos = StyleSheet.create({
  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 1,
  },

  Botoes: {
    padding: 32,
    display: "flex",
    alignItems: "center",
  },

  Botoestexto: {
    backgroundColor: "#343434",
    borderRadius: 35,
    padding: 4,
    marginTop: 10,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: -30,
  },

  section: {
    flexDirection:"row",
    flexWrap: "wrap",
  },
  
  imgPagInicial: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  conteudoPrincipal: {
    marginTop: -20,
    alignItems: "center",
  },

  textoTitulo: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
  },

  textoInicial: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
    fontStyle: "italic",
  },

  Opacidade: {
    backgroundColor: "rgba(0, 0, 0 , 0.67)",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },

  rotaLogo: {
    width: 180,
    height: 180,
    marginBottom: 40
  },

  imagembotoes:{
  marginTop: 5,
  backgroundColor: "#343434",
  borderRadius: 50,
  width: 80,
  height: 80,
  },
});