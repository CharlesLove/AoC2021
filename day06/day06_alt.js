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

  let fish = new Array(9);

  // set initial fishDict
  for (let i = 0; i < 9; i++) {
    fish[i] = 0;
  }

  // fill fish dict
  for (let i = 0; i < input.length; i++) {
    let curTime = parseInt(input[i]);
    //console.log(curTime);

    fish[curTime]++;
  }

  //console.log(fish);

  // iterate through the days
  for (let d = 0; d < inDays; d++) {
    let fish0 = fish[0];
    fish[0] = fish[1];
    fish[1] = fish[2];
    fish[2] = fish[3];
    fish[3] = fish[4];
    fish[4] = fish[5];
    fish[5] = fish[6];
    fish[6] = fish[7] + fish0;
    fish[7] = fish[8];
    fish[8] = fish0;
    console.log("Day: ", d);
  }

  let totalFish = fish.reduce((a, b) => a + b);

  console.log("Total Fish:");
  console.log(totalFish);
}

console.log("---Part 1---");
calculateFish(80);
console.log("---Part 2---");
calculateFish(256);
// console.log("---Big Boy 1---");
// calculateFish(9999999n);
