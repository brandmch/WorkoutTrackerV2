let data = require("./data/workoutData.json");

const listOfEquipment = () => {
  let arr = data.reduce((acc, curr) => {
    return acc.includes(curr.equipment) ? acc : [...acc, curr.equipment];
  }, []);
  return arr;
};

let obj = {};

listOfEquipment().map((curr) => (obj[`${curr}`] = false));

console.log(obj);
