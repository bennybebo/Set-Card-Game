function replaceCards(deck, selectedCards) {
  for (let i = 0; i < selectedCards.length; i++) {
    const randomCard = Array.from(deck)[Math.floor(Math.random() * deck.size)];
    selectedCards[i] = randomCard;
  }
}
