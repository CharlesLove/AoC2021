// Run something similar to this for better time keeping
// time node day09/day09.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day09/test_input.txt";
    break;
  case 1:
    filename = "day09/input.txt";
    break;
  case 2:
    filename = "day09/big.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

let lowPoints = new Object();
let heightmap = new Array(input.length);

//console.log(input);

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  // create blank heightmap
  for (let i = 0; i < input.length; i++) {
    heightmap[i] = Array(input[i].length).fill(0);
  }

  // fill heightmap
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const height = parseInt(input[y][x]);
      heightmap[y][x] = height;
    }
  }
  //console.log(heightmap);

  // traverse the array looking for low points
  for (let y = 0; y < heightmap.length; y++) {
    for (let x = 0; x < heightmap[y].length; x++) {
      const height = heightmap[y][x];
      //console.log(height);
      let adjacentHeight = -1;

      // check section
      checks: {
        // check above
        if (y !== 0) {
          adjacentHeight = heightmap[y - 1][x];
          if (height >= adjacentHeight) {
            //console.log(adjacentHeight + " breaks " + height);
            break checks;
          }
        }
        // check left
        if (x !== 0) {
          adjacentHeight = heightmap[y][x - 1];
          if (height >= adjacentHeight) {
            //console.log(adjacentHeight + " breaks " + height);
            break checks;
          }
        }
        // check right
        if (x !== heightmap[y].length - 1) {
          adjacentHeight = heightmap[y][x + 1];
          if (height >= adjacentHeight) {
            //console.log(adjacentHeight + " breaks " + height);
            break checks;
          }
        }
        // check down
        if (y !== heightmap.length - 1) {
          adjacentHeight = heightmap[y + 1][x];
          if (height >= adjacentHeight) {
            //console.log(adjacentHeight + " breaks " + height);
            break checks;
          }
        }

        // got this far?
        // everything passed
        // add it to the lowpoints
        //lowPoints.push(height);
        lowPoints[[x, y]] = height;
      }
    }
  }
  //console.log(lowPoints);
  let riskLevel = 0;
  // lowPoints.forEach((point) => {
  //   riskLevel += point + 1;
  // });

  Object.keys(lowPoints).forEach((key) => {
    riskLevel += lowPoints[key] + 1;
  });
  console.log(riskLevel);
}
function calculatePartTwo() {
  // create blank heightmap
  let heightmap = new Array(input.length);

  for (let i = 0; i < input.length; i++) {
    heightmap[i] = Array(input[i].length).fill(0);
  }

  // fill heightmap
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const height = parseInt(input[y][x]);
      heightmap[y][x] = height;
    }
  }
  //console.log(heightmap);

  let basinSizes = [];

  // traverse through the low point dictionary

  Object.keys(lowPoints).forEach((key) => {
    let keyArray = key.split(",");
    let x = parseInt(keyArray[0]);
    let y = parseInt(keyArray[1]);
    //console.log(keyArray);
    //console.log(x);
    //console.log(y);

    //console.log(keyArray);

    basinSizes.push(calculateBasinSize(x, y));
  });

  // traverse the array looking for low points
  // for (let y = 0; y < heightmap.length; y++) {
  //   for (let x = 0; x < heightmap[y].length; x++) {
  //     const height = heightmap[y][x];
  //     //console.log(height);
  //     let adjacentHeight = -1;

  //     // check section
  //     checks: {
  //       // check above
  //       if (y !== 0) {
  //         adjacentHeight = heightmap[y - 1][x];
  //         if (height >= adjacentHeight) {
  //           //console.log(adjacentHeight + " breaks " + height);
  //           break checks;
  //         }
  //       }
  //       // check left
  //       if (x !== 0) {
  //         adjacentHeight = heightmap[y][x - 1];
  //         if (height >= adjacentHeight) {
  //           //console.log(adjacentHeight + " breaks " + height);
  //           break checks;
  //         }
  //       }
  //       // check right
  //       if (x !== heightmap[y].length - 1) {
  //         adjacentHeight = heightmap[y][x + 1];
  //         if (height >= adjacentHeight) {
  //           //console.log(adjacentHeight + " breaks " + height);
  //           break checks;
  //         }
  //       }
  //       // check down
  //       if (y !== heightmap.length - 1) {
  //         adjacentHeight = heightmap[y + 1][x];
  //         if (height >= adjacentHeight) {
  //           //console.log(adjacentHeight + " breaks " + height);
  //           break checks;
  //         }
  //       }

  //       // got this far?
  //       // everything passed
  //       // BASIN TIME!

  //       basinSizes.push(calculateBasinSize(x, y));
  //     }
  //   }
  //   //console.log(y + " completed");
  // }

  function calculateBasinSize(lowX, lowY) {
    let size = 0;

    let pointsToVisit = [[lowX, lowY].toString()];

    //console.log(pointsToVisit);
    let visitedPoints = new Object();
    // traverse the basin
    while (pointsToVisit.length > 0) {
      let currentPoint = pointsToVisit[0].split(",");

      //console.log(lowX + ", " + lowY + ": " + currentPoint);
      let x = parseInt(currentPoint[0]);
      let y = parseInt(currentPoint[1]);
      //console.log("----Current Point: " + currentPoint);
      pointsToVisit = pointsToVisit.slice(1);

      //console.log(pointsToVisit);

      let adjX = -1,
        adjY = -1;
      let adjacentPoint = [adjX, adjY].toString();
      let heightAdjPoint = 9;

      // if in already visited points or 9
      // don't add it to points to visit

      // check above
      if (y !== 0) {
        adjX = x;
        adjY = y - 1;
        adjacentPoint = [adjX, adjY].toString();
        heightAdjPoint = heightmap[adjY][adjX];
        if (
          heightAdjPoint !== 9 &&
          !(adjacentPoint in visitedPoints) &&
          pointsToVisit.indexOf(adjacentPoint) === -1
        ) {
          pointsToVisit.push(adjacentPoint);
          visitedPoints[currentPoint] = undefined; //heightmap[adjY][adjX];
          //console.log("(from above)Added " + adjacentPoint);
        }
      }
      // check left
      if (x !== 0) {
        adjX = x - 1;
        adjY = y;
        adjacentPoint = [adjX, adjY].toString();
        heightAdjPoint = heightmap[y][x - 1];
        if (
          heightAdjPoint !== 9 &&
          !(adjacentPoint in visitedPoints) &&
          pointsToVisit.indexOf(adjacentPoint) === -1
        ) {
          pointsToVisit.push(adjacentPoint);
          visitedPoints[currentPoint] = undefined; // heightmap[adjY][adjX];
          //console.log("(from left)Added " + adjacentPoint);
        }
      }
      // check right
      if (x !== heightmap[y].length - 1) {
        adjX = x + 1;
        adjY = y;
        adjacentPoint = [adjX, adjY].toString();
        heightAdjPoint = heightmap[adjY][adjX];
        //console.log(adjacentPoint);
        if (
          heightAdjPoint !== 9 &&
          !(adjacentPoint in visitedPoints) &&
          pointsToVisit.indexOf(adjacentPoint) === -1
        ) {
          pointsToVisit.push(adjacentPoint);
          visitedPoints[currentPoint] = undefined; //heightmap[adjY][adjX];
          //console.log("(from right)Added " + adjacentPoint);
        }
      }
      // check down
      if (y !== heightmap.length - 1) {
        adjX = x;
        adjY = y + 1;
        adjacentPoint = [adjX, adjY].toString();
        heightAdjPoint = heightmap[adjY][adjX];
        if (
          heightAdjPoint !== 9 &&
          !(adjacentPoint in visitedPoints) &&
          pointsToVisit.indexOf(adjacentPoint) === -1
        ) {
          pointsToVisit.push(adjacentPoint);
          visitedPoints[currentPoint] = undefined; //heightmap[adjY][adjX];
          //console.log("(from down)Added " + adjacentPoint);
        }
      }

      // at the current point and height to dictionary
      visitedPoints[currentPoint] = undefined; //heightmap[y][x];
      //visitedPoints.push(currentPoint);

      //console.log(visitedPoints);
    }
    //console.log(visitedPoints);
    return Object.keys(visitedPoints).length;
  }
  basinSizes = basinSizes.sort(numSort);
  //console.log(basinSizes);

  let sizeThreeLargest = 1;
  for (let i = basinSizes.length - 3; i < basinSizes.length; i++) {
    const basinSize = basinSizes[i];
    sizeThreeLargest *= basinSize;
  }
  console.log(sizeThreeLargest);
}

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();
