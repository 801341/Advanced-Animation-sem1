

function SnakeMover(x, y, dx, dy, rad, clr, n){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.rad = rad;
  // this.orbitAngle = Math.random() * Math.PI;
  this.clr = clr;
  this.segments = [];

  for(let i = 1; i < n; i++){
    //let a = i * (Math.PI * 2) / n + this.orbitAngle;
    //let angleVel = n * 0.01;
    // this.segments.push(new SnakeSegment(this, 4, 25, a, angleVel, this.clr));
    this.segments.push(new SnakeSegment(this, i, this.clr));

  }
}

SnakeMover.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();

  for(let i = 0; i < this.segments.length; i++){
    let orb = this.segments[i];
    orb.update();
    orb.render();
  }
}


SnakeMover.prototype.update = function(){
  if(!game.gamePaused){
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.loc.add(this.vel);
  }
}
  // this.vel.add(this.acc);
  // this.loc.add(this.vel);

//}

SnakeMover.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if (this.loc.x >= canvas.width) {
      this.loc.x = 0;
    } else if (this.loc.x <= 0) {
      this.loc.x = canvas.width;
    }
    if (this.loc.y >= canvas.height) {
      this.loc.y = 0;
    } else if (this.loc.y <= 0) {
      this.loc.y = canvas.height;
    }
}


SnakeMover.prototype.render = function(){
  let ctx = game.ctx;
  //let b = game.mover;
  // let orb = game.orbiters;
  // if(this === this.orbiters[0]){
    ctx.strokeStyle = 'rgba(400, 180, 500, .5)';
    ctx.fillStyle = 'rgba(400, 180, 500, .5)'; // pink
    //'rgba(400, 180, 500, .5)' - pink
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.rad, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
  }
