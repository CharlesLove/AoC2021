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
function calculatePartTwo(){
	let curPanel, outputPanel, inputPanel;
	let partOneDigitCount = 0;
	for(let i = 0; i < input.length / input.length; i++){
		let topleft, top, topright, middle, bottomleft, bottom, bottomright;

		curPanel = input[i].split(" | ");
		inputPanel = curPanel[0].split(" ");
		outputPanel = curPanel[1].split(" ");
		//console.log(inputPanel);

		let numArray = new Array(10);
		let fiveSegs = [];
		let sixSegs = [];

		let allDigits = [];

		inputPanel.forEach(display => {
			let segCount = display.length;

			allDigits.push(display.split(''));

			// get unique digits
			switch (segCount) {
				case 2: // 1
					numArray[1] = display.split('');
					break;
				case 4: // 4
					numArray[4] = display.split('');
					break;
				case 3: // 7
					numArray[7] = display.split('');
					break;
				case 7: // 8
					numArray[8] = display.split('');
					break;
				
				case 5: // 2,3,5
					fiveSegs.push(display.split(''));
					break;
				
				case 6: // 0,6,9
					sixSegs.push(display.split(''));
					break;
			
				default:
					break;
			}
		});
		//console.log(allDigits);

		// attempt to find the 5 segment digits
		fiveSegs.forEach(fDigit => {
			let intersectionCount = 0;
			allDigits.forEach(aDigits => {
				let intersection = aDigits.filter(x => fDigit.includes(x));
				if(intersection.length === 5){
					intersectionCount++;
				}
			});

			if(intersectionCount === 3){
				numArray[5] = fDigit;
			}
			else if(fDigit !== numArray[3]){
				numArray[2] = fDigit;
			}
		});

		// attempt to find the 6 segment digits
		sixSegs.forEach(sDigit => {
			let intersectionCount = 0;
			allDigits.forEach(aDigits => {
				let intersection = aDigits.filter(x => sDigit.includes(x));
				if(intersection.length === 5){
					intersectionCount++;
				}
			});

			if(intersectionCount === 3){
				numArray[5] = sDigit;
			}
			else if(fDigit !== numArray[3]){
				numArray[2] = sDigit;
			}
		});

		for (let i = 0; i < numArray.length; i++) {
			console.log(i + ": " + numArray[i]);
			
		}
	}
}


console.log("---Part 1---");
calculatePartOne();
console.log("---Part 2---");
calculatePartTwo();