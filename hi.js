window.onload = init;
var canvas;
var ctx;
var balls = [];

function init(){
  canvas = document.getElementById('cnv');
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(400, 150, 400, .5)';
  ctx = canvas.getContext('2d');
  loadBalls(100);
  animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, 0, 0);
  //window.innerWidth, window.innerHeight
  for(var i = 0; i < balls.length; i++){
    balls[i].update();
  }
}

function loadBalls(n){
  for(var i = 0; i < n; i++){
    balls[i] = new Ball(Math.random()*canvas.width,Math.random()*canvas.height);
  }
}

function Ball(x, y){
  this.x = x;
  this.y = y;
  this.dx = Math.random()* 10 - 0;
  this.dy = Math.random()* 10 - 0;
  this.radius = 15;


  this.render = function(){
    ctx.strokeStyle = 'rgba(255, 100, 245)';
    ctx.fillStyle = 'rgba(400, 180, 500, .5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
  }


  this.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    this.checkEdges();
    this.render();
  }


  this.checkEdges = function(){
    if(this.x > canvas.width || this.x < 0) this.dx = -this.dx;
    if(this.y > canvas.height|| this.y < 0) this.dy = -this.dy;
  }
}
