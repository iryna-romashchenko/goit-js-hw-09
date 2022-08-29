import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayField: document.querySelector('input[name="delay"]'),
  stepField: document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
  buttonEl: document.querySelector('button[type="submit"]'),
};

refs.buttonEl.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();

  const { delayField, stepField, amountField } = refs;

  if (!delayField.value || !stepField.value || !amountField.value) {
    Notify.failure(`Error: all fields must be filled in !`);
    return;
  }

  const amount = +amountField.value;
  const step = +stepField.value;
  let delay = +delayField.value;

  for (let index = 0; index < amount; index++) {
    const position = index + 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
