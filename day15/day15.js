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

// make the starting point have a cost of 0
//graph[0][0] = 0;

console.log(graph);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  // start and goal arrays are [x, y]
  let start = new Cell(0, 0);
  let goal = new Cell(graph[0].length - 1, graph.length - 1);

  console.log(start);
  console.log(goal);

  let frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  let cameFrom = new Object();
  let costSoFar = new Object();
  console.log(costSoFar);

  cameFrom[start] = null;
  costSoFar[start] = 0;

  console.log(cameFrom[start]);

  while (!frontier.isEmpty()) {
    let current = frontier.front().element;

    console.log(`---Current Cell: ${current.x},${current.y}---`);
    let curNeighbors = [];

    if (current === goal) {
      console.log("Goal reached");
      break;
    }

    // create neighbors
    {
      let aboveNeighbor = new Cell(current.x, current.y - 1),
        belowNeighbor = new Cell(current.x, current.y + 1),
        leftNeighbor = new Cell(current.x - 1, current.y),
        rightNeighbor = new Cell(current.x + 1, current.y);
      // handle below
      if (
        belowNeighbor.y < graph.length &&
        !areCellsEqual(start, belowNeighbor)
      ) {
        curNeighbors.push(belowNeighbor);
        console.log("below is valid");
      }

      // handle right
      if (
        rightNeighbor.x < graph[0].length &&
        !areCellsEqual(start, rightNeighbor)
      ) {
        curNeighbors.push(rightNeighbor);
        console.log("right is valid");
      }

      // handle above
      if (aboveNeighbor.y >= 0 && !areCellsEqual(start, aboveNeighbor)) {
        curNeighbors.push(aboveNeighbor);
        console.log("above is valid");
      }

      // handle left
      if (leftNeighbor.x >= 0 && !areCellsEqual(start, leftNeighbor)) {
        curNeighbors.push(leftNeighbor);
        console.log("left is valid");
      }
    }
    console.log(start);
    console.log(curNeighbors);

    curNeighbors.forEach((next) => {
      console.log(`Next Cell: ${next.x},${next.y}`);
      let curCellCost = graph[current.y][current.x];
      let nextCellCost = graph[next.y][next.x];

      let newCost = costSoFar[current] + (curCellCost + nextCellCost);

      console.log(`currentCellCost: ${curCellCost}`);
      console.log(`nextCellCost: ${nextCellCost}`);
      console.log(`newCost: ${newCost}`);

      console.log(`costSoFar[next]: ${costSoFar[next]}`);

      // TODO: costSoFar is likely having issues with cells which
      // is leading to buggy queue behavor

      if (costSoFar[next] === 0 || newCost < costSoFar[next]) {
        costSoFar[next] = newCost;
        let priority = newCost + heuristic(goal, next);
        frontier.enqueue(next, priority);
        cameFrom[next] = current;

        console.log("Enqueued:");
        console.log(next);
      }
    });

    console.log("Frontier queue: " + frontier.printPQueue());
    frontier.dequeue();
    console.log("Frontier queue (after dequeue): " + frontier.printPQueue());
  }
}
function calculatePartTwo() {}
