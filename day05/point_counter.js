let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);
let gridSize = 0;
let bigGrid = false;
let totalPoints = 0;

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
		filename = "day05/big_boy.txt";
		gridSize = 6400;
		break;
	case 3:
		filename = "day05/bigger_boy.txt";
		gridSize = 10000;
		break;
	case 4:
		filename = "day05/biggest_boy.txt";
		gridSize = 100000;
		//bigGrid = true;
		break;
}
console.log("---- Running: " + filename + " ----");

{
	let input = fs.readFileSync(filename).toString('utf-8');
	input = input.split("\n");

	//let theGRID = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
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

		// switch(theGRID[curX][curY]){
		// 	case null:
		// 		theGRID[curX][curY] = false
		// 		break;
		// 	case false:
		// 		theGRID[curX][curY] = true;
		// 		totalHits++;
		// 		break;
		// 	case true:
		// 		break;
		// }

		while(curX != x2 || curY != y2)
		{
			
			if(curX < x2) curX++;
			else if(curX > x2) curX--;
			
			if(curY < y2) curY++;
			else if(curY > y2) curY--;

			// switch(theGRID[curX][curY]){
			// 	case null:
			// 		theGRID[curX][curY] = false
			// 		break;
			// 	case false:
			// 		theGRID[curX][curY] = true;
			// 		totalHits++;
			// 		break;
			// 	case true:
			// 		break;
			// }
			totalPoints++;
			
		}
		console.log(i + " out of " + input.length + " - Total Points: " + totalPoints);	
	}
}