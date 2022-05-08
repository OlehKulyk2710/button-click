const refs = {
  input: document.querySelector('.input'),
  btnClick: document.querySelector('.btn-click'),
  btnStart: document.querySelector('.btn-start'),
  btnCurrent: document.querySelector('.btn-current'),
  btnBest: document.querySelector('.btn-best'),
};

let userName = '';
let clickValue = 0;

refs.input.addEventListener('input', onInputChange);

function onInputChange(event) {
  userName = event.target.value.trim();
  clickValue = 0;
}

refs.btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
  if (userName.length === 0) {
    alert('Enter your name');
    return;
  }
  clickValue = 0;

  refs.btnClick.disabled = false;
  refs.btnClick.addEventListener('click', onBtnClick);
  refs.btnClick.classList.add('active');
  setTimeout(() => {
    refs.btnClick.disabled = true;
    refs.btnClick.classList.remove('active');
  }, 4000);
}

function onBtnClick() {
  clickValue += 1;
}

refs.btnCurrent.addEventListener('click', onBtnCurrent);

function onBtnCurrent() {
  console.log('CurrentClickValue', clickValue);
  sessionStorage.setItem('currentClickValue:', JSON.stringify(clickValue));
}

refs.btnBest.addEventListener('click', onBtnBest);

function onBtnBest() {
  let prevClickValue = JSON.parse(localStorage.getItem('bestClickValue'));
  if (!prevClickValue) {
    prevClickValue = { userName, clickValue };
  }

  if (clickValue >= prevClickValue['clickValue']) {
    localStorage.setItem('bestClickValue', JSON.stringify({ userName, clickValue }));
  }

  console.log('BestClickValue:', JSON.parse(localStorage.getItem('bestClickValue')));
}
