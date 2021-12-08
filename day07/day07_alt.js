// Run something similar to this for better time keeping
// time node day06/day06_grid.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
const { cursorTo } = require("readline");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day07/test_input.txt";
    break;
  case 1:
    filename = "day07/input.txt";
    break;
  case 2:
    filename = "day07/big.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

function numSort(a, b) {
  return +a - +b;
}

let incStepCache = new Object();
let input = fs.readFileSync(filename).toString("utf-8");
input = input.split(",").map(Number);

input.sort(numSort);
//console.log(input);

crabDict = new Object();

for (let i = 0; i < input.length; i++) {
  if (crabDict[input[i]] == undefined) crabDict[input[i]] = 1;
  else crabDict[input[i]] += 1;
}

function calculateMedianFuel() {
  let median = input[input.length / 2];

  let minimum = input[0];
  let maximum = input[input.length - 1];

  let fuel = 0;

  Object.keys(crabDict).forEach(function (key) {
    fuel += Math.abs((key - median) * crabDict[key]);
  });

  console.log(fuel.toString());
}

function calculateComplicatedFuel() {
  let sum = 0;

  let minPos = input[0];
  let maxPos = input[input.length - 1];

  for (let i = 0; i < input.length; i++) {
    sum += input[i];
  }

  let average = parseInt(sum / input.length);

  // everything below is based on brittany louviere's code
  // adapted for javascript

  let targets = new Object();
  targets[average] = 0n;
  targets[average + 1] = 0n;
  targets[average - 1] = 0n;

  let maxSteps = 0;

  Object.keys(targets).forEach(function (target) {
    maxSteps = Math.max(
      maxSteps,
      Math.abs(target - maxPos),
      Math.abs(target - minPos)
    );
  });

  let fuelCost = 0;

  for (let steps = 1; steps < maxSteps + 1; steps++) {
    fuelCost += steps;
    //console.log(fuelCost);
    Object.keys(targets).forEach(function (target) {
      target = parseInt(target);
      let minus = target - steps;
      let plus = target + steps;

      if (crabDict[plus] !== undefined) {
        targets[target] += BigInt(fuelCost * crabDict[plus]);
      }
      if (crabDict[minus] !== undefined) {
        targets[target] += BigInt(fuelCost * crabDict[minus]);
      }
    });
  }
  console.log(Object.values(targets).sort()[0].toString());
}

console.log("---Part 1---");
calculateMedianFuel();
console.log("---Part 2---");
calculateComplicatedFuel();
