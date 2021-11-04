import { isLongComment } from './utils/check-string-length.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const MAX_LENGTH_COMMENT = 140;

function isElementRepeat(element, array) {
  if (array.length > 1 && array.indexOf(element, array.indexOf(element) + 1) > 0) {
    return true;
  }
  return false;
}

hashtagsInput.addEventListener('input', () => {
  let hashtagsArray = hashtagsInput.value.split(' ').filter((hashtag) => hashtag);
  hashtagsArray = hashtagsArray.map((hashtag) => hashtag.toLowerCase());
  hashtagsArray.forEach((element) => {
    element = element.toLowerCase();
    if (hashtagsArray.length > 5) {
      hashtagsInput.setCustomValidity('Максимальное количество хэштегов 5');
    } else if (!(element[0] === '#')) {
      hashtagsInput.setCustomValidity(`Хэштег "${element} "должен начинаться с #`);
    } else if (element.length === 1) {
      hashtagsInput.setCustomValidity('Хештег не может состоять только из одной решётки');
    } else if (!(/^\w+$/.test(element.slice(1))) || (element.includes('_')) || (element.indexOf('#') > 1)) {
      hashtagsInput.setCustomValidity(`Хэштег ${element} должен содержать только числа и буквы`);
    } else if (element.length > 20) {
      hashtagsInput.setCustomValidity('Максимальная длина хэштега 20 символов');
    } else if (isElementRepeat(element, hashtagsArray)) {
      hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
    }
    else {
      hashtagsInput.setCustomValidity('');
    }
  });
  hashtagsInput.reportValidity();
});

commentInput.addEventListener('input', () => {
  if (isLongComment(commentInput.value, MAX_LENGTH_COMMENT)) {
    commentInput.setCustomValidity(`Длина комментария не должна превышать ${  MAX_LENGTH_COMMENT   } символов`);
  }
  else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
});

export { hashtagsInput,  commentInput};
