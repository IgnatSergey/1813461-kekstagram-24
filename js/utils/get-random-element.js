import { getRandomPositiveIntegerInRange } from './get-random-positive-integer.js';

const getRandomArrayElement = (elements) => elements[getRandomPositiveIntegerInRange(0, elements.length - 1)];

const getRandomArrayElementNoRepetitions = (elements) => {
  const elementRandomIndex = getRandomPositiveIntegerInRange(0, elements.length - 1);
  const elementRandom = elements[elementRandomIndex];
  elements.splice(elementRandomIndex, 1);
  return elementRandom;
};

export { getRandomArrayElement, getRandomArrayElementNoRepetitions };

