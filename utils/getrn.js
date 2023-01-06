const getrn = () => {
  const rn = Date.now();
  const date = new Date(rn);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export default getrn;
