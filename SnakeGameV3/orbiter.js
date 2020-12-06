function Orbiter(mover, orbiterRad, orbitRad, angle, angleVel, clr){
  this.mover = mover;
  this.rad = orbiterRad;
  this.rotator = new JSVector(orbitRad, 0);
  this.rotator.setDirection(angle);
  this.loc = JSVector.addGetNew(this.mover.loc, this.rotator);
  this.angleVel = angleVel;
  this.clr = clr;

}

Orbiter.prototype.update = function(){
  this.rotator.rotate(this.angleVel);
  this.loc = JSVector.addGetNew(this.mover.loc, this.rotator);
}

Orbiter.prototype.render = function(){
  let ctx = game.ctx;

  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();

  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(this.mover.loc.x, this.mover.loc.y);
  ctx.lineTo(this.loc.x, this.loc.y);
  ctx.stroke();

}
