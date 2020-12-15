

function Particle(x, y, dx, dy, rad, clr){
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(dx, dy);
    this.acc = new JSVector(0, 0);
    this.rad = rad;
    this.clr = clr;
    this.lifeSpan = 900;
    this.isDead = false;


}

Particle.prototype.run = function(){
    this.update();
    this.render();

}


Particle.prototype.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.loc.add(this.vel);
    this.lifeSpan--;
    if(this.lifeSpan == 0){
        this.isDead = true;
    }
}

Particle.prototype.render = function() {
    let ctx = game.ctx;
    ctx.strokeStyle = 'rgba(200, 100, 200, .5)'
    ctx.fillStyle = this.clr;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.rad, Math.PI * 2, 0, false);
    ctx.stroke();
    ctx.fill();

}

//     let ctx = game.ctx;
//     ctx.strokeStyle = 'rgb(227,51,19)'; // changed from .5
//     ctx.fillStyle = 'rgb(227,51,19,0.8)'; // pink
//     //'rgba(400, 180, 500, .5)' - pink
//     ctx.beginPath();
//     ctx.arc(this.loc.x, this.loc.y, this.rad, Math.PI*2, 0, false);
//     ctx.stroke();
//     ctx.fill();


