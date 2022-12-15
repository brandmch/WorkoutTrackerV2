import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MainDB", 1);

function open() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS FavoriteWorkouts (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutID INTEGER)"
    );
  });
}

const favoriteWorkoutTable = {
  getAll: () => {
    open();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT workoutID FROM FavoriteWorkouts`,
        null,
        (txObj, res) => {
          console.log("OK", res.rows);
        },
        (txObj, err) => {
          console.log("ERR", txObj, err);
        }
      );
    });
  },

  checkIfFavorite: (workoutID, setIsFavorite) => {
    open();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT EXISTS(SELECT workoutID FROM FavoriteWorkouts WHERE workoutID = ${workoutID})`,
        [],
        (txObj, res) => {
          let value = Object.values(res.rows._array[0])[0];
          setIsFavorite(value);
        },
        (err) => {
          console.log("ERROR: FavoriteWorkouts.add()", err);
        }
      );
    });
  },

  add: async (workoutID) => {
    open();
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO FavoriteWorkouts (workoutID) VALUES ("${workoutID}")`
        ),
          () => {
            console.log("SUCC @ FavoriteWorkouts.add()");
          },
          (err) => {
            console.log("ERROR: FavoriteWorkouts.add()", err);
          };
      });
    } catch (err) {
      console.log("favoriteWorkoutTable.add() ERROR:", err);
    }
  },

  delete: async (workoutID) => {
    open();
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM FavoriteWorkouts WHERE workoutID = ${workoutID}`
        ),
          () => {
            console.log("SUCC @ FavoriteWorkouts.delete()");
          },
          (err) => {
            console.log("ERROR: FavoriteWorkouts.delete()", err);
          };
      });
    } catch (err) {
      console.log("ERROR favoriteWorkoutTable.delete():", err);
    }
  },
};

export default favoriteWorkoutTable;
