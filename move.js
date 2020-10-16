  var canvas;
  var ctx;
  var balls = [];
  //loadBalls(100);


  function mover(x, y, dx, dy, diam, clr){
    this.loc = new JSvector;
    this.diam = y;
    this.rad = this.diam;
    this.clr = clr;
    this.isOverlapping = false;




    move.prototype.render = function(){

      let b = game.bubbles;
      if(this == b[0]){
        ctx.fillStyle = 'rgba(400, 180, 500, .5)'; // pink
        //'rgba(400, 180, 500, .5)' - pink
        ctx.strokeStyle = 'rgba(255, 100, 245)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI*2, 0, false);
        ctx.stroke();
        ctx.fill();
      }
      else{
        ctx.strokeStyle = 'rgba(255, 100, 245)';
        ctx.fillStyle = 'rgba(200, 300, 250, .5)'; // pastel green
        //'rgba(200, 300, 250, .5)' - pastel green

      //circle
      //  ctx.beginPath();
        //ctx.arc(this.x, this.y, this.radius, Math.PI*2, 0, false);
        //ctx.stroke();
        //ctx.fill();

        //circle
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.location.x, this.location.y);
        ctx.arc(0, 0, this.rad, Math.PI*2, 0, false);
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.velocity.getDirection());
        ctx.moveTo(20,0); // x - axis
        ctx.lineTo(-20, -10) // -y and x axis
        ctx.lineTo(-20, 10) // -x and -y axis
        ctx.closePath();
        //or  could have been moveTo(20, 0)
        ctx.stroke();
        ctx.fill();
        ctx.restore();
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

      Bubble.prototype.run = function(){
        this.checkEdges();
        this.checkoverlapping();
        this.update();
        this.render();
      }

    Bubble.prototype.checkoverlapping = function(){
      this.isOverlapping = false;
      this.clr = "rgba(255, 255, 255, 255)"
      let bub = game.bubbles;
      for(let i = 0; i < b.length; i++){
        if(this !== b[i]){
          let d = th8is.loc.distance(b[i].loc);
          if(d < this.rad + b[i].rad){
            this.isOverLapping = true;
            this.clr = "rgba(100,220,55,10)"
          }
        }
      }
    }
  }
}
