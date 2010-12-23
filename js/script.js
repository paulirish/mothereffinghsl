/* Author: 

*/


// TODO :

// checkerboard background from lea
// color contrast for text





var canvas  = document.querySelector('canvas'),
    ctx     = canvas.getContext('2d'),
    height  = canvas.height,
    width   = canvas.width,
    x       = 0,
    y       = 0,
    color   = undefined,
    alpha   = undefined,
    realW   = parseInt(getComputedStyle( canvas ).width, 10),
    ratio   = width / realW,
    cache   = [],
    
    
    body    = document.body,
    bodySty = body.style,
    slice   = [].slice,
    
    elem    = document.querySelector('h1 span')


// for our purposes, x is hue
//                   y is saturation


// First we make our pretty pretty colorpicker!
for (x = 0; x < width; x++){

  cache[x] = [];
  
  for (y = 0; y < height; y++){
    color = 'hsl(' + x  + ', ' + (100 - y) + '%, 50%)';
    cache[x][y] = color;
    ctx.fillStyle = color;
    ctx.fillRect(x,y,1,1);
  }
}    



function grabColor(e){
  var realX = parseInt(e.offsetX * ratio, 10) % 360,
      realY = parseInt(e.offsetY * ratio, 10) % 360
   
  color = cache[realX][realY];
}

function mousemove(e){
  grabColor(e);
  bodySty.backgroundColor = color;
}

function setText(){
  var newcolor = color
                  .replace('hsl', (alpha !== undefined) ? 'hsla' : 'hsl')
                  .replace(')',   (alpha !== undefined) ? ', ' + alpha + ')' : ')');
                  
  elem.className = 'chosen';
  bodySty.backgroundColor = elem.textContent = newcolor;
}



canvas.addEventListener('mousemove', mousemove, false);


canvas.addEventListener('click', function(e){
  canvas.removeEventListener('mousemove', mousemove, false);
  grabColor(e);
  setText();
}, false);


[].forEach.call( document.querySelectorAll('input[type=range]'), function(elem, i){
  elem.addEventListener('change', function(e){
    
    var target = e.target;
    
    if (target.id == 'alpha'){
      alpha = Math.floor(target.value)/100;
      if (alpha === 1){
        alpha = undefined;
      }
    }
    if (target.id == 'light'){
      var split = color.split('%');
      split[1] = split[1].replace(/\d+/, Math.round(target.value));
      color = split.join('%');

    }
    setText();
  }, false);
});














