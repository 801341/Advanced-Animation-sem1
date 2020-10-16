window.onload = init;

var canvas;
var ctx;
var game;
var balls;

function init(){
  let movers = loadMovers(10);
  game = new Game(movers);
  animate();
}

function animate(){
  game.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  game.update();
  requestAnimationFrame(animate);
}
