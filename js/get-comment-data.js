import { getRandomPositiveIntegerInRange } from './utils/get-random-positive-integer.js';
import { getRandomArrayElement, getRandomArrayElementNoRepetitions } from './utils/get-random-element.js';

const COMMENT_IDENTIFIERS_AMOUNT = 1000;
const COMMENT_IDENTIFIERS = Array.from({ length: COMMENT_IDENTIFIERS_AMOUNT }, (value, index) => index + 1);

const AVATAR_ADRESS_LIMIT = 6;

const createCommentText = () => {
  const COMMENTS_TEXT = [
    'Всё отлично!',
    'В целом всё неплохо.Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const SENTENCES_AMOUNT = 2;
  let resultString = '';
  for (let i = 1; i <= getRandomPositiveIntegerInRange(1, SENTENCES_AMOUNT); i++) {
    resultString += getRandomArrayElementNoRepetitions(COMMENTS_TEXT);
  }
  return resultString;
};

const NAMES = [
  'Дмитрий',
  'Анна',
  'Василий',
  'Данил',
  'Света',
  'Ира',
  'Лена',
];

const createComment = () => ({
  id: getRandomArrayElementNoRepetitions(COMMENT_IDENTIFIERS),
  avatar: `img/avatar-${getRandomPositiveIntegerInRange(1, AVATAR_ADRESS_LIMIT)}.svg`,
  message: createCommentText(),
  name: getRandomArrayElement(NAMES),
});

export { createComment };
