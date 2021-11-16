import { containerPhotoMiniature } from './get-miniatures.js';
import { getBigPictureData } from './get-big-picture-data.js';
import { isEscapeKey } from './utils/check-keydown.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureModalClose = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureModal.querySelector('.comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

const onPopupKlickClose = () => {
  closeBigPictureModal();
};

function openBigPictureModal() {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureModalClose.addEventListener('click', onPopupKlickClose);
}

function closeBigPictureModal() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureModalClose.removeEventListener('click', onPopupKlickClose);
}

const setMiniatureClick = (photosData) => {
  containerPhotoMiniature.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      commentsLoaderElement.classList.remove('hidden');
      const currentMiniatureEvent = evt.target.closest('.picture');
      getBigPictureData(photosData, currentMiniatureEvent);

      openBigPictureModal(evt);
    }
  });
};

export { commentsLoaderElement, setMiniatureClick };
