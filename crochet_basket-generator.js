//SETUP
var rows = prompt("How many rows do you want in your basket's base?", "Enter a number"),
	natl = prompt("Do you use UK or US terminology?", "UK or US?"),
	natl = natl.toLowerCase(),
	st,
	ch;

//NATIONALITY
if (natl === "uk") {
	st = prompt("Will you be using htr or tr?");
	if (st === "htr") {
		ch = 2;
	} else if (st === "tr") {
		ch = 3;
	}
} else if (natl === "us") {
	st = prompt("Will you be using hdc or dc?");
	if (st === "hdc") {
		ch = 2;
	} else if (st === "dc") {
		ch = 3;
	}
}

// FINISHING
var edge = prompt("Do you want your basket bottom to have a hard or soft edge?", "Hard or soft?"),
	edge = edge.toLowerCase(),
	rim = prompt ("Do you want your basket's rim plain, folded over, or with handles?", "Plain, folded, or handles?"),
	rim = rim.toLowerCase();

if (rim === "handles") {
	var handlength = prompt("About how many stitches long do you want your handles to be?", "Enter a number");
}




// BASE
function basketMaker() {
	var instructions = [],
		ringRatio = [],
		total,
		foldIncrease;

	for (var row = 0; row <= rows; ++row) {

		// start the circle
		if (row === 0) {
			instructions += "Start:\nTie a slip knot\nch 4\nJoin with sl st\n\n";
			total = 4;
		}

		// rows 1 & 2
		if (row === 1) {
			instructions += "Row 1:\nch " + ch + "\n" + st + " 11 into ring\nJoin with sl st\n\n";
			total = 12;
			++row;
		}
		if (row === 2) {
			instructions += "Row 2:\nch " + ch + "\n" + st + " once into same stitch.\nStarting with next stitch, " + st + " twice into each stich for 23 stitches\nJoin with sl st\n\n";
			total = 24;
			++row;
		}

		//rows 4+
		if (row > 2) {

			// set total number of stitches this row
			total = (row) * 12 - 1;

			// set stitch pattern
			ringRatio.length = row - 1;
			for (var ratioCount = 0; ratioCount < ringRatio.length; ++ratioCount) {
				ringRatio[ratioCount] = st + " 1";
			}
			ringRatio[ringRatio.length - 2] = st + " 2";
			foldIncrease = ringRatio.slice();
			ratioString = ringRatio.join(", ");

			// add pattern to instructions
			instructions += "Row " + row + ":\nch " + ch; //print step number and 1st step
			instructions += "\nStarting with the next stitch, " + ratioString + " for " + total + " stitches\nJoin with sl st\n\n";
		}
	}



// SIDES
	instructions += "Side 1:\n";
	instructions += "ch " + ch + "\nStarting with the next stitch, ";
	if (edge === "hard") {
		instructions += "in either front OR back loops ONLY, ";
	}
	instructions += st + " for " + total + " stitches\nJoin with sl st\n\n";
	instructions += "Side 2 (optional):\nTurn\n\n";
	instructions += "Side 3:\nRepeat Side 1 until basket sides reach desired height\n\n";



// RIM
	instructions += "Rim 1:\n";
	if (rim === "folded") {									// FOLDED RIM
		// ADD 1 MORE ROW TO BASE PATTERN
		++row;
		console.log(foldIncrease);
		foldIncrease.unshift(st + " 1");
		foldIncrease = foldIncrease.join(", ");
		total += 12;
		instructions += "\nch " + ch;
		instructions += "\nStarting with the next stitch, " + foldIncrease + " for " + total + " stitches\nJoin with sl st\n\n";
		// FINISH RIM
		instructions += "Rim 2:\n" + "ch" + ch + "\nStarting with the next stitch, " + st + " for " + total + " stitches\nJoin with sl st\n\n";
		instructions += "Rim 3:\nRepeat Rim 2 until fold reaches desired length\n\n";

	} else if (rim === "handles") {							// HANDLED RIM
		// MAKES SURE HANDLE LENGTH ISN'T TOO LONG
		if (handlength > Math.ceil(total/2)) {
			handlength = Math.ceil((total - 2)/2);
			instructions += "*Note: Desired handle length is too long and has been shortened to half the basket's circumference\nI suggest you choose a shorter length\n\n";
		}
		// ADDS HANDLES
		var spacer = Math.ceil((total - (handlength * 2))/2);
		if (spacer > 1) {
			instructions += "ch " + ch + "\nStarting with the next stitch, " + st + " for " + Math.floor(spacer/2) + " stitches\n";
			instructions += "ch " + handlength + " and skip " + handlength + " stitches\n";
			instructions += st + " for " + spacer + " stitches\n";
			instructions += "ch " + handlength + " and skip " + handlength + " stitches\n";
			instructions += st + " for " + (Math.floor(spacer/2) - 1) + " stitches\n";		// 1 less than spacer total
			instructions += "Join with sl st\n\n";
		} else {
			instructions += "ch " + handlength + " and skip " + handlength + " stitches\n";
			instructions += st + " 1\n";
			instructions += "ch " + handlength + " and skip " + handlength + " stitches\n";
			instructions += "Join with sl st\n\n";
		}
		instructions += "Rim 2:\n";
		instructions += "ch " + ch + "\nStarting with the next stitch, " + st + " for " + total + " stitches\n";
		instructions += "Join with sl st\n\n";

	}

	instructions += "Fasten off and weave in ends. Celebrate!"; // FINISHING BASKET!!


	return instructions;
}


console.log(basketMaker());