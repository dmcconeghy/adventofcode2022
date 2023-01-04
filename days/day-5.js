/*
* Supply Stacks
*
*/

const fs = require('fs');

const inputData = fs.readFileSync('day-5-input.txt', 'utf8');

const stacksArray = [
                        [['B'],['G'],['S'],['C']],
                        [['T'],['M'],['W'],['H'],['J'],['N'],['V'],['G']],
                        [['M'],['Q'],['S']],
                        [['B'],['S'],['L'],['T'],['W'],['N'],['M']],
                        [['J'],['Z'],['F'],['T'],['V'],['G'],['W'],['P']],
                        [['C'],['T'],['B'],['G'],['Q'],['H'],['S']],
                        [['T'],['J'],['P'],['B'],['W']],
                        [['G'],['D'],['C'],['Z'],['F'],['T'],['Q'],['M']],
                        [['N'],['S'],['H'],['B'],['P'],['F']]
                   ];

function solvePuzzle() { 
    const inputDataStrings = inputData.split('\n')

    const inputDataArrays = inputDataStrings.map((string) => {
        return string.split(' ')});

    // console.log(inputDataArrays)

    function firstStar() {

        const stackCopy = [...stacksArray];

        for (let instruction of inputDataArrays) {
            // console.log(instruction)
         
           const moveNumber = instruction[1];
           const originStack = +instruction[3] - 1;
           const destinationStack = +instruction[5] - 1;
    
        //    console.log(`I will pop() from ${originStack} and push() to ${destinationStack} ${moveNumber}X}`)
    
           for (let i = 0; i < moveNumber; i++) {
                
                stackCopy[destinationStack].push(stackCopy[originStack].pop());
               
           }
    
        }
    
        console.log(stacksArray)

    }

    // firstStar();


    function secondStar(){

        const stackCopy = [...stacksArray];

        for (let instruction of inputDataArrays) {
            // console.log(instruction)
         
            const moveNumber = +instruction[1];
            const originStack = +instruction[3] - 1;
            const destinationStack = +instruction[5] - 1;
    
            // console.log( `\n I will splice() ${moveNumber} items from ${originStack} and append() them to ${destinationStack}`)
            // console.log("Here's our origin stack before:", stackCopy[originStack])
            const group = stackCopy[originStack].splice((-moveNumber))
            // console.log("The group we're moving is", group)
            
            // console.log("Here's our destination stack before:", stackCopy[destinationStack], "of length", stackCopy[destinationStack].length)
            stackCopy[destinationStack] = stackCopy[destinationStack].concat(group)
            // console.log("Destination Stack is now:", stackCopy[destinationStack])
            // console.log("Origin Stack is now:", stackCopy[originStack])
            
        }
    
        console.log(stackCopy)

    }

    secondStar();

    

}

solvePuzzle();
// CFFHVVHNC

