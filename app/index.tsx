import React from 'react'
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ImageBackground, Linking } from "react-native";

export default function Index() {
  return (
    <>
    {/** Header da página principal*/}
    <View style={estilos.estiloHeader}> 
      <Image source={require('../assets/images/PáginaInicial/ifpr-reduzido.png')}
      style={estilos.logoifprInicial}/>
      <View style={estilos.Botoes}>
          <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textoBotao}>Sou Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textoBotao}>Quero Ser Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textoBotao}>Contato</Text>
          </TouchableOpacity>
        </View>
    </View>
    <View style={estilos.linhaVermelha}/>

    {/**Body da página inicial */}
    <ImageBackground source={require('../assets/images/PáginaInicial/banner.png')}
      style={estilos.imgPagInicial}>
      <View style={estilos.conteudoPrincipal}>
        <View style={estilos.Opacidade}>
        <Text style={estilos.textoTitulo}>Bem Vindo ao Rota IFPR</Text>
        <Text style={estilos.textoInicial}>
          Aqui você encontrará um guia completo para tudo o que precisa saber sobre o curso de gestão
          da Tecnologia da Informação (GTI).
          </Text>
          <Text style={estilos.textoInicial}>
            Se você é um aluno do IFPR Campus Pinhais ou está considerando se tornar um, aqui é o lugar
            certo para começar a sua jornada.
          </Text>
          <Text style={estilos.textoInicial}>
            Seja parte da comunidade GTI e construa o seu futuro conosco!
          </Text>
        </View>
      </View>
    </ImageBackground>

    <View style={estilos.linhaVermelha}/>

    {/**Footer */}
    <View style={estilos.footer}>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ifpr.oficial/')}>
        <Image source={require('../assets/images/Plataformas/instagram.png')} style={estilos.icone}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/REITORIAIFPR/?locale=pt_BR')}>
        <Image source={require('../assets/images/PáginaInicial/FACEBOOK.png')} style={estilos.icone}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://ifpr.edu.br/pinhais/')}>
        <Image source={require('../assets/images/PáginaInicial/IFPR_LOGO.png')} style={estilos.icone}/>
      </TouchableOpacity>
    </View>
    </>
  );
}

/**Estilos usados na página */
const estilos = StyleSheet.create({
  estiloHeader: {
    backgroundColor: '#fff', 
    padding: 10, 
    flexDirection: 'row', 
    alignItems:'center', 
    justifyContent: 'space-between',
    flexWrap: 'wrap'},

  logoifprInicial: {
    width: 80, 
    height: 95},

  linhaVermelha: {
    height: 2, 
    backgroundColor: 'red', 
    marginHorizontal: 1},

  Botoes: {
    flexDirection: 'row', 
    alignItems: 'center',
    flexWrap: 'wrap'},

  textoBotao: {
    color: '#fff', 
    fontSize: 12, 
    fontWeight: 'bold'},

  botao: {
    marginLeft: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    backgroundColor: '#005f46', 
    borderRadius: 5},

  imgPagInicial: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  conteudoPrincipal: {
    alignItems: 'center'
  },

  textoTitulo:{
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },

  textoInicial:{
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
  },

  Opacidade:{
    backgroundColor: 'rgba(0, 0, 0 , 0.5)',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20
  },

  footer:{
    backgroundColor:'#666666',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  icone:{
    width: 30,
    height: 30
  }
})