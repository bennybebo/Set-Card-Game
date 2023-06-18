# Set Game

The Set game is a card game where player(s) try to identify sets of cards based on certain attributes. This README file provides information about what the program is, how to download and install it, and how to play the game.


## Table of Contents

- [What the Program Is](#what-the-program-is)
- [How to Download and Install It](#how-to-download-and-install-it)
- [How to Play](#how-to-play)


## What the Program Is

This program is a basic Set game. The game uses a deck of cards with four attributes: color, shape, number, and shading. Every card in the deck has a unique value. The object of the game is for the player(s) to identify a set of three cards that satisfy certain conditions.


## How to Download and Install It

To run this program, you need to have Visual Studio Code (VSCode) installed on your machine. Follow these steps to download and install the program:

1. Download the files "index.html", "script.js", "styles.css", and "imgs".

2. Open the downloaded files in VSCode.

3. Run the "index.html" file in a browser, like Chrome, to open up the game.


## How to Play

After running the webpage, twelve cards will appear on the right side. On the left side, there is a timer and scores of both player.

The program is a basic Set card game. The goal is to find sets of three cards that satisfy the following conditions: A "set" consists of three cards in which each feature is either the same on each card or is different on each card. That is to say, any feature in the "set" of three cards is either common to all the cards or is different on each card.

Before any player selects, players need to call when they see a set among the twelve cards:
For player 1, press 'a' on the keyboard to call.
For player 2, press 'l' on the keyboard to call.

After a player calls, that player needs to quickly select three cards using mouse. Otherwise, a timeout penalty, which is -1 point, will be applied to the player's scores. If the three selected cards are a set, the player gets 1 point. Otherwise, the player loses 1 point.

After a set is found, those three cards will be replaced with three random new cards.

Additional features in this game include a hint button, a time tracker, and a 2-player mode. The hint button provides players with two cards that form a correct pair, helping them find the third card. The time tracker keeps track of the time elapsed during the game. In 2-player mode, both players can play the game at the same time and compete for the highest score.

Click the "New Game" button to start a new game. The timer and points will be reset to zero.

Click the "Hint" button to get a hint about a set. Two of the three cards will be highlighted as a hint.