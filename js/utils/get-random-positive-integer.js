function getRandomPositiveIntegerInRange(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomPositiveIntegerInRange };
