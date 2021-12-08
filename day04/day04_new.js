let fs = require("fs");
const { exit } = require("process");

// part 1
console.log("---Part 1---");
part1: {
  break part1;
  //let input = fs.readFileSync("day04/input.txt").toString('utf-8');
  let input = fs.readFileSync("day04/big.boy").toString("utf-8");
  input = input.split("\n");
  input = input.filter((e) => e);

  let bingoCalls = input[0].split(",");
  let bingoSize = input[1].trim().split(/\s+/).length;

  let cardAmount = (input.length - 1) / bingoSize;

  // create bingo cards array
  // Total hitsX1 hitsX2 hitsX3 hitsX4 hitsX5
  // hitsY1 actual card data
  // hitsY2
  // hitsY3
  // hitsY4
  // hitsY5
  let bingoCardArray = Array(cardAmount);

  // fill bingo cards
  for (let c = 0; c < cardAmount; c++) {
    // y
    let cardTotal = 0;
    let cardYArray = Array(bingoSize + 1);
    for (let y = 0; y < bingoSize; y++) {
      let yFromInput = c * bingoSize + y + 1;

      let curRow = input[yFromInput].trim().split(/\s+/);
      cardXArray = Array(bingoSize + 1).fill(0);
      for (let x = 0; x < bingoSize; x++) {
        // use NaN to mark hits!

        let curNum = parseInt(curRow[x]);
        cardXArray[x + 1] = curNum;
        cardTotal += curNum;
      }
      cardYArray[y + 1] = cardXArray;
      cardYArray[0] = Array(bingoSize + 1).fill(0);
    }

    bingoCardArray[c] = cardYArray;

    bingoCardArray[c][0][0] = cardTotal;
  }

  // go through bingoCalls
  for (let i = 0; i < bingoCalls.length; i++) {
    let curBingoNumber = parseInt(bingoCalls[i]);

    // go through bingo cards
    for (let c = 0; c < cardAmount; c++) {
      // go through y
      for (let y = 1; y < bingoSize + 1; y++) {
        // go through x
        for (let x = 1; x < bingoSize + 1; x++) {
          if (bingoCardArray[c][y][x] == curBingoNumber) {
            // subtract from total
            bingoCardArray[c][0][0] -= curBingoNumber;

            // increment hit on x and y
            bingoCardArray[c][y][0] += 1;
            bingoCardArray[c][0][x] += 1;
            // change current location to NaN
            bingoCardArray[c][y][x] = NaN;

            // check if you win on x and y
            if (
              bingoCardArray[c][y][0] === bingoSize ||
              bingoCardArray[c][0][x] === bingoSize
            ) {
              console.log(bingoCardArray[c][0][0] * curBingoNumber);
              break part1;
            }
          }
        }
      }
    }
  }
}
// part 2
//console.log("---Part 2---");
{
  //let input = fs.readFileSync("day04/input.txt").toString('utf-8');
  let input = fs.readFileSync("day04/big.boy").toString("utf-8");
  input = input.split("\n");
  input = input.filter((e) => e);

  let bingoCalls = input[0].split(",");
  let bingoSize = input[1].trim().split(/\s+/).length;

  let cardAmount = (input.length - 1) / bingoSize;
  let uniqueCardWins = 0;
  let cardWinArray = Array(cardAmount);

  // create bingo cards array
  // Total hitsX1 hitsX2 hitsX3 hitsX4 hitsX5
  // hitsY1 actual card data
  // hitsY2
  // hitsY3
  // hitsY4
  // hitsY5
  let bingoCardArray = Array(cardAmount);

  // fill bingo cards
  for (let c = 0; c < cardAmount; c++) {
    // y
    let cardTotal = 0;
    let cardYArray = Array(bingoSize + 1);
    for (let y = 0; y < bingoSize; y++) {
      let yFromInput = c * bingoSize + y + 1;

      let curRow = input[yFromInput].trim().split(/\s+/);
      cardXArray = Array(bingoSize + 1).fill(0);
      for (let x = 0; x < bingoSize; x++) {
        // use NaN to mark hits!

        let curNum = parseInt(curRow[x]);
        cardXArray[x + 1] = curNum;
        //console.log(curRow[x]);
        cardTotal += curNum;
      }
      cardYArray[y + 1] = cardXArray;
      cardYArray[0] = Array(bingoSize + 1).fill(0);
    }

    bingoCardArray[c] = cardYArray;

    bingoCardArray[c][0][0] = cardTotal;
  }

  // go through bingoCalls
  for (let i = 0; i < bingoCalls.length; i++) {
    let curBingoNumber = parseInt(bingoCalls[i]);

    // go through bingo cards
    for (let c = 0; c < cardAmount; c++) {
      if (cardWinArray[c] === 1) continue;
      // go through y
      for (let y = 1; y < bingoSize + 1; y++) {
        // go through x
        for (let x = 1; x < bingoSize + 1; x++) {
          if (bingoCardArray[c][y][x] == curBingoNumber) {
            // subtract from total
            bingoCardArray[c][0][0] -= curBingoNumber;

            // increment hit on x and y
            bingoCardArray[c][y][0] += 1;
            bingoCardArray[c][0][x] += 1;
            // change current location to NaN
            bingoCardArray[c][y][x] = NaN;

            // check if you win on x and y
            if (
              bingoCardArray[c][y][0] === bingoSize ||
              bingoCardArray[c][0][x] === bingoSize
            ) {
              // mark card array for future use
              cardWinArray[c] = 1;
              uniqueCardWins += 1;
              // is this the first win?
              if (uniqueCardWins === 1) {
                console.log(bingoCardArray[c][0][0] * curBingoNumber);
                console.log("---Part 2---");
              }

              // is this the last card to win?
              if (uniqueCardWins === cardAmount) {
                console.log(bingoCardArray[c][0][0] * curBingoNumber);
                exit();
              }
            }
          }
        }
      }
    }
  }
}
