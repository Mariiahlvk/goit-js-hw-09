// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const btnStart = document.querySelector('button[data-start]');
const dateTime = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const currentDate = Date.now();
let finalDate = null;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finalDate = selectedDates[0] - currentDate;
    if (finalDate <= 0) {
      Report.failure('Try again', 'Please choose a date in the future', 'Good');
    }
    btnStart.disabled = false;
    return (finalDate = selectedDates[0]);
  },
};

flatpickr(dateTime, options);

btnStart.addEventListener('click', btnStartClick);

function btnStartClick() {
  timer.start(finalDate);
}

const timer = {
  intervalId: null,

  start(finalTimer) {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = finalTimer - currentTime;
      if (timeLeft <= 0) {
        this.stop();
      }
      const { days, hours, minutes, seconds } = this.convertMs(timeLeft);
      daysEl.textContent = this.pad(days);
      hoursEl.textContent = this.pad(hours);
      minutesEl.textContent = this.pad(minutes);
      secondsEl.textContent = this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(Value) {
    return String(Value).padStart(2, 0);
  },
};
