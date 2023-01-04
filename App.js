import Nav from "./screens/navigation";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
  });
  const isHermes = () => !!global.HermesInternal;
  console.log(isHermes());

  if (fontsLoaded) {
    const theme = createTheme({
      components: {
        ListItemTitle: {
          style: {},
        },
        Text: {
          style: {
            fontFamily: "Lato-Black",
          },
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>
    );
  } else {
    return <ActivityIndicator size="large" />;
  }
}
