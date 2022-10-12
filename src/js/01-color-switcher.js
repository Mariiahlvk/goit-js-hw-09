const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

const COLOR_DELAY = 1000;

let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStartClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_DELAY);
  btnStart.disabled = true;
  btnStop.disabled = false;
}
function onBtnStopClick() {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
  return;
}
