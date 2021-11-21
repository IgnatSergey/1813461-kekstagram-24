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

const filterDefaultElement = filterBlock.querySelector('#filter-default');
const filterRandomElement = filterBlock.querySelector('#filter-random');
const filterPopularElement = filterBlock.querySelector('#filter-discussed');
const form = filterBlock.querySelector('.img-filters__form');

const renderSortedPhotos = (photos) => {
  if (filterDefaultElement.classList.contains('img-filters__button--active')) {
    renderSimilarPhotos(photos);
  } else if (filterRandomElement.classList.contains('img-filters__button--active')) {
    renderSimilarPhotos(photos, compareRandom, PHOTO_RANDOM_AMOUNT);
  } else if (filterPopularElement.classList.contains('img-filters__button--active')) {
    renderSimilarPhotos(photos, compareComments);
  }
};

const setFilterClick = (cb) => {
  form.addEventListener('click', (evt) => {
    filterBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    cb();
  });
};

export { containerPhotoMiniature, setFilterClick, renderSimilarPhotos, renderSortedPhotos };
