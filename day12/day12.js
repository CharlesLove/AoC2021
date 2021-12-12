// Run something similar to this for better time keeping
// time node day12/day12.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
const { exit } = require("process");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 1:
    filename = "day12/test1_input.txt";
    break;
  case 2:
    filename = "day12/test2_input.txt";
    break;
  case 3:
    filename = "day12/test3_input.txt";
    break;
  case 4:
    filename = "day12/input.txt";
    break;
  case 5:
    filename = "day12/big.boy";
    break;
  default:
    console.log("Incorrect parameter.");
    exit();
    break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

console.log(input);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

// class Node {
//   constructor(value, parents, children) {
//     this.value = value;
//     this.parents = parents;
//     this.children = children;
//   }
// }
function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let nodeDict = new Object();

  // populate the node dictionary
  for (let i = 0; i < input.length; i++) {
    let lineArray = input[i].split("-");
    let nodeStart = lineArray[0];
    let nodeEnd = lineArray[1];
    console.log(`${nodeStart}, ${nodeEnd}`);
    console.log(lineArray);
    if (nodeDict[nodeStart] === undefined) {
      nodeDict[nodeStart] = [nodeEnd];
    } else {
      //nodeDict[nodeStart] = nodeEnd;
      nodeDict[nodeStart].push(nodeEnd);
    }
  }

  console.log(nodeDict);
}
function calculatePartTwo() {}
