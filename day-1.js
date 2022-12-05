/*
* Find the maximum sum of a subarray of integers. 
*/

const fs = require('fs');

function solveDayOne() {

    function findTheMaxCalories(arr) {
        const maxElfCalories = arr.reduce((max, current) => {
            const sum = current.reduce((acc, value) => acc + value, 0);
    
            if (sum > max.sum) {
                return {
                    sum, 
                    array: current,
            };
      }
    
      return max;
    }, {sum: -Infinity, array: []});
    
    console.log(`${maxElfCalories.sum} is the most calories carried by a single efl.`);
    return maxElfCalories;
    }
    
    function findTheTopThreeElfCalories(arr) {
        let sums = [];
        let topThreeSums = []
        for (let subArr of arr) {
           sums.push(subArr.reduce((acc, curr) => acc + curr, 0));
            
            sums.sort((a,b) => b - a);
            
            topThreeSums = sums.slice(0,3);
    
        }
    
        // console.log(`Here are the top 3 sums: ${topThreeSums}`);
        return topThreeSums
    
    
    }
    
    
    function createTheArrayOfElfCaloriesFromFile(inputFileName) {
    
        const text = fs.readFileSync(inputFileName, 'utf8');
    
        // Split the text into an array of strings
        const lines = text.split('\n');
        // console.log(lines)
    
        // // Create an array of subarrays of integers using the spaces as a delimiter
        const arrayOfElfCalories = lines.reduce((singleElfLoad, item) => {
            if (item === "") {
                singleElfLoad.push([]);
            } else {
                singleElfLoad[singleElfLoad.length - 1].push(+item);
            }
    
            return singleElfLoad;
        }, [[]]);
        
        return arrayOfElfCalories;
       
    }
    
    const arrayOfElfCalories = createTheArrayOfElfCaloriesFromFile('day-1-input.txt');
    
    const maxCalories = findTheMaxCalories(arrayOfElfCalories);
    const topThreeElfCalories = findTheTopThreeElfCalories(arrayOfElfCalories);
    const topThreeElvesSumCalories = topThreeElfCalories.reduce((acc, curr) => acc + curr, 0);
    
    // console.log(topThreeElfCalories);
    // console.log(maxCalories);
    console.log(`The top three elves together carry ${topThreeElvesSumCalories} Calories`);

}

solveDayOne()