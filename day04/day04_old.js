let fs = require("fs");
// part 1
{
	let input = fs.readFileSync("day04/test_input.txt").toString('utf-8');
	//let input = fs.readFileSync("day04/bigboy.txt").toString('utf-8');
	input = input.split("\n");

	//console.log(input);

	let bingoCalls = input[0].split(",");
	//console.log(bingoCalls);
	//console.log(input);

	
	// Array of Card Totals
	let cardAmount = (input.length-1)/6;

	// create bingo cards array
	let bingoCardArray = Array(cardAmount).fill(Array(5).fill(Array(5).fill(0)));
	console.log(bingoCardArray);

	let bingoCardTotalRemovals = Array(cardAmount).fill(0);
	console.log("Card Amount: " + cardAmount);

	// array of hits per card, per x and y
	let hitArrayCardCollumns = Array(cardAmount);


	// go through bingoCalls
	for(let i = 0; i < bingoCalls.length; i++)
	{
		let curBingoNumber = parseInt(bingoCalls[i]);		
		
		console.log("---Call: " + curBingoNumber + "---");
		// go through bingo cards
		for(let c = 2; c < input.length;c += 6)
		{
			let curCardIndex = (c-2)/6;

			let curCardRemovals = bingoCardTotalRemovals[curCardIndex];
			let curCardTotal = curCardRemovals;

			console.log("-New Card-");
			// go down the y (checking if everything in a line is mark meanwhile)

			//console.log(input[c]);

			// split current line
			for(let y = c; y < c + 5; y++)
			{
				//console.log(input[y]);
				// trim and split by any length of whitespace
				let curRow = input[y].trim().split(/\s+/);
				// go through the x (checking if everything in line is marked meanwhile)
				//console.log(curRow);
				for(let x = 0; x < 5; x++)
				{
					let curNumber = parseInt(curRow[x]);
					//console.log(curRow[x]);
					if(curNumber === curBingoNumber)
					{
						// increment hit counter for cur card col and row

						// remove from cur Card Removals
						curCardRemovals -= curNumber;
					}
					else
					{
						curCardTotal += curNumber;
					}
				}
			

			}
			console.log("Current Card Total: " + curCardTotal);
			bingoCardTotalRemovals[curCardIndex] = curCardRemovals;
		}

	}
}