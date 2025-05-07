import React from 'react';
import { Header } from '@/components/Header';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';

export default function SouAluno() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Espaço do Aluno</Text>
      </View>

      <View style={styles.section}>
        
        <View style={styles.bloco}>
          
          <Text style={styles.blocoTitulo}>Acesso rápido</Text>
          <Text style={styles.blocoTexto}>Acesse os principais sistemas e ferramentas para estudar</Text> 
          <Botao texto="Grade Horária" url="https://ifpr.edu.br/pinhais/institucional/area-do-aluno/horario-de-aulas-e-atendimento/" />
          <Botao texto="Calendário Acadêmico" url="https://ifpr.edu.br/pinhais/institucional/area-do-aluno/calendario-academico/" />
          <Botao texto="SUAP" url="https://suap.ifpr.edu.br/" />
          <Botao texto="AVA" url="https://ava.ifpr.edu.br/" />
      
        </View>
      
      </View>

      <View>
        <Text>MURAL DOS ESTUDANTES</Text>
        <Text>MANUAL DO ALUNO</Text>
        <Text>PLATAFORMAS E RECURSOS</Text>
        <Text>BIBLIOTECAS</Text>
        <Text>EMAILS E ATENDIMENTO</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  banner: {
    height: 200,
    backgroundColor: '#00B050',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    padding: 20,
  },
  bloco: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 30, // substituindo gap
  },
  blocoTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  blocoTexto: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  link: {
    backgroundColor: '#747373',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    margin: 5,
  },
  linkText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
