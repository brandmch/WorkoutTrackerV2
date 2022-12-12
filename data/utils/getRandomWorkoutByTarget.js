import data from "../workoutData.json";

const getRandomWorkoutByTarget = (target, filters, bodyPartsvTargets) => {
  if (filters.length === 0) {
    let tempArr;
    if (bodyPartsvTargets) {
      tempArr = data.filter((curr) => curr.target === target);
    } else {
      tempArr = data.filter((curr) => curr.bodyPart === target);
    }

    return tempArr[Math.floor(Math.random() * tempArr.length)];
  } else {
    let tempArr;
    if (bodyPartsvTargets) {
      tempArr = data.filter(
        (curr) => curr.target === target && filters.includes(curr.equipment)
      );
    } else {
      tempArr = data.filter(
        (curr) => curr.bodyPart === target && filters.includes(curr.equipment)
      );
    }

    return tempArr[Math.floor(Math.random() * tempArr.length)];
  }
};

export default getRandomWorkoutByTarget;
