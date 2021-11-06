import { image } from './edit-picture.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

valueElement.value = 100;

function createSlider(minValue, maxValue, startValue, effect, stepValue) {
  noUiSlider.create(sliderElement, {
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: stepValue,
  });

  sliderElement.noUiSlider.on('update', (values, handle, unencoded) => {
    valueElement.value = unencoded[handle];
    if (effect === 'invert') {
      image.style.filter = `${effect}(${valueElement.value}%)`;
    } else if (effect === 'blur') {
      image.style.filter = `${effect}(${valueElement.value}px)`;
    } else {
      image.style.filter = `${effect}(${valueElement.value})`;
    }
  });
}

function deleteSlider() {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
}

export { sliderElement, createSlider, deleteSlider };
