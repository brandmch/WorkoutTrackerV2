import { View } from "react-native";
import { Text, Button, Input } from "@rneui/base";
import { useEffect, useState } from "react";
import favoriteWorkoutTable from "../data/sqlLiteDBs/favoriteWorkoutTable";

import * as SQLite from "expo-sqlite";

export default function Home() {
  const [input, setInput] = useState("");

  // console.log(input);

  // const db = SQLite.openDatabase("dbName", 1);

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS Names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
  //     );
  //   });

  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `SELECT * FROM Names`,
  //       null,
  //       (txObj, res) => {
  //         console.log("OK", res);
  //         console.log(res.rows._array[6]);
  //       },
  //       (txObj, err) => {
  //         console.log("ERR", txObj, err);
  //       }
  //     );
  //   });
  // }, []);

  // const updateDB = async () => {
  //   console.log("SW");
  //   if (input.length !== 0) {
  //     try {
  //       db.transaction((tx) => {
  //         tx.executeSql(
  //           `INSERT INTO Names (name) VALUES ("${input}")`,
  //           () => {
  //             console.log("SUCCESS!");
  //           },
  //           (err) => {
  //             console.log("ERRRROR", err);
  //           }
  //         );
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <View>
      <Text>Howdy ho!</Text>
      <Input
        placeholder="Swag"
        onChangeText={(text) => setInput(text)}
        value={input}
      />
      <Button
        title={"NAME!"}
        onPress={() => {
          favoriteWorkoutTable.add(69);
        }}
      />
      <Button
        title={"swwag"}
        onPress={() => {
          favoriteWorkoutTable.getAll();
        }}
      />
      <Button
        title={"delete"}
        onPress={() => {
          favoriteWorkoutTable.delete(69);
        }}
      />
    </View>
  );
}
