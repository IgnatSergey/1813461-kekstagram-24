import { isEscapeKey } from './utils/check-keydown.js';
import { image, currentClassEffect, doScale, effectSlider } from './edit-picture.js';
import { hashtagsInput, commentInput } from './data-validation.js';
import { sendData } from './api.js';

const loadFileInput = document.querySelector('.img-upload__input');
const editingModal = document.querySelector('.img-upload__overlay');
const editingModalCloseElement = editingModal.querySelector('.img-upload__cancel');
const effectNoneInput = document.querySelector('#effect-none');
const photoForm = document.querySelector('.img-upload__form');
const blockSendSuccess = document.querySelector('#success').content.querySelector('.success');
const blockSendError = document.querySelector('#error').content.querySelector('.error');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput) && !(document.activeElement === commentInput)) {
    evt.preventDefault();
    closeEditingModal();
  }
};

function openEditingModal() {
  editingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  image.classList.add('effects__preview--none');
  effectNoneInput.checked = true;
  effectSlider.classList.add('hidden');
  doScale(100);

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeEditingModal() {
  editingModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadFileInput.value = '';
  image.classList.remove(`effects__preview--${currentClassEffect}`);
  image.style.transform = 'scale(1)';
  image.style.filter = '';

  document.removeEventListener('keydown', onPopupEscKeydown);
}

loadFileInput.addEventListener('change', () => {
  openEditingModal();
});

editingModalCloseElement.addEventListener('click', () => {
  closeEditingModal();
});


const successMessage = blockSendSuccess.cloneNode(true);
successMessage.classList.add('hidden');
document.body.appendChild(successMessage);
const successMessageCloseElement = successMessage.querySelector('.success__button');

const onPopupSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendDataSuccessMessage();
  }
};

function openSendDataSuccessMessage() {
  closeEditingModal();
  successMessage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupSuccessEscKeydown);
  document.addEventListener('click', (evt) => {
    if (!(evt.target.closest('.success__inner'))) {
      closeSendDataSuccessMessage();
    }
  });
}

function closeSendDataSuccessMessage() {
  successMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupSuccessEscKeydown);
}

successMessageCloseElement.addEventListener('click', () => {
  closeSendDataSuccessMessage();
});

const errorMessage = blockSendError.cloneNode(true);
errorMessage.classList.add('hidden');
document.body.appendChild(errorMessage);
const errorMessageCloseElement = errorMessage.querySelector('.error__button');

const onPopupErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendDataErrorMessage();
  }
};

function openSendDataErrorMessage() {
  closeEditingModal();
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupErrorEscKeydown);
  document.addEventListener('click', (evt) => {
    if (!(evt.target.closest('.error__inner'))) {
      closeSendDataErrorMessage();
    }
  });
}

function closeSendDataErrorMessage() {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupErrorEscKeydown);
}

errorMessageCloseElement.addEventListener('click', () => {
  closeSendDataErrorMessage();
});

const setUserFormSubmit = (onSuccess, onFail) => {
  photoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit(openSendDataSuccessMessage, openSendDataErrorMessage);
