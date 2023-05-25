let selectedCards = [];


 
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