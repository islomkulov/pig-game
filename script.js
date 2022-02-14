let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let hold = document.querySelector('.btn--hold');
let input = document.querySelector('.finalScore');

let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let isGamePlayeng = true;
let lastDice;
let dice = document.querySelector('.dice');
dice.style.display = 'none';
document.querySelector('#score--0').textContent = 0;
document.querySelector('#score--1').textContent = 0;
document.querySelector('#current--0').textContent = 0;
document.querySelector('#current--1').textContent = 0;

let rollBtn = document.querySelector('.btn--roll');

rollBtn.addEventListener('click', function () {
  if (isGamePlayeng) {
    dice.style.display = 'block';
    let diceNum = Math.floor(Math.random() * 6 + 1);
    dice.src = 'dice-' + diceNum + '.png';

    if (diceNum == 6 && lastDice == 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score--' + activePlayer).textContent = '0';
      alert('ikkita 6 chiqdi');
      nextPlayer();
    }
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector('#current--' + activePlayer).textContent =
        currentScore;
    } else {
      nextPlayer();
    }
    lastDice = diceNum;
  }
});

hold.addEventListener('click', function () {
  if (isGamePlayeng) {
    // Add current score to tatal score
    scores[activePlayer] += currentScore;

    // Update UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];
  }

  // CHek if the player won the game
  let finalScore;
  input.value !== '' ? (finalScore = input.value) : (finalScore = 50);

  if (scores[activePlayer] >= finalScore) {
    document.querySelector('#name--' + activePlayer).textContent = 'Winner';
    document
      .querySelector('.player--' + activePlayer)
      .classList.add('player--winner');
    document
      .querySelector('.player--' + activePlayer)
      .classList.remove('player--active');
    dice.style.display = 'none';
    isGamePlayeng = false;
  } else {
    nextPlayer();
  }
});

// New game btn
document.querySelector('.btn--new').addEventListener('click', function () {
  dice.style.display = 'none';

  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;

  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--1').classList.remove('player--active');
  player0.classList.add('player--active');
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  input.value = '';
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  dice.style.display = 'none';
}
