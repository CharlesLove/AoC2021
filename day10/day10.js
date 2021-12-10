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
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  //console.log(input);
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i].split("");
    let openArray = [],
      closeArray = [];
    let lastOpen = "";
    //console.log(line);
    for (let c = 0; c < line.length; c++) {
      const character = line[c];
      let isIncorrect = false;
      let incPointValue = 0;
      switch (character) {
        case ")":
          incPointValue = 3;
          isIncorrect = checkOpen("(", character);
          closeArray.push(character);
          break;
        case "]":
          incPointValue = 57;
          isIncorrect = checkOpen("[", character);
          closeArray.push(character);
          break;
        case "}":
          incPointValue = 1197;
          isIncorrect = checkOpen("{", character);
          closeArray.push(character);
          break;
        case ">":
          incPointValue = 25137;
          isIncorrect = checkOpen("<", character);
          closeArray.push(character);
          break;

        default:
          lastOpen = character;
          openArray.push(character);
          break;
      }

      if (isIncorrect) {
        total += incPointValue;
        break;
      }
    }
    //console.log(openArray);
    //console.log(closeArray);

    function checkOpen(lookForChar, inChar) {
			let openChar = openArray[openArray.length - 1];
      if (openChar === lookForChar) {
				openArray.pop();
        return false;
      } else {
				//console.log("Invalid character: " + inChar);
        return true;
      }
    }
  }
	console.log(total);
}
function calculatePartTwo() {}
