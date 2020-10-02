  var canvas;
  var ctx;
  var balls = [];
  //loadBalls(100);


  function Ball(x, y){
    this.x = x;
    this.y = y;
    this.dx = Math.random()* 10 - 0;
    this.dy = Math.random()* 10 - 0;
    this.radius = 15;

    //for(var i = 0; i < balls.length; i++){
      //balls[i].update();
    //}


    this.render = function(){
      ctx.strokeStyle = 'rgba(255, 100, 245)';
      ctx.fillStyle = 'rgba(400, 180, 500, .5)';
    //'rgba(400, 180, 500, .5)' - pink
    //'rgba(200, 300, 250, .5)' - pastel green
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, Math.PI*2, 0, false);
      ctx.stroke();
      ctx.fill();
    }
      function loadBalls(){
        for(var i = 0; i < 10; i++){ //fixed
          var x = (Math.random()*canvas.width);
          var y = (Math.random()*canvas.height);
          balls[i] = new Ball(x,y);
        }
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
