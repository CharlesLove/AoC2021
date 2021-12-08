let fs = require("fs");
let filename = "day05/big.boy";

// part 1
console.log("---Part 1---");
part1: {
  //break part1;
  let input = fs.readFileSync(filename).toString("utf-8");
  input = input.split("\n");
  //input = input.filter(e => e);

  let ventDict = new Object();
  let totalHits = 0;

  // iterate through data
  for (let i = 0; i < input.length; i++) {
    let x1,
      y1 = 0;
    let x2,
      y2 = 0;
    // split data
    {
      let firstSplit = input[i].split(" -> ");
      let firstPair = firstSplit[0].split(",");
      let secondPair = firstSplit[1].split(",");
      x1 = parseInt(firstPair[0]);
      y1 = parseInt(firstPair[1]);
      x2 = parseInt(secondPair[0]);
      y2 = parseInt(secondPair[1]);
    }
    //console.log(x1 + " " + y1 + " => " + x2 + " " + y2);

    // only handle horizontal and vertical for now
    if (x1 === x2) {
      let iterator = 0;
      let start,
        end = 0;
      if (y1 < y2) {
        start = y1;
        end = y2;
      } else {
        start = y2;
        end = y1;
      }
      // iterate through y adding points to the map along the way
      for (let y = start; y <= end; y++) {
        //console.log(y);
        let curPoint = [x1, y];
        if (!(curPoint in ventDict)) ventDict[curPoint] = 0;
        ventDict[curPoint] += 1;
        if (ventDict[curPoint] == 2) totalHits++;
      }
    } else if (y1 === y2) {
      let iterator = 0;
      let start,
        end = 0;
      if (x1 < x2) {
        start = x1;
        end = x2;
      } else {
        start = x2;
        end = x1;
      }
      // iterate through y adding points to the map along the way
      for (let x = start; x <= end; x++) {
        //console.log(x);
        let curPoint = [x, y1];
        if (!(curPoint in ventDict)) ventDict[curPoint] = 0;
        ventDict[curPoint] += 1;
        if (ventDict[curPoint] == 2) {
          totalHits++;
          //console.log("Total Hits: " + totalHits);
        }
      }
    } else {
      continue;
    }
  }

  // find all points and add them to map

  // if hit is found add to hit total
  //console.log(ventDict);
  console.log(totalHits);
}
// part 2
console.log("---Part 2---");
part2: {
  //break part2;
  let input = fs.readFileSync(filename).toString("utf-8");
  input = input.split("\n");
  //input = input.filter(e => e);

  let ventDict = new Object();
  let totalHits = 0;

  // iterate through data
  for (let i = 0; i < input.length; i++) {
    let x1,
      y1 = 0;
    let x2,
      y2 = 0;
    // split data
    {
      let firstSplit = input[i].split(" -> ");
      let firstPair = firstSplit[0].split(",");
      let secondPair = firstSplit[1].split(",");
      x1 = parseInt(firstPair[0]);
      y1 = parseInt(firstPair[1]);
      x2 = parseInt(secondPair[0]);
      y2 = parseInt(secondPair[1]);
    }
    //console.log(x1 + " " + y1 + " => " + x2 + " " + y2);

    // go left to right
    // go right to left
    // go up to down
    // go down to up
    let curX = x1;
    let curY = y1;
    let curPoint = [curX, curY];
    //console.log(curPoint);
    if (!(curPoint in ventDict)) ventDict[curPoint] = 0;
    ventDict[curPoint] += 1;
    if (ventDict[curPoint] == 2) totalHits++;

    //console.log([xStart,yStart] + " " + [xEnd,yEnd]);
    while (curX != x2 || curY != y2) {
      if (curX < x2) curX++;
      else if (curX > x2) curX--;

      if (curY < y2) curY++;
      else if (curY > y2) curY--;
      curPoint = [curX, curY];
      //console.log(curPoint);
      if (!(curPoint in ventDict)) ventDict[curPoint] = 0;
      ventDict[curPoint] += 1;
      if (ventDict[curPoint] == 2) totalHits++;

      //console.log(totalHits);

      //console.log(curPoint + " : " + ventDict[curPoint]);
    }

    //console.log(totalHits);
  }

  // find all points and add them to map

  // if hit is found add to hit total
  //console.log(ventDict);
  console.log(totalHits);
}
