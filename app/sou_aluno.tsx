import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function SouAluno() {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Sou Aluno</Text>
      </View>

      {/* Blocos */}
      <View style={styles.section}>
        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Estude</Text>
          <Text style={styles.blocoTexto}>Acesse os principais sistemas e ferramentas para estudar</Text>
          <View style={styles.botoes}>
            <Botao texto="Moodle" url="https://ead.ifpr.edu.br/" />
            <Botao texto="Classroom" url="https://classroom.google.com/" />
            <Botao texto="Biblioteca" url="https://biblioteca.ifpr.edu.br/" />
            <Botao texto="Catálogo de Cursos" url="https://www.ifpr.edu.br/cursos/catalogo/" />
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Comunique-se</Text>
          <Text style={styles.blocoTexto}>Fique por dentro das notícias, comunicados e informações</Text>
          <View style={styles.botoes}>
            <Botao texto="E-mail institucional" url="https://mail.google.com/" />
            <Botao texto="Ouvidoria" url="https://www.ifpr.edu.br/ouvidoria/" />
            <Botao texto="Redes Sociais" url="https://www.instagram.com/ifpr.oficial/" />
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.blocoTitulo}>Aproveite</Text>
          <Text style={styles.blocoTexto}>Veja os benefícios disponíveis para você aproveitar</Text>
          <View style={styles.botoes}>
            <Botao texto="Restaurante Estudantil" url="https://www.ifpr.edu.br/estudante/restaurante/" />
            <Botao texto="Bolsa Permanência" url="https://www.ifpr.edu.br/bolsas/" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Botao({ texto, url }) {
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
      gap: 30,
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
      gap: 10,
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
  