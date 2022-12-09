import data from "../workoutData.json";
// const data = require("../workoutData.json");

const getRandomWorkoutByTarget = (target) => {
  let tempArr = data.filter((curr) => curr.target === target);

  return tempArr[Math.floor(Math.random() * tempArr.length)];
};

export default getRandomWorkoutByTarget;
