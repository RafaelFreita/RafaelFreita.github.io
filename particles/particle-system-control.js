var ParticleSystemControl = function () {

  this.size = 40;
  this.sizeLifetime = true;

  this.lifespan = 3;
  this.format = 'Ellipse';
  
  this.fill = true;
  this.fillColor = [255, 0, 0];
  this.fillTransparency = 1;
  this.fillLifetime = false;
  
  this.stroke = true;
  this.strokeWeight = 0.1;
  this.strokeColor = [255, 255, 255]
  this.strokeTransparency = 0.5;
  this.strokeLifetime = false;
  
};