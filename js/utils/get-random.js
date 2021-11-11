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

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveIntegerInRange(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveIntegerInRange(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

export { createRandomIdFromRangeGenerator };
