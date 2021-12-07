// Run something similar to this for better time keeping
// time node day06/day06_grid.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
const { cursorTo } = require("readline");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);
let isSmart = parseInt(myArgs[1]);

switch(filePicker){
	case 0:
		filename = "day07/test_input.txt";
		break;
	case 1:
		filename = "day07/input.txt";
		break;
	case 2:
		filename = "day07/bigboy.txt";
		break;
}


console.log("---- Running: " + filename + " ----");

function numSort(a,b) { return (+a) - (+b);}

let incStepCache = new Object();

function calculateMedianFuel()
{
	let input = fs.readFileSync(filename).toString('utf-8');
	input = input.split(",").map(Number);
	
	input.sort(numSort);
	//console.log(input);

	crabDict = new Object();

	for(let i = 0; i < input.length; i++)
	{
		if(crabDict[input[i]] == undefined) crabDict[input[i]] = 1;
		else crabDict[input[i]] += 1;
	}

	let median = input[input.length / 2];

	let minimum = input[0];
	let maximum = input[input.length - 1];

	let fuel = 0;

	// for(let i = minimum; i <= maximum; i++)
	// {
	// 	if(crabDict[i] == undefined) continue;
	// 	fuel += Math.abs((i - median) * crabDict[i]);
	// }

	Object.keys(crabDict).forEach(function(key) {
		fuel += Math.abs((key - median) * crabDict[key]);
	});

	console.log(fuel);
}

function calculateComplicatedFuel()
{
	let input = fs.readFileSync(filename).toString('utf-8');
	input = input.split(",").map(Number);

	console.log("Done importing");
	
	input.sort(numSort);

	console.log("Done sorting");

	let incStepCache = new Object();

	//console.log(input);

	if(isSmart == 1) smartFuelCalc();
	else naiveFuelCalc();

	function incStepCalc(steps){
		let stepCost = 0;

		if(incStepCache[steps] !== undefined){
			// process.stdout.clearLine();
			// process.stdout.cursorTo(0);
			// process.stdout.write(steps + " retreived from cache.");

			return incStepCache[steps];
		}

		for(let i = 0; i < steps; i++)
		{
			stepCost += i + 1;
		}

		incStepCache[steps] = stepCost;

		// process.stdout.clearLine();
    // process.stdout.cursorTo(0);
		// process.stdout.write(steps + " added to cache.");

		return stepCost;
	}

	// slightly wrong answer on big boy part 2
	function smartFuelCalc(){
		console.log("--Smart calculation--")

		let sum = 0;
		let minimum = input[0];
		let maximum = input[input.length - 1];

		console.log(maximum);
	
		for(let i = 0; i < input.length; i++)
		{
			sum += input[i];
		}
	
		let average = sum / input.length;
		//average = parseInt(average);
		console.log(average);
		//console.log(sum);
		//console.log(average);

		crabDict = new Object();
		
		for(let i = 0; i < input.length; i++)
		{
			if(crabDict[input[i]] == undefined) crabDict[input[i]] = 1;
			else crabDict[input[i]] += 1;
		}
		
		let fuel = -1n;
		console.log(fuel);
		// works with test and my input, but not big boy
		let floorAverage = Math.floor(average);
		console.log(floorAverage);
		let ceilAverage = Math.ceil(average);
		console.log(ceilAverage);
		//console.log(newPlace);
		if(Number.isInteger(average)){
			console.log("Average was an integer! (Lucky you)");
			calcLowestFuel(average);
		}
		else{
			console.log("Average was not an integer! (Go make yourself some coffee)");
			console.log("Calculating with floored average...");
			calcLowestFuel(floorAverage);
			console.log("Calculating with ceiling average...");
			calcLowestFuel(ceilAverage);

			// just brute force it then!
			//naiveFuelCalc();
		} 
		console.log(fuel);

		
		function calcLowestFuel(newPlace)
		{
			let roundedFuel = 0n;
			// for(let i = minimum; i <= maximum; i++)
			// {
			// 	if(crabDict[i] == undefined) continue;
			// 	//console.log(Math.abs(i - newPlace));
			// 	roundedFuel += incStepCalc(Math.abs(i - newPlace)) * crabDict[i];
			// 	console.log(i);
			// }
			Object.keys(crabDict).forEach(function(key) {
				roundedFuel += BigInt(incStepCalc(Math.abs(key - newPlace)) * crabDict[key]);
			});

			if(roundedFuel < fuel || fuel === -1n) fuel = roundedFuel;
			console.log("Currently lowest fuel is:");
			console.log(fuel);
		}
	}

	function naiveFuelCalc(){
		console.log("--Naive Calculation--")
		let minimum = input[0];
		let maximum = input[input.length - 1];
		let bestPosition = minimum;
		let lowestFuelCost = Infinity;

		crabDict = new Object();
	
		for(let i = 0; i < input.length; i++)
		{
			if(crabDict[input[i]] == undefined) crabDict[input[i]] = 1;
			else crabDict[input[i]] += 1;
		}

		for(let position = minimum; position <= maximum; position++){
			let totalPositionCost = 0;

			// for(let i = minimum; i <= maximum; i++){
			// 	if(crabDict[i] == undefined) continue;
			// 	totalPositionCost += incStepCalc(Math.abs(i - position)) * crabDict[i];
			// }

			Object.keys(crabDict).forEach(function(key) {
				totalPositionCost += incStepCalc(Math.abs(key - position)) * crabDict[key];
			});

			if(totalPositionCost < lowestFuelCost){
				lowestFuelCost = totalPositionCost;
				bestPosition = position;
			}
		}
		console.log(bestPosition);
		//process.stdout.write("\n");
		process.stdout.write("\n");
		console.log(lowestFuelCost);


	}
}

console.log("---Part 1---");
calculateMedianFuel();
console.log("---Part 2---");
// 212892967 is too high
calculateComplicatedFuel();
// console.log("---Big Boy 1---");
// calculateFish(9999999n);