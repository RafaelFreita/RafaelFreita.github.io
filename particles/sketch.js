var system;

function setup() {
  createCanvas(720, 400);
  
	system = new ParticleSystem(createVector(width/2, height/2));
}

function draw() {
  background(51);
  noStroke();
  system.addParticle();
  system.run();
  
}