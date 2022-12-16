import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MainDB", 1);

function open() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS FavoriteWorkouts (id INTEGER PRIMARY KEY AUTOINCREMENT, workoutID TEXT)"
    );
  });
}

const favoriteWorkoutTable = {
  getAll: (setGetAll) => {
    open();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT workoutID FROM FavoriteWorkouts`,
        null,
        (txObj, res) => {
          setGetAll(res.rows._array);
        },
        (txObj, err) => {
          console.log("ERR", txObj, err);
        }
      );
    });
  },

  getFavorites: (workoutID, setState) => {
    open();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT workoutID FROM FavoriteWorkouts`,
        [],
        (txObj, res) => {
          let tempArr = res.rows._array;
          tempArr = tempArr.reduce((acc, curr) => {
            return [...acc, curr.workoutID];
          }, []);
          setState(tempArr);
        },
        (err) => {
          console.log("ERROR: FavoriteWorkouts.add()", err);
        }
      );
    });
  },

  add: async (workoutID) => {
    let saveStr = workoutID.toString();
    open();
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO FavoriteWorkouts (workoutID) VALUES ("${workoutID.toString()}")`
        ),
          () => {
            console.log("SUCC @ FavoriteWorkouts.add():", workoutID);
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
          `DELETE FROM FavoriteWorkouts WHERE workoutID = "${workoutID.toString()}"`
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

  drop: () => {
    open();
    try {
      db.transaction((tx) => {
        tx.executeSql(`DROP TABLE FavoriteWorkouts`);
      }),
        () => {
          console.log("SUCC");
        },
        (err) => {
          console.log(err);
        };
    } catch (err) {
      console.log(err);
    }
  },
};

export default favoriteWorkoutTable;
