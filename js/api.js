import { showAlert } from './utils/get-alert.js';

const SERVER_ADDRESS_FOR_GET = 'https://24.javascript.pages.academy/kekstagram/data';
const SERVER_ADDRESS_FOR_SEND = 'https://24.javascript.pages.academy/kekstagram';
const ALERT_GET_DATA_TEXT = 'Сервер не доступен!';
const ALERT_SEND_DATA_TEXT = 'Не удалось отправить форму. Попробуйте ещё раз';

const getData = (onSuccess) => {
  fetch(SERVER_ADDRESS_FOR_GET)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      showAlert(ALERT_GET_DATA_TEXT);
    })
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_ADDRESS_FOR_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ALERT_SEND_DATA_TEXT);
      }
    })
    .catch(() => {
      onFail(ALERT_SEND_DATA_TEXT);
    });
};

export { getData, sendData };
