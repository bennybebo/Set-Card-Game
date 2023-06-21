let selectedCards = [];
let currentPlayer = null;
let timeoutId;

class Card {
  constructor(color, shape, number, shading) {
    this.color = color;
    this.shape = shape;
    this.number = number;
    this.shading = shading;
  }
}

/*
 * Function creates a set of 81 unique cards.
 * Expects nothing as input and returns the set of cards
 */
function initializeDeck() {
  let deck = new Set();

  for (const color of ["red", "green", "blue"]) {
    for (const shape of ["diamond", "squiggle", "oval"]) {
      for (const number of [1, 2, 3]) {
        for (const shading of ["solid", "striped", "open"]) {
          const card = new Card(color, shape, number, shading);
          deck.add(card);
        }
      }
    }
  }
  return deck;
}

/*
 * Function removes 12 cards from the deck that contain at least one set.
 * Expects a set of cards as input and returns an array of 12 cards.
 */
function dealCards(deck) {
  const deckArray = Array.from(deck);
  while (true) {
    const dealtCards = [];
    // Randomly deal 12 cards from the deck
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * deckArray.length);
      const randomCard = deckArray[randomIndex];
      dealtCards.push(randomCard);
      deckArray.splice(randomIndex, 1);
    }
    //Check if there is a set among the dealt cards
    const possibleCombinations = getPossibleCombinations(dealtCards);
    const containsValidSet = possibleCombinations.some(
      ([card1, card2, card3]) => isValidSet([card1, card2, card3])
    );
    if (containsValidSet) {
      //Remove the dealt cards from the deck
      for (const card of dealtCards) {
        deck.delete(card);
      }
      return dealtCards;
    } else {
      //dealtCards did not contain a set, add the dealt cards back into the deck
      deckArray.push(...dealtCards);
    }
  }
}

/*
 * Removes three cards from the deck and adds them to the visible cards array.
 * Expects an array of cards and a set of cards as input and returns nothing.
 */
function addThreeCards(visibleCards, deck) {
  const deckArray = Array.from(deck);

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * deckArray.length);
    const randomCard = deckArray[randomIndex];
    visibleCards.push(randomCard);
    deckArray.splice(randomIndex, 1);
    deck.delete(randomCard);
  }
}

/*
 * Determines if three cards are a set.
 * Expects three cards as input and returns a boolean.
 */
function isSet(card1, card2, card3) {
  for (const attribute of Object.keys(card1)) {
    //For each attribute
    const values = new Set([
      card1[attribute],
      card2[attribute],
      card3[attribute],
    ]);
    if (values.size === 2) {
      //If three cards share two attributes it is not a set
      return false;
    }
  }
  return true;
}

/*
 * Gets all possible 3 card combinations from within an array of cards.
 * Expects an array of cards as input and returns an array of possible combinations.
 */
