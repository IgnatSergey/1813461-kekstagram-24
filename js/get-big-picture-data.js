import { bigPictureModal, commentsLoaderElement } from './big-picture-modal.js';

const bigPictureCommentsContainer = document.querySelector('.social__comments');
const bigPictureCommentItem = bigPictureCommentsContainer.querySelector('.social__comment');
const listCommentsFragment = document.createDocumentFragment();
const commentLoadCount = document.querySelector('.comments-load-count');
const COMMENTS_PART_LOAD_AMOUNT = 5;

function loadComments(commentsLoadAmount) {
  return function (currentElement) {
    for (let i = commentsLoadAmount; i < currentElement.comments.length; i++) {
      commentsLoadAmount++;
      const commentElement = bigPictureCommentItem.cloneNode(true);
      commentElement.querySelector('.social__picture').src = currentElement.comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = currentElement.comments[i].name;
      commentElement.querySelector('.social__text').textContent = currentElement.comments[i].message;
      listCommentsFragment.appendChild(commentElement);
      if (i === currentElement.comments.length - 1) {
        commentsLoaderElement.classList.add('hidden');
      } else if ((i + 1) % COMMENTS_PART_LOAD_AMOUNT === 0) {
        break;
      }
    }
    commentLoadCount.textContent = commentsLoadAmount;
    bigPictureCommentsContainer.appendChild(listCommentsFragment);
  };
}

const getBigPictureData = (photosData, currentMiniatureEvent) => {
  const currentElement = photosData.find((item) => String(item.id) === currentMiniatureEvent.dataset.id);

  bigPictureModal.querySelector('.big-picture__img').src = currentElement.url;
  bigPictureModal.querySelector('.social__caption').textContent = currentElement.description;
  bigPictureModal.querySelector('.likes-count').textContent = currentElement.likes;
  bigPictureModal.querySelector('.comments-count').textContent = currentElement.comments.length;
  bigPictureCommentsContainer.innerHTML = '';

  const loadPartComments = loadComments(0);
  loadPartComments(currentElement);

  commentsLoaderElement.addEventListener('click', () => {
    loadPartComments(currentElement);
  });
};

export { getBigPictureData };
