// Run something similar to this for better time keeping
// time node day11/day11.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
const { exit } = require("process");
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

input.forEach((line) => {
  let lineArray = line.split("").map(Number);
  octopiMatrix.push(lineArray);
});

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let totalFlashes = 0;
  let firstFlashSync = -1;

  for (let step = 1; step <= Infinity; step++) {
    let octopiToFlash = new Array();
    let flashesThisStep = 0;
    // 1. increment everything by 1
    for (let y = 0; y < octopiMatrix.length; y++) {
      for (let x = 0; x < octopiMatrix[y].length; x++) {
        let position = [x, y];
        incrementOctopi(position);
      }
    }

    // 2. Flash the correct octopi
    for (let i = 0; i < octopiToFlash.length; i++) {
      let octPosition = octopiToFlash[i];
      let octPositionX = octopiToFlash[i][0];
      let octPositionY = octopiToFlash[i][1];
      let tl = [octPositionX - 1, octPositionY - 1],
        t = [octPositionX, octPositionY - 1],
        tr = [octPositionX + 1, octPositionY - 1],
        l = [octPositionX - 1, octPositionY],
        r = [octPositionX + 1, octPositionY],
        bl = [octPositionX - 1, octPositionY + 1],
        b = [octPositionX, octPositionY + 1],
        br = [octPositionX + 1, octPositionY + 1];

      // add 1 to the 8 possible surrounding octopi
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
    }

    // 3. Set octopi above 9 back to 0
    for (let y = 0; y < octopiMatrix.length; y++) {
      for (let x = 0; x < octopiMatrix[y].length; x++) {
        let octopiEnergy = octopiMatrix[y][x];
        if (octopiEnergy > 9) {
          octopiEnergy = 0;
          totalFlashes++;
          flashesThisStep++;
          //console.log(flashesThisStep);
          if (flashesThisStep === 100 && firstFlashSync === -1) {
            firstFlashSync = step;
            console.log(firstFlashSync);
            exit();
          }
        }
        octopiMatrix[y][x] = octopiEnergy;
      }
    }

    // Part 1 solution
    if (step === 100) {
      console.log(totalFlashes);
      console.log("---Part 2---");
    }

    function incrementOctopi(position) {
      let x = parseInt(position[0]),
        y = parseInt(position[1]);
      if (
        x >= 0 &&
        y >= 0 &&
        x < octopiMatrix[0].length &&
        y < octopiMatrix.length
      ) {
        let octopiEnergy = octopiMatrix[y][x];
        if (octopiEnergy <= 10) {
          octopiEnergy += 1;
          octopiMatrix[y][x] = octopiEnergy;
          // add to flash array
          if (
            octopiEnergy > 9 &&
            octopiEnergy <= 10 &&
            octopiToFlash.indexOf([x, y].toString()) === -1
          ) {
            octopiToFlash.push([x, y]);
          }
        }
      }
    }
  }
}

function calculatePartTwo() {}