function getPossibleCombinations(dealtCards) {
  const possibleCombinations = [];

  //Recursive function to loop through an array and get all combinations starting at a given index
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

/*
 * Compares one element from each selected cards
 * Called by isValidSet function
 * Expects one element from each selected cards as input
 */
function compareElements(element1, element2, element3) {
  let result = 0;
  // Compare each element from three cards, e.g. only color here
  if (element1 === element2 && element2 === element3) {
    result = 1; // if all the elements are equal, all three cards have the same color
  } else if (
    element1 != element2 &&
    element1 != element3 &&
    element2 != element3
  ) {
    result = 0; // if none of the element is equal, all three cards have different colors
  } else {
    result = -1; // if only two of the elements are equal, they are not qualified
  }
  return result;
}

/*
 * Checks whether the three cards selected by players are a set
 * Expects the array selectedCards with three items as input
 */
function isValidSet(selectedCards) {
  // Suppose selectedCards will have three elements
  let isValidSet = false;
  // Compare each corresponding element from three cards
  let colorResult = compareElements(
    selectedCards[0].color,
    selectedCards[1].color,
    selectedCards[2].color
  );
  let shapeResult = compareElements(
    selectedCards[0].shape,
    selectedCards[1].shape,
    selectedCards[2].shape
  );
  let numberResult = compareElements(
    selectedCards[0].number,
    selectedCards[1].number,
    selectedCards[2].number
  );
  let shadingResult = compareElements(
    selectedCards[0].shading,
    selectedCards[1].shading,
    selectedCards[2].shading
  );
  // Check validity
  if (
    colorResult == -1 ||
    shapeResult == -1 ||
    numberResult == -1 ||
    shadingResult == -1
  ) {
    isValidSet = false;
  } else {
    isValidSet = true;
  }

  return isValidSet;
}

/*
 * Checks if there is a set within an array of cards.
 * Expects an array of cards as input and returns a boolean.
 */
function containsSet(visibleCards) {
  const possibleCombinations = getPossibleCombinations(visibleCards);
  return possibleCombinations.some(([card1, card2, card3]) =>
    isValidSet([card1, card2, card3])
  );
}

/*
 * Triggers either a selection or deselection for a card, and
 * toggles checkSelectedCard() if three cards are selected
 * Expects a card number and returns nothing
 */
function handleClick(cardNumber) {
  const clickedCard = dealtCards[cardNumber - 1];

  if (isSelected(clickedCard)) {
    deselectCard(clickedCard);
  } else {
    selectCard(clickedCard);
  }

  if (selectedCards.length === 3) {
    checkSelectedCards();
  }
}

/*
 * When selectedCards has 3 elements, check whether or not it is a set and handle each case.
 * Expects nothing as input and returns nothing.
 */
function checkSelectedCards() {
  selectedCardsCopy = selectedCards;
  clearSelection();
  clearTimeout(timeoutId);
  let isaSet = false;
  if (isValidSet(selectedCardsCopy)) {
    isaSet = true;
    //Increase score of player
    increaseScore(currentPlayer);
    //Replace selected cards with new ones
    replaceCards(selectedCardsCopy);
    printOutcome(isaSet);
    if (deck.size == 0 && !(containsSet(dealtCards))){
      printGameOver()
    }
    //Update card images
    cardImages();
  } else {
    //Decrease score of player
    decreaseScore(currentPlayer);
    //Clear the selection
    printOutcome(isaSet);
  }
  currentPlayer = null;
}

/*
 * Returns if a given card is in selectedCards
 * Expects a card as input and returns a boolean
 */
function isSelected(card) {
  return selectedCards.includes(card);
}

/*
 * Selects a card that is clicked, handles border/outline
 * Expects a card as input parameter and returns nothing
 */
function selectCard(card) {
  const cardIndex = dealtCards.indexOf(card);
  const cardElement = document.querySelector(
    `.card:nth-child(${cardIndex + 1})`
  );
  const isHinted = cardElement.style.outline !== "";

  if (isHinted) {
    cardElement.style.outline = ""; // Remove the hint outline
  }

  selectedCards.push(card);
  cardElement.classList.add("selected");
}

/*
 * Deselects a card (and removes the border)
 * Expects a card as input and returs nothing
 */
function deselectCard(card) {
  selectedCards = selectedCards.filter((c) => c !== card);
  const cardIndex = dealtCards.indexOf(card);
  const cardElement = document.querySelector(
    `.card:nth-child(${cardIndex + 1})`
  );
  cardElement.classList.remove("selected");
}

/*
 * Removes selected cards from the dealtCards array
 * Expects nothing as input and returns nothing
 */
function clearSelection() {
  selectedCards.forEach((card) => {
    const cardIndex = dealtCards.indexOf(card);
    const cardElement = document.querySelector(
      `.card:nth-child(${cardIndex + 1})`
    );
    cardElement.classList.remove("selected");
  });
  selectedCards = [];
}

/*
 * Prints if the three selected items are a set or not
 * Expects a boolean parameter (set or not), and returns nothing
 */
function printOutcome(isaSet) {
  const messageContainer = document.getElementById("message-container");
  if (isaSet == true) {
    messageContainer.textContent = "Set";
    messageContainer.classList.add("set");
  } else {
    messageContainer.textContent = "Not a Set";
    messageContainer.classList.add("not-set");
  }
  setTimeout(() => {
    messageContainer.textContent = "";
    messageContainer.classList.remove("set", "not-set");
  }, 3000);
}

// 2 players' scores object
let scores = {
  player1: 0,
  player2: 0,
};

/*
 * Increases current player's score
 * Expects a player as a parameter and returns nothing
 */
function increaseScore(player) {
  scores[player]++;
  // display scores for the corresponding player
  if (player === "player1") {
    document.getElementById("points1").textContent =
      padNumber(scores[player]) + " points";
  } else {
    document.getElementById("points2").textContent =
      padNumber(scores[player]) + " points";
  }
}
/*
 * Decreases current player's score
 * Expects a player as a parameter and returns nothing
 */
function decreaseScore(player) {
  scores[player]--;
  // display scores for the corresponding player
  if (player === "player1") {
    document.getElementById("points1").textContent =
      padNumber(scores[player]) + " points";
  } else {
    document.getElementById("points2").textContent =
      padNumber(scores[player]) + " points";
  }
}

/*
 * Resets current scores
 * Expects nothing and returns nothing
 */
function resetScores() {
  scores = {
    player1: 0,
    player2: 0,
  };
  document.getElementById("points1").textContent = padNumber("0") + " points";
  document.getElementById("points2").textContent = padNumber("0") + " points";
}

/*
 * Keyboard listener that changes who the current player is based off key press.
 */
document.addEventListener("keydown", function (event) {
  if (currentPlayer === null) {
    const messageContainer = document.getElementById("message-container");
    //First player to press a key becomes the current player
    if (event.key === "a") {
      messageContainer.textContent = "Player 1's turn";
      messageContainer.classList.add("set");
      currentPlayer = "player1";
      clearTimeout(timeoutId); //Clear the timeout for the previous player (if any)
      timeoutId = setTimeout(playerTimeout, 5000); //Set a 5 second timer
    } else if (event.key === "l") {
      messageContainer.textContent = "Player 2's turn";
      messageContainer.classList.add("set");
      currentPlayer = "player2";
      clearTimeout(timeoutId); //Clear the timeout for the previous player (if any)
      timeoutId = setTimeout(playerTimeout, 5000); //Set a 5 second timer
    }
    setTimeout(() => {
      messageContainer.textContent = "";
      messageContainer.classList.remove("Player 1's turn", "Player 2's turn");
    }, 5000);
  }
});

/*
 * Handles player timeout.
 * Expects nothing as input and returns nothing.
 */
function playerTimeout() {
  clearSelection();
  // Player timed out, handle the timeout logic here
  if (currentPlayer === "player1") {
    decreaseScore("player1");
  } else {
    decreaseScore("player2");
  }
  currentPlayer = null; //Reset the current player
  timeoutId = null; //Reset the timeout ID
}

/*
 * Handles the card replacement process
 * Removes the selected cards from dealtCards,
 * deletes extra cards, and adds three new cards
 * from the deck.
 * Expects a selectedCards copy and returns nothing
 */
function replaceCards(selectedCardsCopy) {
  // Remove selected cards from dealtCards
  for (const card of selectedCardsCopy) {
    const cardIndex = dealtCards.findIndex((c) => c === card);
    if (cardIndex !== -1) {
      dealtCards.splice(cardIndex, 1);
    }
  }

  if (dealtCards.length > 9) {
    //delete extra cards
    container = document.getElementsByClassName("container");
    for (let i = 0; i < 3; i++) {
      container[0].lastChild.remove();
    }
  } else {
    // Add three new cards from the deck
    const deckArray = Array.from(deck);
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * deckArray.length);
      const randomCard = deckArray.splice(randomIndex, 1)[0];
      dealtCards.push(randomCard);
      deck.delete(randomCard);
    }
  }
}

