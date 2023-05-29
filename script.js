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
    }

    for (let i = startIndex; i < dealtCards.length; i++) {
        currentCombination.push(dealtCards[i]);
        backtrack(i + 1, currentCombination);
        currentCombination.pop();
    }
    return possibleCombinations;
}

//TODO: isValidSet function
function compareElements(element1, element2, element3) {
    let result = 0;
    // Compare each element from three cards, e.g. only color here
    if ((element1 === element2) && (element2 === element3)) {
        result = 1;     // if all the elements are equal, all three cards have the same color
    } else if ((element1 !== element2) && (element1 !== element3) && (element2 !== element3)) {
        result = 0;     // if none of the element is equal, all three cards have different colors
    } else {
        result = -1;    // if only two of the elements are equal, they are not qualified
    }
    return result;
}

function isValidSet(selectedCards) {    // Suppose selectedCards will have three elements
    let isValidSet = false;
    let count = 0;
    // Compare each corresponding element from three cards
    let colorResult = compareElements(selectedCards[0].color, selectedCards[1].color, selectedCards[2].color);
    let shapeResult = compareElements(selectedCards[0].shape, selectedCards[1].shape, selectedCards[2].shape);
    let numberResult = compareElements(selectedCards[0].number, selectedCards[1].number, selectedCards[2].number);
    let shadingResult = compareElements(selectedCards[0].shading, selectedCards[1].shading, selectedCards[2].shading);
    // Check validity
    if ((colorResult == -1) || (shapeResult == -1) || (numberResult == -1) || (shadingResult == -1)) {
        isValidSet = false;
    } else {
        count = colorResult + shapeResult + numberResult + shadingResult;
        // 0 means 0 same element and 4 different elements
        // 1 means 1 same element and 3 different elements
        // 3 means 3 same elements and 1 different elements
        if ((count == 0) || (count == 1) || (count == 3)) {
            isValidSet = true;
        }
    }
    return isValidSet;
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