import data from "../workoutData.json";
// const data = require("../workoutData.json");

const getRandomWorkoutByTarget = (...args) => {
  let target = args[0];
  let filters = [];
  let bodyPartsvTargets = args[2];

  let tempArr;

  for (let i in args[1]) {
    if (args[1][i] === true) {
      filters.push(i);
    }
  }

  console.log(target, filters, bodyPartsvTargets);

  if (filters.length === 0) {
    if (!bodyPartsvTargets) {
      tempArr = data.filter((curr) => curr.target === target);
    } else {
      tempArr = data.filter((curr) => curr.bodyPart === target);
    }
  } else {
    if (!bodyPartsvTargets) {
      tempArr = data.filter(
        (curr) => curr.target === target && filters.includes(curr.equipment)
      );
    } else {
      tempArr = data.filter(
        (curr) => curr.bodyPart === target && filters.includes(curr.equipment)
      );
    }
  }

  let newWO = tempArr[Math.floor(Math.random() * tempArr.length)];
  // console.log(newWO);
  return newWO;
};

export default getRandomWorkoutByTarget;
