// Run something similar to this for better time keeping
// time node day18/day18.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day18/test_input.txt";
    break;
  case 1:
    filename = "day18/input.txt";
    break;
  case 2:
    filename = "day18/big.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);
//console.log(input);

let arrPairs = new Array();

// convert to proper arrays
input.forEach((line) => {
  let pair = JSON.parse(line);
  arrPairs.push(pair);
});

console.log(arrPairs);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {

  // 1. reduction stage

  // If any pair is nested inside four pairs, the leftmost such pair explodes.



  // If any regular number is 10 or greater, the leftmost such regular number splits.

}
function calculatePartTwo() {}
