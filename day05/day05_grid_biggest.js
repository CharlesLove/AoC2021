// Run something similar to this for better time keeping
// time node day05/day05_grid.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);
let gridSize = 0;
let bigGrid = false;
let skipCache = true;

switch(filePicker){
	case 0:
		filename = "day05/test_input.txt";
		gridSize = 10;
		break;
	case 1:
		filename = "day05/input.txt";
		gridSize = 1000;
		break;
	case 2:
		filename = "day05/big.boy";
		gridSize = 6400;
		break;
	case 3:
		filename = "day05/bigger.boy";
		gridSize = 10000;
		break;
	case 4:
		filename = "day05/biggest.boy";
		gridSize = 100000;
		bigGrid = true;
		break;
}


console.log("---- Running: " + filename + " ----");

// part 1
console.log("---Part 1---");
part1:
{
	let input = fs.readFileSync(filename).toString('utf-8');
	input = input.split("\n");

	if(bigGrid && !skipCache)
	{
		const fs = require('fs')

		//let content = "null";

		let content = "";

		for(let x = 0; x < 1000; x++)
		{
			for(let y = 0; y < 1000; y++)
			{
				content +=  "-1 ";
			}
			content += "\n";
		}

		console.log(content);

		for(let x = 0; x < gridSize; x += 1000)
		{
			for(let y = 0; y < gridSize; y += 1000)
			{
				let cellFileName = "day05/biggest_cells_big/" + x + "_" + y + ".txt";

				try {
					fs.writeFileSync(cellFileName, content);
					//file written successfully
				} catch (err) {
					console.error(err)
				}
			}
		}

	}

	let theGRID = Array(gridSize).fill().map(() => Array(gridSize).fill(null));	

	let totalHits = 0;

	// iterate through data
	for(let i = 0; i < input.length; i++)
	{
		let x1, y1 = 0;
		let x2, y2 = 0;
		// split data
		{
			let firstSplit = input[i].split(" -> ");
			let firstPair = firstSplit[0].split(",");
			let secondPair = firstSplit[1].split(",");
			x1 = parseInt(firstPair[0]);
			y1 = parseInt(firstPair[1]);
			x2 = parseInt(secondPair[0]);
			y2 = parseInt(secondPair[1]);
		}

		// only handle horizontal and vertical for now
		if(x1 === x2)
		{
			let iterator = 0;
			let start, end = 0;
			if(y1 < y2)
			{
				start = y1;
				end = y2;
			}
			else
			{
				start = y2;
				end = y1;
			}
			// iterate through y adding points to the map along the way
			for(let y = start; y <= end; y++)
			{				
				switch(theGRID[x1][y]){
					case null:
						theGRID[x1][y] = false
						break;
					case false:
						theGRID[x1][y] = true;
						totalHits++;
						break;
					case true:
						break;
				}
				
			}
		}
		else if(y1 === y2)
		{
			let iterator = 0;
			let start, end = 0;
			if(x1 < x2)
			{
				start = x1;
				end = x2;
			}
			else
			{
				start = x2;
				end = x1;
			}
			// iterate through y adding points to the map along the way
			for(let x = start; x <= end; x++)
			{
				switch(theGRID[x][y1]){
					case null:
						theGRID[x][y1] = false
						break;
					case false:
						theGRID[x][y1] = true;
						totalHits++;
						break;
					case true:
						break;
				}
			}

		}
		else
		{
			continue;
		}		
	}
	console.log(totalHits);

}
// part 2
console.log("---Part 2---");
part2:
{
	let input = fs.readFileSync(filename).toString('utf-8');
	input = input.split("\n");

	let theGRID = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
	let totalHits = 0;

	// iterate through data
	for(let i = 0; i < input.length; i++)
	{
		let x1, y1 = 0;
		let x2, y2 = 0;
		// split data
		{
			let firstSplit = input[i].split(" -> ");
			let firstPair = firstSplit[0].split(",");
			let secondPair = firstSplit[1].split(",");
			x1 = parseInt(firstPair[0]);
			y1 = parseInt(firstPair[1]);
			x2 = parseInt(secondPair[0]);
			y2 = parseInt(secondPair[1]);
		}

		let curX = x1;
		let curY = y1;

		switch(theGRID[curX][curY]){
			case null:
				theGRID[curX][curY] = false
				break;
			case false:
				theGRID[curX][curY] = true;
				totalHits++;
				break;
			case true:
				break;
		}

		while(curX != x2 || curY != y2)
		{
			
			if(curX < x2) curX++;
			else if(curX > x2) curX--;
			
			if(curY < y2) curY++;
			else if(curY > y2) curY--;

			switch(theGRID[curX][curY]){
				case null:
					theGRID[curX][curY] = false
					break;
				case false:
					theGRID[curX][curY] = true;
					totalHits++;
					break;
				case true:
					break;
			}			
		}
	}
	console.log(totalHits);
}