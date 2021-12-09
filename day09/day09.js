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

//console.log(input);

function calculatePartOne() {
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

  let lowPoints = [];

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
        lowPoints.push(height);
      }
    }
  }
  //console.log(lowPoints);
  let riskLevel = 0;
  lowPoints.forEach((point) => {
    riskLevel += point + 1;
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
        // BASIN TIME!

        basinSizes.push(calculateBasinSize(x, y));
      }
    }
  }

  function calculateBasinSize(lowX, lowY) {
    let size = 0;
    let pointsToVisit = [[lowX, lowY]];
    let visitedPoints = new Object();
    // traverse the basin
    while (pointsToVisit.length > 0) {
      let currentPoint = pointsToVisit[0];
      let x = currentPoint[0];
      let y = currentPoint[1];
      console.log("----Current Point: " + currentPoint);
      pointsToVisit = pointsToVisit.slice(1);

      //console.log(pointsToVisit);

      let adjX = -1,
        adjY = -1;
      let adjacentPoint = [adjX, adjY];
      let heightAdjPoint = 9;

      // if in already visited points or 9
      // don't add it to points to visit

      // check above
      if (y !== 0) {
        adjX = x;
        adjY = y - 1;
        adjacentPoint = [adjX, adjY];
        heightAdjPoint = heightmap[adjY][adjX];
        if (heightAdjPoint !== 9 && !(adjacentPoint in visitedPoints)) {
          pointsToVisit.push(adjacentPoint);
          console.log("(from above)Added " + adjacentPoint);
        }
      }
      // check left
      if (x !== 0) {
        adjacentPoint = [x - 1, y];
        heightAdjPoint = heightmap[y][x - 1];
        if (heightAdjPoint !== 9 && !(adjacentPoint in visitedPoints)) {
          pointsToVisit.push(adjacentPoint);
          console.log("(from left)Added " + adjacentPoint);
        }
      }
      // check right
      if (x !== heightmap[y].length - 1) {
        adjacentPoint = [x + 1, y];
        heightAdjPoint = heightmap[y][x + 1];
        console.log(adjacentPoint);
        if (heightAdjPoint !== 9 && !(adjacentPoint in visitedPoints)) {
          pointsToVisit.push(adjacentPoint);
          console.log("(from right)Added " + adjacentPoint);
        }
      }
      // check down
      if (y !== heightmap.length - 1) {
        adjacentPoint = [x, y + 1];
        heightAdjPoint = heightmap[y + 1][x];
        if (heightAdjPoint !== 9 && !(adjacentPoint in visitedPoints)) {
          pointsToVisit.push(adjacentPoint);
          console.log("(from down)Added " + adjacentPoint);
        }
      }

      // at the current point and height to dictionary
      visitedPoints[currentPoint] = heightmap[y][x];
      //visitedPoints.push(currentPoint);

      console.log(visitedPoints);
    }
    //console.log(visitedPoints);
    return Object.keys(visitedPoints).length;
  }
  console.log(basinSizes);
}

console.log("---Part 1---");
//calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();
