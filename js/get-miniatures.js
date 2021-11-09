const containerPhotoMiniature = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderSimilarPhotos = (similarPhotos) => {
  const listPhotoFragment = document.createDocumentFragment();

  similarPhotos.forEach(({ id, url, likes, comments }) => {
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.setAttribute('data-id', id);
    listPhotoFragment.appendChild(photoElement);
  });
  containerPhotoMiniature.appendChild(listPhotoFragment);
};
export { containerPhotoMiniature, renderSimilarPhotos };

