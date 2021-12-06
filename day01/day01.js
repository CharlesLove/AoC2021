let fs = require("fs");

// part 1
{
	var lastMeasurement = NaN;
	var largerCount = 0;

	//var input = fs.readFileSync("day01/d01a_input.txt").toString('utf-8');
	var input = fs.readFileSync("day01/bigboy.txt").toString('utf-8');
	input = input.split("\n");

	for(let i = 0; i < input.length; i++)
	{
		let curInput = parseInt(input[i]);
		if(curInput > lastMeasurement)
		{
			largerCount += 1;
		}

		lastMeasurement = curInput;
	}
	console.log("---Part 1---");
	console.log(largerCount + " out of " + input.length);
}

// part 2

{
	var lastSum = NaN;
	var largerCount = 0;

	//var input = fs.readFileSync("day01/d01b_input.txt").toString('utf-8');
	var input = fs.readFileSync("day01/bigboy.txt").toString('utf-8');
	input = input.split("\n");

	for(let i = 2; i < input.length; i++)
	{
		let a = parseInt(input[i]);
		let b = parseInt(input[i - 1]);
		let c = parseInt(input[i - 2]);
		let sum = a + b + c;
		if(sum > lastSum)
		{
			largerCount += 1;
		}

		lastSum = sum;

	}
	
	console.log("---Part 2---");
	console.log(largerCount + " of " + input.length);
}
