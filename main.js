"use strict"

const inputPlant = document.getElementById('input-plant');
const inputAmount = document.getElementById('input-amount');
const inputId = document.getElementById('input-id');
const buttonAdd = document.getElementById('button-add');
const buttonClear = document.getElementById('button-clear');
const buttonPrint = document.getElementById('button-print');
const passportsBox = document.getElementById('passports-box');


let passportsList = [];
let actualPassport = {id: '', plantName: '', amount: 0, plantId: ''};

inputPlant.addEventListener('change', (e) => actualPassport = {...actualPassport, plantName: (e.target.value)[0].toUpperCase() + (e.target.value).slice(1)});
inputAmount.addEventListener('change', (e) => actualPassport = {...actualPassport, amount: e.target.value});
inputId.addEventListener('change', (e) => actualPassport = {...actualPassport, plantId: e.target.value});

function clearForm() {
  inputPlant.value = null;
  inputAmount.value = null;
  inputId.value = null;
  actualPassport = {id: '', plantName: '', amount: 0, plantId: ''};
}

function handleDeletePassport(id) {
  passportsList = passportsList.filter(passport => passport.id !== id)
  showPassports();
}

function showPassports() {
  const passportsTables = passportsList.map((passport) => {
    return `
    <p class="passport__paragraph">${passport.plantName} &#160; ${passport.amount}szt.</p>
    <div class="passport">
        <table class="table">
          <theader class="table__header"><img src="assets/img/flag-of-europe.svg" class="table__flag"/>Paszport Roślin &#92; Plant Passport</theader>
          <tr>
            <td class="table__cell table__cell--letter">A</td>
            <td class="table__cell table__cell--data">${passport.plantName}</td>
            <td class="table__cell table__cell--letter">B</td>
            <td class="table__cell table__cell--data">PL-18/62/5804</td>
          </tr>
          <tr>
            <td class="table__cell table__cell--letter">C</td>
            <td class="table__cell table__cell--data">${passport.plantId}</td>
            <td class="table__cell table__cell--letter">D</td>
            <td class="table__cell table__cell--data">PL</td>
          </tr>
        </table>
      </div>
      <button class="no-print" onclick="handleDeletePassport('${passport.id}')">Usuń</button>
      <button class="no-print">Edytuj</button>
    `;
  });
  passportsBox.innerHTML = `${passportsTables.join('')}`
}

buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  actualPassport = {...actualPassport, id: uuid.v4()}
  // if(inputPlant.value !== '' & inputId.value !== '') {
    passportsList.push(actualPassport)
    showPassports();
    clearForm();
    
    // }
    inputPlant.focus();
});

buttonClear.addEventListener('click', (e) => {
  e.preventDefault();
  passportsList.length = 0;
  passportsBox.innerHTML = '';
})

buttonPrint.addEventListener('click', () => {
  window.print();
  return false;
});