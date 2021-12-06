let fs = require("fs");
// part 1
{
	//let input = fs.readFileSync("day02/inputa.txt").toString('utf-8');
	let input = fs.readFileSync("day02/bigboy.txt").toString('utf-8');
	input = input.split("\n");

	let horizontal = depth = 0;

	for(let i = 0; i < input.length; i++)
	{
		let line = input[i].split(" ");
		let direction = line[0];
		let amount = parseInt(line[1]);

		switch(direction){
			case "forward":
				horizontal += amount;
				break;
			case "down":
				depth += amount;
				break;
			case "up":
				depth -= amount;
				break;
		}

		//console.log(direction + " " + amount);
	}

	console.log("---Part 1---");
	console.log(horizontal * depth);
}

// part 2

{
	//let input = fs.readFileSync("day02/inputa.txt").toString('utf-8');
	let input = fs.readFileSync("day02/bigboy.txt").toString('utf-8');
	input = input.split("\n");

	let horizontal = depth = aim = 0;

	for(let i = 0; i < input.length; i++)
	{
		let line = input[i].split(" ");
		let direction = line[0];
		let amount = parseInt(line[1]);

		switch(direction){
			case "forward":
				horizontal += amount;
				depth += (aim * amount);
				break;
			case "down":
				aim += amount;
				break;
			case "up":
				aim -= amount;
				break;
		}

		//console.log(direction + " " + amount);
	}

	console.log("---Part 2---");
	console.log(horizontal * depth);
}