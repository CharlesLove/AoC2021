// Run something similar to this for better time keeping
// time node day06/day06_grid.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day06/test_input.txt";
    break;
  case 1:
    filename = "day06/input.txt";
    break;
}

console.log("---- Running: " + filename + " ----");

function calculateFish(inDays) {
  let input = fs.readFileSync(filename).toString("utf-8");
  input = input.split(",");

  let fishDict = new Object();
  let totalFish = BigInt(input.length);

  // set initial fishDict
  for (let i = 0; i < 9; i++) {
    fishDict[i] = 0n;
  }

  // fill fish dict
  for (let i = 0; i < input.length; i++) {
    let curTime = parseInt(input[i]);
    fishDict[curTime]++;
  }

  // iterate through the days
  for (let d = 0; d < inDays; d++) {
    let newFishCount = 0n;
    console.log("--After " + (d + 1) + " day(s)--");

    for (let f = 0; f < 9; f++) {
      if (f === 0) {
        newFishCount = fishDict[0];
        fishDict[0] = 0n;
      } else {
        fishDict[f - 1] = fishDict[f];
      }
    }

    fishDict[8] = newFishCount;
    fishDict[6] += newFishCount;
    totalFish += newFishCount;
  }

  console.log("Total Fish: " + totalFish);
}

console.log("---Part 1---");
calculateFish(80);
console.log("---Part 2---");
calculateFish(256);
// console.log("---Big Boy 1---");
// calculateFish(9999999n);
