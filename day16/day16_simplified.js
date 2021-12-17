let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch (filePicker) {
  case 1:
    filename = "day16/test_input1.txt";
    break;
  case 2:
    filename = "day16/test_input2.txt";
    break;
  case 3:
    filename = "day16/test_input3.txt";
    break;
  case 4:
    filename = "day16/sum_test1.txt";
    break;
  case 5:
    filename = "day16/sum_test2.txt";
    break;
  case 6:
    filename = "day16/sum_test3.txt";
    break;
  case 7:
    filename = "day16/sum_test4.txt";
    break;
  case 10:
    filename = "day16/input.txt";
    break;
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
console.log(binaryInput);

//let packetCollection = new Map();

class Packet {
  version;
  typeID;
  type;
  lengthTypeID;
  subPacketLength;
  subPacketCount;
  subPackets = [];
  constructor(bStart, bEnd) {
    console.log(binaryInput.slice(bStart, bEnd));

    this.version = parseInt(binaryInput.slice(bStart, bStart + 3),2);
		this.typeID = parseInt(binaryInput.slice(bStart+3,bStart+3+3),2);
  }
}

console.log("---Part 1---");
calculatePartOne();
// console.log("---Part 2---");
// calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let originalPacket = new Packet(0, binaryInput.length);
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
