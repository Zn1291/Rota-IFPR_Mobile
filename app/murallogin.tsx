import React, { useState } from 'react';
import { Header } from '@/components/Header'; // Certifique-se de que este caminho está correto para o seu Header
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, TextInput, Alert, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Importa o ícone para mostrar/esconder senha (verifique se @expo/vector-icons está instalado)
import { router } from 'expo-router'; // Importa o roteador

// --- IMPORTAÇÕES DO FIREBASE PARA LOGIN ---
import { signInWithEmailAndPassword } from 'firebase/auth'; // Função específica para login
import { auth } from './firebase'; // Importa a instância 'auth' que você exportou no firebase.tsx
// --- FIM DAS IMPORTAÇÕES DO FIREBASE PARA LOGIN ---

export default function LoginMural() {
  // Função para abrir links externos (mantida, mas não diretamente relacionada ao login Firebase)
  const openLink = (url: string) => {
    Linking.openURL(url);
  }

  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para mostrar/esconder senha
  const [email, setEmail] = useState(''); // Estado para o valor do email
  const [senha, setSenha] = useState(''); // Estado para o valor da senha
  const [loginError, setLoginError] = useState<string | null>(null); // Estado para exibir erros de login

  // --- FUNÇÃO DE LOGIN COM FIREBASE ---
  const handleLogin = async () => { // Tornamos a função assíncrona para esperar a resposta do Firebase
    setLoginError(null); // Limpa qualquer erro anterior ao tentar logar
    if (!email || !senha) { // Verifica se os campos estão vazios
      setLoginError("Por favor, preencha email e senha.");
      return; // Interrompe a execução se campos vazios
    }

    try {
      // Chama a função de login do Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);

      // Se o login for bem-sucedido (a linha acima não lançou erro):
      const user = userCredential.user; // Obtém as informações do usuário logado
      console.log('Usuário logado com sucesso:', user.email); // Log para confirmar no console

      // Exibe um alerta de sucesso e, APÓS o usuário clicar em OK, navega para a tela do mural
      Alert.alert('Sucesso', `Login realizado com o email: ${user.email}`, [
        { text: 'OK', onPress: () => router.push('/muraldosestudantes') } // Navega para a rota '/muraldosestudantes'
      ]);

    } catch (error: any) { // Captura qualquer erro que ocorra durante a chamada signInWithEmailAndPassword
      console.error('Erro ao fazer login:', error); // Loga o erro completo no console

      // Trata os erros específicos do Firebase Auth e define a mensagem de erro para exibição na UI
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError("Email ou senha inválidos.");
      } else if (error.code === 'auth/invalid-email') {
        setLoginError("Formato de email inválido.");
      }
      else {
        // Para outros erros não esperados do Firebase Auth
        setLoginError("Erro ao tentar login. Tente novamente.");
      }
    }
  };
  // --- FIM DA FUNÇÃO DE LOGIN COM FIREBASE ---


  return (
    <ScrollView>
      {/* Componente de Cabeçalho */}
      <Header/>
      {/* Linha decorativa */}
      <View style={styles.linhaVermelha} />
      {/* Seção do Banner */}
      <View style={styles.banner}>
        {/* Imagem do Banner */}
        <Image source={require("../assets/images/SouAluno/Faixa.png")}  style={styles.bannerimg}/>
        {/* Texto sobre o banner */}
        <Text style={styles.bannerText}>Mural dos Estudantes</Text>
      </View>

      {/* Seção Informativa */}
      <View style={styles.informativo}>
        <View>
          {/* Título informativo */}
          <Text style={styles.loginTitulo}> Informe seu email acadêmico e senha para acessar o Mural dos Estudantes</Text>
        </View>
      </View>

      {/* --- SEÇÃO DO FORMULÁRIO DE LOGIN COM FIREBASE --- */}
      <View >
        <View>
          {/* Título do formulário */}
          <Text style={styles.tituloforms}>LOGIN</Text>

          {/* Exibe a mensagem de erro aqui se houver */}
          {loginError ? <Text style={styles.errorMessage}>{loginError}</Text> : null}

          {/* Campo de Email */}
          <Text style={styles.descforms}>Login: (Email Institucional) </Text>
          <TextInput
            style={styles.emailforms}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail} // Atualiza o estado 'email' ao digitar
          />

          {/* Campo de Senha */}
          <Text style={styles.descforms}>Senha: </Text>
          <TextInput
            style={styles.senhaforms}
            placeholder="Digite sua senha"
            secureTextEntry={!mostrarSenha} // Alterna visibilidade da senha
            value={senha}
            onChangeText={setSenha} // Atualiza o estado 'senha' ao digitar
          />
          {/* Botão para mostrar/esconder senha */}
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Ionicons style={styles.senhaicon} name={mostrarSenha ? 'eye-off' : 'eye'} size={28} color="#000" />
          </TouchableOpacity>

          {/* Link "Esqueci minha Senha" */}
          <TouchableOpacity onPress={() => router.push("/redefinirsenhamural")}>
            <Text style={styles.descsenha}>Esqueci minha Senha</Text>
          </TouchableOpacity>

          {/* Botão principal "Entrar" que CHAMA A LÓGICA DE LOGIN COM FIREBASE */}
          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textobotao}>Entrar</Text>
          </TouchableOpacity>

          {/* Botão BETA - Apenas navega para a tela do mural sem logar (útil para desenvolvimento/teste da tela mural) */}
          {/* Este botão pode ser removido em produção */}
          <TouchableOpacity style={styles.botao} onPress={() => router.push("/muraldosestudantes")}>
            <Text style={styles.textobotao}>[BETA - ACESSAR MURAL] </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* --- FIM DA SEÇÃO DO FORMULÁRIO DE LOGIN COM FIREBASE --- */}

    {/* Seção do Rodapé */}
    <View style={styles.rodape}>
    </View>

    </ScrollView>
  );
}

