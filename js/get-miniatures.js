const containerPhotoMiniature = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');
const PHOTO_RANDOM_AMOUNT = 10;

const compareComments = (photoA, photoB) => {
  const commentsAmountA = photoA.comments.length;
  const commentsAmountB = photoB.comments.length;

  return commentsAmountB - commentsAmountA;
};

const compareRandom = () => Math.random() - 0.5;

const renderSimilarPhotos = (similarPhotos, compareFunction, photosAmount) => {
  const listPhotoFragment = document.createDocumentFragment();
  const allPhotos = document.querySelectorAll('.picture');

  similarPhotos
    .slice()
    .sort(compareFunction)
    .slice(0, photosAmount)
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
    allPhotos.forEach((photo) => { photo.remove(); });
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

export { containerPhotoMiniature, filterBlock, renderSimilarPhotos, setFilterClick, compareComments, compareRandom, PHOTO_RANDOM_AMOUNT};
