import data from "../workoutData.json";

function capitalizeWorkoutName(name) {
  return name
    .split(" ")
    .map((curr, ind, arr) => {
      let word = curr.split("");
      word[0] = word[0].toUpperCase();
      return word.join("");
    })
    .join(" ");
}

const getRandomWorkout = () => {
  let randomWorkoutID = Math.floor(Math.random() * data.length);
  let randomWorkout = data[randomWorkoutID];
  randomWorkout.name = capitalizeWorkoutName(randomWorkout.name);
  return randomWorkout;
};

export default getRandomWorkout;
