let fs = require("fs");
const { exit } = require("process");
var myArgs = process.argv.slice(2);
let filename = "";
let globalVersion = 0;
let globalPacketCount = 0;

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
//console.log(binaryInput);
//console.log(binaryInput.length);

//let packetCollection = new Map();

class Packet {
  version = 0;
  typeID;
  type;
  literalValue;
  lengthTypeID;
  subPacketLength;
  subPacketCount;
  subPackets = [];
  finalIndex;
  versionSum = 0;
  constructor(bStart, bEnd) {
    globalPacketCount += 1;
    //console.log(binaryInput.slice(bStart, bEnd));
    if (bEnd === undefined) bEnd = binaryInput.length;

    // bIndex allow you to know where in the binary you are
    let bIndex = bStart;

    this.version += parseInt(binaryInput.slice(bIndex, bIndex + 3), 2);

    if (!isNaN(this.version)) {
      globalVersion += this.version;
      this.versionSum += this.version;
    }
    bIndex += 3;
    this.typeID = parseInt(binaryInput.slice(bIndex, bIndex + 3), 2);
    bIndex += 3;

    if (this.typeID === 4) {
      this.type = "literal";

      let litBinary = "";

      for (let i = bIndex; i < bEnd; i += 5) {
        litBinary += binaryInput.slice(i + 1, i + 5);
        bIndex += 6;

        if (binaryInput[i] === "0") {
          break;
        }
      }
      this.literalValue = parseInt(litBinary, 2);
      this.finalIndex = bIndex;
    } else {
      this.type = "operator";
      this.lengthTypeID = parseInt(binaryInput[bIndex], 2);
      bIndex += 1;

      if (this.lengthTypeID === 0) {
        this.subPacketLength = parseInt(
          binaryInput.slice(bIndex, bIndex + 15),
          2
        );

        // if (isNaN(this.subPacketLength)) {
        //   console.log("Subpacket length is NaN");
        //   console.log(binaryInput.slice(bIndex));
        //   this.subPacketLength = 0;
        // }
        bIndex += 15;

        let subPacketLastIndex = bIndex + this.subPacketLength;
        //console.log(subPacketLastIndex);

        for (let i = bIndex; i < subPacketLastIndex; ) {
          //console.log(binaryInput.slice(i, subPacketLastIndex));
          let subPacket = new Packet(i, subPacketLastIndex);
          i = subPacket.finalIndex - 1;
          bIndex = i + 1;

          if (!isValidBIndex(bIndex) || subPacket.versionSum === undefined) {
            break;
          } else {
            this.versionSum += subPacket.versionSum;
            this.subPackets.push(subPacket);
          }
        }

        //bIndex = subPacketLastIndex;
        this.finalIndex = bIndex;
      } else {
        //console.log(bIndex);
        //console.log(binaryInput.slice(bIndex, bIndex + 11));
        this.subPacketCount = parseInt(
          binaryInput.slice(bIndex, bIndex + 11),
          2
        );
        bIndex += 11;

        //let subPacketLastIndex = bIndex + this.subPacketLength;
        //console.log(subPacketLastIndex);

        for (let i = 0; i < this.subPacketCount; i++) {
          //console.log(binaryInput.slice(bIndex, binaryInput.length));
          let subPacket = new Packet(bIndex, binaryInput.length);

          bIndex = subPacket.finalIndex - 1;
          console.log(`bindex: ${bIndex}`);

          if (!isValidBIndex(bIndex) || subPacket.versionSum === undefined) {
            this.subPackets.pop();
            break;
          } else {
            this.versionSum += subPacket.versionSum;
            this.subPackets.push(subPacket);
          }
        }

        //bIndex = subPacketLastIndex;
        this.finalIndex = bIndex;
      }
    }
  }
}

console.log("---Part 1---");
calculatePartOne();
// console.log("---Part 2---");
// calculatePartTwo();

function numSort(a, b) {
  return +a - +b;
}

function isValidBIndex(bIndex) {
  if (bIndex >= binaryInput.length - 11) {
    return false;
  } else {
    return true;
  }
}

function calculatePartOne() {
  console.log(binaryInput.length);
  let originalPacket = new Packet(0, binaryInput.length);
  console.log(originalPacket);

  console.log(globalVersion);
  console.log(globalPacketCount);
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
