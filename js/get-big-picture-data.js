import { commentsLoaderElement } from './big-picture-modal.js';

const bigPictureCommentsContainer = document.querySelector('.social__comments');
const bigPictureCommentItem = bigPictureCommentsContainer.querySelector('.social__comment');
const listCommentsFragment = document.createDocumentFragment();
const commentLoadCount = document.querySelector('.comments-load-count');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img');
const bigPictureDescriptiion = bigPictureModal.querySelector('.social__caption');
const bigPictureLikesAmount = bigPictureModal.querySelector('.likes-count');
const bigPictureCommentsAmount = bigPictureModal.querySelector('.comments-count');
const COMMENTS_PART_LOAD_AMOUNT = 5;

const loadComments = (commentsLoadAmount) => function (currentElement) {
  for (let i = commentsLoadAmount; i < currentElement.comments.length; i++) {
    commentsLoadAmount++;
    const commentElement = bigPictureCommentItem.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    commentAvatar.src = currentElement.comments[i].avatar;
    commentAvatar.alt = currentElement.comments[i].name;
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

const getBigPictureData = (photosData, currentMiniatureEvent) => {
  const currentElement = photosData.find((item) => String(item.id) === currentMiniatureEvent.dataset.id);

  bigPictureImg.src = currentElement.url;
  bigPictureDescriptiion.textContent = currentElement.description;
  bigPictureLikesAmount.textContent = currentElement.likes;
  bigPictureCommentsAmount.textContent = currentElement.comments.length;
  bigPictureCommentsContainer.innerHTML = '';

  const loadPartComments = loadComments(0);
  loadPartComments(currentElement);

  commentsLoaderElement.addEventListener('click', () => {
    loadPartComments(currentElement);
  });
};

export { getBigPictureData };
