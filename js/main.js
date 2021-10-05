const getRandomIntegerInRange = function (min, max) {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isLongComment = function (comment, maxLength) {
  return comment.length <= maxLength;
};

isLongComment('test test', 13);

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

const COMMENT_IDENTIFIERS_AMOUNT = 1000;
const COMMENT_IDENTIFIERS = Array.from({ length: COMMENT_IDENTIFIERS_AMOUNT }, (value, index) => index + 1);

const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
];

const getRandomArrayElement = (elements) => elements[getRandomIntegerInRange(0, elements.length - 1)];

const getRandomArrayElementNoRepetitions = (elements) => {
  const elementRandomIndex = getRandomIntegerInRange(0, elements.length - 1);
  const elementRandom = elements[elementRandomIndex];
  elements.splice(elementRandomIndex, 1);
  return elementRandom;
};

const SENTENCES_AMOUNT = 2;

const createCommentText = () => {
  let resultString ='';
  for (let i = 1; i <= getRandomIntegerInRange(1,SENTENCES_AMOUNT); i++){
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

const AVATAR_ADRESS_LIMIT = 6;

const createComment = () => ({
  id: getRandomArrayElementNoRepetitions(COMMENT_IDENTIFIERS),
  avatar: `img/avatar-${  getRandomIntegerInRange(1, AVATAR_ADRESS_LIMIT)  }.svg`,
  message: createCommentText(),
  name: getRandomArrayElement(NAMES),
});

const COMMENTS_AMOUNT_LIMIT = 10;
const LIKES_LIMIT_DOWN = 15;
const LIKES_LIMIT_UP = 200;

const createDescriptionPhoto = () => ({
  id: getRandomArrayElementNoRepetitions(DESCRIPTION_IDENTIFIERS),
  url: `photos/${  getRandomArrayElementNoRepetitions(PHOTO_ADRESSES)  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntegerInRange(LIKES_LIMIT_DOWN, LIKES_LIMIT_UP),
  comments: Array.from({ length: getRandomIntegerInRange(1,COMMENTS_AMOUNT_LIMIT) }, createComment),
});

const Descriptions = Array.from({ length: DESCRIPTION_PHOTO_AMOUNT }, createDescriptionPhoto);

