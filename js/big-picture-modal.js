import { containerPhotoMiniature } from './get-miniatures.js';
import { getBigPictureData } from './get-big-picture-data.js';
import { isEscapeKey } from './utils/check-keydown.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigpictureModalClose = document.querySelector('.big-picture__cancel');
const commentCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

function openBigPictureModal(evt) {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const currentMiniatureEvent = evt.target.closest('.picture');
  getBigPictureData(currentMiniatureEvent);

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeBigPictureModal() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

containerPhotoMiniature.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    openBigPictureModal(evt);
  }
});

bigpictureModalClose.addEventListener('click', () => {
  closeBigPictureModal();
});

export { bigPictureModal };
