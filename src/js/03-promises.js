import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = e.currentTarget.delay.valueAsNumber;
  const step = e.currentTarget.step.valueAsNumber;
  const amount = e.currentTarget.amount.valueAsNumber;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      // console.log({ position, delay });
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      // console.log({ position, delay });
    });
}
