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

parseInput: {
  input = fs.readFileSync(filename).toString("utf-8");
  input = input.split("\n");
  input = input.filter((e) => e);

  inTemplate = input[0];
  inRules = input.slice(1);

  for (let i = 0; i < inRules.length; i++) {
    const rule = inRules[i].split(" -> ");
    inRules[i] = rule;
  }
}
// console.log(inTemplate);
// console.log(inRules);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  for (let step = 1; step <= 10; step++) {
    let rulesToApply = [];
    inRules.forEach((inRule) => {
      if (inTemplate.includes(inRule[0])) {
        rulesToApply.push(inRule);
      }
    });

    console.log("Rules to apply:")
    console.log(rulesToApply);

    // apply all rules at the same time
    let sortedRules = [rulesToApply.length];

    // sort rules
    rulesToApply.forEach((applyRule) => {
      let combIndex = inTemplate.search(applyRule[0]);
      sortedRules[combIndex] = [applyRule[0], applyRule[1]];

      // inTemplate = inTemplate.replace(applyRule[0], applyRule[0][0] + applyRule[1] + applyRule[0][1]);
    });
    console.log("Sorted rules");
    console.log(sortedRules);

    // combine rules
    let combinedRule = [
      sortedRules[0][0],
      sortedRules[0][0][0] + sortedRules[0][1] + sortedRules[0][0][1],
    ];

    for (let i = 1; i < sortedRules.length; i++) {
      if(sortedRules[i] === undefined){
        // use what was already there
        sortedRules[i] = [`${inTemplate[i]}${inTemplate[i+1]}`,""]
      }
      console.log(sortedRules[i]);
      let trailingLetter = sortedRules[i][0][1];
      let insertedLetter = sortedRules[i][1];
      combinedRule[0] += trailingLetter;
      combinedRule[1] += insertedLetter + trailingLetter;
      
    }

    console.log("Combined rule:")
    console.log(combinedRule);
    
    // console.log(rulesToApply);
    // console.log(inTemplate);
    
    inTemplate = inTemplate.replace(combinedRule[0],combinedRule[1]);
    
    console.log(`After step ${step}:\t${inTemplate}`);
  }

  //console.log(inTemplate);
}
function calculatePartTwo() {}
