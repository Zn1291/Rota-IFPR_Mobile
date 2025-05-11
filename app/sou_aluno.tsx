import React from 'react';
import { Header } from '@/components/Header';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';

export default function SouAluno() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView>
      <Header />
      <View  style={styles.banner}>
        <Image source={require("../assets/images/SouAluno/Faixa.png")}  style={styles.bannerimg}/>
        <Text style={styles.bannerText}>Espaço do Aluno</Text>
      </View>

        <View style={styles.acesso}>
         
          <View>
          <Text style={styles.acessoTitulo}>Acesso rápido</Text>
          </View>
          
          <View style={styles.link}>
          <Botao texto="Grade Horária" url="https://ifpr.edu.br/pinhais/institucional/area-do-aluno/horario-de-aulas-e-atendimento/"/>
          <Botao texto="Calendário Acadêmico" url="https://ifpr.edu.br/pinhais/institucional/area-do-aluno/calendario-academico/" />
          <Botao texto="SUAP" url="https://suap.ifpr.edu.br/" />
          <Botao texto="AVA" url="https://ava.ifpr.edu.br/" />
          </View>

        </View>

      <View style={styles.section}> {/* SESSÃO DE BOTÕES */}
        <View style={styles.botaoprincipal}> {/* BOTÃO PRINCIPAL */}
        <Image source={require("../assets/images/SouAluno/Muralestudantes.png")} style={styles.imagem}/>
        <Text>MURAL DOS ESTUDANTES</Text>
        </View>
      </View>
  
      {/* BOTÕES SECUNDÁRIOS*/}
      <View style={styles.secondarysection}>
      <View style={styles.blocobotoes}>
         <Image source={require("../assets/images/SouAluno/manual.png")} style={styles.imagem}/>
        <Text>MANUAL DO ALUNO</Text>
      </View>

      <View style={styles.blocobotoes}>
        <Image source={require("../assets/images/SouAluno/plataformas.png")} style={styles.imagem}/>
        <Text>PLATAFORMAS</Text>
      </View>

      <View style={styles.blocobotoes}>
        <Image source={require("../assets/images/SouAluno/bibliotecas.png")} style={styles.imagem}/>
        <Text>BIBLIOTECA</Text>
      </View>

      <View style={styles.blocobotoes}>
        <Image source={require("../assets/images/SouAluno/atendimento.png")} style={styles.imagem}/>
        <Text>ATENDIMENTO</Text>
      </View>
    </View>

    </ScrollView>
  );
}

type BotaoProps = {
  texto: string;
  url: string;
};

function Botao({ texto, url }: BotaoProps) {
  return (
    <TouchableOpacity style={styles.link} onPress={() => Linking.openURL(url)}>
      <Text style={styles.linkText}>{texto}</Text>
    </TouchableOpacity>
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

  acesso: {
    backgroundColor: '#343434',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding: 20,
  },

  acessoTitulo: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 5,
  },

  link: {
    alignSelf: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 5,
    borderRadius: 50,
    marginLeft: 10,
  },

  linkText: {
    alignContent: "center",
    fontSize: 12,
    wordWrap: "break-word",
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },

  section: {
    padding: 20,
  },
  
  botaoprincipal: {
    padding:10,
    alignItems: "center",
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: -30,
  },

  imagem:{
    width:80,
    height:80,
  },

  secondarysection: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },

  blocobotoes: {
    display: "flex",
    alignItems: "center",
    width: 180,
    padding:10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
    marginRight: 5,
  },

  bloco: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

});
