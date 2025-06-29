import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Header } from '@/components/Header';
import { router } from 'expo-router';
import { collection, query, where, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove, doc, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import { Camera, CameraView } from 'expo-camera';
import type { CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToCloudinary } from './cloudinary';

interface Mensagem {
  id: string;
  usuarioEmail: string;
  usuarioNome: string;
  usuarioFoto: string;
  mensagem: string;
  dataCriacao: { seconds: number; nanoseconds: number };
  fixadoPor?: string[];
  tipo?: 'texto' | 'imagem';
}

type Filtro = 'recentes' | 'antigas' | 'fixadas';

export default function LoginMural() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userEmail = user?.email || '';
  const userFoto = user?.photoURL || '';

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<Filtro>('recentes');
  const [modalCameraVisivel, setModalCameraVisivel] = useState(false);
  const [temPermissao, setTemPermissao] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [cameraType] = useState<CameraType>('back');

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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setTemPermissao(status === 'granted');
    })();
  }, []);

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
      console.log('Enviando mensagem com dados do usuário:', {
        email: authUser.email,
        nome: authUser.displayName,
        foto: authUser.photoURL
      });

      await addDoc(collection(db, "mensagens"), {
        usuarioEmail: authUser.email,
        usuarioNome: authUser.displayName || authUser.email?.split('@')[0] || '',
        usuarioFoto: authUser.photoURL || '',
        mensagem: novaMensagem,
        tipo: 'texto',
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

  const enviarImagemParaCloudinary = async (imageUri: string) => {
    const authUser = getAuth().currentUser;
    if (!authUser) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }
    
    try {
      console.log('Iniciando upload da imagem para Cloudinary:', imageUri);
      console.log('Dados do usuário:', {
        email: authUser.email,
        nome: authUser.displayName,
        foto: authUser.photoURL
      });
      
      const downloadURL = await uploadImageToCloudinary(imageUri);
      console.log('Upload para Cloudinary concluído:', downloadURL);
      
      await addDoc(collection(db, "mensagens"), {
        usuarioEmail: authUser.email,
        usuarioNome: authUser.displayName || authUser.email?.split('@')[0] || '',
        usuarioFoto: authUser.photoURL || '',
        mensagem: downloadURL,
        tipo: 'imagem',
        dataCriacao: new Date(),
        fixadoPor: [],
      });
      console.log('Mensagem salva no Firestore');
      
    } catch (error: any) {
      console.error('Erro detalhado no upload:', error);
      Alert.alert("Erro ao enviar imagem", `Erro: ${error.message}`);
    }
  };

  const tirarFoto = async () => {
    if (cameraRef.current) {
      try {
        console.log('Iniciando captura de foto...');
        const foto = await cameraRef.current.takePictureAsync({ 
          quality: 0.8,
          base64: false,
          exif: false
        });
        console.log('Foto capturada:', foto);
        setModalCameraVisivel(false);
        
        if (foto && foto.uri) {
          console.log('URI da foto:', foto.uri);
          await enviarImagemParaCloudinary(foto.uri);
        } else {
          Alert.alert('Erro ao tirar foto', 'Nenhuma foto capturada.');
        }
      } catch (error: any) {
        console.error('Erro detalhado:', error);
        Alert.alert('Erro ao tirar foto', `Erro: ${error.message}`);
      }
    } else {
      Alert.alert('Erro', 'Câmera não está disponível');
    }
  };

  const selecionarImagem = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        console.log('Imagem selecionada:', result.assets[0].uri);
        await enviarImagemParaCloudinary(result.assets[0].uri);
      } else {
        Alert.alert("Nenhuma imagem selecionada.");
      }
    } catch (error: any) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert("Erro ao selecionar imagem", error.message);
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

      const precisaAtualizar = !dados.usuarioNome || !dados.usuarioFoto || !dados.tipo;
      const eDoUsuarioAtual = dados.usuarioEmail === user.email;

      if (precisaAtualizar && eDoUsuarioAtual) {
        const ref = doc(db, "mensagens", documento.id);
        return updateDoc(ref, {
          usuarioNome: user.displayName || user.email?.split('@')[0] || '',
          usuarioFoto: user.photoURL || "",
          tipo: dados.tipo || (dados.mensagem.startsWith('http') ? 'imagem' : 'texto'),
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
    <View style={styles.container}>
      <View style={styles.headerFixo}>
        <Header />
        <View style={styles.linhaVermelha} />
        <View style={styles.banner}>
          <Image source={require("../assets/images/faixacinza.png")} style={styles.bannerimg} />
          <Text style={styles.bannerText}>Mural dos Estudantes</Text>
        </View>

        <View style={styles.informativo}>
          <View style={styles.botoes}>
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
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mensagensWrapper}>
          {mensagens.map((msg) => {
            const estaFixado = msg.fixadoPor?.includes(userEmail);
            const ehImagem = msg.tipo === 'imagem' || 
              (msg.mensagem && msg.mensagem.includes('cloudinary.com'));
            
            return (
              <View key={msg.id} style={styles.cartaoMensagem}>
                <View style={styles.cabecalhoMensagem}>
                  <View style={styles.usuarioInfo}>
                    <Text style={styles.emailUsuario}>
                      {msg.usuarioEmail}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => alternarFixado(msg)}>
                    <Ionicons name={estaFixado ? "star" : "star-outline"} size={24} color="gold" />
                  </TouchableOpacity>
                </View>

                {ehImagem ? (
                  <View style={styles.containerImagem}>
                    <Image 
                      source={{ 
                        uri: msg.mensagem,
                        headers: {
                          'Accept': 'image/*',
                        },
                      }} 
                      style={styles.imagemMensagem}
                      resizeMode="contain"
                      onError={(error) => {
                        console.warn('Erro ao carregar imagem:', msg.mensagem, error);
                      }}
                      onLoad={() => console.log('Imagem carregada com sucesso:', msg.mensagem)}
                    />
                  </View>
                ) : (
                  <Text style={styles.textoMensagem}>{msg.mensagem}</Text>
                )}

                <Text style={styles.dataMensagem}>
                  {new Date(msg.dataCriacao.seconds * 1000).toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva sua mensagem"
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />

        <TouchableOpacity style={styles.sendButton} onPress={enviarMensagem}>
          <Text style={styles.sendButtonText}>➔</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton} onPress={selecionarImagem}>
          <Text style={styles.sendButtonText}>📄</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton} onPress={() => setModalCameraVisivel(true)}>
          <Text style={styles.sendButtonText}>📷</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalCameraVisivel} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
          {temPermissao === null ? (
            <Text>Solicitando permissão para usar a câmera...</Text>
          ) : temPermissao === false ? (
            <Text>Permissão para câmera negada.</Text>
          ) : (
            <CameraView
              style={{ width: '100%', height: '80%' }}
              facing={cameraType}
              ref={cameraRef}
            />
          )}
          <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#2196F3', padding: 15, borderRadius: 10 }} onPress={tirarFoto}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Tirar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => setModalCameraVisivel(false)}>
            <Text style={{ color: 'white' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.rodape} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerFixo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
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
    alignSelf: "flex-end",
  },
  botoestexto: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
    marginRight: 30,
  },
  section: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
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
    marginTop: 10,
    backgroundColor: "#009F48",
    padding: 30,
  },
  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginHorizontal: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 280,
    paddingBottom: 100,
  },
  mensagensWrapper: {
    padding: 10,
    paddingBottom: 20,
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
    flex: 1,
  },
  fotoUsuario: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoUsuario: {
    flexDirection: 'column',
    flex: 1,
  },
  nomeUsuario: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  emailUsuario: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginRight: 5,
  },
  photoButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginLeft: 3,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagemMensagem: {
    width: 250,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
  },
  containerImagem: {
    marginTop: 10,
    alignItems: 'center',
  },
});
