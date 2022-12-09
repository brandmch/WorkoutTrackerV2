import data from "../workoutData.json";
import capitalize from "../../utils/capitalize";

const getRandomWorkout = () => {
  let randomWorkoutID = Math.floor(Math.random() * data.length);
  let randomWorkout = data[randomWorkoutID];
  randomWorkout.name = capitalize(randomWorkout.name);
  return randomWorkout;
};

export default getRandomWorkout;
