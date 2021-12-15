// Run something similar to this for better time keeping
// time node day15/day15.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

// Priority Queue code based on GeekCode
// A* code based on RedBlobGames
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    let qElement = new QElement(element, priority);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  rear() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printPQueue() {
    var str = "";
    for (let i = 0; i < this.items.length; i++) {
      str +=
        "[" +
        this.items[i].element.x +
        "," +
        this.items[i].element.y +
        "]" +
        " ";
    }
    return str;
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function areCellsEqual(cell1, cell2) {
  if (cell1.x === cell2.x && cell1.y === cell2.y) {
    return true;
  } else {
    return false;
  }
}

function cellString(cell) {
  return `${cell.x},${cell.y}`;
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day15/test_input.txt";
    break;
  case 1:
    filename = "day15/input.txt";
    break;
  case 2:
    filename = "day15/big.boy";
    break;
  case 3:
    filename = "day15/bigger.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

// create the graph
let graph = [];
for (let y = 0; y < input.length; y++) {
  let line = input[y].split("").map(Number);
  graph.push(line);
}

let bigGraph = [];

// create bigGraph
for (let bigY = 0; bigY < 5 * graph.length; bigY++) {
  let originalY = bigY % graph.length;
  let bigYLine = [];
  for (let bigX = 0; bigX < 5 * graph[0].length; bigX++) {
    let originalX = bigX % graph[0].length;
    let increment =
      Math.floor(bigY / graph.length) + Math.floor(bigX / graph[0].length);

    let newValue = graph[originalY][originalX] + increment;
    if (newValue > 9) newValue -= 9;
    bigYLine.push(newValue);
  }
  bigGraph.push(bigYLine);
}

console.log("---Part 1---");
calculateRiskLevel(graph);
console.log("---Part 2---");
calculateRiskLevel(bigGraph);

function calculateRiskLevel(inGraph) {
  let start = new Cell(0, 0);
  let goal = new Cell(inGraph[0].length - 1, inGraph.length - 1);

  let frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  let cameFrom = new Object();
  let costSoFar = new Object();

  cameFrom[cellString(start)] = null;
  costSoFar[cellString(start)] = 0;

  while (!frontier.isEmpty()) {
    let current = frontier.front().element;
    frontier.dequeue();

    let curNeighbors = [];

    if (areCellsEqual(current, goal)) {
      break;
    }

    // create neighbors
    {
      let aboveNeighbor = new Cell(current.x, current.y - 1),
        belowNeighbor = new Cell(current.x, current.y + 1),
        leftNeighbor = new Cell(current.x - 1, current.y),
        rightNeighbor = new Cell(current.x + 1, current.y);
      // handle below
      if (belowNeighbor.y < inGraph.length) {
        curNeighbors.push(belowNeighbor);
      }

      // handle right
      if (rightNeighbor.x < inGraph[0].length) {
        curNeighbors.push(rightNeighbor);
      }

      // handle above
      if (aboveNeighbor.y >= 0) {
        curNeighbors.push(aboveNeighbor);
      }

      // handle left
      if (leftNeighbor.x >= 0) {
        curNeighbors.push(leftNeighbor);
      }
    }

    curNeighbors.forEach((next) => {
      let curCellCost = inGraph[current.y][current.x];
      let nextCellCost = inGraph[next.y][next.x];

      let newCost =
        costSoFar[cellString(current)] + (curCellCost + nextCellCost);

      if (
        costSoFar[cellString(next)] === undefined ||
        newCost < costSoFar[cellString(next)]
      ) {
        costSoFar[cellString(next)] = newCost;
        let priority = newCost + heuristic(goal, next);
        frontier.enqueue(next, priority);
        cameFrom[cellString(next)] = current;
      }
    });
  }

  let riskLevel = 0;

  let curCell = new Cell(goal.x, goal.y);

  while (!areCellsEqual(curCell, start)) {
    riskLevel += inGraph[curCell.y][curCell.x];

    curCell = cameFrom[cellString(curCell)];
  }

  console.log(riskLevel);
}
