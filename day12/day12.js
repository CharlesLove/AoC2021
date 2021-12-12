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

// class Node {
//   constructor(value, parents, children) {
//     this.value = value;
//     this.parents = parents;
//     this.children = children;
//   }
// }
function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let nodeDict = new Object();
  let nodeVisitCount = new Object();
  let pathArray = new Array();

  // Populate the node dictionary
  for (let i = 0; i < input.length; i++) {
    let lineArray = input[i].split("-");
    let nodeStart = lineArray[0];
    let nodeEnd = lineArray[1];

    if (nodeDict[nodeStart] === undefined) {
      nodeDict[nodeStart] = [nodeEnd];
    } else {
      //nodeDict[nodeStart] = nodeEnd;
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
    nodeVisitCount[nodeStart] = 0;
    nodeVisitCount[nodeEnd] = 0;
  }

  // Visit all paths and add to path array
  visitNode("start");

  console.log(nodeDict);
  console.log(nodeVisitCount);

  function visitNode(inputNode) {
    console.log(`Visiting: ${inputNode}`);
    let curChildren = nodeDict[inputNode];
    nodeVisitCount[inputNode] += 1;

    //console.log(curChildren);
    if (curChildren !== undefined) {
      curChildren.forEach((child) => {
        // check if child has already been visited
        let visitCount = nodeVisitCount[child];
        let isLowerCase =
          child[0] === child[0].toLowerCase() &&
          child !== "start" &&
          child !== "end";
        console.log(visitCount);
        if (isLowerCase && visitCount >= 1) {
          // don't visit
        } else {
          if (child !== "end") {
            visitNode(child);
          } else {
            console.log("end");
            pathArray.push("something");
            return;
          }
        }
      });
    }
  }

  console.log(pathArray.length);
}
function calculatePartTwo() {}
