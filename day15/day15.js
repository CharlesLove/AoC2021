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
      str += this.items[i].element + " ";
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

console.log(graph);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  // let priorityQueue = new PriorityQueue();
  // console.log(priorityQueue.isEmpty());
  // console.log(priorityQueue.front());

  // priorityQueue.enqueue("Sumit", 2);
  // priorityQueue.enqueue("Gourav", 1);
  // priorityQueue.enqueue("Piyush", 1);
  // priorityQueue.enqueue("Sunny", 2);
  // priorityQueue.enqueue("Sheru", 3);

  // console.log(priorityQueue.printPQueue());
  // console.log(priorityQueue.front().element);
  // console.log(priorityQueue.rear().element);
  // console.log(priorityQueue.dequeue().element);
  // priorityQueue.enqueue("Sunil", 2);
  // console.log(priorityQueue.printPQueue());

  // start and goal arrays are [x, y]
  let start = new Cell(0, 0);
  let goal = new Cell(graph[0].length - 1, graph.length - 1);

  console.log(start);
  console.log(goal);

  let frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  let cameFrom = new Object();
  let costSoFar = new Object();
  cameFrom[start] = null;
  costSoFar[start] = 0;

  while (!frontier.isEmpty()) {
    let current = frontier.front().element;
    frontier.dequeue();


    console.log(current);
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
      if (belowNeighbor.y < graph.length) {
        curNeighbors.push(belowNeighbor);
      }

      // handle right
      if (rightNeighbor.x < graph[0].length) {
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
    console.log(curNeighbors);

    curNeighbors.forEach((next) => {
      let curCellCost = graph[current.y][current.x];
      let nextCellCost = graph[next.y][next.x];

      let newCost = costSoFar[current] + (curCellCost + nextCellCost);

      console.log(costSoFar);
      if (costSoFar[next] === 0 || newCost < costSoFar[next]) {
        costSoFar[next] = newCost;
        let priority = newCost + heuristic(goal, next);
        frontier.enqueue(next, priority);
        cameFrom[next] = current;

        console.log("Enqueued:");
        console.log(next);
      }
    });
  }
}
function calculatePartTwo() {}
