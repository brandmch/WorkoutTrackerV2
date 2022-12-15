import { Input, SearchBar, Text, ListItem } from "@rneui/base";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import listOfTargets from "../data/utils/getListOfTargets";
import listOfBodyParts from "../data/utils/getListOfBodyParts";

export default function CreateWorkoutInstance({
  ind,
  currWOobj,
  setCurrWOobj,
}) {
  const [expanded, setExpanded] = useState(false);
  let options = currWOobj.bodyVtarget
    ? [...listOfBodyParts]
    : [...listOfTargets];

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title h4>{currWOobj.targets[ind]}</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
      onLongPress={() => {
        let tempArr = [...currWOobj.targets];
        tempArr.splice(ind, 1);
        setCurrWOobj({ ...currWOobj, targets: tempArr });
      }}
    >
      <ScrollView>
        {options.map((curr, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => {
              let tempArr = [...currWOobj.targets];
              tempArr[ind] = options[index];
              setCurrWOobj({ ...currWOobj, targets: [...tempArr] });
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
