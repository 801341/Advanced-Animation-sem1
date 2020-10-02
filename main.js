var game;   // a single global object

window.onload = init;//  After the window has been loaded, go to init

function init(){
    //canvas = document.createElement('canvas');
    //canvas.sytle.border = 'solid black 2px';
    //canvas.style.backgroundColor = 'rgba(0,0,0, .95)';

    //canvas.width = 1096;
    //canvas.height = 696;
    //ctx = canvas.getContext('2d');
    //var bubbles = loadBubbles(150);
    game = new Game();  // global game
    animate();          // kick off the animation
}

//  animation loop called 60 fps
function animate(){
    // paint the canvas with mostly transparent black
  game.ctx.fillStyle = 'rgba(0,0,0,.05)'
  game.ctx.fillRect(0,0,canvas.width,canvas.height);
  game.run();    // run the game
  requestAnimationFrame(animate);
}
