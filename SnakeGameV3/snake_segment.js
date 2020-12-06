
function SnakeSegment(snakeHead, segNum, clr){
  this.snake = snakeHead;
  this.rad = 6 - (segNum/1.5);
  //this.rotator = new JSVector(orbitRad, 0);
  //this.rotator.setDirection(angle);

  this.delta = this.snake.vel.copy().multiply(-segNum * 9.0 / this.snake.vel.getMagnitude());
  //this.delta = this.snake.vel.copy().normalize().multiply(-segNum * 4);
  this.loc = JSVector.addGetNew(this.snake.loc, this.delta);
  //this.loc = JSVector.addGetNew(this.snake.loc, this.snake.loc);
  this.clr = clr;
}

SnakeSegment.prototype.update = function(){
  //this.rotator.rotate(this.angleVel);
  this.loc = JSVector.addGetNew(this.snake.loc, this.delta);
}

SnakeSegment.prototype.render = function(){
  let ctx = game.ctx;

  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill(); //hi

  // ctx.lineCap = "round";
  // ctx.lineWidth = 4;
  // ctx.beginPath();
  // ctx.moveTo(this.snake.loc.x, this.snake.loc.y);
  // ctx.lineTo(this.loc.x, this.loc.y);
  // ctx.stroke();

}
