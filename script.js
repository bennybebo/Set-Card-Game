let selectedCards = [];

class Card {
    constructor(color, shape, number, shading) {
      this.color = color;
      this.shape = shape;
      this.number = number;
      this.shading = shading;
    }
  }

function initializeDeck() {
    let deck = new Set();

    for (const color of ['red', 'green', 'purple']) {
        for (const shape of ['diamond', 'squiggle', 'oval']) {
            for (const number of [1, 2, 3]) {
                for (const shading of ['solid', 'striped', 'open']) {
                    const card = new Card(color, shape, number, shading);
                    deck.add(card);
                }
            }
        }
    }
    return deck;
}

function dealCards(deck) {
    const dealtCards = []

    while (true) {
        // Randomly deal 12 cards from the deck
        for (let i = 0; i < 12; i++) {
            const randomCard = Array.from(deck)[Math.floor(Math.random() * deck.size)];
            dealtCards.push(randomCard);
        }
        //Check if there is a set among the dealt cards
        const possibleCombinations = getPossibleCombinations(dealtCards);
        const containsValidSet = possibleCombinations.some(([card1, card2, card3]) => isValidSet(card1, card2, card3));

        if (containsValidSet) {
            return dealtCards;
        }
    }
}

function getPossibleCombinations(dealtCards) {
    const possibleCombinations = [];

    function backtrack(startIndex, currentCombination) {
        if (currentCombination.length === 3) {
            possibleCombinations.push(currentCombination.slice());
            return;
        }

        for (let i = startIndex; i < dealtCards.length; i++) {
            currentCombination.push(dealtCards[i]);
            backtrack(i + 1, currentCombination);
            currentCombination.pop();
        }
    }
    backtrack(0, []);
    return possibleCombinations;
}
 
function handleClick(cardNumber) {
    const clickedCard = document.querySelector(`.card:nth-child(${cardNumber})`);

    if (clickedCard.classList.contains('selected')) {
        clickedCard.classList.remove('selected');
        selectedCard = selectedCards.filter(card => card !== clickedCard);
    } else {
        clickedCard.classList.add('selected');
        selectedCards.push(clickedCard);
    }

    if (selectedCards.length === 3) {
        setTimeout(clearSelection, 100);
    }
}

function clearSelection() {
    selectedCards.forEach(card => card.classList.remove('selected'));
    foo();
    selectedCards = [];
}

function clearSelection() {
    selectedCards.forEach(card => card.classList.remove('selected'));
    printOutcome();
    selectedCards = [];
}

function printOutcome() {
    const randomValue = Math.random();
    const messageContainer = document.getElementById('message-container');

    if (randomValue < 0.5) {
        messageContainer.textContent = 'Set';
        messageContainer.classList.add('set');
    } else {
        messageContainer.textContent = 'Not a Set';
        messageContainer.classList.add('not-set');
    }

    setTimeout(() => {
        messageContainer.textContent = '';
        messageContainer.classList.remove('set', 'not-set');
    }, 2000);
}