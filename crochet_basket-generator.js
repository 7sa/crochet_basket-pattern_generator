//SETUP
var rows = prompt("How many rows do you want in your basket's base?", "Enter a number"),
	natl = prompt("Do you use UK or US terminology?", "UK or US?").toLowerCase(),
	st,
	ch,
	handlength;

if (rim === "handles") {
	handlength = prompt("About how many stitches long do you want your handles to be?", "Enter a number");
}

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
var edge = prompt("Do you want your basket to have a hard or soft edge?", "Hard or soft?").toLowerCase(),
	rim = prompt ("Do you want your basket's rim plain, folded over, or with handles?", "Plain, folded, or handles?").toLowerCase();



// BASE
function basketMaker() {
	var instructions = [],
		ringRatio = [],
		total,
		foldIncrease;

	for (var row = 1; row <= rows; ++row) {

		// start the circle
		if (row === 1) {
			instructions += "Row 1:\nTie a slip knot\nch 4\nJoin with sl st\n\n";
			total = 4;
		}

		// rows 2 & 3
		if (row === 2) {
			instructions += "Row 2:\nch " + ch + "\n" + st + " 11 into ring\nJoin with sl st\n\n";
			total = 12;
			++row;
		}
		if (row === 3) {
			instructions += "Row 3:\nch " + ch + "\n" + st + " once into same stitch.\nStarting with next stitch, " + st + " twice into each stich for 23 stitches\nJoin with sl st\n\n";
			total = 24;
			++row;
		}

		//rows 4+
		if (row > 3) {

			// set total number of stitches this row
			total = (row - 1) * 12 - 1;

			// set stitch pattern
			ringRatio.length = row - 2;
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
	if (edge === "hard") {
		instructions += "In either front or back loops only, ch ";
	}
	instructions += ch + "\nStarting with the next stitch, " + st + " for " + total + " stitches\nJoin with sl st\n\n";
	instructions += "Side 2 (optional):\nTurn\n\n";
	instructions += "Side 3:\nRepeat Side 1 until basket sides reach desired height\n\n";



// RIM
	instructions += "Rim 1:\n";
	if (rim === "folded") {									// FOLDED RIM
		// ADD 1 MORE ROW TO BASE PATTERN
		++row;
		foldIncrease.unshift(st + " 1");
		foldIncrease = foldIncrease.join(", ");
		total += 12;
		instructions += "\nch " + ch;
		instructions += "\nStarting with the next stitch, " + foldIncrease + " for " + total + " stitches\nJoin with sl st\n\n";
		// FINISH RIM
		instructions += "Rim 2:\n" + "ch" + ch + "\nStarting with the next stitch, " + st + " for " + total + " stitches\nJoin with sl st\n\n";
		instructions += "Rim 3:\nRepeat Rim 2 until fold reaches desired length\n\n";
	} else if (rim === "handles") {

	}

	instructions += "Fasten off and weave in ends. Celebrate!"; // FINISHING BASKET!!



// RETURN EVERYTHING!!
	return instructions;
}


console.log(basketMaker());