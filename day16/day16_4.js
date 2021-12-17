class Packet {
  parent;
  version;
  typeID;
  type;
  literalValue;
  lengthTypeID;
  totalSubpacketLength;
  numberSubpackets;
  bitLength;

  constructor(bIn) {
    // an empty bIn shouldn't be getting in
    // TODO: figure out and stop empty bIn
    // from being using in class creation

    //if (bIn === "") return;
    this.version = parseInt(bIn.slice(0, 3), 2);
    this.typeID = parseInt(bIn.slice(3, 6), 2);
    this.bitLength = 6;
    if (this.typeID === 4) {
      this.type = "literal";

      let litBinary = "";

      for (let i = 6; i < bIn.length; i += 5) {
        litBinary += bIn.slice(i + 1, i + 5);
        this.bitLength += 5;

        if (bIn[i] === "0") {
          break;
        }
      }
      //this.bitLength += litBinary.length;
      this.literalValue = parseInt(litBinary, 2);

      globalPacketArray.push(this);
    } else {
      this.type = "operator";
      this.lengthTypeID = parseInt(bIn[6], 2);
      this.bitLength += 1;

      if (this.lengthTypeID === 0) {
        this.totalSubpacketLength = parseInt(bIn.slice(7, 22), 2);
        this.bitLength += 15 + this.totalSubpacketLength;

        globalPacketArray.push(this);

        let subPacketSegment = bIn.slice(22, 22 + this.totalSubpacketLength);
        let subPacketBitsSoFar = 0;
        let thisSegment = subPacketSegment;

        while (thisSegment.length > 0) {
					
					let subPacket = new Packet(thisSegment);
          subPacketBitsSoFar += subPacket.bitLength;
          thisSegment = subPacketSegment.slice(subPacketBitsSoFar);
        }
      } else {
        this.numberSubpackets = parseInt(bIn.slice(7, 18), 2);
        this.bitLength += 11;

        globalPacketArray.push(this);
        let thisIndex = globalPacketArray.length;

        // the rest of this bit length won't be known until the sub
        // packets are complete, so change it in the array after sub
        // packets
        let subPacketSegment = bIn.slice(18);
        let subPacketBitsSoFar = 0;

        for (let i = 0; i < this.numberSubpackets; i++) {
          let thisSegment = subPacketSegment.slice(subPacketBitsSoFar);

          let subPacket = new Packet(thisSegment);
          subPacketBitsSoFar += subPacket.bitLength;
        }

        // this is automagically modifying the array item as well
        this.bitLength += subPacketBitsSoFar;

        //globalPacketArray[thisIndex] = this;
      }
    }
  }
}

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

let globalBinaryInput = hexToBinary(input);

let globalPacketArray = [];

console.log("---Part 1---");
calculatePartOne();

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

function calculatePartOne() {
  console.log(globalBinaryInput.length);
  packetGeneration(globalBinaryInput);

  console.log(globalPacketArray);
  console.log(globalPacketArray.length);

  let versionSum = 0;

  globalPacketArray.forEach((packet) => {
    versionSum += packet.version;
  });

  console.log(versionSum);
}

function packetGeneration(binInput) {
  let originalPacket = new Packet(binInput);
}
