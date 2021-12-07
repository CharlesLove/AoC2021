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
		filename = "day07/big.boy";
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

	Object.keys(crabDict).forEach(function(key) {
		fuel += Math.abs((key - median) * crabDict[key]);
	});

	console.log(fuel.toString());
}

function calculateComplicatedFuel()
{
	let input = fs.readFileSync(filename).toString('utf-8');
	input = input.split(",").map(Number);
	
	input.sort(numSort);

	let incStepCache = new Object();

	if(isSmart == 1) smartFuelCalc();
	else naiveFuelCalc();

	function incStepCalc(steps){
		let stepCost = 0;

		if(incStepCache[steps] !== undefined){
			return incStepCache[steps];
		}

		
		if(incStepCache[steps - 1] !== undefined){
			stepCost += incStepCache[steps - 1] + steps;
		}
		else{
			for(let i = 0; i < steps; i++)
			{
				stepCost += i + 1;
			}
		}

		incStepCache[steps] = stepCost;
		return stepCost;
	}

	function smartFuelCalc(){
		console.log("--Smart calculation--")

		let sum = 0;
		let minimum = input[0];
		let maximum = input[input.length - 1];
	
		for(let i = 0; i < input.length; i++)
		{
			sum += input[i];
		}
	
		let average = sum / input.length;

		crabDict = new Object();
		
		for(let i = 0; i < input.length; i++)
		{
			if(crabDict[input[i]] == undefined) crabDict[input[i]] = 1;
			else crabDict[input[i]] += 1;
		}
		
		let fuel = -1n;
		
		let floorAverage = Math.floor(average);
		let ceilAverage = Math.ceil(average);

		if(Number.isInteger(average)){
			calcLowestFuel(average);
		}
		else{
			calcLowestFuel(floorAverage);
			calcLowestFuel(ceilAverage);
		} 
		console.log(fuel.toString());

		
		function calcLowestFuel(newPlace)
		{
			let roundedFuel = 0n;
			Object.keys(crabDict).forEach(function(key) {
				roundedFuel += BigInt(incStepCalc(Math.abs(key - newPlace)) * crabDict[key]);
			});

			if(roundedFuel < fuel || fuel === -1n) fuel = roundedFuel;
		}
	}

	function naiveFuelCalc(){
		console.log("--Naive Calculation--")
		let minimum = input[0];
		let maximum = input[input.length - 1];
		let bestPosition = minimum;
		let lowestFuelCost = -1n;

		crabDict = new Object();
	
		for(let i = 0; i < input.length; i++)
		{
			if(crabDict[input[i]] == undefined) crabDict[input[i]] = 1;
			else crabDict[input[i]] += 1;
		}

		for(let position = minimum; position <= maximum; position++){
			let totalPositionCost = 0n;

			Object.keys(crabDict).forEach(function(key) {
				totalPositionCost += BigInt(incStepCalc(Math.abs(key - position)) * crabDict[key]);
			});

			if(totalPositionCost < lowestFuelCost || lowestFuelCost === -1n){
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
calculateComplicatedFuel();