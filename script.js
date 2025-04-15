const grid = document.getElementById('grid');
let flippedCards = [];
let matchedCards = [];

function createCards() {
  const letters = ['A','B','C','D','E','F','G','H'];
  const pairLetters = [...letters, ...letters];
  const shuffledLetters = shuffle(pairLetters);

  grid.innerHTML = '';

  for (let i = 0; i < 16; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-letter', shuffledLetters[i]);
    card.setAttribute('data-index', i);

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${i + 1}</div>
        <div class="card-back">${shuffledLetters[i]}</div>
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(card) {
  if (
    flippedCards.includes(card) ||
    matchedCards.includes(card) ||
    flippedCards.length >= 2
  ) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const letter1 = card1.getAttribute('data-letter');
  const letter2 = card2.getAttribute('data-letter');

  if (letter1 === letter2) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === 16) {
      setTimeout(() => alert('🎉 You matched all pairs!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function resetGame() {
  flippedCards = [];
  matchedCards = [];
  createCards();
}

// Start game
createCards();
