let fs = require("fs");
// part 1
{
  let input = fs.readFileSync("day03/inputa.txt").toString("utf-8");
  //let input = fs.readFileSync("day03/big.boy").toString('utf-8');
  input = input.split("\n");

  let lineLength = input[0].length;
  let gBinaryNumberString = (eBinaryNumberString = "");

  for (let x = 0; x < lineLength; x++) {
    let oneCount = 0;
    for (let y = 0; y < input.length; y++) {
      if (input[y][x] === "1") {
        oneCount += 1;
      }
    }

    if (oneCount > input.length / 2) {
      gBinaryNumberString += "1";
      eBinaryNumberString += "0";
    } else {
      gBinaryNumberString += "0";
      eBinaryNumberString += "1";
    }
  }
  let gammaRate = parseInt(gBinaryNumberString, 2);
  let epsilonRate = parseInt(eBinaryNumberString, 2);
  console.log("---Part 1---");
  console.log(gammaRate * epsilonRate);
}

// part 2
console.log("---Part 2---");
{
  let input = fs.readFileSync("day03/inputa.txt").toString("utf-8");
  //let input = fs.readFileSync("day03/big.boy").toString('utf-8');
  input = input.split("\n");

  let lineLength = input[0].length;
  let mostCommonBitArray = input;
  let leastCommonBitArray = input;

  for (let x = 0; x < lineLength; x++) {
    let tempMCBArray = [];
    let tempLCBArray = [];
    // most common
    {
      let oneArray = [];
      let zeroArray = [];

      if (mostCommonBitArray.length == 1) continue;
      for (let y = 0; y < mostCommonBitArray.length; y++) {
        if (mostCommonBitArray[y][x] === "1") {
          oneArray.push(mostCommonBitArray[y]);
        } else {
          zeroArray.push(mostCommonBitArray[y]);
        }
      }
      // most common bit array handling
      if (oneArray.length >= zeroArray.length) {
        tempMCBArray = tempMCBArray.concat(oneArray);
      } else {
        tempMCBArray = tempMCBArray.concat(zeroArray);
      }

      mostCommonBitArray = tempMCBArray;
    }

    // least common
    {
      let oneArray = [];
      let zeroArray = [];

      if (leastCommonBitArray.length === 1) continue;
      for (let y = 0; y < leastCommonBitArray.length; y++) {
        if (leastCommonBitArray[y][x] === "1") {
          oneArray.push(leastCommonBitArray[y]);
        } else {
          zeroArray.push(leastCommonBitArray[y]);
        }
      }
      // least common bit array handling
      if (zeroArray.length <= oneArray.length) {
        tempLCBArray = tempLCBArray.concat(zeroArray);
      } else {
        tempLCBArray = tempLCBArray.concat(oneArray);
      }
    }

    leastCommonBitArray = tempLCBArray;
    //console.log(leastCommonBitArray);
  }

  let oxygenRating = parseInt(mostCommonBitArray[0], 2);
  let co2Rating = parseInt(leastCommonBitArray, 2);
  console.log(oxygenRating * co2Rating);
}
