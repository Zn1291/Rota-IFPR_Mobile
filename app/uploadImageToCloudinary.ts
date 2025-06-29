export async function uploadImageToCloudinary(uri: string): Promise<string> {
    const data = new FormData();
  
    data.append("file", {
      uri,
      name: "upload.jpg",
      type: "image/jpeg",
    } as any); // 👈 necessário para tipos do React Native
  
    data.append("upload_preset", "ml_default");
  
    const res = await fetch("https://api.cloudinary.com/v1_1/dtmhyyf4o/image/upload", {
      method: "POST",
      body: data,
    });
  
    if (!res.ok) {
      throw new Error("Erro ao fazer upload para Cloudinary");
    }
  
    const json = await res.json();
  
    if (!json.secure_url) {
      throw new Error("Resposta do Cloudinary não contém URL");
    }
  
    return json.secure_url;
  }

// Componente React para compatibilidade com Expo Router
import React from 'react';

const UploadImageProvider: React.FC = () => {
  return null; // Este componente não renderiza nada, apenas garante que o upload seja inicializado
};

export default UploadImageProvider;