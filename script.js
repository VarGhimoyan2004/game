const gameBoard = document.getElementById('gameBoard');
const symbols = ['★', '⚽', '✈', '☂', '☎', '♟', '♛', '⚓']; 
let cardSymbols = [...symbols, ...symbols]; 
let openedCards = [];
let matchedCards = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initGame() {
    cardSymbols = shuffle(cardSymbols);
    gameBoard.innerHTML = '';
    
    cardSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.setAttribute('data-symbol', symbol);
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(event) {
    const card = event.target;
    
    if (card.classList.contains('matched') || openedCards.length === 2 || openedCards.includes(card)) {
      return;
  }
    
    revealCard(card);
    openedCards.push(card);
    
    if (openedCards.length === 2) {
        checkForMatch();
    }
}

function revealCard(card) {
    card.textContent = card.getAttribute('data-symbol');
    card.classList.remove('hidden');
}

function hideCard(card) {
    setTimeout(() => {
        card.textContent = '';
        card.classList.add('hidden');
    }, 1000);
}

function checkForMatch() {
    const [card1, card2] = openedCards;
    const symbol1 = card1.getAttribute('data-symbol');
    const symbol2 = card2.getAttribute('data-symbol');
    
    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        hideCard(card1);
        hideCard(card2);
    }
    
    openedCards = [];
}

initGame();