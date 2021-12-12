// Run something similar to this for better time keeping
// time node day12/day12.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
const { exit } = require("process");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 1:
    filename = "day12/test1_input.txt";
    break;
  case 2:
    filename = "day12/test2_input.txt";
    break;
  case 3:
    filename = "day12/test3_input.txt";
    break;
  case 4:
    filename = "day12/input.txt";
    break;
  case 5:
    filename = "day12/big.boy";
    break;
  default:
    console.log("Incorrect parameter.");
    exit();
    break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

console.log(input);

console.log("---Part 1---");
calculatePartOne();
// console.log("---Part 2---");
// calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let pathsArray = [];
  let completedPaths = [];
  let nodeDict = new Object();
  let endCount = 0;

  // Populate the node dictionary
  for (let i = 0; i < input.length; i++) {
    let lineArray = input[i].split("-");
    let nodeStart = lineArray[0];
    let nodeEnd = lineArray[1];

    if (nodeDict[nodeStart] === undefined) {
      nodeDict[nodeStart] = [nodeEnd];
    } else {
      nodeDict[nodeStart].push(nodeEnd);
    }
    // do make sure the children have dictionary items too

    if (!(nodeStart === "start" || nodeEnd === "end")) {
      if (nodeDict[nodeEnd] === undefined) {
        nodeDict[nodeEnd] = [nodeStart];
      } else {
        //nodeDict[nodeStart] = nodeEnd;
        nodeDict[nodeEnd].push(nodeStart);
      }
    }
  }
  console.log(nodeDict);

  // add start to arrays
  {
    let starts = nodeDict["start"];
    starts.forEach((next) => {
      pathsArray.push(["start", next]);
    });
  }

  console.log(pathsArray);

  let curLevel = 1;

  while (pathsArray.length != endCount) {
    for (let i = 0; i < pathsArray.length; i++) {
      let curPath = pathsArray[i];

      let curNode = pathsArray[i][curLevel];

      // find children
      let curNodeChildren = nodeDict[curNode];
      //console.log(curNodeChildren);

      let finalizedPath = [];

      curNodeChildren.forEach((child) => {
        let pathToChild = curPath.concat(child);
        // check if lowercase
        let isLowercase = child.toLowerCase() === child;
        // check if child is already in path and lowercase
        if (isLowercase && curPath.indexOf(child) !== -1) {
          //continue;
        } else {
          if (child === "end") {
            completedPaths.push(pathToChild.toString());
          } else {
            finalizedPath.push(pathToChild);
          }
        }
      });

      //console.log("Finalized path:");
      //console.log(finalizedPath);

      curPath = finalizedPath;
      pathsArray[i] = curPath;
    }
    break;
    curLevel++;
  }

  console.log("Final path array:");
  console.log(pathsArray);

  console.log("Completed paths:");
  console.log(completedPaths);

  // start can go to A and b
  //
}
function calculatePartTwo() {}
