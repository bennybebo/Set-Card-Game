function verifySet(card1, card2, card3) {
  // get charactetic of cards
  let colors = [card1.color, card2.color, card3.color];
  let shapes = [card1.shape, card2.shape, card3.shape];
  let numbers = [card1.number, card2.number, card3.number];
  let shadings = [card1.shading, card2.shading, card3.shading];

  // check if the card have same characteristic or all different
  let isValidSet = (
    (colors[0] === colors[1] && colors[1] === colors[2]) ||
    (colors[0] !== colors[1] && colors[1] !== colors[2] && colors[0] !== colors[2])
  ) && (
    (shapes[0] === shapes[1] && shapes[1] === shapes[2]) ||
    (shapes[0] !== shapes[1] && shapes[1] !== shapes[2] && shapes[0] !== shapes[2])
  ) && (
    (numbers[0] === numbers[1] && numbers[1] === numbers[2]) ||
    (numbers[0] !== numbers[1] && numbers[1] !== numbers[2] && numbers[0] !== numbers[2])
  ) && (
    (shadings[0] === shadings[1] && shadings[1] === shadings[2]) ||
    (shadings[0] !== shadings[1] && shadings[1] !== shadings[2] && shadings[0] !== shadings[2])
  );

  return isValidSet;
}

// test (we don't need this part)
let card1 = { color: "red", shape: "oval", number: 1, shading: "solid" };
let card2 = { color: "green", shape: "squiggle", number: 2, shading: "striped" };
let card3 = { color: "purple", shape: "diamond", number: 3, shading: "open" };

let isSet = verifySet(card1, card2, card3);
console.log("Is it verified set? " + isSet);