/* Adds images to the html div elements
 * Expects nothing and returns nothing.
 */
function cardImages() {
  for (var i = 1; i < dealtCards.length + 1; i++) {
    const cardIndex = i - 1;
    const card = dealtCards[cardIndex];
    const imgSrc =
      "imgs/" +
      card.color +
      "_" +
      card.shape +
      "_" +
      card.number +
      "_" +
      card.shading +
      ".jpg";

    const cardElement = document.querySelector(`.card:nth-child(${i})`);
    // Clear previous image elements
    cardElement.innerHTML = "";

    const image = document.createElement("img");
    image.src = imgSrc;
    image.alt = "Image";

    const boxWidth = cardElement.offsetWidth;
    const boxHeight = cardElement.offsetHeight;

    // Set the width and height of the image to match the box dimensions
    image.style.width = boxWidth + "px";
    image.style.height = boxHeight + "px";

    cardElement.appendChild(image);
  }
}

/*
 * Returns the length of the selected cards
 * Expects selectedCards and returns its length
 */
function lenSelectedCards(selectedCards) {
  return selectedCards.length;
}

/* Provides the player with hints, and
 * removes outlines on cards
 * Expects nothing and returns nothing
 */
function hint() {
  if (!containsSet(dealtCards)) {
    const messageContainer = document.getElementById("message-container");

    messageContainer.textContent = "No displayed sets! Hit open new cards.";
    messageContainer.classList.add("no-sets");
    setTimeout(() => {
    messageContainer.textContent = "";
    messageContainer.classList.remove("message-container");
  }, 4000);
  }
  else {
  let combos = getPossibleCombinations(dealtCards);
    for (const combo of combos) {
      if (isValidSet(combo)) {
          var card = document.getElementById(
          "card" + (dealtCards.indexOf(combo[0]) + 1)
          );
          card.style.outline = "5px solid #b700ff";

        setTimeout(() => {
          for (const cardIndex of combo) {
            var card = document.getElementById("card" + (dealtCards.indexOf(cardIndex) + 1));
            card.style.outline = "5px solid rgba(255, 0, 0, 0.0)";
          }
        }, 5000);
        break;
      }
    }
  }
}
/* Provides the player with hints, and
 * removes outlines on cards
 * Expects nothing and returns nothing
 */
