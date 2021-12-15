// Run something similar to this for better time keeping
// time node day15/day15.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

// Priority Queue code based on GeekCode
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
  let priorityQueue = new PriorityQueue();
  console.log(priorityQueue.isEmpty());
  console.log(priorityQueue.front());

  priorityQueue.enqueue("Sumit", 2);
  priorityQueue.enqueue("Gourav", 1);
  priorityQueue.enqueue("Piyush", 1);
  priorityQueue.enqueue("Sunny", 2);
  priorityQueue.enqueue("Sheru", 3);

  console.log(priorityQueue.printPQueue());
  console.log(priorityQueue.front().element);
  console.log(priorityQueue.rear().element);
  console.log(priorityQueue.dequeue().element);
  priorityQueue.enqueue("Sunil", 2);
  console.log(priorityQueue.printPQueue());
}
function calculatePartTwo() {}
