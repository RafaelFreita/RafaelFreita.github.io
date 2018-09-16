var formats = ['Ellipse', 'Rect', 'Triangle', 'Random'];

var ParticleSystem = function (position) {
  this.originX = position.copy().x;
  this.originY = position.copy().y;
  this.particles = [];
  this.formats = ['Ellipse', 'Rect', 'Triangle'];

  this.particlesPerUpdate = 1;

  this.control = new ParticleSystemControl();

  this.gui = new dat.GUI();

  this.systemFolder = this.gui.addFolder('System');
  
  this.positionFolder = this.systemFolder.addFolder('Position');
  this.positionFolder.add(this, 'originX', 0, width);
  this.positionFolder.add(this, 'originY', 0, height);

  this.systemFolder.add(this, 'particlesPerUpdate', 0, 10).step(1);

  this.particlesFolder = this.gui.addFolder('Particles');
  this.particlesFolder.add(this.control, 'size', 1, 300);
  this.particlesFolder.add(this.control, 'sizeLifetime');

  this.particlesFolder.add(this.control, 'lifespan', 0.01, 10);
  this.particlesFolder.add(this.control, 'format', formats);

  this.fillFolder = this.particlesFolder.addFolder('Fill');
  this.fillFolder.add(this.control, 'fill')
  this.fillFolder.addColor(this.control, 'fillColor');
  this.fillFolder.add(this.control, 'fillTransparency', 0, 1);
  this.fillFolder.add(this.control, 'fillLifetime');

  this.strokeFolder = this.particlesFolder.addFolder('Stroke');
  this.strokeFolder.add(this.control, 'stroke');
  this.strokeFolder.add(this.control, 'strokeWeight', 0, 1);
  this.strokeFolder.addColor(this.control, 'strokeColor');
  this.strokeFolder.add(this.control, 'strokeTransparency', 0, 1);
  this.strokeFolder.add(this.control, 'strokeLifetime');


};

ParticleSystem.prototype.addParticle = function () {

  for (var i = 0; i < this.particlesPerUpdate; i++) {

    var particleFormat = this.control.format;
    if (this.control.format === 'Random') {
      particleFormat = formats[Math.round(random(0, formats.length - 2))]
    }

    this.particles.push(new Particle(
      createVector(this.originX, this.originY),
      createVector(random(-2, 2), random(-2, 0)),
      p5.Vector.random2D().mult(0.1), {

        size: this.control.size,
        sizeLifetime: this.control.sizeLifetime,

        lifespan: this.control.lifespan,
        format: particleFormat,

        fill: this.control.fill,
        fillColor: this.control.fillColor,
        fillTransparency: this.control.fillTransparency,
        fillLifetime: this.control.fillLifetime,

        stroke: this.control.stroke,
        strokeWeight: this.control.strokeWeight,
        strokeColor: this.control.strokeColor,
        strokeTransparency: this.control.strokeTransparency,
        strokeLifetime: this.control.strokeLifetime,
      }
    ));

  }
};

ParticleSystem.prototype.run = function () {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};