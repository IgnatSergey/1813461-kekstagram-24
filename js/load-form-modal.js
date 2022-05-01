import { isEscapeKey } from './utils/check-keydown.js';
import { image, effectSlider, scaleControlData, scaleControlInput, onButtonPlusScale, onButtonMinesScale } from './edit-picture.js';
import { hashtagsInput, commentInput, outlineDefaultStyle } from './data-validation.js';
import { sendData } from './api.js';

const loadFileInput = document.querySelector('.img-upload__input');
const editingModal = document.querySelector('.img-upload__overlay');
const editingModalCloseElement = editingModal.querySelector('.img-upload__cancel');
const effectNoneInput = document.querySelector('#effect-none');
const photoForm = document.querySelector('.img-upload__form');
const blockSendSuccess = document.querySelector('#success').content.querySelector('.success');
const blockSendError = document.querySelector('#error').content.querySelector('.error');
const preview = document.querySelector('.img-upload__preview img');
const submitElement = document.querySelector('.img-upload__submit');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const successMessage = blockSendSuccess.cloneNode(true);
const successMessageCloseElement = successMessage.querySelector('.success__button');
const errorMessage = blockSendError.cloneNode(true);
const errorMessageCloseElement = errorMessage.querySelector('.error__button');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

//Открытие окна загрузки фото

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsInput) && !(document.activeElement === commentInput)) {
    evt.preventDefault();
    closeEditingModal();
  }
};

const onPopupKlickClose = () => {
  closeEditingModal();
};

const openEditingModal = () => {
  editingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectNoneInput.checked = true;
  effectSlider.classList.add('hidden');
  scaleControlData.value = 100;
  scaleControlInput.value = '100%';
  scaleControlSmaller.addEventListener('click', onButtonMinesScale);
  scaleControlBigger.addEventListener('click', onButtonPlusScale);
  hashtagsInput.style.outline = outlineDefaultStyle;
  commentInput.style.outline = outlineDefaultStyle;
  commentInput.style.border = 'none';
  hashtagsInput.style.border = 'none';
  hashtagsInput.setCustomValidity('');
  commentInput.setCustomValidity('');

  document.addEventListener('keydown', onPopupEscKeydown);
  editingModalCloseElement.addEventListener('click', onPopupKlickClose);
};

function closeEditingModal() {
  const photoClassName = image.className;
  editingModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadFileInput.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  if (photoClassName) {
    image.classList.remove(photoClassName);
  }
  image.style.transform = 'scale(1)';
  image.style.filter = '';
  scaleControlData.value = 100;
  scaleControlSmaller.removeEventListener('click', onButtonMinesScale);
  scaleControlBigger.removeEventListener('click', onButtonPlusScale);

  document.removeEventListener('keydown', onPopupEscKeydown);
  editingModalCloseElement.removeEventListener('click', onPopupKlickClose);
}

const setLoadFileChange = () => {
  loadFileInput.addEventListener('change', () => {
    const file = loadFileInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
    openEditingModal();
  });
};

//Модуль успешной загрузки фото

successMessage.classList.add('hidden');
document.body.appendChild(successMessage);

const onPopupSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendDataSuccessMessage();
  }
};

const onPopupSuccessKlickClose = () => {
  closeSendDataSuccessMessage();
};

const onPopupSuccessKlickEmpty = (evt) => {
  if (!(evt.target.closest('.success__inner'))) {
    closeSendDataSuccessMessage();
  }
};

const openSendDataSuccessMessage = () => {
  closeEditingModal();
  successMessage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupSuccessEscKeydown);
  successMessageCloseElement.addEventListener('click', onPopupSuccessKlickClose);
  document.addEventListener('click', onPopupSuccessKlickEmpty);
};

function closeSendDataSuccessMessage() {
  successMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupSuccessEscKeydown);
  successMessageCloseElement.removeEventListener('click', onPopupSuccessKlickClose);
  document.removeEventListener('click', onPopupSuccessKlickEmpty);
}

//Модуль ошибки загрузки фото

errorMessage.classList.add('hidden');
document.body.appendChild(errorMessage);

const onPopupErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendDataErrorMessage();
  }
};

const onPopupErrorKlickClose = () => {
  closeSendDataErrorMessage();
};

const onPopupErrorKlickEmpty = (evt) => {
  if (!(evt.target.closest('.error__inner'))) {
    closeSendDataErrorMessage();
  }
};

const openSendDataErrorMessage = () => {
  closeEditingModal();
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupErrorEscKeydown);
  errorMessageCloseElement.addEventListener('click', onPopupErrorKlickClose);
  document.addEventListener('click', onPopupErrorKlickEmpty);
};

function closeSendDataErrorMessage() {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupErrorEscKeydown);
  errorMessageCloseElement.removeEventListener('click', onPopupErrorKlickClose);
  document.removeEventListener('click', onPopupErrorKlickEmpty);
}

const setUserFormSubmitElementClick = () => {
  submitElement.addEventListener('click', () => {
    if (!(hashtagsInput.checkValidity())) {
      hashtagsInput.style.outline = 'none';
      hashtagsInput.style.border = '2px solid red';
    } else if (!(commentInput.checkValidity())) {
      commentInput.style.outline = 'none';
      commentInput.style.border = '2px solid red';
    }
  });
};

const setUserFormSubmit = () => {
  photoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => openSendDataSuccessMessage(),
      () => openSendDataErrorMessage(),
      new FormData(evt.target),
    );
  });
};

export { setLoadFileChange, setUserFormSubmit, setUserFormSubmitElementClick };
