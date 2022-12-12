import data from "../workoutData.json";
// const data = require("../workoutData.json");

const getRandomWorkoutByTarget = (target, filters) => {
  let tempArr = data.filter(
    (curr) => curr.target === target && filters[curr.equipment] === true
  );

  return tempArr[Math.floor(Math.random() * tempArr.length)];
};

export default getRandomWorkoutByTarget;
