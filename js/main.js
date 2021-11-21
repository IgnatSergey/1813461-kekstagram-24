import { renderSimilarPhotos } from './get-miniatures.js';
import { setMiniatureClick } from './big-picture-modal.js';
import { setLoadFileChange, setUserFormSubmit, setUserFormSubmitElementClick } from './load-form-modal.js';
import { editPhoto } from './edit-picture.js';
import { validateHashtags, validateComments } from './data-validation.js';
import { getData } from './api.js';
import { setFilterClick, renderSortedPhotos } from './get-miniatures.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderSimilarPhotos(photos);
  setFilterClick(debounce(() => renderSortedPhotos(photos), RERENDER_DELAY));
  setMiniatureClick(photos);
});

setLoadFileChange();
setUserFormSubmit();
setUserFormSubmitElementClick();
editPhoto();
validateHashtags();
validateComments();
