import { Text } from "@rneui/base";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ListItem } from "@rneui/base";

export default function CreateWorkoutInstance({
  ind,
  listOfTargets,
  setTargets,
  targets,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title h4>{targets[ind]}</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
      onLongPress={() => {
        let tempArr = [...targets];
        tempArr.splice(ind, 1);
        setTargets(tempArr);
      }}
    >
      <ScrollView>
        {listOfTargets.map((curr, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => {
              let tempArr = [...targets];
              tempArr[ind] = listOfTargets[index];
              setTargets(tempArr);
              setExpanded(false);
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{curr}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </ListItem.Accordion>
  );
}
