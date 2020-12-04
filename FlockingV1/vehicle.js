

function Vehicle(x, y, rad, clr){
  let dy = (Math.random() * 4) - 2;
  let dx = (Math.random() * 4) - 2;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.dis = new JSVector(0, 0);
  this.rad = rad;
  this.clr = clr;
  this.maxSpeed = 2;
  this.maxForce = 10;
  this.maxDis = this.rad * 2;
  this.scale = 8


}

Vehicle.prototype.run = function(vehicles){
    this.flock(vehicles);
    this.render();
    this.update();
    this.checkEdges();




}


Vehicle.prototype.flock = function(vehicles){
    let sep = this.separation(vehicles);
    let align = this.align(vehicles);
    //var cohesion = this.cohesion(this.vehicles);
    let SepMult = game.slider3.value;
    let AlignMult = game.slider4.value;
    let CohMult = game.slider5.value;
    sep.multiply(SepMult);
    align.multiply(AlignMult);
    //cohesion.multiply(1.0);

    this.applyForce(sep);
    this.applyForce(align);
    //applyForce(cohesion);

}

Vehicle.prototype.separation = function(vehicles){
     let sep = new JSVector(0,0);
    for (let i = 0; i < vehicles.length; i++) {
        let other = vehicles[i];
        if(this !== vehicles[i]){
            let dis = this.loc.distance(other.loc);
            if (dis < this.maxDis) {
                let diff = JSVector.subGetNew(this.loc, other.loc);
                diff.normalize();
                sep.add(diff);
            }
        }
    }
    return sep;
}

Vehicle.prototype.applyForce = function(v2){
    this.acc.add(v2);
}
Vehicle.prototype.cohesion = function(){
    let other = this.vehicles[i];
    let neighbordist = 50;
    let sum = new JSVector(0, 0);
    for(let i = 0; i < this.vehicles.length; i++){
        let dis = this.loc.distance(other.loc);
        if(this !== this.vehicles[i]){
            let dis = this.loc.distance(other.loc);
            if (dis < this.maxDis) {
                sum.add(other.loc);
            }
        }
    }
}

Vehicle.prototype.align = function(vehicles){
    let neighbordist = 50;
    let sum = new JSVector(0,0);
    let count = 0
    for(var i = 0; i < vehicles.length; i++){
        let other = vehicles[i];
        let d = this.loc.distance(other.loc);
        if((d > 0) && (d < neighbordist)){
            sum.add(other.vel);
            count++;
        }

    }

    if (count > 0){
        sum.divide(count);
        sum.normalize();
        sum.multiply(game.slider2.value);
        let steer = JSVector.subGetNew(sum, this.vel);
        steer.limit(game.slider1.value);
        return steer;
    }
    else{
        return new JSVector(0,0);
    }

}

Vehicle.prototype.applyBehaviors = function(vehicles){
    let sep = this.separation(vehicles);
    let seek = this.seek(new JSVector());//add value
    this.applyForce(sep);
    this.applyForce(seek);

}

Vehicle.prototype.seek = function(target){
    let desired = JSVector.subGetNew(target, this.loc);
    desired.normalize();
    desired.multiply(game.slider2.value);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(game.slider1.value);
    return steer;

}

Vehicle.prototype.checkEdges = function(){
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

Vehicle.prototype.update = function(){
    this.acc.limit(game.slider1.value);
    this.vel.add(this.acc);
    this.acc.multiply(0);
    this.vel.limit(game.slider2.value);//limiting velocity to max speed
    this.loc.add(this.vel);


}

Vehicle.prototype.render = function(){
    let ctx = game.ctx;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.vel.getDirection() + Math.PI /2);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,180,255,0.5)';
    ctx.fillStyle = 'rgba(255,180,255,0.5)'; // pink
    // 'rgba(400, 180, 500, .5)' - pink
    ctx.moveTo(0, -this.scale);
    ctx.lineTo(-this.scale, this.scale);
    ctx.lineTo(0,0);
    ctx.lineTo(this.scale, this.scale);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
