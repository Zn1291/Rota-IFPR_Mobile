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
      <View style={styles.linhaVermelha} />
      <View style={styles.banner}>
        <Image source={require("../assets/images/SouAluno/Faixa.png")}  style={styles.bannerimg}/>
        <Text style={styles.bannerText}>Plataformas e Recursos</Text>
      </View>

      <View style={styles.section}>
      <View>

        <View>
        <Text style={styles.intro}>
          Descubra como aproveitar ao máximo as ferramentas e recursos oferecidos pelo IFPR. Acesse plataformas de ensino, obtenha suporte acadêmico e explore serviços essenciais para sua jornada educativa.
        </Text>

        </View>
        <Accordion title='Sistema Unificado de Administração Pública (SUAP)'>
        <Text style={styles.descritivo}>
        O SUAP (Sistema Unificado de Administração Pública) é o seu Campus Virtual, espaço onde você pode consultar e solucionar questões da sua vida acadêmica sem se preocupar em ir até à secretaria do IFPR. Anote o endereço e salve em seus favoritos:
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https:suap.ifpr.edu.br")} style={styles.botao}>
          <Text style={styles.textobotao}>
            ACESSE O SUAP
          </Text>
        </TouchableOpacity>
        <View style={styles.firstacess}>
        <Text style={styles.firstacesstitulo}>
        Primeiro acesso ao SUAP
        </Text>
        <Text style={styles.firstacesstext}>
        Com o número do seu CPF ou da sua matrícula em mãos, você já pode realizar o primeiro login no SUAP.
        No primeiro acesso você vai cadastrar uma senha. É simples, confira abaixo:
        </Text>
        <Text style={styles.firstacesstext}>
        1. Acesse o SUAP.
        </Text>
        <Text style={styles.firstacesstext}>
        2. Clique em Esqueceu ou deseja alterar sua senha?.
        </Text>
        <Text style={styles.firstacesstext}>
        3. Na tela seguinte, no campo Usuário digite sua Matrícula ou CPF sem ponto e traço.
        </Text>
        <Text style={styles.firstacesstext}>
        4. Confirme o CPF, marque a opção Não sou um robô e, em seguida, clique no botão Enviar.
        </Text>
        <Text style={styles.firstacesstext}>
        5. Você receberá um e-mail com as instruções para a criação da sua senha. Clique no link da mensagem e cadastre a senha conforme as orientações apresentadas.
        </Text>
        <Text style={styles.firstacesstext}> 
        Caso não receba o e-mail, verifique em sua caixa de spam.
        </Text>
        </View>
        
        </Accordion>

        <Accordion title='Ambiente Virtual de Aprendizagem (AVA)'>
        <Text style={styles.titulo}>
        Ambiente Virtual de Aprendizagem (AVA)
        </Text>
        <Text style={styles.descritivo}>
        O Ambiente Virtual de Aprendizagem do IFPR é uma plataforma digital onde você pode acessar conteúdos das disciplinas, participar de atividades interativas, acompanhar seu progresso e interagir com colegas e professores. Para acessar o conteúdo, você deverá ter em mãos uma Chave de inscrição fornecida pelo seu professor ou coordenador do curso.
        Após criada a conta, você terá acesso à sala do curso onde estará o conteúdo programático da disciplina.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://ava.ifpr.edu.br/login/index.php")} style={styles.botao}>
          <Text style={styles.textobotao}>
            ACESSE O AVA
          </Text>
        </TouchableOpacity>


        <Text style={styles.descritivo}>
        Caso não encontre sua sala, utilize os métodos de busca disponíveis, como, a Busca global no menu lateral direito e o catálogo de cursos que pode ser encontrado no menu superior "Como funciona o AVA".
        </Text>
        </Accordion>

        <Accordion title='E-mail Institucional'>
        <Text style={styles.descritivo}>
        O IFPR disponibiliza um e-mail institucional de estudante, gerado automaticamente na confirmação da sua matrícula acadêmica. O seu e-mail de estudante é composto da seguinte forma:
        </Text>
        <Text style={styles.descritivoemail}>
        numerodematricula@estudantes.ifpr.edu.br
        </Text>
        <Text style={styles.descritivo}>
        Você consegue atualizar a senha do seu e mail de estudante, de forma rápida e prática, diretamente pela Conta do Google.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&ec=GAlAwAE&hl=pt_BR&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S722285033%3A1746577450544442")} style={styles.botaoemail}>
        <Text style={styles.textobotao}>
        RECUPERAR SUA CONTA DO GOOGLE ESTUDANTE
        </Text>
        </TouchableOpacity>
        <Image source={require("../assets/images/senhagoogle.png")} style={styles.imagem}/>
        
        <Text style={styles.titulo}>
        Para recuperar sua senha ou fazer o 1º acesso:
        </Text>
        <Text style={styles.descritivo}>
        Digite seu e-mail institucional utilizando o seu número de matrícula, como no modelo acima.
        Clique em Esqueceu a senha.
        </Text>
        <Text style={styles.descritivo}>
        Você receberá um e-mail com o código de verificação para o e-mail informado durante a matrícula.
        Siga as orientações para definição da nova senha para o email institucional.
        </Text>
        <Text style={styles.descritivo}>
        Se não tiver acesso ao e-mail pessoal cadastrado ou este esteja incorreto, solicite a atualização na Secretaria Acadêmica do Campus e repita o processo após uma hora e meia da atualização no SUAP.
        </Text>
        <Text style={styles.descritivo}>
        Você pode usar o seu e-mail de estudante para acompanhar as notícias dos diversos Campus do Instituto Federal do Paraná ou para realizar o login em ferramentas como o Google Classroom.
        </Text>
        </Accordion>

        <Accordion title='Carteirinha Estudantil'>
        <Text style={styles.descritivo}>
        A Carteirinha Estudantil do IFPR é o seu passe para diversos benefícios e serviços. Com ela, você pode obter descontos em eventos culturais e de transporte. Garanta a sua e aproveite ao máximo todas as vantagens oferecidas!
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://ifpr.edu.br/pinhais/institucional/area-do-aluno/carteirinha-estudantil/")} style={styles.botao}>
          <Text style={styles.textobotao}>
          OBTENHA A SUA 
          </Text>
        </TouchableOpacity>
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

  intro:{
    backgroundColor: "white",
    marginTop: 30,
    padding: 20,
    fontSize: 16,
    textAlign: "justify",
  },

  descritivo:{
    fontSize: 18,
    textAlign: "justify",
  },

  descritivoemail:{
    fontSize: 18,
    color: "blue",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 15,
    marginBottom: 15,
    margin: 3,
  },

  botoes:{
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    alignSelf: "center",
  },

  botao:{
    width:150,
    margin:5,
    backgroundColor: "#333",
    borderRadius: 15,
    padding:10,
    alignSelf: "center",
  },

  botaoemail:{
    width:360,
    margin:5,
    backgroundColor: "#333",
    borderRadius: 15,
    padding:10,
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
    fontSize: 13,
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

  titulo:{
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  firstacesstext:{
    textAlign: "justify",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 16,
  },

  section: {
    marginBottom: 50,
  },
  
  rodape:{
    backgroundColor: "#009F48",
    padding: 30,
  },

  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 1,
  },

  imagem:{
    alignSelf: "center",
    width: 360,
    height: 150,
  },

  firstacess:{
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

});
