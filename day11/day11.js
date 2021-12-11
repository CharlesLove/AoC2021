// Run something similar to this for better time keeping
// time node day11/day11.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day11/small_test_input.txt";
    break;
  case 1:
    filename = "day11/test_input.txt";
    break;
  case 2:
    filename = "day11/input.txt";
    break;
  case 3:
    filename = "day11/big.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

let octopiMatrix = new Array();
let octopiDict = new Object();

input.forEach((line) => {
  let lineArray = line.split("").map(Number);
  octopiMatrix.push(lineArray);
});

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    const energyLevel = parseInt(input[y][x]);
    //let lineArray = line.split("").map(Number);
    octopiDict[`${x},${y}`] = energyLevel;
  }
}

console.log(octopiMatrix);
console.log(octopiDict);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  //First, the energy level of each octopus increases by 1.
  //Then, any octopus with an energy level greater than 9 flashes.
  //This increases the energy level of all adjacent octopuses by 1,
  //including octopuses that are diagonally adjacent. If this causes
  //an octopus to have an energy level greater than 9, it also flashes.
  //This process continues as long as new octopuses keep having their
  //energy level increased beyond 9. (An octopus can only flash at most once per step.)
  //Finally, any octopus that flashed during this step has its energy level set to 0,
  //as it used all of its energy to flash.

  // for (let step = 0; step < 1; step++) {
  //   for (let y = 0; y < octopiMatrix.length; y++) {
  //     for (let x = 0; x < octopiMatrix[y].length; x++) {
  //       let energyLevel = octopiMatrix[y][x] + 1;
  //       //console.log(`Octopi ${x},${y}: ${energyLevel}`);
  //       if (energyLevel > 9) {
  //         //flash
  //         energyLevel = -Infinity;
  //         // add 1 to adjacent
  //       }
  //       console.log(`Octopi ${x},${y}: ${energyLevel}`);
  //     }
  //   }
  // }

  let flashQueue = [];

  Object.keys(octopiDict).forEach((octopi) => {
    //console.log(octopi);
    octopiDict[octopi] += 1;
    console.log(octopi + " " + octopiDict[octopi]);
    if (octopiDict[octopi] > 9) {
      flashQueue.push(octopi);
    }
  });

  console.log(flashQueue);

  // queue to be flashed
  while (flashQueue.length > 0) {
    let currentPosition = flashQueue[0].split(",").map(Number);
    let curX = currentPosition[0],
      curY = currentPosition[1];

    let tl = `${curX - 1},${curY - 1}`,
      t = `${curX},${curY - 1}`,
      tr = `${curX + 1},${curY - 1}`,
      l = `${curX - 1},${curY}`,
      r = `${curX + 1},${curY}`,
      bl = `${curX - 1},${curY + 1}`,
      b = `${curX},${curY + 1}`,
      br = `${curX + 1},${curY + 1}`;
    // set current octopi to -Infinity
    octopiDict[flashQueue[0]] = -Infinity;
    console.log(
      `Current Position: ${curX},${curY} Energy Level: ${
        octopiDict[flashQueue[0]]
      }`
    );

    // add 1 to the 8 possible surrounding octopi
    // update dictionary as well
    // top left
    incrementOctopi(tl);
    // top
    incrementOctopi(t);
    // top right
    incrementOctopi(tr);
    // left
    incrementOctopi(l);
    // right
    incrementOctopi(r);
    // bottom left
    incrementOctopi(bl);
    // bottom
    incrementOctopi(b);
    // bottom right
    incrementOctopi(br);

    // dequeue octopus
    flashQueue.shift();

    function incrementOctopi(position) {
      let octopi = octopiDict[position];
      console.log(`Incrementing ${position}  ${octopi}`);
      if (octopiDict[position] != undefined) {
        octopiDict[position] += 1;
        if (octopiDict[position] > 9) {
          octopiDict[position] = -Infinity;
          //flashQueue.push(position);
          // flashed
          console.log("flashed");
        }
      }
    }
  }
  console.log(flashQueue);

  console.log(octopiDict);
}
function calculatePartTwo() {}
