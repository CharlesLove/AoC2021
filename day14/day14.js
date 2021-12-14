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

  // for (let i = 0; i < inRules.length; i++) {
  //   const rule = inRules[i].split(" -> ");
  //   inRules[i] = rule;
  // }
  for (let i = 0; i < inRules.length; i++) {
    const rule = inRules[i].split(" -> ");
    rulesDict[rule[0]] = rule[1];
  }
}
// console.log(inTemplate);
// console.log(inRules);
console.log(rulesDict);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne_old() {
  for (let step = 1; step <= 10; step++) {
    let indexAndInsertion = [];

    let rulesToApply = [];
    inRules.forEach((inRule) => {
      if (inTemplate.includes(inRule[0])) {
        rulesToApply.push(inRule);
      }
    });

    // console.log("Rules to apply:")
    console.log(rulesToApply);

    rulesToApply.forEach((applyRule) => {
      let offSet = 0;
      let tempTemplate = inTemplate;

      while (tempTemplate.includes(applyRule[0])) {
        let foundIndex = tempTemplate.search(applyRule[0]) + offSet;
        indexAndInsertion[foundIndex] = [foundIndex, applyRule[1]];

        tempTemplate = tempTemplate.replace(applyRule[0], "");
        offSet += 1;
      }
    });

    console.log(indexAndInsertion);

    // insert into template (minding offsets)
    let offset = 1;
    for (let i = 0; i < indexAndInsertion.length; i++) {
      if (indexAndInsertion[i]) {
        let indexToUse = indexAndInsertion[i][0] + offset;
        let prefix = inTemplate.slice(0, indexToUse);
        let suffix = inTemplate.slice(indexToUse);
        let insertLetter = indexAndInsertion[i][1].toString();
        console.log(prefix);
        console.log(insertLetter);
        console.log(suffix);

        inTemplate = prefix + insertLetter + suffix;

        offset++;
      }
    }

    // // apply all rules at the same time
    // let sortedRules = [rulesToApply.length];

    // // sort rules
    // rulesToApply.forEach((applyRule) => {
    //   let combIndex = inTemplate.search(applyRule[0]);
    //   sortedRules[combIndex] = [applyRule[0], applyRule[1]];

    //   // inTemplate = inTemplate.replace(applyRule[0], applyRule[0][0] + applyRule[1] + applyRule[0][1]);
    // });
    // console.log("Sorted rules");
    // console.log(sortedRules);

    // // combine rules
    // let combinedRule = [
    //   sortedRules[0][0],
    //   sortedRules[0][0][0] + sortedRules[0][1] + sortedRules[0][0][1],
    // ];

    // for (let i = 1; i < sortedRules.length; i++) {
    //   if(sortedRules[i] === undefined){
    //     // use what was already there
    //     sortedRules[i] = [`${inTemplate[i]}${inTemplate[i+1]}`,""]
    //   }
    //   console.log(sortedRules[i]);
    //   let trailingLetter = sortedRules[i][0][1];
    //   let insertedLetter = sortedRules[i][1];
    //   combinedRule[0] += trailingLetter;
    //   combinedRule[1] += insertedLetter + trailingLetter;

    // }

    // console.log("Combined rule:")
    // console.log(combinedRule);

    // console.log(rulesToApply);
    // console.log(inTemplate);

    //inTemplate = inTemplate.replace(combinedRule[0],combinedRule[1]);

    console.log(`After step ${step}:\t${inTemplate}`);

    if (step === 4) break;
  }

  //console.log(inTemplate);
}
function calculatePartOne() {
  let workTemplate = inTemplate;
  console.log(`Template:\t${workTemplate}`);

  // find all the indices where the rules are found
  // the same rule can be found multiple time, so check for that

  for (let step = 1; step <= 4; step++) {
    // break template up into pairs
    let pairArray = [];
    let lastLetter = workTemplate[0];

    for (let i = 1; i < workTemplate.length; i++) {
      let curLetter = workTemplate[i];
      pairArray.push(lastLetter + curLetter);
      lastLetter = curLetter;
    }

    //console.log(pairArray);

    // for every pair, find if there's a match and
    // insert it, the original last letter of pair is lost
    for (let i = 0; i < pairArray.length; i++) {
      let curPair = pairArray[i];
      let insertion = rulesDict[curPair];
      if (insertion !== undefined) {
        curPair = curPair[0] + insertion;
        //console.log(curPair);
      }
      pairArray[i] = curPair;
    }

    //console.log(pairArray)
    workTemplate = pairArray.join("") + workTemplate[workTemplate.length -1];
    //console.log(workTemplate);

    //rebuild the template
    // array.forEach(element => {
      
    // });
    // insert last letter

    console.log(`After step ${step}:\t${workTemplate}`);
    switch (step) {
      case 1:
        console.log(workTemplate === "NCNBCHB")
        break;
      case 2:
        console.log(workTemplate === "NBCCNBBBCBHCB")
        break;
      case 3:
        console.log(workTemplate === "NBBBCNCCNBBNBNBBCHBHHBCHB")
        break;
      case 4:
        console.log(workTemplate === "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB")
        break;
    
      default:
        break;
    }
  }
}
function calculatePartTwo() {}
