/*
* Sections have unique IDs.
* Each worker has a selection of IDs.
* Sections are giving as ranges, 2-4 means 2, 3, 4. 
* How many worker's ranges full contain another worker's range?
*/

const fs = require('fs');

function handleInput(inputFileName) {
    const inputText = fs.readFileSync(inputFileName, 'utf8');
    const inputTextArrayStrings = inputText.split('\n');

    return inputTextArrayStrings;
}

const rawInput = handleInput('day-4-input.txt');


function solveDayFourAbandoned() { 

    function createRangesFromInput(inputFileName) {
        const inputText = fs.readFileSync(inputFileName, 'utf8');
        const inputTextArrayStrings = inputText.split('\n');

        return inputTextArrayStrings;
    }

    const rawRanges = createRangesFromInput('day-4-input.txt');

    // Convert array of strings to array of arrays with a pair of ranges as strings
    function convertArrayOfStringsToArrayOfRanges(inputArray) {
        const arrayOfRanges = inputArray.map(item => {
            
            const range = item.split(',');
            return range;
        });

        // console.log(arrayOfRanges);
        
        const arrayOfRangePairs = arrayOfRanges.map(item => {
            const rangePairStrings = item.map(range => {
                const rangePair = range.split('-');
                return rangePair;
            });

            return rangePairStrings;
        });

        return arrayOfRangePairs;
    }

    const rangePairArrays = convertArrayOfStringsToArrayOfRanges(rawRanges);

    // console.log(rangePairArrays);

    

    // console.log(rangePairArrays)

    function checkIfRangeIsContained(inputArray) {
        let containedPairs = [];
        // console.log(inputArray)


        for (let i = 0; i < inputArray.length; i++) {
        
            const range1 = inputArray[i][0]; 
            const range2 = inputArray[i][1];

            function isIncluded(r1, r2) {
                // console.log("Checking if ", r1, " is gte ", r2)
                // console.log("Checking if ", r1, " is lte ", r2)

                return (r1[0] >= r2[0] && r1[1] <= r2[1]);
            }

            if (isIncluded(range1, range2)) {
                containedPairs.push([range1, range2])
                console.log("Pair accepted", range1, range2)
            } else {
                console.log("Pair rejected: ", range1, range2)
            }
          
     
        }

        return containedPairs;
    }

    const outputArray = checkIfRangeIsContained(rangePairArrays);
    
    // console.log("output", outputArray.length)

    const final = checkIfRangeIsContained(outputArray)

    console.log("final", final.length)

    return final.length;
    
}

function solveDayFour() {

    const raw = fs.readFileSync('day-4-input.txt', 'utf8');

    const range = (start, end) =>
        new Array(end - start + 1).fill().map((d, i) => i + start);

    const convertRange = (rangeText) => {
        const [start, end] = rangeText.split("-").map(Number);
        return range(start, end);
    };

    const checkFilled = (first, second) =>
        first.filter((a) => second.includes(a)).length === first.length ||
        second.filter((a) => first.includes(a)).length === second.length;

    const checkDuplication = (first, second) =>
        first.filter((a) => second.includes(a)).length > 0 ||
        second.filter((a) => first.includes(a)).length > 0;

    // part one
    console.log(
        raw
            .split("\n")
            .map((a) => a.split(","))
            .map((a) => a.map(convertRange))
            .filter((a) => checkFilled(a[0], a[1])).length,
    );

    // part two
    console.log(
        raw
            .split("\n")
            .map((a) => a.split(","))
            .map((a) => a.map(convertRange))
            .filter((a) => checkDuplication(a[0], a[1])).length,
    );
}

solveDayFour();


