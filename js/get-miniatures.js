import { createRandomIdFromRangeGenerator } from './utils/get-random.js';

const containerPhotoMiniature = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');
const PHOTO_RANDOM_AMOUNT = 10;

const compareComments = (photoA, photoB) => {
  const commentsAmountA = photoA.comments.length;
  const commentsAmountB = photoB.comments.length;

  return commentsAmountB - commentsAmountA;
};

const renderSimilarPhotos = (similarPhotos, compareFunction) => {
  const listPhotoFragment = document.createDocumentFragment();
  const allPhotos = document.querySelectorAll('.picture');

  similarPhotos
    .slice()
    .sort(compareFunction)
    .forEach(({ id, url, likes, comments }) => {
      const photoElement = similarPhotoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = url;
      photoElement.querySelector('.picture__likes').textContent = likes;
      photoElement.querySelector('.picture__comments').textContent = comments.length;
      photoElement.setAttribute('data-id', id);
      listPhotoFragment.appendChild(photoElement);
    });
  filterBlock.classList.remove('img-filters--inactive');
  if (allPhotos[0]) {
    allPhotos.forEach((Photo) => { Photo.remove(); });
  }
  containerPhotoMiniature.appendChild(listPhotoFragment);
};

const renderRandomSimilarPhotos = (similarPhotos) => {
  const listPhotoFragment = document.createDocumentFragment();
  const allPhotos = document.querySelectorAll('.picture');
  const generatePhotoId = createRandomIdFromRangeGenerator(0, similarPhotos.length - 1);

  for (let i = 0; i < PHOTO_RANDOM_AMOUNT; i++) {
    const currentPhoto = similarPhotos[generatePhotoId()];
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = currentPhoto.url;
    photoElement.querySelector('.picture__likes').textContent = currentPhoto.likes;
    photoElement.querySelector('.picture__comments').textContent = currentPhoto.comments.length;
    photoElement.setAttribute('data-id', currentPhoto.id);
    listPhotoFragment.appendChild(photoElement);
  }
  if (allPhotos[0]) {
    allPhotos.forEach((Photo) => { Photo.remove(); });
  }
  containerPhotoMiniature.appendChild(listPhotoFragment);
};

const setFilterClick = (filterElement, cb) => {
  filterElement.addEventListener('click', () => {
    filterBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filterElement.classList.add('img-filters__button--active');
    cb();
  });
};

export { containerPhotoMiniature, filterBlock, renderSimilarPhotos, setFilterClick, compareComments, renderRandomSimilarPhotos };
