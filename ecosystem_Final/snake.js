function Snake(x, y, dx, dy, rad, clr, n){
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(dx, dy);
    this.acc = new JSVector(0, 0);
    this.rad = rad;
    this.clr = clr;
    this.seg = 5;
    this.segments = [];

    for(let i = 1; i < 12; i++){
        this.segments[i] = new JSVector(0, 0);
    }
}

Snake.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
}


Snake.prototype.update = function(){

    if(this !== game.boids[0]){
        let d = this.loc.distance(game.boids[0].loc);
        if(d < 80){
            this.acc = JSVector.subGetNew(this.loc, game.boids[0].loc); // switch parameters to make it retraction or repulsion
            this.acc.normalize();
            this.acc.multiply(0.05);
        }
    }

    this.vel.add(this.acc);
    this.vel.limit(3);
    this.loc.add(this.vel);
    this.segments[0] = this.loc;
    for(let i = 1; i < this.segments.length; i++){
        let diff = JSVector.subGetNew(this.segments[i], this.segments[i-1]);
        diff.setMagnitude(this.seg);
        this.segments[i] = JSVector.addGetNew(this.segments[i-1], diff);
    }
}


Snake.prototype.checkEdges = function(){
    // let canvas = game.canvas;
    // if (this.loc.x >= canvas.width) {
    //     this.vel.x = -this.vel.x;
    // } else if (this.loc.x <= 0) {
    //     this.vel.x = -this.vel.x;
    // }
    // if (this.loc.y >= canvas.height) {
    //     this.vel.y = -this.vel.y;
    // } else if (this.loc.y <= 0) {
    //     this.vel.y = -this.vel.y;
    // }
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


Snake.prototype.render = function(){
    let ctx = game.ctx;
    ctx.strokeStyle = 'rgb(255,35,150)';
    ctx.fillStyle = 'rgb(255,35,150)'; // pink
    //'rgba(400, 180, 500, .5)' - pink
    for(let i = 1; i < this.segments.length; i++) {
        ctx.lineCap = 'round';
        ctx.lineWidth = this.segments.length-i;
        ctx.beginPath();
        ctx.moveTo(this.segments[i].x, this.segments[i].y);
        ctx.lineTo(this.segments[i-1].x, this.segments[i-1].y);
        ctx.stroke();
    }
}
