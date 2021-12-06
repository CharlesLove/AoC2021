// this script attempts to guess what the final result will be purely on what the original data set is
let fs = require("fs");

// 5 starting fish with test_input
// after 18 days, 26 fish
// after 80 days, 5934 fish

// 18days = 1four +2threes + 1two + 1one
// time till new fish
// 4days for 1 fish
// 3days for 2 fish
// 2days for 1 fish
// 1days for 1 fish

// in 18 days how many will each produce
// 1x4: 
// (4 + 6 + 2 + 1) * 18 

// floor(13 * 18 / 8 - (5 / 2))
// this math only works for 18 days and the original set (useless)
//let smallerTotal = Math.floor(magicTotal * 80 / 8 - (initialTotal / 2));
//console.log(smallerTotal);

// try calculating what each individual counter amount would end up with
// 0
// each 0 would create


let input = ['3','4','3','1','2'];

let templateDict = new Object;
let initialFishDict = new Object;

function calculateFish(inDays)
{
	//let input = fs.readFileSync(filename).toString('utf-8');
	//input = input.split(",");

	let fishDict = new Object();
	let totalFish = BigInt(input.length);

	// set initial fishDict
	for(let i = 0; i < 9; i++){
		fishDict[i] = 0n;
	}
	templateDict = Object.assign(Object,fishDict);

	// fill fish dict
	for(let i = 0; i < input.length; i++)
	{
		let curTime = parseInt(input[i]);
		fishDict[curTime]++;
	}

	initialFishDict = Object.assign(Object,fishDict);

	// iterate through the days
	for(let d = 0; d < inDays; d++)
	{
		let newFishCount = 0n;
		//console.log("--After " + (d+1) + " day(s)--");

		for(let f = 0; f < 9; f++)
		{
			if(f === 0)
			{
				newFishCount = fishDict[0];
				fishDict[0] = 0n;
			}
			else
			{
				fishDict[f - 1] = fishDict[f];
			}
		}

		fishDict[8] = newFishCount;
		fishDict[6] += newFishCount;
		totalFish += newFishCount;
	}
	//console.log(fishDict);
	
	console.log("Total Fish (correct): " + totalFish);
	console.log(fishDict);
}

let days = 9n;
let newFish = 0n;
let semiFinalFishDict = templateDict;
calculateFish(days);

console.log(initialFishDict);

for(let i = 0n; i < 9n; i++)
{
	newFish += (days / (i + 1n)) * initialFishDict[i];
}

// should be 6 for 9 days
console.log(newFish);

// after 9 days a new fish with timer 6 is created

// new strategy, calculate how many 6s will be created
// calculate 6s at end

