/*
 * Create a list that holds all of your cards
 */

let cardContainer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

let deck = document.getElementById('deck');
let repeat = document.getElementsByClassName('fa-repeat')[0];
let openCards;
let lockedCards;
let moveCounter;
repeat.addEventListener('click', restart);

class Card {
  constructor(symbol, domCard) {
    this.symbol = symbol;
    this.domCard = domCard;
  }
}

let symbols = [
  symbolName.DIAMOND,
  symbolName.PLANE,
  symbolName.ANCHOR,
  symbolName.BOLT,
  symbolName.CUBE,
  symbolName.LEAF,
  symbolName.BICYCLE,
  symbolName.BOMB
];

function restart() {
  if (lockedCards >= 16) {
    let container = document.getElementById('container');
    container.removeChild(document.getElementById('game-over-screen'));
  }
  let index = 0;
  openCards = [];
  lockedCards = 0;
  moveCounter = 0;
  cardContainer = [];
  document.getElementById('moves').innerHTML = 0;

  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }

  for (let i = 1; i <= 16; i++) {
    let card = new Card(symbols[index], document.createElement('div'));
    cardContainer.push(card);

    card.domCard.classList.add('card');
    card.domCard.classList.add('fa');
    card.domCard.classList.add(symbols[index]);
    /* set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   * */
    card.domCard.addEventListener('click', function() {
      /*
      *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
      */
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
  /*- if the list already has another card, check to see if the two cards match
    *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    * 
    *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    * 
    *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    * 
    *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    */
  openCards.push(card);
  if (openCards.length > 1) {
    incrementMoveCounter();
    console.log(openCards);
    if (openCards[0].symbol === card.symbol) {
      lockCard(openCards[0].domCard);
      lockCard(card.domCard);
      lockedCards += 2;
      console.log(lockedCards);
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
  setTimeout(() => {
    let gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'game-over-screen';
    let container = document.getElementById('container');
    container.appendChild(gameOverScreen);
    let gameOverMessage = document.createElement('div');
    gameOverMessage.innerHTML = 'Congratulations! You Won!';
    gameOverMessage.id = 'game-over-message';
    let finalResult = document.createElement('div');
    finalResult.innerHTML = 'With : ' + moveCounter + ' Moves and 3 Stars.';
    gameOverMessage.appendChild(finalResult);
    gameOverScreen.appendChild(gameOverMessage);
    let playAgainBtn = document.createElement('button');
    playAgainBtn.id = 'play-again';
    playAgainBtn.innerHTML = 'Play Again';
    playAgainBtn.onclick = restart;
    gameOverScreen.appendChild(playAgainBtn);
  }, 2000);
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
  console.log('hide');
}

function lockCard(card) {
  card.classList.add('lock');
}

function showCard(card) {
  card.domCard.classList.toggle('open');
  card.domCard.classList.toggle('show');
}

function addCards() {
  //   let cards = shuffle(cardContainer);
  let cards = cardContainer;
  for (let i = 0; i < 16; i++) {
    let card = cards[i].domCard;
    deck.appendChild(card);
  }
}

/*
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
* 
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
* 
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
* 
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

// Shuffle function from http://stackoverflow.com/a/2450976
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

restart();
