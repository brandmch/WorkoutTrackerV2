import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import getRandomWorkout from "../data/utils/getRandomWorkout";

export default function Home({ navigation }) {
  let randomWorkout = getRandomWorkout();
  console.log(randomWorkout);
  return (
    <View>
      <Text>{randomWorkout.name}</Text>
      <Text>{randomWorkout.bodyPart}</Text>
      <Text>{randomWorkout.equipment}</Text>
      <Text>{randomWorkout.id}</Text>
      <Text>{randomWorkout.target}</Text>
      <Image
        source={{
          uri: randomWorkout.gifUrl,
        }}
        style={styles.img}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },
});
