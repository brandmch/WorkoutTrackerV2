const capitalize = (str) => {
  return str
    .trim()
    .split(" ")
    .map((curr, ind, arr) => {
      let word = curr.split("");
      word[0] = word[0].toUpperCase();
      if (word.includes("-")) {
        let ind = word.indexOf("-");
        word[ind + 1] = word[ind + 1].toUpperCase();
      }
      return word.join("");
    })
    .join(" ");
};

export default capitalize;
