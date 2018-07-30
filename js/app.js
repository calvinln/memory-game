let cardContainer;
let openCards;
let lockedCards;
let moveCounter;
let deck = document.getElementById('deck');
let repeat = document.getElementsByClassName('fa-repeat')[0];
let timer;
let minutes = 0;
let seconds = 0;
const symbolName = {
  DIAMOND: 'fa-diamond',
  PLANE: 'fa-paper-plane-o',
  ANCHOR: 'fa-anchor',
  BOLT: 'fa-bolt',
  CUBE: 'fa-cube',
  LEAF: 'fa-leaf',
  BICYCLE: 'fa-bicycle',
  BOMB: 'fa-bomb'
};
const symbols = [
  symbolName.DIAMOND,
  symbolName.PLANE,
  symbolName.ANCHOR,
  symbolName.BOLT,
  symbolName.CUBE,
  symbolName.LEAF,
  symbolName.BICYCLE,
  symbolName.BOMB
];

repeat.addEventListener('click', function() {
  clearInterval(timer);
  restart();
});

class Card {
  constructor(symbol, domCard) {
    this.symbol = symbol;
    this.domCard = domCard;
  }
}

function restart() {
  timer = setInterval(updateTime, 1000);
  minutes = 0;
  seconds = 0;
  document.getElementById('minutes').innerHTML = '00';
  document.getElementById('seconds').innerHTML = '00';

  if (lockedCards >= 16) {
    let container = document.getElementById('container');
    container.removeChild(document.getElementById('game-over-screen'));
  }

  let stars = document.getElementsByTagName('li');
  if (stars) {
    for (let i = 0; i < 3; i++) {
      if (stars[i].childNodes[1].classList.contains('fa-star-o')) {
        stars[i].childNodes[1].classList.toggle('fa-star');
        stars[i].childNodes[1].classList.toggle('fa-star-o');
      }
    }
  }
  starCount = 3;
  starIndex = 2;
  openCards = [];
  lockedCards = 0;
  moveCounter = 0;
  cardContainer = [];
  let index = 0;

  document.getElementById('moves').innerHTML = 0;

  // remove all cards from deck
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }

  for (let i = 1; i <= 16; i++) {
    let card = new Card(symbols[index], document.createElement('div'));
    cardContainer.push(card);

    card.domCard.classList.add('card');
    card.domCard.classList.add('fa');
    card.domCard.classList.add(symbols[index]);

    card.domCard.addEventListener('click', function() {
      if (
        !card.domCard.classList.contains('lock') &&
        !card.domCard.classList.contains('open')
      ) {
        showCard(card);
        addOpenCard(card);
      }
    });
    // make sure there are two cards of every symbol
    if (i % 2 === 0) {
      index += 1;
    }
  }
  addCards();
}

function addOpenCard(card) {
  openCards.push(card);
  if (openCards.length > 1) {
    incrementMoveCounter();
    adjustStars();
    if (openCards[0].symbol === card.symbol) {
      lockCard(openCards[0].domCard);
      lockCard(card.domCard);
      lockedCards += 2;
      if (lockedCards >= 16) {
        gameOver();
      }
    } else {
      hideCard(openCards[0].domCard);
      hideCard(card.domCard);
    }
    openCards.pop();
    openCards.pop();
  }
}

function gameOver() {
  clearInterval(timer);
  let gameOverScreen = document.createElement('div');
  let container = document.getElementById('container');
  let gameOverMessage = document.createElement('div');
  let finalResult = document.createElement('div');
  let starString = starCount === 1 ? ' star.' : ' stars.';
  let playAgainBtn = document.createElement('button');
  let min = minutes === 1 ? minutes + ' minute' : minutes + ' minutes';
  let sec = seconds + ' seconds.';
  let time = min + ' and ' + sec;
  gameOverScreen.id = 'game-over-screen';
  gameOverMessage.innerHTML = 'Congratulations! You Won!';
  gameOverMessage.id = 'game-over-message';
  finalResult.innerHTML =
    'With: ' +
    moveCounter +
    ' Moves and ' +
    starCount +
    starString +
    ' All in ' +
    time;
  playAgainBtn.id = 'play-again';
  playAgainBtn.innerHTML = 'Play Again';
  playAgainBtn.onclick = restart;
  setTimeout(() => {
    container.appendChild(gameOverScreen);
    gameOverMessage.appendChild(finalResult);
    gameOverScreen.appendChild(gameOverMessage);
    gameOverScreen.appendChild(playAgainBtn);
  }, 2000);
}

let starIndex = 2;
let starCount = 3;

function adjustStars() {
  if (moveCounter > 14 && moveCounter % 2 === 0 && starIndex > 0) {
    let stars = document.getElementsByClassName('fa-star');
    stars[starIndex].classList.toggle('fa-star-o');
    stars[starIndex].classList.toggle('fa-star');
    starIndex -= 1;
    starCount -= 1;
  }
}

function incrementMoveCounter() {
  moveCounter++;
  document.getElementById('moves').innerHTML = moveCounter;
}

function hideCard(card) {
  setTimeout(() => {
    card.classList.toggle('open');
    card.classList.toggle('show');
  }, 2000);
}

function lockCard(card) {
  card.classList.add('lock');
}

function showCard(card) {
  card.domCard.classList.toggle('open');
  card.domCard.classList.toggle('show');
}

function addCards() {
  let cards = shuffle(cardContainer);
  // let cards = cardContainer;
  for (let i = 0; i < 16; i++) {
    let card = cards[i].domCard;
    deck.appendChild(card);
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function updateTime() {
  let DOMminutes = document.getElementById('minutes');
  let DOMseconds = document.getElementById('seconds');
  let minStr = DOMminutes.innerHTML;
  let secStr = DOMseconds.innerHTML;
  seconds += 1;
  if (seconds < 10) {
    secStr = '0' + seconds;
  } else if (seconds >= 60) {
    minutes += 1;
    if (minutes < 10) {
      minStr = '0' + minutes;
    } else {
      minStr = minutes;
    }
    seconds = 0;
    secStr = '0' + seconds;
  } else {
    secStr = seconds;
  }
  DOMminutes.innerHTML = minStr;
  DOMseconds.innerHTML = secStr;
}

restart();
