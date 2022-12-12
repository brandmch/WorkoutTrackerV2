import data from "../workoutData.json";

const getRandomWorkoutByTarget = (target, filters) => {
  if (filters.length === 0) {
    let tempArr = data.filter((curr) => curr.target === target);

    return tempArr[Math.floor(Math.random() * tempArr.length)];
  } else {
    let tempArr = data.filter(
      (curr) => curr.target === target && filters.includes(curr.equipment)
    );

    return tempArr[Math.floor(Math.random() * tempArr.length)];
  }
};

export default getRandomWorkoutByTarget;
