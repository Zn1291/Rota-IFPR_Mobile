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
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 20,

  },
  header: {
    padding: 15,
    backgroundColor: '#009F48',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
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
      <View style={styles.linhaVermelha} />
      <Image source={require("../assets/images/QueroSerAluno/Capa.png")}  style={styles.bannerimg}/>
      <View style={styles.banner}>
        <Image source={require("../assets/images/SouAluno/Faixa.png")}  style={styles.bannerimg}/>
        <Text style={styles.bannerText}>Seja bem Vindo desde Já!</Text>
      </View>

      <View style={styles.section}>
      <View>
        <Accordion title='Quero saber Sobre o Curso'>
        <Text style={styles.descritivo}>
          O Curso oferecido pelo IFPR - Câmpus Pinhais, é uma excelente oportunidade para quem deseja ingressar na área de tecnologia com uma formação sólida e atualizada. Este curso de grau tecnólogo tem duração de 3 anos e é oferecido na modalidade presencial, com aulas no período noturno, das 19h às 22h40 de segunda a sexta-feira.
        </Text>
        <Text style={styles.descritivo}>
          Durante o curso, os alunos adquirem conhecimentos teóricos e práticos em diversas áreas da tecnologia da informação, incluindo administração de sistemas, redes de computadores, desenvolvimento de software e gestão de projetos de TI. 
          O currículo é cuidadosamente estruturado para preparar os alunos para os desafios do mercado de trabalho e para promover a inovação tecnológica nas organizações.
        </Text>
        <Text style={styles.descritivo}>
          Para mais detalhes sobre o conteúdo programático e disciplinas oferecidas, confira a Matriz Curricular do Curso logo abaixo.
        </Text>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textobotao}>MATRIZ CURRICULAR</Text>
        </TouchableOpacity>
        </Accordion>
      </View>


      <View>
        <Accordion title='Quero saber sobre o Processo Seletivo'>
        <Text style={styles.descritivo}>
          O processo seletivo ocorre uma vez por ano, geralmente no segundo semestre.  Após inscrição no GOV.BR, você pode se inscrever no Portal do Candidato IFPR.
          A seleção se dá com base na sua nota no Exame Nacional do Ensino Médio (ENEM) de qualquer ano de 2015 a 2024.
        </Text>
        <Text style={styles.descritivo}>
          Se interessou, veja o vídeo abaixo:
        </Text>
        <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: 'https://www.youtube.com/embed/_6rlFKRJdPU' }}
        />
        </View>
        <Text style={styles.descritivo}>
          Para saber mais sobre datas, inscrições e acesso a tutoriais, visite a página do Processo Seletivo.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://ifpr.edu.br/estude-conosco/processo-seletivo-graduacao/")} style={styles.botao}>
          <Text style={styles.textobotao}>Processos Seletivos</Text>
        </TouchableOpacity>

        </Accordion>
      </View>

      <Accordion title='Quero saber sobre Transferência'>
      <View>
        <Text style={styles.descritivo}>
          As transferências permitem que estudantes matriculados em cursos de mesma oferta e nível, tanto no IFPR quanto em outras instituições de ensino, ingressem no curso de Gestão da Tecnologia da Informação sem a necessidade de passar pelo Processo Seletivo convencional. Os editais de transferência são lançados duas vezes ao ano: no final do primeiro semestre e no final do segundo semestre. Esses editais contêm todas as informações necessárias sobre o processo, incluindo prazos, documentos requeridos e critérios de elegibilidade.
        </Text>
        <Text style={styles.descritivo}>
        A transferência é uma excelente oportunidade para estudantes que desejam mudar de instituição ou curso, continuando seus estudos sem interrupção. Se você está interessado em transferir-se para o nosso curso, fique atento aos editais publicados no site do IFPR e garanta que toda a documentação necessária esteja pronta para envio. Para mais informações sobre o processo de transferência e para acessar os editais, visite a tag Processos Seletivos na página oficial do IFPR.
        </Text>
      </View>
      </Accordion>
    </View>
    <View style={styles.rodape}>
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

  videoContainer: {
  height: 220,
  width: '100%',
  marginVertical: 20,
  paddingHorizontal: 10,
  },

  video: {
    flex: 1,
  },

  descritivo:{
    fontSize: 18,
    textAlign: "justify",
  },

  botao:{
    width:100,
    margin:5,
    backgroundColor: "#333",
    borderRadius: 15,
    padding:5,
    alignSelf: "center",
  },

  textobotao:{
    color: "white",
    textAlign: "center",
    alignContent: "center",
  },

  section: {
    marginBottom: 50,
  },
  
  rodape:{
    marginTop: 10,
    backgroundColor: "#009F48",
    padding: 30,
  },

  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 1,
  },

  link: {
    backgroundColor: '#009F48',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },

  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
