

function Mover(x, y, dx, dy, rad, clr, n){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.rad = rad;
  this.orbitAngle = Math.random() * Math.PI;
  this.clr = clr;
  this.orbiters = [];
  //this.lifeSpan = 1000;//693
  //this.isDead = false;

  for(let i = 0; i < n; i++){
    let a = i * (Math.PI * 2) / n + this.orbitAngle;
    let angleVel = n * 0.01;
    this.orbiters.push(new Orbiter(this, 4, 25, a, angleVel, this.clr));

  }
}

Mover.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();

  for(let i = 0; i < this.orbiters.length; i++){
    let orb = this.orbiters[i];
    orb.update();
    orb.render();
  }
}


Mover.prototype.update = function() {
  if (!game.gamePaused) {
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.loc.add(this.vel);

    if (this !== game.boids[0]) {
      let d = this.loc.distance(game.boids[0].loc);
      if (d < 100) {
        this.acc = JSVector.subGetNew(this.loc, game.boids[0].loc); // switch parameters to make it retraction or repulsion
        this.acc.normalize();
        this.acc.multiply(0.05);
      }
    }
  }



  // if (!game.gamePaused) {
  //   this.vel.add(this.acc);
  //   this.vel.limit(3);
  //   this.loc.add(this.vel);
  // }


//   this.lifeSpan--;
//   if(this.lifeSpan === 0) {
//     this.isDead = true;
//  }
//   for (let i = 0; i < game.movers.length; i++) {
//     let count = 0;
//    let scale = 4;
//     let d = this.loc.distance(game.movers[i].loc);
//     if (d > 0.0 && d < scale) {
//       if(count === 10 || count === 30) {
//         this.lifeSpan = this.lifeSpan - 50;
//        scale = scale - 0.5;
//      }
//      game.createMover(game.canvas);
//      this.lifeSpan++;
//       count++;
//    }
//}

  //this.lifeSpan--;
 //  if(this.lifeSpan === 0) {
 //    this.isDead = true;
 // }
 //  for (let i = 0; i < game.movers.length; i++) {
 //    let count = 0;
 //   let scale = 4;
 //    let d = this.loc.distance(game.movers[i].loc);
 //    if (d > 0.0 && d < scale) {
 //      if(count < 11) {
 //        game.createMover(game.canvas);
 //        count = count + 1;
 //     }
 //     //this.lifeSpan++;
 //   }
 //  }
 }



Mover.prototype.checkEdges = function(){
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


Mover.prototype.render = function(){
  let ctx = game.ctx;
  let b = game.mover;
  // let orb = game.orbiters;
  // if(this === this.orbiters[0]){
    ctx.strokeStyle = 'rgb(213,104,233)';
    ctx.fillStyle = 'rgb(213,104,233,.5)'; // pink
    //'rgba(400, 180, 500, .5)' - pink
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.rad, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
  }
