// Run something similar to this for better time keeping
// time node day17/day17.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";
let targetX1, targetX2, targetY1, targetY2;
let maxHeight = 0;
let distinctHits = new Set();

let inputPicker = parseInt(myArgs[0]);

switch (inputPicker) {
  case 0:
    filename = "Test Input";
    targetX1 = 20;
    targetX2 = 30;
    targetY1 = -10;
    targetY2 = -5;
    break;
  case 1:
    filename = "My Input";
    targetX1 = 14;
    targetX2 = 50;
    targetY1 = -267;
    targetY2 = -225;
    break;
}

console.log("---- Running: " + filename + " ----");

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function shootProbe(initXVel, initYVel) {
  let curXVel = initXVel;
  let curYVel = initYVel;
  let curX = 0,
    curY = 0,
    maxPotHeight = 0;
  while (curX < targetX2 && curY > targetY1) {
    // The probe's x position increases by its x velocity.
    curX += curXVel;
    // The probe's y position increases by its y velocity.
    curY += curYVel;

    // figure out if max height has been reached
    if (curY > maxPotHeight) {
      maxPotHeight = curY;
    }

    // Due to drag, the probe's x velocity changes by 1 toward the value 0
    curXVel -= 1;
    if (curXVel < 0) curXVel = 0;
    // Due to gravity, the probe's y velocity decreases by 1.
    curYVel -= 1;

    //console.log(`X: ${curX}, Y: ${curY}`);

    // target hit!
    if (
      curX <= targetX2 &&
      curX >= targetX1 &&
      curY >= targetY1 &&
      curY <= targetY2
    ) {
      distinctHits.add([initXVel, initYVel].toString());
      if (maxPotHeight > maxHeight) {
        maxHeight = maxPotHeight;
      }
    }
  }
}

function calculatePartOne() {
  for (let newXVel = 0; newXVel <= targetX2; newXVel++) {
    for (let newYVel = targetY1; newYVel <= Math.abs(targetY1); newYVel++) {
      shootProbe(newXVel, newYVel);
    }
  }
  console.log(maxHeight);
}
function calculatePartTwo() {
  console.log(distinctHits.size);
}
