// Run something similar to this for better time keeping
// time node day16/day16.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

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

console.log(input);

console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function calculatePartOne() {
  let binaryInput = hexToBinary(input);
  console.log(binaryInput);

  let finished = false;

  // [finished?, packet, lengthLeft, packetsLeft]
  let nextStep = [false, binaryInput, binaryInput.length, 1];
  while (!finished) {
    nextStep = readPacket(nextStep[1], nextStep[2], nextStep[3]);

    finished = nextStep[0];
    console.log(finished);
  }
}
function calculatePartTwo() {}

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

function readPacket(packet, lengthLeft, packetsLeft) {
  let packetVersion = parseInt(packet.slice(0, 3), 2);
  let typeID = parseInt(packet.slice(3, 6), 2);
  console.log(packetVersion);
  console.log(typeID);

  let remainingPacket = packet;

  // literal value
  if (typeID === 4) {
    packetsLeft -= 1;
    let literalBinary = "";
    for (let i = 6; i < lengthLeft; i += 5) {
      let subValue = packet.slice(i + 1, i + 5);
      literalBinary += subValue;

      lengthLeft--;

      if (packet[i] === "0") {
        remainingPacket = remainingPacket.slice(i + 1);
        console.log("remainingPacket");
        console.log(remainingPacket);
        break;
      }
    }

    // for test input 1:
    // 2021
    console.log(literalBinary);
    console.log(parseInt(literalBinary, 2));
    if (lengthLeft > 0 && remainingPacket !== "") {
      return [false, remainingPacket, lengthLeft, packetsLeft];
    } else {
      return [true, "", lengthLeft, packetsLeft];
    }
  }
  // operator
  else {
    let lengthTypeID = packet[6];
    console.log(lengthTypeID);
    let totalLength, subPacketNumber;
    let subPacket = [];
    if (lengthTypeID === "0") {
      totalLength = packet.slice(7, 7 + 15);
      console.log(totalLength);
      totalLength = parseInt(totalLength, 2);
      console.log(totalLength);
      return [
        false,
        packet.slice(7 + 15, 7 + 15 + totalLength),
        totalLength,
        packetsLeft,
      ];
    } else {
    }
  }
}
