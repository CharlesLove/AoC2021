// Run something similar to this for better time keeping
// time node day16/day16.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

class Packet {
  version;
  typeID;
  literals = [];
  subPacket = [];

  constructor(binary) {
    this.version = parseInt(binary.slice(0, 3), 2);
    this.typeID = parseInt(binary.slice(3, 6), 2);
    let remainingBinary = binary.slice(6);
    if (this.typeID === 4) {
      let literalBinary = "";
      for (let i = 0; i < remainingBinary.length; i += 5) {
        let subValue = remainingBinary.slice(i + 1, i + 5);
        console.log(subValue);
        literalBinary += subValue;

        if (remainingBinary[i] === "0") {
          break;
        }
      }
      this.literals.push(parseInt(literalBinary, 2));
    }
  }
}

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 0:
    filename = "day16/test_input1.txt";
    break;
  case 1:
    filename = "day16/test_input2.txt";
    break;
  // case 1:
  //   filename = "day16/input.txt";
  //   break;
  // case 2:
  //   filename = "day16/big.boy";
  //   break;
}

console.log("---- Running: " + filename + " ----");

let input = fs.readFileSync(filename).toString("utf-8");
input = input.split("\n");
input = input.filter((e) => e);
input = input[0];

let binaryInput = hexToBinary(input);

console.log(input);
console.log(binaryInput);

console.log("---Part 1---");
calculatePartOne();
// console.log("---Part 2---");
// calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let originalPacket = new Packet(binaryInput);
  console.log(originalPacket);
}

function hexToBinary(hexString) {
  let binaryString = "";
  hexString.split("").forEach((character) => {
    switch (character) {
      case "0":
        binaryString += "0000";
        break;
      case "1":
        binaryString += "0001";
        break;
      case "2":
        binaryString += "0010";
        break;
      case "3":
        binaryString += "0011";
        break;
      case "4":
        binaryString += "0100";
        break;
      case "5":
        binaryString += "0101";
        break;
      case "6":
        binaryString += "0110";
        break;
      case "7":
        binaryString += "0111";
        break;
      case "8":
        binaryString += "1000";
        break;
      case "9":
        binaryString += "1001";
        break;
      case "A":
        binaryString += "1010";
        break;
      case "B":
        binaryString += "1011";
        break;
      case "C":
        binaryString += "1100";
        break;
      case "D":
        binaryString += "1101";
        break;
      case "E":
        binaryString += "1110";
        break;
      case "F":
        binaryString += "1111";
        break;
    }
  });
  return binaryString;
}
