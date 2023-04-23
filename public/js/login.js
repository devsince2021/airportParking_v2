console.log('login.js file connected');

const hiddenUrl = document.querySelector('#form__url__secret');
const form = document.querySelector('#form__login');
const idInput = document.querySelector('#form__id');
const pwInput = document.querySelector('#form__password');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const res = await requestLogin(event);
  console.log(res);
});

const requestLogin = async (event) => {
  const url = hiddenUrl.textContent;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(createBody(event)),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  return result;
};

const createBody = (event) => {
  const id = event.target[idInput.name]?.value ?? '';
  const password = event.target[pwInput.name]?.value ?? '';

  return { id, password };
};
