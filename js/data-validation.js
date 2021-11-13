import { isLongComment } from './utils/check-string-length.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const MAX_LENGTH_COMMENT = 4;
const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAG_AMOUNT = 5;
const outlineDefaultStyle = hashtagsInput.style.outline;

function isElementRepeat(element, array) {
  if (array.length > 1 && array.indexOf(element, array.indexOf(element) + 1) > 0) {
    return true;
  }
  return false;
}

const validateHashtags = () => {
  hashtagsInput.addEventListener('input', () => {
    hashtagsInput.style.outline = outlineDefaultStyle;
    hashtagsInput.style.border = 'none';
    if (hashtagsInput.value) {
      let hashtagsArray = hashtagsInput.value.split(' ').filter((hashtag) => hashtag);
      hashtagsArray = hashtagsArray.map((hashtag) => hashtag.toLowerCase());
      hashtagsArray.forEach((element) => {
        element = element.toLowerCase();
        if (hashtagsArray.length > MAX_HASHTAG_AMOUNT) {
          hashtagsInput.setCustomValidity(`Максимальное количество хэштегов${MAX_HASHTAG_AMOUNT}`);
        } else if (!(element[0] === '#')) {
          hashtagsInput.setCustomValidity(`Хэштег "${element} "должен начинаться с #`);
        } else if (element.length === 1) {
          hashtagsInput.setCustomValidity('Хештег не может состоять только из одной решётки');
        } else if (!(/^\w+$/.test(element.slice(1))) || (element.includes('_')) || (element.indexOf('#') > 1)) {
          hashtagsInput.setCustomValidity(`Хэштег ${element} должен содержать только числа и буквы`);
        } else if (element.length > MAX_LENGTH_HASHTAG) {
          hashtagsInput.setCustomValidity(`Максимальная длина хэштега${MAX_LENGTH_HASHTAG}символов`);
        } else if (isElementRepeat(element, hashtagsArray)) {
          hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
        }
        else {
          hashtagsInput.setCustomValidity('');
        }
      });
    }
    else {
      hashtagsInput.setCustomValidity('');
    }
    hashtagsInput.reportValidity();
  });
};

const validateComments = () => {
  commentInput.addEventListener('input', () => {
    commentInput.style.outline = outlineDefaultStyle;
    commentInput.style.border = 'none';
    if (isLongComment(commentInput.value, MAX_LENGTH_COMMENT)) {
      commentInput.setCustomValidity(`Длина комментария не должна превышать ${MAX_LENGTH_COMMENT} символов`);
    }
    else {
      commentInput.setCustomValidity('');
    }
    commentInput.reportValidity();
  });
};

export { hashtagsInput, commentInput, outlineDefaultStyle, validateHashtags, validateComments };
