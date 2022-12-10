import data from "../workoutData.json";

let listOfTargets = data
  .reduce((acc, curr, ind, arr) => {
    let tempArr = [...acc];
    if (!tempArr.includes(curr.target)) {
      tempArr.push(curr.target);
    }
    return tempArr;
  }, [])
  .sort();

export default listOfTargets;
