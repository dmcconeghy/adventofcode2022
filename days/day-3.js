/*
* Given a string, make sure that any characters that is repeated stays either to the left or right side of the string.
* Strings have a first/left and last/right side and the repeated characters should be on the same side.
* Characters have values a-z = 1-26 and A-Z = 27-52.
* Return the sum of the both-sides character's values.
* 
* v2 Every three lines, find the single character they all share. 
* Return the value of the sums of this grouping for all the input.  
*/

const fs = require('fs');

function solveDayThree() {

    // Generate the input array from the input file
    function createTheArrayOfStringsFromFile(inputFileName) {
        const inputText = fs.readFileSync(inputFileName, 'utf8');

        // Split the input into an array of strings based on line breaks
        const inputTextArrayStrings = inputText.split('\n');

        return inputTextArrayStrings;
    }

    // Takes an array of lines, splits each into a left and right side. 
    // Return an array of the left and right side.
    function processInputStringsIntoLeftAndRight(inputTextAsArrayOfString) {

        function splitTheStringIntoLeftAndRight(inputString) {
            leftAndRightSidesSize = Math.floor(inputString.length / 2);
            leftSide = inputString.slice(0, leftAndRightSidesSize);
            rightSide = inputString.slice(leftAndRightSidesSize);
            return [leftSide, rightSide];           
        }

        const transformedArrayOfLeftAndRight = inputTextAsArrayOfString.map(item => {
            return splitTheStringIntoLeftAndRight(item);
        });

        return transformedArrayOfLeftAndRight;

    }

    function processInputFileIntoArrayWithGroupsOfThreeStrings(inputFileName) {
        const inputString = fs.readFileSync(inputFileName, 'utf8');
            
        const groupOfThreeRaw = inputString.match(/(?=[\s\S])(?:.*\n?){3}/g);
        
        // remove \n from the end any strings where it appears.
        const groupOfThreeCleaned = groupOfThreeRaw.map(item => item.replace('\\n', ','));
        return groupOfThreeCleaned;
            
    }

    function createMapsOfTwoStrings(left, right) {
        const leftMap = new Map();
        const rightMap = new Map();

        for (let char of left) {
            if (leftMap.has(char)) {
                leftMap.set(char, leftMap.get(char) + 1);
            } else {
                leftMap.set(char, 1);
            }
        }

        for (let char of right) {
            if (rightMap.has(char)) {
                rightMap.set(char, rightMap.get(char) + 1);
            } else {
                rightMap.set(char, 1);
            }
        }

        return [leftMap, rightMap];
    }

    function createMapsOfThreeStrings(first, second, third) {
        const firstMap = new Map();
        const secondMap = new Map();
        const thirdMap = new Map();
        // console.log(first, second, third)

        for (let char of first) {
            
            if (firstMap.has(char)) {
                firstMap.set(char, firstMap.get(char) + 1);
            } else {
                firstMap.set(char, 1);
            }
        }

        for (let char of second) {
            if (secondMap.has(char)) {
                secondMap.set(char, secondMap.get(char) + 1);
            } else {
                secondMap.set(char, 1);
            }
        }

        for (let char of third) {
            if (thirdMap.has(char)) {
                thirdMap.set(char, thirdMap.get(char) + 1);
            } else {
                thirdMap.set(char, 1);
            }
        }

        return [firstMap, secondMap, thirdMap];
    }
        
    function findTheSumOfCharactersFoundOnBothSides(inputArray) {

        let sumOfCharactersFoundOnBothSides = 0;

        for (let [left, right] of inputArray) {
            const [leftMap, rightMap] = createMapsOfTwoStrings(left, right);

            for (let [key, frequency] of leftMap) {
                if (rightMap.has(key)) {
                    
                    const value = calculateTheValueOfACharacter(key);

                    

                   sumOfCharactersFoundOnBothSides += value;
               
                }
            }

        }

        return sumOfCharactersFoundOnBothSides;
    }

    function calculateTheValueOfACharacter(char) {
        if (char === char.toLowerCase()) {
            return char.charCodeAt(0) - 96;
        } else {
            return char.charCodeAt(0) - 38;
        }
    }

    function returnValueofSharedLeftRightCharacters(inputArray) {
        const inputTextArray = createTheArrayOfStringsFromFile(inputArray);
        const processedArray = processInputStringsIntoLeftAndRight(inputTextArray);
        const characterSum = findTheSumOfCharactersFoundOnBothSides(processedArray)
        console.log(`The sum for part One is ${characterSum}`);

        return characterSum;
    }

returnValueofSharedLeftRightCharacters('day-3-input.txt');

    function returnValueofSharedCharacterAcrossEveryThreeLines(inputFile) {

        // Split the input into an array of arrays of strings based on every three line breaks
        const processedArray = processInputFileIntoArrayWithGroupsOfThreeStrings(inputFile);

        // Convert each array of strings into an array 
        const arrayOfTriples = processedArray.map(item => [item]);
        // console.log(arrayOfTriples);

        // Split each array entry into three strings
        const splitTriples = arrayOfTriples.map(item => item[0].split('\n'));

        const commonChars = [];

        // console.log(splitTriples);

        for (let triple of splitTriples) {
            // console.log(triple)
            const chars = [...triple[0], ...triple[1], ...triple[2]];

            commonChars.push(chars.filter(char => triple[0].includes(char) && triple[1].includes(char) && triple[2].includes(char)));
        }

        let sumOfCommonChars = 0;
        
        for (let char of commonChars) {
            const value = calculateTheValueOfACharacter(char[0]);
            sumOfCommonChars += value;
        }

        console.log(`The sum for part Two is ${sumOfCommonChars}`);
        return sumOfCommonChars;
        
    }

    returnValueofSharedCharacterAcrossEveryThreeLines('day-3-input.txt');


}

solveDayThree();

