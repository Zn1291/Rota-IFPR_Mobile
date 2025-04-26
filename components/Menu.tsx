import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export const Menu = (props: { onClose: () => void }) => {
  return (
    <>
      <View style={estilos.menuLateral}>
        <TouchableOpacity style={estilos.close} onPress={props.onClose}>
          <AntDesign name="closecircleo" size={32} color="white" />
        </TouchableOpacity>
        <View style={estilos.menuItensContainer}>
          <TouchableOpacity style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Sou Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Quero Ser Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.menuItem}>
            <Text style={estilos.menuTexto}>Contato</Text>
          </TouchableOpacity>
        </View>
        <View style={estilos.linhaVermelha} />

        <View style={estilos.footer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.instagram.com/ifpr.oficial/")
            }
          >
            <Image
              source={require("../assets/images/Plataformas/instagram.png")}
              style={estilos.icone}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.facebook.com/REITORIAIFPR/?locale=pt_BR"
              )
            }
          >
            <Image
              source={require("../assets/images/PáginaInicial/FACEBOOK.png")}
              style={estilos.icone}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL("https://ifpr.edu.br/pinhais/")}
          >
            <Image
              source={require("../assets/images/PáginaInicial/IFPR_LOGO.png")}
              style={estilos.icone}
            />
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
    width: 200,
    height: "100%",
    backgroundColor: "#666666",
    paddingTop: 80,
    paddingHorizontal: 10,
    zIndex: 10,
    justifyContent: "space-between",
  },

  menuItem: {
    marginBottom: 30,
  },

  menuTexto: {
    color: "white",
    fontSize: 16,
  },
  close: {
    position: "absolute",
    right: 16,
    top: 16,
  },

  icone: {
    width: 30,
    height: 30,
  },

  footer: {
    backgroundColor: "#666666",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10
  },

  linhaVermelha: {
    height: 2,
    backgroundColor: "red",
    marginBottom: 10
  },

  menuItensContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },
});
