// Run something similar to this for better time keeping
// time node day13/day13.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day13/test_input.txt";
    break;
  case 1:
    filename = "day13/input.txt";
    break;
  case 2:
    filename = "day13/big.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

let inputDots = [];
let inputFolds = [];

{
  let input = fs.readFileSync(filename).toString("utf-8");
  input = input.split("\n");
  input = input.filter((e) => e);

  // seperate input between dot
  // and fold instructions
  input.forEach((line) => {
    if (line[0] !== "f") {
      inputDots.push(line);
    } else {
      // only grab x=? or y=? information
      // convert this to ['x/y', ?]
      let foldSplit = line.split(" ");
      let instruction = foldSplit[foldSplit.length - 1].split("=");
      inputFolds.push([instruction[0], parseInt(instruction[1])]);
    }
  });
}

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let paperSizeX = 0,
    paperSizeY = 0;
  // find max paper size
  inputDots.forEach((dotLine) => {
    let lineSplit = dotLine.split(",");
    let dotX = parseInt(lineSplit[0]),
      dotY = parseInt(lineSplit[1]);

    //console.log(lineSplit);
    if (dotX + 1 > paperSizeX) {
      paperSizeX = dotX + 1;
    }
    if (dotY + 1 > paperSizeY) {
      paperSizeY = dotY + 1;
    }
  });

  //console.log(paperSizeX, paperSizeY);

  let paperMatrix = new Array(paperSizeY);

  // fill the paper matrix with empty '.'
  for (let y = 0; y < paperSizeY; y++) {
    paperMatrix[y] = Array(paperSizeX).fill(".");
  }

  // fill the paper matrix with dots '#'
  inputDots.forEach((dotLine) => {
    let lineSplit = dotLine.split(",");
    let dotX = parseInt(lineSplit[0]),
      dotY = parseInt(lineSplit[1]);

    paperMatrix[dotY][dotX] = "#";
  });

  //console.log(paperMatrix);

  // go through each fold instruction
  inputFolds.forEach((foldInstruction) => {
    let axis = foldInstruction[0];
    let foldPoint = foldInstruction[1];
    let combinedFold = [];
    //console.log(`Axis: ${axis} Fold Point: ${foldPoint}`);

    switch (axis) {
      case "y":
        let topHalf = paperMatrix.slice(0, foldPoint);
        let bottomHalf = paperMatrix.slice(foldPoint + 1).reverse();
        combinedFold = topHalf;

        // console.log("Top half");
        // console.log(topHalf);
        // console.log("Bottom half (flipped)");
        // console.log(bottomHalf);

        // combine the halves
        for (let y = 0; y < topHalf.length; y++) {
          for (let x = 0; x < topHalf[y].length; x++) {
            let topChar = topHalf[y][x];
            let botChar = bottomHalf[y][x];

            if (topChar === "#" || botChar === "#") {
              combinedFold[y][x] = "#";
            }
          }
        }

        paperMatrix = combinedFold;

        break;
      case "x":
        // fold along x
        // will have to be sliced per y line
        combinedFold = [];
        for (let y = 0; y < paperMatrix.length; y++) {
          let leftHalf = paperMatrix[y].slice(0, foldPoint);
          let rightHalf = paperMatrix[y].slice(foldPoint + 1).reverse();
          let combinedHalf = leftHalf;

          // combine left half and flipped right half
          for (let x = 0; x < leftHalf.length; x++) {
            if (leftHalf[x] === "#" || rightHalf[x] === "#") {
              combinedHalf[x] = "#";
            }
          }
          combinedFold.push(combinedHalf);
        }

        paperMatrix = combinedFold;

        break;
    }
  });

  console.log(paperMatrix);
}
function calculatePartTwo() {}
