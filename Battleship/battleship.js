/** Battle ship Game
*/

var controller = {
	numShips: 3,
	shipLength: 3,
	gridWidth: 7,
	gridHeight: 7,
	numOfHits: 0,
	shipLoc: [ 	{ships: [0, 0, 0], hits: ["", "", ""]},
				{ships: [0, 0, 0], hits: ["", "", ""]},
				{ships: [0, 0, 0], hits: ["", "", ""]} ],

	processGuess: function(guess) {
		console.log(this.shipLength);
	},

// Uses a do while loop where as long as collisions matches, it returns true
// and the loop keeps on running.
	generator: function() {
		var i = 0, arrTest;
		while (i < this.numShips) {
			do {
				arrTest = this.generateShip();
			} while (this.collisions(arrTest));
			this.shipLoc[i].ships = arrTest;
			i++;
		}

		return "";
	},

//Generates an array locations
	generateShip: function() {
		var x, y, dirc, loc1, loc2, loc3, i = 0;
		var locations = [];

		x = Math.floor(Math.random() * (this.gridWidth - this.shipLength + 2));
		y = Math.floor(Math.random() * (this.gridWidth - this.shipLength + 2));
		loc1 = x.toString() + y.toString();
		dir = Math.floor(Math.random() * 2);	

		if (dir == 0) {
			for (var j = 0; j < this.shipLength; j++) {
				locations.push( (x + j) + "" + y);
			}
		} else {
			for (var j = 0; j < this.shipLength; j++) {
				locations.push( x + "" + (y+ j) );
			}
		}

		return locations; 
	},

//Tests arr if it a location in controller.shipLoc already exists.
//Directly searches with indexOf of the object so don't let this be arr.
	collisions: function(arr) {
		for (var j = 0; j < this.numShips; j++) {
			var loc = this.shipLoc[j];
			for (var k = 0; k < this.shipLength; k++) {
				if (loc.ships.indexOf(arr[k]) >= 0)
					return true;
			}
		}

		return false;
	}
};

function msg(message) {
	var msgArea = document.getElementById("messageArea");
	msgArea.innerHTML = message;
}

function hitOrMiss(value) {
	var index;
	var shipObj = controller.shipLoc;
	for (var i = 0; i < controller.numShips; i++) {
		console.log(shipObj[i].ships);
		if ((index = shipObj[i].ships.indexOf(value)) >= 0) {
			if (shipObj[i].hits[index] == true) {
				msg("You have already hit this location!");
				return value;
			} else {
				msg("Hit!");
				shipObj[i].hits[index] = true;
				return value;
			}
		} else {
			msg("MISS!");
		}
	}
}

function onLoadFunction() {	
	var buttonLoc = document.getElementById("guessInput");
	var msgArea = document.getElementById("messageArea");
	var clickLoc = document.getElementById("fireButton");

	function uponClick() {
		console.log(buttonLoc.value);
		buttonLoc.value = "";
	};

	function ifEnter(key) {
		if (key.keyCode === 13) {
			clickLoc.click();
			return false;
		}
	}

	clickLoc.onclick =	uponClick;

	buttonLoc.onkeypress = ifEnter;

	controller.generator();
};

window.onload = onLoadFunction;