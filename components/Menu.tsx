import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {router} from 'expo-router';


export const Menu = (props: { onClose: () => void }) => {
  return (
    <>
      <View style={estilos.menuLateral}>
        <TouchableOpacity style={estilos.close} onPress={props.onClose}>
          <AntDesign name="closecircleo" size={36} color="black" />
        </TouchableOpacity>
        <View style={estilos.linha}/>
        <View style={estilos.menuItensContainer}>
          <TouchableOpacity onPress={() => router.push("/sou_aluno")} style={estilos.menuItem}>
            <Text style={estilos.menuPrincipal}>Sou Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/murallogin")} style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Mural dos Estudantes </Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Manual do Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Plataformas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/bibliotecas")} style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Bibliotecas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/emailseatendimento")} style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Atendimento</Text>
          </TouchableOpacity>
          <View style={estilos.linha}/>
          <TouchableOpacity onPress={() => router.push("/queroseraluno")} style={estilos.menuItem}>
            <Text style={estilos.menuPrincipal}>Quero Ser Aluno</Text>
          </TouchableOpacity>
          <View style={estilos.linha}/>
          <TouchableOpacity onPress={() => router.push("/contato")} style={estilos.menuItem}>
            <Text style={estilos.menuPrincipal}>Contato</Text>
          </TouchableOpacity>
          <View style={estilos.linha}/>
        </View>

        <View style={estilos.footer}>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/ifpr.oficial/")} style={estilos.menuItem}>
            <Image source={require("../assets/images/Plataformas/instagram.png")} style={estilos.icone}/>
            <Text style={estilos.menulink}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/REITORIAIFPR/?locale=pt_BR")} style={estilos.menuItem}>
            <Image source={require("../assets/images/PáginaInicial/FACEBOOK.png")} style={estilos.icone}/>
            <Text style={estilos.menulink}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://ifpr.edu.br/pinhais/")} style={estilos.menuItem}>
            <Image source={require("../assets/images/PáginaInicial/IFPR_LOGO.png")} style={estilos.icone}/>
            <Text style={estilos.menulink}>Site Institucional</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
};

const estilos = StyleSheet.create({
  menuLateral: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 415,
    height: "100%",
    backgroundColor: "white",
    paddingTop: 80,
    paddingHorizontal: 10,
    zIndex: 10,
    justifyContent: "space-between",
  },

  menuItem: {
    marginBottom: 20,
  },

  menuTexto: {
    color: "black",
    fontSize: 22,
    marginLeft: 40,
  },

  menuPrincipal: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    padding: 10,
  },

  menulink: {
    marginTop: -30,
    color: "black",
    fontSize: 26,
    fontStyle: "italic"
  },

  close: {
    position: "absolute",
    right: 16,
    top: 25,
  },

  icone: {
    marginLeft: -40,
    width: 30,
    height: 30,
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
  },

  linha: {
    height: 2,
    backgroundColor: "lightgray",
    marginBottom: 10
  },

  menuItensContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },
});
