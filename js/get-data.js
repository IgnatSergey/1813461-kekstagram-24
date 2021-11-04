import { getRandomPositiveIntegerInRange } from './utils/get-random-positive-integer.js';
import { getRandomArrayElement, getRandomArrayElementNoRepetitions } from './utils/get-random-element.js';
import { createComment } from './get-comment-data.js';

const DESCRIPTION_PHOTO_AMOUNT = 25;
const DESCRIPTION_IDENTIFIERS = Array.from({ length: DESCRIPTION_PHOTO_AMOUNT }, (value, index) => index + 1);

const PHOTO_ADRESSES_AMOUNT = 25;
const PHOTO_ADRESSES = Array.from({ length: PHOTO_ADRESSES_AMOUNT }, (value, index) => index + 1);

const DESCRIPTIONS = [
  'природа',
  'портрет',
  'спорт',
  'еда',
  'животные',
  'у зеркала',
];

const COMMENTS_AMOUNT_LIMIT = 20;
const LIKES_LIMIT_DOWN = 15;
const LIKES_LIMIT_UP = 200;

const createDescriptionPhoto = () => ({
  id: getRandomArrayElementNoRepetitions(DESCRIPTION_IDENTIFIERS),
  url: `photos/${getRandomArrayElementNoRepetitions(PHOTO_ADRESSES)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveIntegerInRange(LIKES_LIMIT_DOWN, LIKES_LIMIT_UP),
  comments: Array.from({ length: getRandomPositiveIntegerInRange(1, COMMENTS_AMOUNT_LIMIT) }, createComment),
});

const createArrayDescriptionPhoto = () => Array.from({ length: DESCRIPTION_PHOTO_AMOUNT }, createDescriptionPhoto);

export { createArrayDescriptionPhoto };
