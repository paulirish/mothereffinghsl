/* Author: 
     ___,    ___     _,_  
    {O,0}   {-.-}   {o,O}
    |)__)   |)~(|   (~~(|
,----"-"-----"-"-----"-"-----,
)   --    --    --     --   _(
\_,------------------------.__)
*/


// TODO :

// checkerboard background from lea
// color contrast for text -old and busted
// inverted color of canvas selection for text from jared -new hottness

var canvas  = document.querySelector('canvas'),
    ctx     = canvas.getContext('2d'),
    height  = canvas.height,
    width   = canvas.width,
    x       = 0, // hue
    y       = 0, // saturation
    color   = undefined,
    alpha   = undefined,
	invert	= undefined,
    realW   = parseInt(getComputedStyle(canvas, null).width, 10),
    ratio   = width / realW,
    cache   = [],
	body	= document.body,
	bodySty = body.style,
    main    = document.querySelector('#main'),
    mainSty = main.style,
    slice   = [].slice,
    elem    = document.querySelector('h1 span');


// First we make our pretty pretty colorpicker!
for (x = 0; x < width; x++){
    cache[x] = [];
    for (y = 0; y < height; y++){
        color = 'hsl(' + x    + ', ' + (100 - y) + '%, 50%)';
        cache[x][y] = color;
        ctx.fillStyle = color;
        ctx.fillRect(x,y,1,1);
    }
}    


function grabColor(e){
    var x = e.offsetX || e.layerX,
        y = e.offsetY || e.layerY,
        realX = parseInt(x * ratio, 10) % 360,
        realY = parseInt(y * ratio, 10) % 360;

	color = cache[realX][realY];
	invert = inverty(realX, realY);
}

function inverty(x, y) {
	var imgData = ctx.getImageData(x, y, 1, 1),
		px = imgData.data,	
		r = 255-px[0],
		b = 255-px[0+1],
		g = 255-px[0+2];

	return 'rgb('+r+', '+g+', '+b+')';
}

function mousemove(e){
    grabColor(e);
    mainSty.backgroundColor = color;
	body.color = invert;
	
	setText();
}

function setText(){
    var newcolor = color
        .replace('hsl', (alpha !== undefined) ? 'hsla' : 'hsl')
        .replace(')',   (alpha !== undefined) ? ', ' + alpha + ')' : ')');

    elem.className = 'chosen';
    mainSty.backgroundColor = elem.textContent = newcolor;
	bodySty.color = invert;
}


function inputchange(e){
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
}

canvas.addEventListener('mousemove', mousemove, false);
canvas.addEventListener('click', function(e){
    canvas.removeEventListener('mousemove', mousemove, false);
    grabColor(e);
    setText();
}, false);


[].forEach.call( document.querySelectorAll('input[type=range]'), function(elem, i){
    elem.addEventListener('change', inputchange, false);
});