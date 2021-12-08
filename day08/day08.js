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
		filename = "day08/small_test_input.txt";
		break;
	case 1:
		filename = "day08/test_input.txt";
		break;
	case 2:
		filename = "day08/input.txt";
		break;
	case 3:
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
function calculatePartTwo_Old(){
	let curPanel, outputPanel, inputPanel;
	let partOneDigitCount = 0;
	for(let i = 0; i < input.length; i++){
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
				numArray[3] = fDigit;
			}
			else if(fDigit !== numArray[3]){
				numArray[2] = fDigit;
			}
			else{
				numArray[5] = fDigit;
			}
		});

		// attempt to find 9

		// attempt to find the 6 segment digits
		// sixSegs.forEach(sDigit => {
		// 	let intersectionCount = 0;
		// 	let differenceCount = 0;
		// 	allDigits.forEach(aDigits => {
		// 		let intersection = aDigits.filter(x => sDigit.includes(x));
		// 		let difference = aDigits.filter(x => !sDigit.includes(x))
		// 		if(intersection.length === 5){
		// 			intersectionCount++;
		// 		}
		// 	});

		// 	if(intersectionCount === 3){
		// 		numArray[5] = sDigit;
		// 	}
		// 	else if(fDigit !== numArray[3]){
		// 		numArray[2] = sDigit;
		// 	}
		// });

		for (let i = 0; i < numArray.length; i++) {
			console.log(i + ": " + numArray[i]);
			
		}
	}
}

function calculatePartTwo(){
	let curPanel, outputPanel, inputPanel;

	let checker = (arr, target) => target.every(v => arr.includes(v));

	for(let i = 0; i < input.length; i++){

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

		console.log("Five Segs");
		// determine how often one of the five segments is included in everything else
		fiveSegs.forEach(fiveDigitNumber => {
			let totalUses = 0;
			let intersection = [];
			//console.log(fiveDigitNumber + "\n");
			//fiveDigitNumber = fiveDigitNumber.sort();
			//console.log(fiveDigitNumber + "\n");
			//console.log(fiveDigitNumber + "\n");

			allDigits.forEach(allNumber => {
				//allNumber = allNumber.sort();
				//console.log(allNumber);
				if(checker(allNumber, fiveDigitNumber)){
					totalUses++;
					console.log(allNumber);
				}
			});

			//console.log(totalUses);

			switch (totalUses) {
				case 2:
					numArray[2] = fiveDigitNumber;
					break;
				case 3:
					numArray[3] = fiveDigitNumber;
					break;
				case 4:
					numArray[5] = fiveDigitNumber;
					break;
				default:
					break;
			}

		});

		console.log("Six Segs:");
		// determine how often one of the six segments is included in everything else
		sixSegs.forEach(sixDigitNumber => {
			console.log(sixDigitNumber + "\n");

			// SO CLOSE!!!!!
			if(checker(sixDigitNumber, numArray[2])){
				numArray[0] = sixDigitNumber;
			}
			// else if(checker(numArray[1].concat(numArray[5]))){
			// 	numArray[9]
			// }
			// else{
			// 	numArray[6]
			// }

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