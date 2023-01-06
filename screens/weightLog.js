import * as React from "react";
import { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Text, FAB, Overlay, Input, Button } from "@rneui/themed";
import { LineChart } from "react-native-chart-kit";
import * as SQLite from "expo-sqlite";
import getrn from "../utils/getrn";

//
// SQLite
const db = SQLite.openDatabase("MainDB", 1);

const open = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS WeightsLog (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, weight INTEGER)"
    );
  });
};
const add = (obj) => {
  open();
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO WeightsLog (date,weight) VALUES ("${obj.date}", ${obj.weight})`
      ),
        () => {
          console.log("SUCC @ WEIGHTLOG ADD");
        },
        (err) => {
          console.log("ERR @ WEIGHTLOG ADD:", err);
        };
    });
  } catch (err) {
    console.log(err);
  }
};
const getAll = async ({ state, setState }) => {
  open();
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT date, weight FROM WeightsLog",
      null,
      (txObj, res) => {
        setState(res.rows._array);
      },
      (txObj, err) => {
        console.log("ERR", err);
      }
    );
  });
};
const drop = () => {
  open();
  try {
    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE WeightsLog`);
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
};
// SQLite db ^
//

//
// Line Chart
const getWeights = (obj) => {
  return obj.reduce((acc, curr) => {
    return [...acc, curr.weight];
  }, []);
};

const getDates = (obj) => {
  return obj.reduce((acc, curr) => {
    let date = new Date(parseInt(curr.date));
    return [
      ...acc,
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    ];
  }, []);
};

const WeightLineChart = (props) => {
  const dates = getDates(props.data);
  const weights = getWeights(props.data);

  const data = {
    labels: dates,
    datasets: [{ data: weights }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <LineChart
      data={data}
      width={props.size.width}
      height={props.size.height}
      chartConfig={chartConfig}
      yAxisSuffix={" lbs"}
    />
  );
};
// Line Chart ^
//

// Displays weight instances with date/time
const WeightsChart = (props) => {
  return props.data.map((curr, ind) => {
    const now = new Date(parseInt(curr.date));
    const dateStr = `${now.getMonth()}/${now.getDay()}/${now.getFullYear()}`;
    return (
      <View
        key={ind}
        style={{ display: "flex", flex: 1, flexDirection: "row" }}
      >
        <Text style={{ flex: 1 }}>{curr.weight}</Text>
        <Text style={{ flex: 1 }}>{dateStr}</Text>
      </View>
    );
  });
};

export default function WeightLog() {
  const [overlayVisable, setOverlayVisable] = useState(false);
  const [getAllfromDB, setGetAllfromDB] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState();
  console.log("GO", getrn());

  useEffect(() => {
    getAll({ state: getAllfromDB, setState: setGetAllfromDB });
  }, [refresh]);

  // Defines the size of the chart.
  // Creates a <View> with these dimensions, same dimensions are passed into <WeightLineChart>. (there might be a better way to do this)
  const { fontScale, height, width } = Dimensions.get("window");
  let chartsize = { width: width, height: (height * 3) / 5 };

  return (
    <View style={{ height: "100%" }}>
      <View style={{ width: chartsize.width, height: chartsize.height }}>
        {getAllfromDB.length > 0 ? (
          <WeightLineChart data={getAllfromDB} size={chartsize} />
        ) : (
          <Text h1>Add Weight</Text>
        )}
      </View>
      {getAllfromDB.length > 0 ? (
        <WeightsChart data={getAllfromDB} />
      ) : (
        <Text>Add Weight</Text>
      )}

      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        style={{ paddingRight: 10, paddingBottom: 20 }}
        onPress={() => setOverlayVisable(true)}
        onLongPress={() => {
          drop();
          setRefresh(!refresh);
        }}
      />
      <Overlay
        isVisible={overlayVisable}
        onBackdropPress={() => setOverlayVisable(false)}
        overlayStyle={{ width: "60%" }}
      >
        <Input
          placeholder="Weight  (lbs)"
          onChangeText={(text) => setInput(text)}
          keyboardType="number-pad"
          maxLength={6}
        />
        <Button
          title="Log"
          onPress={() => {
            setOverlayVisable(false);
            add({ date: Date.now(), weight: parseFloat(input) });
            setRefresh(!refresh);
          }}
        />
      </Overlay>
    </View>
  );
}
