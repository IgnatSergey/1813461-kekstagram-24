import { containerPhotoMiniature } from './get-miniatures.js';
import { getBigPictureData } from './get-big-picture-data.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigpictureModalClose = document.querySelector('.big-picture__cancel');
const commentCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');

containerPhotoMiniature.addEventListener('click', (evt) => {
  bigPictureModal.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  const currentMiniatureEvent = evt.target.closest('.picture');
  getBigPictureData(currentMiniatureEvent);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      evt.preventDefault();
      bigPictureModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });

});

bigpictureModalClose.addEventListener('click', () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

export { bigPictureModal };
