const scaleControlSmaler = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

let scaleValue = Number(scaleControlInput.value.slice(0, -1));

scaleControlSmaler.addEventListener('click', () => {
  if (scaleValue > 25) {
    scaleValue -= 25;
    scaleControlInput.value = `${String(scaleValue)}%`;
    image.style.transform = `scale(${scaleValue / 100})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (scaleValue < 100) {
    scaleValue += 25;
    scaleControlInput.value = `${String(scaleValue)}%`;
    image.style.transform = `scale(${scaleValue / 100})`;
  }
});

const effectsList = document.querySelector('.effects__list');
let currentClassEffect = 'none';

effectsList.addEventListener('change', (evt) => {
  image.classList.remove(`effects__preview--${currentClassEffect}`);
  currentClassEffect = evt.target.value;
  image.classList.add(`effects__preview--${currentClassEffect}`);
});

export { image, currentClassEffect };

