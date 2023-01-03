import Nav from "./screens/navigation";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { useFonts } from "expo-font";

const theme = createTheme({
  components: {
    ListItemTitle: {
      style: {},
    },
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Nav />
    </ThemeProvider>
  );
}
