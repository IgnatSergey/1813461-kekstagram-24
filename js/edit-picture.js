import { createSlider, deleteSlider } from './slider.js';


const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const scaleControlData = document.querySelector('.scale__control--data');
const image = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.img-upload__effect-level ');

function doScale(scaleValueStart) {
  let scaleValue = scaleValueStart;
  scaleControlSmaller.addEventListener('click', () => {
    if (scaleValue > 25) {
      scaleValue -= 25;
      scaleControlInput.value = `${String(scaleValue)}%`;
      image.style.transform = `scale(${scaleValue / 100})`;
      scaleControlData.value = scaleValue;
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (scaleValue < 100) {
      scaleValue += 25;
      scaleControlInput.value = `${String(scaleValue)}%`;
      image.style.transform = `scale(${scaleValue / 100})`;
      scaleControlData.value = scaleValue;
    }
  });
}

const effectsList = document.querySelector('.effects__list');
let currentClassEffect = 'none';

effectsList.addEventListener('change', (evt) => {
  image.classList.remove(`effects__preview--${currentClassEffect}`);
  currentClassEffect = evt.target.value;
  image.classList.add(`effects__preview--${currentClassEffect}`);
  image.style.filter = '';
  deleteSlider();

  if (currentClassEffect === 'none') {
    effectSlider.classList.add('hidden');
  } else {
    effectSlider.classList.remove('hidden');
  }

  if (currentClassEffect === 'chrome') {
    createSlider(0, 1, 1, 'grayscale', 0.1);
  } else if (currentClassEffect === 'sepia') {
    createSlider(0, 1, 1, 'sepia', 0.1);
  } else if (currentClassEffect === 'marvin') {
    createSlider(0, 100, 100, 'invert', 1);
  } else if (currentClassEffect === 'phobos') {
    createSlider(0, 3, 3, 'blur', 0.1);
  } else if (currentClassEffect === 'heat') {
    createSlider(1, 3, 3, 'brightness', 0.1);
  }
});

export { image, currentClassEffect, doScale, effectSlider };

