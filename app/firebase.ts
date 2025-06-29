import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbAQ6AlD9Z1CT5j5aoIVu5anwqhGS3wCE",
  authDomain: "rotaifpr.firebaseapp.com",
  projectId: "rotaifpr",
  storageBucket: "rotaifpr.firebasestorage.app",
  messagingSenderId: "1033696459638",
  appId: "1:1033696459638:web:5acc31894d9993e9cf9857",
  measurementId: "G-WZLK3NRW3E"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exporta os serviços
export { auth, db, storage };

// Componente React para compatibilidade com Expo Router
import React, { useEffect } from 'react';

const FirebaseProvider: React.FC = () => {
  useEffect(() => {
    // Garante que o Firebase seja inicializado quando o componente for montado
    console.log('Firebase inicializado no provider');
  }, []);

  return null; // Este componente não renderiza nada, apenas garante que o Firebase seja inicializado
};

export default FirebaseProvider;