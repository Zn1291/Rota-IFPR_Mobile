import { Header } from "../components/Header";
import React from "react";
import { Text, View, StyleSheet, ImageBackground, Image, Button } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <>
      <Header/>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Bem-vindo ao app!</Text>
          <Link href="/sou_aluno" asChild>
            <Button title="Ir para Sou Aluno" />
          </Link>
        </View>

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
              <Text style={estilos.textoTitulo}>Bem Vindo ao Rota IFPR</Text>
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
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  botao: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#005f46",
    borderRadius: 5,
  },

  imgPagInicial: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  conteudoPrincipal: {
    alignItems: "center",
  },

  textoTitulo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
  },

  textoInicial: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
    fontStyle: "italic",
  },

  Opacidade: {
    backgroundColor: "rgba(0, 0, 0 , 0.5)",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },

  rotaLogo: {
    width: 140,
    height: 140,
    marginBottom: 40
  },
});