// --- OBJETO DE ESTILOS COMPLETO ---
const styles = StyleSheet.create({
  // Estilos do Banner
  banner:{
    height:87,
  },
  bannerimg:{
    width: '100%', // Use '100%' para cobrir a largura da tela
    height:89,
    resizeMode: 'cover', // Garante que a imagem cubra a área
    position: 'absolute', // Para o texto ficar por cima
  },
  bannerText: {
    marginLeft: 30,
    marginTop: 20, // Ajuste para o texto ficar centralizado verticalmente no banner
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    position: 'relative', // Para o texto ficar por cima
    zIndex: 1, // Garante que o texto fique acima da imagem
  },

  // Estilos da Seção Informativa
  informativo: {
    backgroundColor: '#E2E2E2',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding: 20,
    marginTop: -2, // Ajuste para encostar na linha vermelha
  },

  loginTitulo: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },

  // Estilos do Formulário de Login
  tituloforms:{
    paddingTop: 20, // Espaçamento no topo
    paddingBottom: 10, // Espaçamento em baixo
    textAlign: "center",
    fontSize: 24,
    color: "black",
  },

  descforms:{
    marginHorizontal: 10, // Espaçamento lateral
    marginTop: 10, // Espaçamento superior
    marginBottom: 5, // Espaçamento inferior
    fontSize: 20,
    color: "gray",
  },

  descsenha:{
    textAlign: "center",
    marginVertical: 10, // Espaçamento vertical
    fontSize: 20,
    color: "gray",
  },

  emailforms:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginHorizontal: 10, // Espaçamento lateral
    padding: 10, // Espaçamento interno
    fontSize: 20,
  },

  senhaforms:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginHorizontal: 10, // Espaçamento lateral
    padding: 10, // Espaçamento interno
    fontSize: 20,
  },

  senhaicon:{
    marginTop: -45, // Ajuste para posicionar o ícone sobre o campo de senha
    marginRight: 20, // Espaçamento da direita
    alignSelf: 'flex-end', // Alinha o ícone à direita
    zIndex: 1, // Garante que o ícone fique sobre o campo de texto
  },

  errorMessage: { // Estilo para a mensagem de erro
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10, // Espaço antes dos inputs
    fontSize: 16,
  },

  // Estilos dos Botões (Entrar, BETA)
  botao:{
    marginTop: 15, // Espaçamento superior
    display: "flex",
    alignItems: "center",
    alignSelf: "center", // Centraliza o botão na horizontal
    backgroundColor: "#009F48", // Cor verde (como no rodapé original)
    width: 250, // Aumentado para comportar ambos os textos dos botões
    padding: 12, // Aumentado o padding para maior área de clique
    borderRadius: 30,
  },

  textobotao:{
    fontSize: 22, // Ajustado o tamanho da fonte
    color:"white",
    fontWeight: 'bold', // Adicionado negrito
  },

  // Estilos do Rodapé
  rodape:{
    marginTop: 30, // Espaço entre a última seção e o rodapé
    backgroundColor: "#009F48",
    padding: 40, // Aumentado o padding
  },

  // Estilo da Linha Vermelha
  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 0, // Borda de ponta a ponta
  },
});
