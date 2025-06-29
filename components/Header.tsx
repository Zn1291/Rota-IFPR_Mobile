import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Menu } from "./Menu";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

const HEADER_HEIGHT = 70;

const estilos = StyleSheet.create({
  headerContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    elevation: 10,
  },
  estiloHeader: {
    backgroundColor: "#fff",
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 0,
  },
  logoifprInicial: {
    width: 200,
    height: 90,
    resizeMode: "contain",
  },
  menuIcone: {
    padding: 10,
  },
  linhaVermelha: {
    height: 3,
    backgroundColor: "red",
    width: '100%',
  },
});

export const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <>
      <View style={estilos.headerContainer}>
        <View style={estilos.estiloHeader}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Image
              source={require("../assets/images/PáginaInicial/IFPR_PINHAIS.png")}
              style={estilos.logoifprInicial}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={estilos.menuIcone}>
            <Ionicons name="menu-outline" size={32} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={estilos.linhaVermelha} />
      </View>
      {menuVisible && <Menu onClose={toggleMenu} />}
    </>
  );
};
