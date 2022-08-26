const ref = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let intervalId = null;

ref.btnStart.addEventListener('click', onBtnStartClick);
ref.btnStop.addEventListener('click', onBtnStopClick);

defaultBtnState();

function defaultBtnState() {
  ref.btnStop.disabled = true;
  ref.btnStart.disabled = false;
}

function reversedBtnState() {
  ref.btnStop.disabled = false;
  ref.btnStart.disabled = true;
}

function onBtnStartClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  reversedBtnState();
}

function onBtnStopClick() {
  clearInterval(intervalId);
  defaultBtnState();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
