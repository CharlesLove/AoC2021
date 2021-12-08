// Run something similar to this for better time keeping
// time node day06/day06_grid.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day08/small_test_input.txt";
    break;
  case 1:
    filename = "day08/test_input.txt";
    break;
  case 2:
    filename = "day08/input.txt";
    break;
  case 3:
    filename = "day08/big.boy";
    break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);

function calculatePartOne() {
  let curPanel, outputPanel;
  let partOneDigitCount = 0;
  for (let i = 0; i < input.length; i++) {
    curPanel = input[i].split(" | ");
    outputPanel = curPanel[1].split(" ");
    //console.log(outputPanel);

    outputPanel.forEach((display) => {
      let segCount = display.length;

      switch (segCount) {
        case 2: // two
          partOneDigitCount++;
          break;
        case 4: // three
          partOneDigitCount++;
          break;
        case 3: // seven
          partOneDigitCount++;
          break;
        case 7: // eight
          partOneDigitCount++;
          break;

        default:
          break;
      }
    });
  }
  console.log(partOneDigitCount);
}

function calculatePartTwo() {
  let curPanel,
    outputPanel,
    inputPanel,
    total = 0;

  let checker = (arr, target) => target.every((v) => arr.includes(v));

  for (let i = 0; i < input.length; i++) {
    curPanel = input[i].split(" | ");
    inputPanel = curPanel[0].split(" ");
    outputPanel = curPanel[1].split(" ");
    let numArray = new Array(10);

    let fiveSegs = [];
    let sixSegs = [];

    let allDigits = [];

    inputPanel.forEach((display) => {
      let segCount = display.length;

      allDigits.push(display.split(""));

      // get unique digits
      switch (segCount) {
        case 2: // 1
          numArray[1] = display.split("");
          break;
        case 4: // 4
          numArray[4] = display.split("");
          break;
        case 3: // 7
          numArray[7] = display.split("");
          break;
        case 7: // 8
          numArray[8] = display.split("");
          break;

        case 5: // 2,3,5
          fiveSegs.push(display.split(""));
          break;

        case 6: // 0,6,9
          sixSegs.push(display.split(""));
          break;

        default:
          break;
      }
    });

    fiveSegs.forEach((fiveDigitNumber) => {
      let totalUses = 0;
      let intersection = [];

      allDigits.forEach((allNumber) => {
        if (checker(allNumber, fiveDigitNumber)) {
          totalUses++;
        }
      });

      switch (totalUses) {
        case 2:
          numArray[2] = fiveDigitNumber;
          break;
        case 3:
          numArray[3] = fiveDigitNumber;
          break;
        case 4:
          numArray[5] = fiveDigitNumber;
          break;
        default:
          break;
      }
    });

    sixSegs.forEach((sixDigitNumber) => {
      if (checker(sixDigitNumber, numArray[5])) {
        let union5 = [...new Set([...numArray[1], ...numArray[5]])];
        if (checker(sixDigitNumber, union5)) {
          numArray[9] = sixDigitNumber;
        } else {
          numArray[6] = sixDigitNumber;
        }
      } else {
        numArray[0] = sixDigitNumber;
      }
    });

    for (let i = 0; i < numArray.length; i++) {
      numArray[i] = numArray[i].sort().toString();
    }

    let panelString = "";

    for (let i = 0; i < outputPanel.length; i++) {
      let currentCode = outputPanel[i].split("").sort().toString();
      curNumberString = numArray.indexOf(currentCode).toString();
      panelString += curNumberString;
    }

    total += parseInt(panelString);
  }
  console.log(total);
}

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();
