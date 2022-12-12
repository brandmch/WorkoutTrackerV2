import data from "../workoutData.json";

let listOfBodyParts = data
  .reduce((acc, curr, ind, arr) => {
    let tempArr = [...acc];
    if (!tempArr.includes(curr.bodyPart)) {
      tempArr.push(curr.bodyPart);
    }
    return tempArr;
  }, [])
  .sort();

export default listOfBodyParts;
