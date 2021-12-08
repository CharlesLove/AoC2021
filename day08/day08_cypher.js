// Run something similar to this for better time keeping
// time node day08/day08.js 3

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

  // The value of each letter in the default configuration
  // is based on how many times it is used
  // Eg: Digit 1 is made up of 'cf', this is c=8 and f=9, so c+f=17
  let numCheckDictionary = new Object();
  {
    let a = 8,
      b = 6,
      c = 8,
      d = 7,
      e = 4,
      f = 9,
      g = 7;
    let total = a + b + c + d + e + f + g;

    numCheckDictionary[total - d] = 0;
    numCheckDictionary[c + f] = 1;
    numCheckDictionary[total - b - f] = 2;
    numCheckDictionary[total - b - e] = 3;
    numCheckDictionary[total - a - e - g] = 4;
    numCheckDictionary[total - c - e] = 5;
    numCheckDictionary[total - c] = 6;
    numCheckDictionary[a + c + f] = 7;
    numCheckDictionary[total] = 8;
    numCheckDictionary[total - e] = 9;
  }

  for (let i = 0; i < input.length; i++) {
    curPanel = input[i].split(" | ");
    inputPanel = curPanel[0].split(" ");
    outputPanel = curPanel[1].split(" ");

    let letterValueDict = new Object();
    letterValueDict["a"] = 0;
    letterValueDict["b"] = 0;
    letterValueDict["c"] = 0;
    letterValueDict["d"] = 0;
    letterValueDict["e"] = 0;
    letterValueDict["f"] = 0;
    letterValueDict["g"] = 0;

    curPanel = input[i].split(" | ");
    inputPanel = curPanel[0].split(" ");
    outputPanel = curPanel[1].split(" ");

    // calculate what each letter is worth
    inputPanel.forEach((digit) => {
      for (let i = 0; i < digit.length; i++) {
        const letter = digit[i];
        letterValueDict[letter] += 1;
      }
    });

    let outputString = "";

    outputPanel.forEach((code) => {
      codeValue = 0;

      for (let index = 0; index < code.length; index++) {
        const letter = code[index];
        codeValue += letterValueDict[letter];
      }

      outputString += numCheckDictionary[codeValue].toString();
    });

    total += parseInt(outputString);
  }
  console.log(total);
}

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();
