import { renderSimilarPhotos } from './get-miniatures.js';
import './big-picture-modal.js';
import './load-form-modal.js';
import './edit-picture.js';
import './data-validation.js';
import '../nouislider/nouislider.js';
import './slider.js';
import { getData } from './api.js';
import { setDefaultClick, setRandomClick, setPopularClick, compareLikes, renderRandomSimilarPhotos } from './get-miniatures.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderSimilarPhotos(photos);
  setDefaultClick(debounce(() => renderSimilarPhotos(photos), RERENDER_DELAY));
  setRandomClick(debounce(() => renderRandomSimilarPhotos(photos), RERENDER_DELAY));
  setPopularClick(debounce(() => renderSimilarPhotos(photos, compareLikes), RERENDER_DELAY));
});
