import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { makeRedirectUri } from 'expo-auth-session';

console.log(makeRedirectUri());

const firebaseConfig = {
  apiKey: "AIzaSyAbAQ6AlD9Z1CT5j5aoIVu5anwqhGS3wCE",
  authDomain: "rotaifpr.firebaseapp.com",
  projectId: "rotaifpr",
  storageBucket: "rotaifpr.firebasestorage.app",
  messagingSenderId: "1033696459638",
  appId: "1:1033696459638:web:5acc31894d9993e9cf9857",
  measurementId: "G-WZLK3NRW3E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Persistência em memória (não mantém login após fechar o app)

export { auth };
