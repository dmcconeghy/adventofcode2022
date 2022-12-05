/*
* Score a rock-paper-scissors game v1.
* A = rock = X = 1
* B = paper = Y = 2
* C = scissors = Z = 3
*   A beats C, C beats B, B beats A
* Winning a round = 6 points + choice value
* Losing a round = 0 points + choice value
* Tying a round = 3 points + choice value
*
* Score a rock-paper-scissors game v2.
* A = rock = 1
* B = paper = 2
* C = scissors = 3
*   A beats C, C beats B, B beats A
* Winning a round = 9 points + choice value
* Losing a round = 0 points + choice value
* Tying a round = 6 points + choice value
* X = lose, Y = tie, Z = win
*/

const fs = require('fs');

function solveDayTwo() { 

    function processTheStrategyGuide(inputFileName) {
        const text = fs.readFileSync(inputFileName, 'utf8');

        // Split the text into an array of strings
        const lines = text.split('\n');


        // Create an array of subarrays of rounds 

        const arrayOfRounds = lines.map(item => {
            return item.split(' ');
        });


        return arrayOfRounds;
    }

    function calculateTheScoreOfTheGameWithGuess(arrayOfRounds) {
        let score = 0;
        console.log(`scoring ${arrayOfRounds.length} rounds...`)

        for (let round of arrayOfRounds) {
            const [playerOne, playerTwo] = round;
            console.log(`Player Two: ${playerTwo} Player One: ${playerOne} `);

            if (playerTwo === 'X' && playerOne === 'A') {     
                score += 4;
                console.log('Tie with rocks');
            } else if (playerTwo === 'Y' && playerOne === 'B') {
                score += 5;
                console.log('Tie with paper');
            } else if (playerTwo === 'Z' && playerOne === 'C') {
                score += 6;
                console.log('Tie with scissors');
                
            } else if (playerTwo === 'Y' && playerOne === 'A') {
                console.log(`Player Two wins: Paper wraps rock`);
                score += 8;

            } else if (playerTwo === 'Z' && playerOne === 'B') {
                console.log(`Player Two wins: Scissors cut paper`);
                score += 9;

            } else if (playerTwo === 'X' && playerOne === 'C') {
                console.log(`Player Two wins: Rock smashes scissors`);
                score += 7;

            } else if (playerTwo === 'X' && playerOne === 'B') {
                console.log(`Player Two loses with rock.`);
                score += 1;
            } else if (playerTwo === 'Y' && playerOne === 'C') {
                console.log(`Player Two loses with paper.`);
                score += 2;
            }   else if (playerTwo === 'Z' && playerOne === 'A') {
                console.log(`Player Two loses with scissors.`);
                score += 3;
            }
        }

        console.log(`The score of the game is ${score}`);
        return score;

    }

    function calculateTheScoreOfTheGameWhatToPlay(arrayOfRounds) {
        let score = 0;
        console.log(`scoring ${arrayOfRounds.length} rounds...`)

        for (let round of arrayOfRounds) {
            const [playerOne, playerTwo] = round;

        // P2 must lose
            if (playerTwo === 'X') {
                // rock > scissors
                if (playerOne === 'A') {
                    score += 3;
                // paper > rock
                } else if (playerOne === 'B') {
                    score += 1;
                // scissors > paper
                } else {
                    score += 2;
                }
        // P2 must tie
            } else if (playerTwo === 'Y') {
                // rock = rock
                if (playerOne === 'A') {
                    score += 4;
                // paper = paper
                } else if (playerOne === 'B') {
                    score += 5;

                // scissors = scissors
                } else {
                    score += 6;
                }
        // P2 must win
            } else {
                // rock < paper
                if (playerOne === 'A') {
                    score += 8;
                // paper < scissors
                } else if (playerOne === 'B') {
                    score += 9;
                // scissors < rock
                } else {
                    score += 7;
                }
            }
        }

        console.log(`The score of the game is ${score}`);
        return score;

    }

    const strategyGuide = processTheStrategyGuide('day-2-input.txt');

    calculateTheScoreOfTheGameWithGuess(strategyGuide);
    calculateTheScoreOfTheGameWhatToPlay(strategyGuide);


}

solveDayTwo();