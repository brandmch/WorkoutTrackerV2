import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MainDB", 1);

function open() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS DailyWorkoutLog (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutID TEXT)"
    );
  });
}

const dailyWOLog = {};

export default dailyWOLog;
