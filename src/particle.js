var Particle = function (pos, vel, acc, opts = {}) {
  this.position = pos.copy();
  this.velocity = vel.copy();
  this.acceleration = acc.copy();

  // Custom optional options
  this.size = opts.size || 10;
  this.sizeLifetime = opts.sizeLifetime || false;

  this.lifespan = opts.lifespan || 5;
  this.format = opts.format || "Ellipse";

  this.fill = opts.fill || true;
  this.fillColor = opts.fillColor || [255, 0, 0];
  this.fillTransparency = (opts.fillTransparency !== undefined) ? opts.fillTransparency : 1;
  this.fillLifetime = opts.fillLifetime || false;

  this.stroke = opts.stroke || true;
  this.strokeWeight = (opts.strokeWeight !== undefined) ? opts.strokeWeight * opts.size : 1;
  this.strokeColor = opts.strokeColor || [255, 255, 255];
  this.strokeTransparency = (opts.strokeTransparency !== undefined) ? opts.strokeTransparency : 1;
  this.strokeLifetime = opts.strokeLifetime || false;

  // Setting fill and stroke
  this.fillColor = color(this.fillColor[0], this.fillColor[1], this.fillColor[2], this.fillTransparency * 255);
  this.strokeColor = color(this.strokeColor[0], this.strokeColor[1], this.strokeColor[2], this.strokeTransparency * 255);

  // Utilities

  this.lifetime = 0;
  this.initialSize = this.size;
  // Used for parameters that change with lifetime
  this.invertAge = 1;
};

Particle.prototype.run = function () {
  this.update();
  this.display();
};

Particle.prototype.update = function () {
  var dt = frameRate() / 1000;
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifetime += dt;

  this.invertAge = (1 - (this.lifetime / this.lifespan));
  var invertAge255 = this.invertAge * 255;

  if (this.fillLifetime === true) {
    this.fillColor.setAlpha(this.fillTransparency * invertAge255);
  }

  if (this.strokeLifetime === true) {
    this.strokeColor.setAlpha(this.strokeTransparency * invertAge255);
  }

  if (this.sizeLifetime === true) {
    this.size = this.initialSize * this.invertAge;
  }
};

Particle.prototype.isDead = function () {
  return this.lifetime >= this.lifespan;
}

Particle.prototype.display = function () {
  if (this.stroke) {
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeight);
  } else {
    noStroke();
  }

  if (this.fill) {
    fill(this.fillColor);
  } else {
    noFill();
  }

  if (this.format === "Ellipse") {
    ellipse(this.position.x, this.position.y, this.size, this.size);
  } else if (this.format === 'Rect') {
    rect(this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
  } else if (this.format === 'Triangle') {
    triangle(
      this.position.x - this.size / 2, this.position.y + this.size / 2,
      this.position.x + this.size / 2, this.position.y + this.size / 2,
      this.position.x, this.position.y - this.size / 2);
  }
}