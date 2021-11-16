import { renderSimilarPhotos } from './get-miniatures.js';
import { setMiniatureClick } from './big-picture-modal.js';
import { setLoadFileChange, setUserFormSubmit, setUserFormSubmitElementClick } from './load-form-modal.js';
import { editPhoto } from './edit-picture.js';
import { validateHashtags, validateComments } from './data-validation.js';
import { getData } from './api.js';
import { setFilterClick, compareComments, compareRandom, PHOTO_RANDOM_AMOUNT, filterBlock } from './get-miniatures.js';
import { debounce } from './utils/debounce.js';

const filterDefaultElement = filterBlock.querySelector('#filter-default');
const filterRandomElement = filterBlock.querySelector('#filter-random');
const filterPopularElement = filterBlock.querySelector('#filter-discussed');
const RERENDER_DELAY = 500;

getData((photos) => {
  renderSimilarPhotos(photos);
  setFilterClick(filterDefaultElement, debounce(() => renderSimilarPhotos(photos), RERENDER_DELAY));
  setFilterClick(filterRandomElement, debounce(() => renderSimilarPhotos(photos, compareRandom, PHOTO_RANDOM_AMOUNT), RERENDER_DELAY));
  setFilterClick(filterPopularElement, debounce(() => renderSimilarPhotos(photos, compareComments), RERENDER_DELAY));
  setMiniatureClick(photos);
});

setLoadFileChange();
setUserFormSubmit();
setUserFormSubmitElementClick();
editPhoto();
validateHashtags();
validateComments();
