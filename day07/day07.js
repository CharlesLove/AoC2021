// Run something similar to this for better time keeping
// time node day06/day06_grid.js 3

// try using node's readline feature next time to prevent needing to store the entire
// .txt in memory

let fs = require("fs");
var myArgs = process.argv.slice(2);
let filename = "";

let filePicker = parseInt(myArgs[0]);

switch(filePicker){
	case 0:
		filename = "day07/test_input.txt";
		break;
	case 1:
		filename = "day07/input.txt";
		break;
}


console.log("---- Running: " + filename + " ----");

function numSort(a,b) { return (+a) - (+b);}

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

	for(let i = minimum; i <= maximum; i++)
	{
		if(crabDict[i] == undefined) continue;
		fuel += Math.abs((i - median) * crabDict[i]);
	}

	console.log(fuel);
}

function calculateComplicatedFuel()
{
	let input = fs.readFileSync(filename).toString('utf-8');
	input = input.split(",").map(Number);
	
	input.sort(numSort);
	//console.log(input);

	//smartFuelCalc();
	naiveFuelCalc();

	function incStepCalc(steps){
		let stepCost = 0;

		for(let i = 0; i < steps; i++)
		{
			stepCost += i + 1;
		}

		return stepCost;
	}

	// only works for test_input
	function smartFuelCalc(){
		let sum = 0;
		let minimum = input[0];
		let maximum = input[input.length - 1];
	
		for(let i = 0; i < input.length; i++)
		{
			sum += input[i];
		}
	
		let average = Math.ceil(sum / input.length);
	
		let newPlace = average;
	
		crabDict = new Object();
	
		for(let i = 0; i < input.length; i++)
		{
			if(crabDict[input[i]] == undefined) crabDict[input[i]] = 1;
			else crabDict[input[i]] += 1;
		}

		let fuel = 0;

		for(let i = minimum; i <= maximum; i++)
		{
			if(crabDict[i] == undefined) continue;
			fuel += incStepCalc(Math.abs(i - newPlace)) * crabDict[i];
		}
		console.log(fuel);
	}

	function naiveFuelCalc(){
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

			for(let i = minimum; i <= maximum; i++){
				if(crabDict[i] == undefined) continue;
				totalPositionCost += incStepCalc(Math.abs(i - position)) * crabDict[i];
			}

			if(totalPositionCost < lowestFuelCost){
				lowestFuelCost = totalPositionCost;
				bestPosition = position;
			}
		}
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