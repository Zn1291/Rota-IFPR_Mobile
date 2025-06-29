export default {
  expo: {
    name: "Rota-IFPR_Mobile",
    slug: "Rota-IFPR_Mobile",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    scheme: "rotaifpr",
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.rotaifpr.mobile",
      adaptiveIcon: {
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true,
    },
  },
}; 