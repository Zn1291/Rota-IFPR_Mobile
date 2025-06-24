import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Header } from '@/components/Header';
import { router } from 'expo-router';
import { collection, query, where, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove, doc, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';

interface Mensagem {
  id: string;
  usuarioEmail: string;
  usuarioNome: string;
  usuarioFoto: string;
  mensagem: string;
  dataCriacao: { seconds: number; nanoseconds: number };
  fixadoPor?: string[];
}

type Filtro = 'recentes' | 'antigas' | 'fixadas';

export default function LoginMural() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userEmail = user?.email || '';
  const userNome = user?.displayName || 'Usuário';
  const userFoto = user?.photoURL || '';

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<Filtro>('recentes');

  useEffect(() => {
    let q;

    if (filtroSelecionado === 'fixadas' && userEmail) {
      q = query(
        collection(db, 'mensagens'),
        where('fixadoPor', 'array-contains', userEmail),
        orderBy('dataCriacao', 'desc')
      );
    } else {
      q = query(
        collection(db, 'mensagens'),
        orderBy('dataCriacao', filtroSelecionado === 'antigas' ? 'asc' : 'desc')
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista: Mensagem[] = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() } as Mensagem);
      });
      setMensagens(lista);
    });

    return () => unsubscribe();
  }, [filtroSelecionado, userEmail]);

  const enviarMensagem = async () => {
    const authUser = getAuth().currentUser;

    if (!authUser) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    if (!novaMensagem.trim()) {
      Alert.alert("Erro", "Digite uma mensagem antes de enviar.");
      return;
    }

    try {
      await addDoc(collection(db, "mensagens"), {
        usuarioEmail: authUser.email,
        usuarioNome: authUser.displayName || 'Usuário',
        usuarioFoto: authUser.photoURL || '',
        mensagem: novaMensagem,
        dataCriacao: new Date(),
        fixadoPor: [],
      });
      setNovaMensagem('');
    } catch (e: any) {
      Alert.alert("Erro ao enviar mensagem", e.message);
    }
  };

  const alternarFixado = async (mensagem: Mensagem) => {
    const ref = doc(db, "mensagens", mensagem.id);
    const estaFixado = mensagem.fixadoPor?.includes(userEmail);

    try {
      await updateDoc(ref, {
        fixadoPor: estaFixado
          ? arrayRemove(userEmail)
          : arrayUnion(userEmail),
      });
    } catch (e: any) {
      Alert.alert("Erro ao atualizar fixação", e.message);
    }
  };

  const renderBotaoFiltro = (label: string, tipo: Filtro) => (
    <TouchableOpacity
      style={[styles.botao, filtroSelecionado === tipo && styles.botaoAtivo]}
      onPress={() => setFiltroSelecionado(tipo)}
    >
      <Text style={styles.botoefilter}>{label}</Text>
    </TouchableOpacity>
  );

  async function atualizarMensagensAntigas() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.warn("Usuário não autenticado.");
      return;
    }

    const mensagensRef = collection(db, "mensagens");
    const snapshot = await getDocs(mensagensRef);

    const atualizacoes = snapshot.docs.map(async (documento) => {
      const dados = documento.data();

      const precisaAtualizar = !dados.usuarioNome || !dados.usuarioFoto;
      const eDoUsuarioAtual = dados.usuarioEmail === user.email;

      if (precisaAtualizar && eDoUsuarioAtual) {
        const ref = doc(db, "mensagens", documento.id);
        return updateDoc(ref, {
          usuarioNome: user.displayName || "Usuário",
          usuarioFoto: user.photoURL || "",
        });
      }
    });

    await Promise.all(atualizacoes);
    console.log("Mensagens atualizadas com sucesso.");
  }

  useEffect(() => {
  atualizarMensagensAntigas();
}, []);

  return (
    <ScrollView>
      <Header />
      <View style={styles.linhaVermelha} />
      <View style={styles.banner}>
        <Image source={require("../assets/images/faixacinza.png")} style={styles.bannerimg} />
        <Text style={styles.bannerText}>Mural dos Estudantes</Text>
      </View>

      <View style={styles.informativo}>
        <View style={styles.botoes}>
          <TouchableOpacity>
            <Text style={styles.botoestexto}> Meus dados</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/murallogin")}>
            <Text style={styles.botoestexto}> Sair do Mural</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        {renderBotaoFiltro('Mais recentes', 'recentes')}
        {renderBotaoFiltro('Mais antigas', 'antigas')}
        {renderBotaoFiltro('Fixadas', 'fixadas')}
      </View>

      <ScrollView style={styles.mensagensContainer}>
        <View style={{ padding: 10 }}>
          {mensagens.map((msg) => {
            const estaFixado = msg.fixadoPor?.includes(userEmail);
            return (
              <View key={msg.id} style={styles.cartaoMensagem}>
              <View style={styles.cabecalhoMensagem}>
                <View style={styles.usuarioInfo}>
                  <Image
                    source={{ uri: msg.usuarioFoto || 'https://via.placeholder.com/30' }}
                    style={styles.fotoUsuario}
                  />
                  <Text style={styles.nomeUsuario}>
                    {msg.usuarioNome || msg.usuarioEmail}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => alternarFixado(msg)}>
                  <Ionicons name={estaFixado ? "star" : "star-outline"} size={24} color="gold" />
                </TouchableOpacity>
              </View>
              <Text style={styles.textoMensagem}>{msg.mensagem}</Text>
              <Text style={styles.dataMensagem}>
                {new Date(msg.dataCriacao.seconds * 1000).toLocaleString()}
              </Text>
            </View>
            );
        })}
      </View>
    </ScrollView>

      <TextInput
        placeholder="Escreva sua mensagem"
        value={novaMensagem}
        onChangeText={setNovaMensagem}
        style={{ borderWidth: 1, margin: 10, padding: 8 }}
      />
      <Button title="Enviar" onPress={enviarMensagem} />

      <View style={styles.rodape} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: { height: 87 },
  bannerimg: { width: 415, height: 89 },
  bannerText: {
    marginLeft: 30,
    marginTop: -60,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  informativo: {
    backgroundColor: '#E2E2E2',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  botoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
  },
  botoestexto: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
    marginRight: 30,
  },
  section: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 10,
    justifyContent: 'center',
  },
  botao: {
    marginHorizontal: 5,
    backgroundColor: "gray",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  botaoAtivo: {
    backgroundColor: "#007B55",
  },
  botoefilter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  rodape: {
    marginTop: 50,
    backgroundColor: "#009F48",
    padding: 30,
  },
  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 1,
  },

  mensagensContainer: {
  flex: 1,
},
cartaoMensagem: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
  marginHorizontal: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3,
},
cabecalhoMensagem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
usuarioInfo: {
  flexDirection: 'row',
  alignItems: 'center',
},
fotoUsuario: {
  width: 35,
  height: 35,
  borderRadius: 17.5,
  marginRight: 10,
},
nomeUsuario: {
  fontWeight: 'bold',
  fontSize: 16,
},
textoMensagem: {
  marginTop: 6,
  fontSize: 15,
  color: '#333',
},
dataMensagem: {
  marginTop: 4,
  fontSize: 12,
  color: 'gray',
  textAlign: 'right',
},

});
