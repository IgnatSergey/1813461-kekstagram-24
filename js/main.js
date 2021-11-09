import { renderSimilarPhotos } from './get-miniatures.js';
import './big-picture-modal.js';
import './load-form-modal.js';
import './edit-picture.js';
import './data-validation.js';
import '../nouislider/nouislider.js';
import './slider.js';
import { getData } from './api.js';
getData(renderSimilarPhotos);

