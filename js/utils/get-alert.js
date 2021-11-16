const ALERT_SHOW_TIME = 5000;
const ALERT_BACKGROUND_CHANGE_TIME = 300;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.padding = '10px 10px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  const changeBackground = async () => {
    let i = 0;
    while (i < ALERT_SHOW_TIME) {
      alertContainer.style.backgroundColor = 'red';
      await sleep(ALERT_BACKGROUND_CHANGE_TIME);
      alertContainer.style.backgroundColor = 'black';
      await sleep(ALERT_BACKGROUND_CHANGE_TIME);
      i = i + ALERT_BACKGROUND_CHANGE_TIME * 2;
    }
  };

  changeBackground();

  setTimeout(() => { alertContainer.remove(); }, ALERT_SHOW_TIME);
};

export { showAlert };
