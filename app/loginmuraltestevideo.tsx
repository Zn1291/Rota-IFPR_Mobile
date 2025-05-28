import React, { useState, useEffect } from 'react';
import { Text, Button } from 'react-native';
import {GoogleSignin, User, isSuccessResponse} from "@react-native-google-signin/google-signin";


export default function LoginMural() {
  const [auth, setAuth] = useState<User | null> (null)

  async function handleGoogleSignIn(){
    try{
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if(isSuccessResponse(response))
        console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  return(
    <Button title="LOGAR COM GOOGLE" onPress={handleGoogleSignIn}/>
  )
  }

