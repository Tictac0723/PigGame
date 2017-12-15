/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying, prevRollOne, prevRollTwo, customGame, normalGame, customGameScore;
var normalGameScore = 100;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Get random Number
        diceOne = Math.floor(Math.random() * 6) + 1;
        diceTwo = Math.floor(Math.random() * 6) + 1;
        console.log(diceOne);
        console.log(diceTwo);
        
            //Display result
            var diceDOMOne = document.querySelector('.diceOne');
            diceDOMOne.style.display = 'block';
            diceDOMOne.src = 'dice-' + diceOne + '.png';
            var diceDOMTwo = document.querySelector('.diceTwo');
            diceDOMTwo.style.display = 'block';
            diceDOMTwo.src = 'dice-' + diceTwo + '.png';
        
            //Update round score IF rolled number isn't a 1
            if (diceOne !== 1 && diceTwo != 1 ) {
                //add score
                roundScore += diceOne + diceTwo;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

                //assign the previous roll to the variable diceRoll
                prevRollOne = diceOne;
                prevRollTwo = diceTwo
            } else if (prevRollOne === 6 && diceOne === 6 || diceTwo === 6) {
                nextPlayer();
            } else if (prevRollTwo === 6 && diceOne === 6 || diceTwo === 6) {
                nextPlayer();
            } else {
                //next player: iNSTEAD OF IF/ELSE I WILL USE TERNARY OPERATOR FOR CLEAN CODE
                nextPlayer();
            }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add roundscore to score[]
        scores[activePlayer] += roundScore;
        
        //update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
        // did player win the game?
        if (customGame === true) {
            if (scores[activePlayer] >= customGameScore) {
                gamePlaying = false;
                document.getElementById('name-' + activePlayer).textContent = 'Winner!'; 
                document.querySelector('.diceOne').style.display = 'none';
                document.querySelector('.diceTwo').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            } else {
                nextPlayer();
            }
        }
        else {
            if (scores[activePlayer] >= normalGameScore) {
                gamePlaying = false;
                document.getElementById('name-' + activePlayer).textContent = 'Winner!'; 
                document.querySelector('.diceOne').style.display = 'none';
                document.querySelector('.diceTwo').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            } else {
                nextPlayer();
            }
        }    
    }

    
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.customGame').addEventListener('click', function () {
    document.getElementById('customScore').style.display = "block";
    document.getElementById('startCustomGame').style.display = "block";
    customGame = true;
    normalGame = false;
});

document.getElementById('startCustomGame').addEventListener('click', function() {
    document.querySelector('.customGameDiv').style.display = "none";
    customGameScore = document.getElementById('customScore').value;
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; 
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.diceOne').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';
}


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    customGame = false;
    normalGame = true; 

    document.querySelector('.diceOne').style.display = 'none';
    document.querySelector('.diceTwo').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.customGameDiv').style.display = "inline-block";
    document.getElementById('customScore').style.display = 'none';
    document.getElementById('startCustomGame').style.display = 'none';
}

