/*
 * Create a list that holds all of your cards
 */

let cards = [];

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

let openCards = [];

let index = 0;
for (let i = 1; i <= 16; i++) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('fa');
  card.classList.add(symbols[index]);
  /* set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   * */
  card.addEventListener('click', function() {
    showCard(card);
    /*
    *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    */
    addOpenCard(card);
  });
  cards.push(card);
  // make sure there are two cards of every symbol
  if (i % 2 === 0) {
    index += 1;
  }
}

function addOpenCard(card) {
  openCards.push(card);
}

function showCard(card) {
  card.classList.add('open');
  card.classList.add('show');
}

function addCards() {
  cards = shuffle(cards);
  for (let i = 0; i < 16; i++) {
    let card = cards[i];
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

addCards();
