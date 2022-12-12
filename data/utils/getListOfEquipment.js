import data from "../workoutData.json";

const listOfEquipment = (equipment) => {
  let arr = data.reduce((acc, curr) => {
    return acc.includes(curr.equipment) ? acc : [...acc, curr.equipment];
  }, []);
  return arr;
};

export default listOfEquipment;
