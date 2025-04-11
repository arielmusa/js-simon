// inizio con la selezione degli elementi del DOM
// visualizzare in pagina 5 numeri casuali:
// necessito di una funzione math.random che utilizzo per generare i numeri ed inserirli dentro un array
// l'array mi serve dopo per verificare se l'input dell'utente è corretto
// il math.random dovrà generare un numero. poi mi serve anche una funzione per generare n numeri. n è un parametro della funzione
// dopo faccio un ciclo ed inserisco ogni numero casuale come <li> dentro la <ul>
// ------
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input
// in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce:
// utilizzo il timeout per il timer e per far comparire i numeri random. si conclude con la rimozione del d-none su input
// qui utilizzo un eventlistener sul submit del form che mi prende i valori degli input.
// poi necessito di una funzione per verificare se gli input sono corretti e indico quali sono.
// gestisco anche gli errori negli input, come valori duplicati, assenti o NaN.
//

// TODO: handle duplicate numbers in array gen
// TODO: handle input errors
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * generate random numbers
 * @param {Integer} n how many numbers you need
 * @returns array of generated numbers
 */
function generateRandomNumbersArray(n) {
  const numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(generateRandomNumber(1, 50));
  }
  return numbers;
}
// get DOM elements
const countdown = document.getElementById("countdown");
const instructions = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const inputGroup = document.getElementById("input-group");
const inputs = inputGroup.querySelectorAll("input");
const message = document.getElementById("message");
const answersForm = document.getElementById("answers-form");
console.log(inputs);

// generate 5 random numbers
const randomNumbers = generateRandomNumbersArray(5);

console.log(countdown);
console.log(numbersList);
console.log(answersForm);
console.log(randomNumbers);

// add numbers as li elements in ul
for (let i = 0; i < randomNumbers.length; i++) {
  const li = document.createElement("li");
  li.textContent = randomNumbers[i];
  numbersList.appendChild(li);
  console.log(li);
}

// handle countdown and timeout
let countdownSeconds = 30 * 1000;
let countdownIntervalId;
function handlecountdown() {
  countdown.textContent = countdownSeconds / 1000;
  countdownSeconds -= 1000;
  if (countdownSeconds == 0) clearInterval(countdownIntervalId);
}
countdownIntervalId = setInterval(handlecountdown, 1000);

// set timeout to handle the display of DOM elements
setTimeout(() => {
  numbersList.classList.add("d-none");
  answersForm.classList.remove("d-none");
  countdown.classList.add("d-none");
  instructions.classList.add("d-none");
}, 1000 * 30);

// event listener that gets input values and compare user [inputValues] with [randomNumbers]
answersForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValues = Array.from(inputs).map((inputs) =>
    parseInt(inputs.value)
  );
  console.log(inputValues);

  // put correct values in array
  const correctValues = [];

  // cycle the input array to check if [inputValues] == [randomNumbers], if so, push value in [correctValues]
  for (let i = 0; i < inputValues.length; i++) {
    currentValue = inputValues[i];
    if (randomNumbers.includes(currentValue)) {
      correctValues.push(currentValue);
    }
  }

  // comunicate to user if he won/lost and the [correctValues]
  if (randomNumbers > correctValues)
    message.textContent = `Hai sbagliato. Ti sei ricordato solo questi numeri ${correctValues}`;
  else
    message.textContent = `Congratulazioni! I numeri sono corretti! ${correctValues}`;
});
