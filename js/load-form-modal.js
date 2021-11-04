import { isEscapeKey } from './utils/check-keydown.js';
import { image, currentClassEffect } from './edit-picture.js';
import { hashtagsInput, commentInput } from './data-validation.js';

const loadFileInput = document.querySelector('.img-upload__input');
const editingModal = document.querySelector('.img-upload__overlay');
const editingModalCloseElement = editingModal.querySelector('.img-upload__cancel');
const effectNoneInput = document.querySelector('#effect-none');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput) && !(document.activeElement === commentInput)) {
    evt.preventDefault();
    closeEditingModal();
  }
};

function openEditingModal() {
  editingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectNoneInput.checked = true;

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeEditingModal() {
  editingModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadFileInput.value = '';
  image.classList.remove(`effects__preview--${currentClassEffect}`);

  document.removeEventListener('keydown', onPopupEscKeydown);
}

loadFileInput.addEventListener('change', () => {
  openEditingModal();
});

editingModalCloseElement.addEventListener('click', () => {
  closeEditingModal();
});
