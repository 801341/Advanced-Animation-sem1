
function Game(){
  game = this;
  let numVehicles = 20;
  this.gamePaused = false;
  this.ga = new GameArea();
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.movers = [];
  this.snakes = [];
  let numMovers = 15;
  let numBoids = 1;
  this.boids = [];
  this.vehicles = [];

  for(let i = 0; i < numMovers; i++){
    this.createMover(this.canvas);
  }

  for(let i = 0; i < numBoids; i++){
        this.boids.push(new Boid(Math.random()*this.canvas.width, Math.random()*this.canvas.height));
  }

  this.createSnakes(this.canvas, 10);

  this.ps = new ParticleSystem();

  for(let i = 0; i < numVehicles; i++){
    this.vehicles.push(new Vehicle(Math.random()*this.canvas.width, Math.random()*this.canvas.height));
  }

}

 // run the movers
  Game.prototype.run = function(){
    if (!this.gamePaused) {
        for (let i = 0; i < this.movers.length; i++) {
            this.movers[i].run();
            if (this.movers[i].isDead) {
                this.movers.splice(i, 1);
                i--;
            }
        }

        this.ps.run();

        for(let i = 0; i < this.snakes.length; i++){
            this.snakes[i].run();
        }

        for (let i = 0; i < this.vehicles.length; i++) {
            this.vehicles[i].run(this.vehicles);
        }

        for (let i = 0; i < this.boids.length; i++) {
            this.boids[i].run(this.boids);
        }
    }

}

  // create the movers
  Game.prototype.createMover = function(canvas){
         let x, y, dx, dy, rad, clr, r, g, b, numOrbs;
         rad = 7;
         x = Math.random() * this.canvas.width;
         y = Math.random() * this.canvas.height;
         dx = Math.random() * 2 - 1;
         dy = Math.random() * 2 - 1;
         //diam = 15;
         r = Math.random() * 200 * 55;
         g = Math.random() * 155;
         b = Math.random() * 155;
         clr = "rgba(" + r + ", " + g + "," + b + ")";
         numOrbs = Math.floor(Math.random() * 10) + 3;
         this.movers.push(new Mover(x, y, dx, dy, rad, clr, numOrbs));
         return this.movers;
}
Game.prototype.createSnakes = function(canvas, numSnakes){
    for(let i = 0; i < numSnakes; i++){
        var x, y, dx, dy, rad, clr, r, g, b;
        rad = 6;
        x = Math.random()*this.canvas.width;
        y = Math.random()*this.canvas.height;
        dx = Math.random()*2-1;
        dy = Math.random()*2-1;
        r = Math.random()* 200*55;
        g = Math.random()* 155;
        b = Math.random()* 155;
        clr = "rgba(" + r + ", " + g + "," + b + ")";
        this.snakes.push(new Snake(x, y, dx, dy, rad, clr, 6));
    }
    return this.snakes;
}
