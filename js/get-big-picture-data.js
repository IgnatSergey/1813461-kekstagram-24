import { bigPictureModal } from './big-picture-modal.js';
import { similarPhotos } from './get-miniatures.js';

const bigPictureCommentsContainer = document.querySelector('.social__comments');
const bigPictureCommentItem = bigPictureCommentsContainer.querySelector('.social__comment');
const listCommentsFragment = document.createDocumentFragment();

function getBigPictureData(currentMiniatureEvent) {
  const currentElement = similarPhotos.find( (item) => String(item.id) === currentMiniatureEvent.dataset.id);

  bigPictureModal.querySelector('.big-picture__img').src = currentElement.url;
  bigPictureModal.querySelector('.social__caption').textContent = currentElement.description;
  bigPictureModal.querySelector('.likes-count').textContent = currentElement.likes;
  bigPictureModal.querySelector('.comments-count').textContent = currentElement.comments.length;

  currentElement.comments.forEach(({ avatar, message, name }) => {
    const commentElement = bigPictureCommentItem.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    listCommentsFragment.appendChild(commentElement);
  });

  bigPictureCommentsContainer.innerHTML = '';
  bigPictureCommentsContainer.appendChild(listCommentsFragment);
}


export { getBigPictureData };
