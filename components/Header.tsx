import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Menu } from "./Menu";
import { useState } from "react";

const estilos = StyleSheet.create({
  estiloHeader: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  logoifprInicial: {
    width: 80,
    height: 95,
  },

  bar: {
    width: 25,
    height: 3,
    backgroundColor: "#333",
    marginVertical: 2,
  },

  menuIcone: {
    padding: 10,
  },
});

export const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <>
      <View style={estilos.estiloHeader}>
        <Image
          source={require("../assets/images/PáginaInicial/ifpr-reduzido.png")}
          style={estilos.logoifprInicial}
        />
        <TouchableOpacity onPress={toggleMenu} style={estilos.menuIcone}>
          <View style={estilos.bar} />
          <View style={estilos.bar} />
          <View style={estilos.bar} />
        </TouchableOpacity>
      </View>
      {menuVisible && <Menu onClose={toggleMenu} />}
    </>
  );
};
