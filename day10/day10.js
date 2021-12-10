// Run something similar to this for better time keeping
// time node day10/day10.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day10/test_input.txt";
    break;
  case 1:
    filename = "day10/input.txt";
    break;
  case 2:
    filename = "day10/big.boy";
    break;
  // No big boy for today
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

calculatePartOneAndTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOneAndTwo() {
  let total1 = 0;
  let total2 = 0;
  let closingPointsArray = [];
  lineLoop: for (let i = 0; i < input.length; i++) {
    const line = input[i].split("");
    let openArray = [],
      closeArray = [];
    let closingPoints = 0;
    for (let c = 0; c < line.length; c++) {
      const character = line[c];
      let isIncorrect = false;
      let incPointValue = 0;
      switch (character) {
        case ")":
          incPointValue = 3;
          isIncorrect = checkOpen("(", character);
          break;
        case "]":
          incPointValue = 57;
          isIncorrect = checkOpen("[", character);
          break;
        case "}":
          incPointValue = 1197;
          isIncorrect = checkOpen("{", character);
          break;
        case ">":
          incPointValue = 25137;
          isIncorrect = checkOpen("<", character);
          break;

        default:
          switch (character) {
            case "(":
              closeArray.unshift(")");
              break;
            case "[":
              closeArray.unshift("]");
              break;
            case "{":
              closeArray.unshift("}");
              break;
            case "<":
              closeArray.unshift(">");
              break;
          }
          lastOpen = character;
          openArray.push(character);
          break;
      }

      if (isIncorrect) {
        total1 += incPointValue;
        continue lineLoop;
      }
    }

    // calculate value of close array
    for (let i = 0; i < closeArray.length; i++) {
      const character = closeArray[i];
      let basePoints = 0;
      switch (character) {
        case ")":
          basePoints = 1;
          break;
        case "]":
          basePoints = 2;
          break;
        case "}":
          basePoints = 3;
          break;
        case ">":
          basePoints = 4;
          break;
      }

      closingPoints = closingPoints * 5 + basePoints;
    }

    closingPointsArray.push(closingPoints);

    function checkOpen(lookForChar, inChar) {
      let openChar = openArray[openArray.length - 1];
      if (openChar === lookForChar) {
        openArray.pop();
        closeArray.shift();
        return false;
      } else {
        return true;
      }
    }
  }

  closingPointsArray = closingPointsArray.sort(numSort);
  total2 = closingPointsArray[Math.floor(closingPointsArray.length / 2)];

  console.log("---Part 1---");
  console.log(total1);
  console.log("---Part 2---");
  console.log(total2);
}
