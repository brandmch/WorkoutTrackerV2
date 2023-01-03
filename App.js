import Nav from "./screens/navigation";
import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  components: {
    ListItemTitle: {
      style: {},
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
    </ThemeProvider>
  );
}
