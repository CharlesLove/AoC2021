// Run something similar to this for better time keeping
// time node day14/day14.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
const internal = require("stream");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day14/test_input.txt";
    break;
  case 1:
    filename = "day14/input.txt";
    break;
  case 2:
    filename = "day14/big.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

let inTemplate = "";
let inRules = [];
let rulesDict = new Object();

parseInput: {
  input = fs.readFileSync(filename).toString("utf-8");
  input = input.split("\n");
  input = input.filter((e) => e);

  inTemplate = input[0];
  inRules = input.slice(1);

  for (let i = 0; i < inRules.length; i++) {
    const rule = inRules[i].split(" -> ");
    rulesDict[rule[0]] = rule[1];
  }
}

console.log("---Part 1---");
calculateSteps(10);
console.log("---Part 2---");
calculateSteps(40);

function calculateSteps(inSteps) {
  let workTemplate = inTemplate;
  let lastTemplateLetter = inTemplate[inTemplate.length - 1];
  let letterCountDict = new Object();
  letterCountDict[lastTemplateLetter] = 1;

  let pairDictCount = new Object();
  Object.keys(rulesDict).forEach(function (key) {
    pairDictCount[key] = 0;
  });

  let lastLetter = inTemplate[0];

  for (let i = 1; i < workTemplate.length; i++) {
    let curLetter = workTemplate[i];
    pairDictCount[lastLetter + curLetter] += 1;
    lastLetter = curLetter;
  }

  for (let step = 1; step <= inSteps; step++) {
    let tempCountDict = Object.assign({}, pairDictCount);

    Object.keys(tempCountDict).forEach(function (key) {
      let value = tempCountDict[key];
      if (value > 0) {
        let newLetter = rulesDict[key];
        let pair1 = key[0] + newLetter,
          pair2 = newLetter + key[1];
        pairDictCount[pair1] += value;
        pairDictCount[pair2] += value;
        pairDictCount[key] -= value;
      }
    });
  }

  Object.keys(pairDictCount).forEach(function (key) {
    let letterToCount = key[0];
    let count = pairDictCount[key];
    if (letterCountDict[letterToCount] === undefined) {
      letterCountDict[letterToCount] = count;
    } else {
      letterCountDict[letterToCount] += count;
    }
  });
  let mostCommonCount = -Infinity,
    leastCommonCount = Infinity;

  Object.keys(letterCountDict).forEach(function (key) {
    let value = letterCountDict[key];
    if (value > mostCommonCount) mostCommonCount = value;
    if (value < leastCommonCount) leastCommonCount = value;
  });

  let partTwoAnswer = mostCommonCount - leastCommonCount;

  console.log(partTwoAnswer);
}
