function Game(m){



  this.gamePaused = false;
  this.ga = new GameArea();
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.movers = m;

  this.update = function(){
    for(let i = 0; i < this.bubbles.length; i++){
      this.bubbles[i].run();
    }
  }

  function loadMovers(numMovers){
    var movers = [];
    for(var i = 0; i < numMovers; i++){
      var x, y, dx, dy, diam, clr, r, g, b;
      x = Math.random()*canvas.width;
      y = Math.random()*canvas.height;
      dx = Math.random()*6-3;
      dy = Math.random()*6-3;
      diam = 15;
      r = 255;
      g = 255;
      b = 255;
      cla = "rgba(" + r + ", " + g + "," + b + ")"
      movers[i] = new Mover(x, y, dx, dy, diam, clr);
    }
    return movers;
  }
}
