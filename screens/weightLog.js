import * as React from "react";
import { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Text, FAB, Overlay, Input, Button } from "@rneui/themed";
import { LineChart } from "react-native-chart-kit";
import * as SQLite from "expo-sqlite";

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

const WeightLineChart = (props) => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{ data: props.data }],
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

  const { fontScale, height, width } = Dimensions.get("window");

  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      yAxisSuffix={" lbs"}
    />
  );
};

// Line Chart ^
//

const Weights = (props) => {
  const { weights } = props;
  return weights.map((curr, ind) => <Text key={ind}>{curr}</Text>);
};

export default function WeightLog() {
  const [overlayVisable, setOverlayVisable] = useState(false);
  const [getAllfromDB, setGetAllfromDB] = useState([]);
  const [weights, setWeights] = useState([]);
  const [input, setInput] = useState();

  useEffect(() => {
    getAll({ state: getAllfromDB, setState: setGetAllfromDB });
  }, []);

  useEffect(() => {
    let tempArr = getAllfromDB.reduce((acc, curr) => {
      return [...acc, curr.weight];
    }, []);
    setWeights(tempArr);
  }, [getAllfromDB]);

  return (
    <View style={{ height: "100%" }}>
      <View style={{ height: "60%", margin: 10 }}>
        <WeightLineChart data={weights} />
      </View>
      <Text>WeightLoss!</Text>
      <Weights weights={weights} />
      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        style={{ paddingRight: 10, paddingBottom: 20 }}
        onPress={() => setOverlayVisable(true)}
        onLongPress={() => {
          setWeights([]);
          drop();
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
            setWeights([...weights, input]);
            setOverlayVisable(false);
            add({ date: Date.now(), weight: parseFloat(input) });
          }}
        />
      </Overlay>
    </View>
  );
}