function hint2() {
 if (!containsSet(dealtCards)) {
    const messageContainer = document.getElementById("message-container");

    messageContainer.textContent = "No displayed sets! Hit open new cards.";
    messageContainer.classList.add("no-sets");
    setTimeout(() => {
    messageContainer.textContent = "";
    messageContainer.classList.remove("message-container");
  }, 4000);
  } 
  else { 
    let combos = getPossibleCombinations(dealtCards);
    for (const combo of combos) {
        if (isValidSet(combo)) {
        
            for (let i = 0; i < combo.length - 1; i++) {
                var card = document.getElementById(
                "card" + (dealtCards.indexOf(combo[i]) + 1)
                );
                card.style.outline = "5px solid #b700ff";
            }

            //remove outlines on cards
            setTimeout(() => {
            for (let i = 0; i < combo.length - 1; i++) {
                var card = document.getElementById(
                "card" + (dealtCards.indexOf(combo[i]) + 1)
                );
                card.style.outline = "5px solid rgba(255, 0, 0, 0.0)";
            }
            }, 5000);
            break;
        }
    }
  }
}

/* Opens three new cards to add to the screen.
 * Called when Open New Cards button is clicked.
 * Expects nothing and returns nothing.
 */
function openNewCards() {
  container = document.getElementsByClassName("container");
  for (let i = 0; i < 3; i += 1) {
    deckArr = Array.from(deck);
    let card = deckArr[Math.floor(Math.random() * deckArr.length)];
    deck.delete(card);
    dealtCards.push(card);
    cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("id", "card" + dealtCards.length);
    cardDiv.setAttribute("onclick", "handleClick(" + dealtCards.length + ")");
    container[0].appendChild(cardDiv);
  }
  cardImages();
}



/*
 * Prints "game over" when the game is over.
 * Expects nothing and returns nothing
 */
function printGameOver() {
  const messageContainer = document.getElementById("message-container");
  if(scores.player1 > scores.player2){
    messageContainer.textContent = "Last set found! Player 1 wins!";
  }
  else if(scores.player2 > scores.player1){
    messageContainer.textContent = "Last set found! Player 2 wins!";
  } 
  else {
    messageContainer.textContent = "Last set found! Tie game!";
  }
  messageContainer.classList.add("game-over");
  setTimeout(() => {
    messageContainer.textContent = "";
    messageContainer.classList.remove("message-container");
  }, 3000);
}

/*
 * Pads the number with leading zeros
 * Expects a number and returns the padded number
 */
function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function newGame() {
  var container = document.querySelector('.container');
  container.innerHTML = '';

  // Generate and add 12 new cards to the container
  for (var i = 1; i <= 12; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    card.id = 'card' + i;
    card.setAttribute('onclick', 'handleClick(' + i + ')');
    container.appendChild(card);
  }
  
  resetScores();
  deck = initializeDeck();
  dealtCards = dealCards(deck);
  cardImages()
}