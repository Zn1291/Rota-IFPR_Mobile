import React  from 'react';
import { Header } from '@/components/Header';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, } from 'react-native';
import { WebView } from 'react-native-webview';


function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={accordionStyles.container}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={accordionStyles.header}>
        <Text style={accordionStyles.title}>{title}</Text>
      </TouchableOpacity>
      {expanded && <View style={accordionStyles.content}>{children}</View>}
    </View>
  );
}

const accordionStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 40,
    borderRadius: 15,
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
    elevation: 2,

  },
  header: {
    padding: 15,
    backgroundColor: '#009F48',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
    padding: 15,
    backgroundColor: '#fff',
  },
});



export default function QueroSerAluno() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView> 
      <Header/>
      <Image 
        source={require("../assets/images/MatrizCurricular/bibli.png")} 
        accessibilityLabel="Biblioteca" 
        style={styles.bannerimg} 
      />
      <View style={styles.banner}>
        <Image source={require("../assets/images/SouAluno/Faixa.png")}  style={styles.bannerimg}/>
        <Text style={styles.bannerText}>Bibliotecas</Text>
      </View>

      <View style={styles.section}>
      <View>
        <Accordion title='Biblioteca do Campus Pinhais'>
        <Text style={styles.descritivo}>
        A biblioteca do IFPR Pinhais é um espaço dinâmico e acolhedor que vai muito além de um simples acervo de livros do campus. Aqui, você encontra ambientes de estudo confortáveis e bem equipados, tanto para uso individual quanto para grupos, promovendo um ambiente propício para a leitura e a realização de projetos.
        </Text>
        <Text style={styles.descritivo}>
         Nosso horário de funcionamento é de segunda a sexta-feira, das 08h00 às 20h00, garantindo amplo acesso aos recursos e serviços oferecidos.
        </Text>
        <Text style={styles.descritivo}>
        </Text>
        
        <Text style={{textAlign: "center", fontWeight: "bold"}}>CONTEÚDO</Text>
        <View style={styles.botoes}>
        <TouchableOpacity onPress={() => Linking.openURL("https://docs.google.com/spreadsheets/d/1q0Fh4VAwX_Nj3b_2uEQD-7zBQGXVz3W5iOHk-0r7Pxk/edit#gid=996102884")} style={styles.botao}>
          <Text style={styles.textobotao}>CONSULTA AO ACERVO</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://ifpr.edu.br/pinhais/institucional/secretaria-academica/secretaria-academica/")} style={styles.botao}>
          <Text style={styles.textobotao}>RENOVAÇÃO ONLINE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://ifpr.edu.br/pinhais/institucional/secretaria-academica/secretaria-academica/")} style={styles.botao}>
          <Text style={styles.textobotao}>TEMPLATE PARA TRABALHOS</Text>
        </TouchableOpacity>
        </View>

        <Text style={{textAlign: "center", fontWeight: "bold"}}>CONTATO</Text>
        <View style={styles.botoes}>
        <TouchableOpacity onPress={() => Linking.openURL("mailto:biblioteca.pinhais@ifpr.edu.br")} style={styles.botao}>
          <Text style={styles.textobotao}>EMAIL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/bibliotecapinhaisifpr")} style={styles.botao}>
          <Text style={styles.textobotao}>INSTAGRAM</Text>
        </TouchableOpacity>
        </View>
        </Accordion>
      </View>

      <Image source={require("../assets/images/MatrizCurricular/biblivirtual.png")} accessibilityLabel="Biblioteca" style={styles.secondaryimg}/>

      <View>
        <Accordion title='Biblioteca Virtual'>
        <Text style={styles.descritivo}>
        A Biblioteca Virtual do IFPR complementa e expande a experiência da nossa biblioteca física. Disponível 24 horas por dia, nossa plataforma digital oferece uma vasta coleção de e-books. Aproveite o conforto da sua casa ou qualquer outro lugar para continuar seus estudos e pesquisas.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://plataforma.bvirtual.com.br/")} style={styles.botaobibli}>
          <Text style={styles.textobotaobibli}>Biblioteca Virtual</Text>
        </TouchableOpacity>

        <View style={styles.fisrtacess}>
        <Text style={styles.firstacesstitulo}>
          Como acessar a Biblioteca Virtual?
        </Text>
        <Text style={styles.firstacesstext}>
        1. Você precisa estar cadastrado na Biblioteca no campus e saber seu login e senha.
        </Text>
        <Text style={styles.firstacesstext}>
        2. Acesse biblioteca.ifpr.edu.br. ("Botão Roxo acima")
        </Text>
        <Text style={styles.firstacesstext}>
        3. Pesquise por um e-book e clique no cadeado ao lado do resultado.
        </Text>
        <Text style={styles.firstacesstext}>
        4. Na janela pop-up preencha com login e senha da Biblioteca do campus.
        </Text>
        <Text style={styles.firstacesstext}>
        5. Você será redirecionado para a Biblioteca Virtual, siga as instruções para realizar seu cadastro.
        </Text>
        <Text style={styles.firstacesstext}>
        Prontinho! Agora você pode escolher como prefere acessar a Biblioteca Virtual.
        </Text>
        </View>


        </Accordion>
      </View>


    </View>
    <View style={styles.rodape}>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner:{ 
  },
  bannerimg:{
    width: 415,
  },

  secondaryimg:{
    width: 415,
    marginTop: 30,
  },

  bannerText: {
    marginLeft: 30,
    marginTop: -60,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  descritivo:{
    fontSize: 18,
    textAlign: "justify",
  },

  botoes:{
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    alignSelf: "center",
  },

  botao:{
    width:100,
    margin:5,
    backgroundColor: "#333",
    borderRadius: 15,
    padding:5,
    alignSelf: "center",
  },

  botaobibli:{
    width:150,
    margin: 5,
    backgroundColor: "#945EE0",
    borderRadius: 25,
    padding:15,
    alignSelf: "center",
  },

  textobotao:{
    fontSize: 10,
    color: "white",
    fontWeight:"bold",
    textAlign: "center",
    alignContent: "center",
  },

  textobotaobibli:{
    fontSize: 15,
    color: "white",
    fontWeight:"bold",
    textAlign: "center",
    alignContent: "center",
  },

  fisrtacess:{
    marginTop: 20,
    backgroundColor: "#C7EABF",
    margin: -15,
  },

  firstacesstitulo:{
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  firstacesstext:{
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
  },

  section: {
    marginBottom: 50,
  },
  
  rodape:{
    backgroundColor: "#009F48",
    padding: 30,
  },
});
