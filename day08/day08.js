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
		filename = "day08/test_input.txt";
		break;
	case 1:
		filename = "day08/input.txt";
		break;
	case 2:
		filename = "day08/big.boy";
		break;
}


console.log("---- Running: " + filename + " ----");

function numSort(a,b) { return (+a) - (+b);}

let incStepCache = new Object();
let input = fs.readFileSync(filename).toString('utf-8');
input = input.split("\n");
input = input.filter(e => e);

//input.sort(numSort);
//console.log(input);

function calculatePartOne(){
	let curPanel, outputPanel;
	let partOneDigitCount = 0;
	for(let i = 0; i < input.length; i++){
		curPanel = input[i].split(" | ");
		outputPanel = curPanel[1].split(" ");
		//console.log(outputPanel);

		outputPanel.forEach(display => {
			let segCount = display.length;

			switch (segCount) {
				case 2: // two
					partOneDigitCount++;
					break;
				case 4: // three
					partOneDigitCount++;
					break;
				case 3: // seven
					partOneDigitCount++;
					break;
				case 7: // eight
					partOneDigitCount++;
					break;
			
				default:
					break;
			}
		});
	}
	console.log(partOneDigitCount);
}


console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
//calculateComplicatedFuel();