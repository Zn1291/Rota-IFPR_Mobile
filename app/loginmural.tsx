import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';

export default function LoginGoogleTest() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'SEU_CLIENT_ID_WEB.apps.googleusercontent.com', // substitua aqui
      offlineAccess: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      Alert.alert('Login com Google', `Bem-vindo(a) ${userInfo.user.name}`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelado');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login em andamento');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Serviços do Google Play não disponíveis ou desatualizados');
      } else {
        Alert.alert('Erro no login', error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleGoogleSignIn} style={{ padding: 15, backgroundColor: '#4285F4', borderRadius: 8 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Login com Google</Text>
      </TouchableOpacity>

      {user && <Text style={{ marginTop: 20 }}>Usuário logado: {user.user.email}</Text>}
    </View>
  );
}