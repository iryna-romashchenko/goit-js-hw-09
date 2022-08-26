import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (+selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      initDefaultStartBtnState();
      return;
    } else {
      ref.startBtnEl.disabled = false;
    }
  },
});

ref.startBtnEl.addEventListener('click', onStartBtnClick);
initDefaultStartBtnState();

function initDefaultStartBtnState() {
  ref.startBtnEl.disabled = true;
}

function onStartBtnClick() {
  const targetDate = Number(fp.selectedDates[0]);
  intervalId = setInterval(() => {
    if (targetDate <= Date.now()) {
      clearInterval(intervalId);
      ref.inputEl.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(
      targetDate - Date.now()
    );
    ref.daysEl.innerHTML = addLeadingZero(days);
    ref.hoursEl.innerHTML = addLeadingZero(hours);
    ref.minutesEl.innerHTML = addLeadingZero(minutes);
    ref.secondsEl.innerHTML = addLeadingZero(seconds);
  }, 1000);
  ref.inputEl.disabled = true;
  initDefaultStartBtnState();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
