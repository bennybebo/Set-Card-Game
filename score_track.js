// 2 players' scores object 
let scores = {
    player1: 0, 
    player2: 0
};

// increase score
function increaseScore(player){
    scores[player]++;
}

// decrease score
function decreaseScore(player){
    scores[player]--;
}

// print scores
function printScores() {
    for (let player in scores) {
        console.log(player + "'s score: " + scores[player]);
    }
}

// test (we don't need this part)
increaseScore("player1");
increaseScore("player1");
increaseScore("player2");
printScores()