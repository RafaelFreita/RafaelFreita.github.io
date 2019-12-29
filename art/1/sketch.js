function getRandomBool(chance = 0.5) {
	return Math.random() <= chance;
}

const _frameRate = 60;
const deltaTime = 1 / _frameRate;

const iterations = 50 + Math.random() * 100;
let randomWalker;
const startingAngle = 0;
const startingDistance = 20 + Math.random() * 100;

const modeCounts = 2;
const mode = Math.floor(Math.random() * modeCounts);
const increaseSize = getRandomBool();

const minRad = 20;
const maxRad = 80;
const currentRad = minRad + Math.random() * (maxRad - minRad);

// --- COLORS ---
let allColors = [];
const colorPallete = [];

const colorPalleteStrings = [
	['#0424D9', '#031CA6', '#03178C', '#020F59', '#3DADF2'],
	['#BF1736', '#0D1440', '#1438A6', '#0E2773', '#1455D9'],
	['#F205CB', '#7C05F2', '#6204BF', '#050259', '#F23827'],
	['#F2167D', '#049DD9', '#05C7F2', '#F2C641', '#F2865E']
];
// --- END COLORS ---

const cosMod = 1 + Math.floor(Math.random() * 3);
const sinMod = 1 + Math.floor(Math.random() * 3);

const moveRight = getRandomBool();

let timeDelta = 1;
const speed = (3 - (cosMod + sinMod) / 3) * (moveRight ? 1 : -1);
const timeScale = speed * (deltaTime / iterations);

function setup() {
	randomSeed(millis());

	createCanvas(600, 600);
	background(255);
	frameRate(_frameRate);

	allColors =
		colorPalleteStrings[floor(random(0, colorPalleteStrings.length))];
	allColors = shuffle(allColors, false);

	if (getRandomBool()) {
		// NO STROKE
		noStroke();
	} else {
		// STROKE
		if (getRandomBool()) {
			// DEFAULT COLOR
			if (getRandomBool()) {
				// WHITE
				stroke(255);
			} else {
				// BLACK
				stroke(0);
			}
		} else {
			// GET COLOR FROM PALLETE
			stroke(allColors[allColors.length - 1]);
		}
	}

	//createLoop({duration:10, gif:true})
}

function draw() {
	background(allColors[allColors.length - 1]);

	if (frameCount % 60 === 1) {
		colorPallete.push(
			allColors[colorPallete.length % (allColors.length - 1)]
		);
	}

	randomWalker = new RandomWalker(
		width / 2,
		height / 2,
		iterations,
		startingAngle,
		startingDistance,
		timeDelta
	);

	for (let i = 0; i < randomWalker.iterations; i++) {
		randomWalker.update();
		randomWalker.render();
	}

	timeDelta += timeScale;
}

function keyPressed() {
	if (keyCode === ENTER) {
		saveCanvas('canvas', 'png');
	}
}

const RandomWalker = function(
	centerX,
	centerY,
	iterations,
	angle,
	distance,
	delta
) {
	this.center = createVector(centerX, centerY);
	this.pos = createVector(0, 0);
	this.radius = currentRad;

	this.angle = angle;
	this.distance = distance;
	this.delta = delta;

	this.iterations = iterations;
	this.renderItt = 0;
};

RandomWalker.prototype.update = function() {
	this.pos = createVector(
		cos(this.angle * cosMod) * this.distance,
		sin(this.angle * sinMod) * this.distance
	);
	this.angle += this.delta;

	if (increaseSize) this.distance += this.delta;
};

RandomWalker.prototype.render = function() {
	fill(colorPallete[this.renderItt % colorPallete.length]);

	const x = this.center.x + this.pos.x;
	const y = this.center.y + this.pos.y;
	const r = this.radius;

	switch (mode) {
		case 0:
			ellipse(x, y, r);
			break;
		case 1:
			rect(x - r / 2, y - r / 2, r, r);
			break;
	}

	this.renderItt++;
};
