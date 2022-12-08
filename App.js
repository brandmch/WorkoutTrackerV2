import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Nav from "./screens/navigation";

export default function App() {
  return <Nav />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
