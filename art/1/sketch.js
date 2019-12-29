const _frameRate = 60;
const deltaTime = 1 / _frameRate;

const iterations = 50 + Math.random() * 100;
let randomWalker;
const startingAngle = 0;
const startingDistance = Math.random() * 100;

let timeDelta = 1;
const speed = 3;
const timeScale = speed * (deltaTime / iterations);

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

function setup() {
	randomSeed(millis());

	createCanvas(600, 600);
	background(255);
	frameRate(_frameRate);

	noStroke();

	allColors =
		colorPalleteStrings[floor(random(0, colorPalleteStrings.length))];
	allColors = shuffle(allColors, false);

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
	this.radius = 80;

	this.angle = angle;
	this.distance = distance;
	this.delta = delta;

	this.iterations = iterations;
	this.renderItt = 0;
};

RandomWalker.prototype.update = function() {
	this.pos = createVector(
		cos(this.angle) * this.distance,
		sin(this.angle) * this.distance
	);
	this.angle += this.delta;
	this.distance += this.delta;
};

RandomWalker.prototype.render = function() {
	fill(colorPallete[this.renderItt % colorPallete.length]);

	ellipse(
		this.center.x + this.pos.x,
		this.center.y + this.pos.y,
		this.radius,
		this.radius
	);

	this.renderItt++;
};
