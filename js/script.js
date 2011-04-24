/* Author: 

*/


// TODO :

// checkerboard background from lea
// color contrast for text

var canvas	= document.querySelector('canvas'),
	ctx		= canvas.getContext('2d'),
	height	= canvas.height,
	width	 = canvas.width,
	x 		= 0, // hue
	y 		= 0, // saturation
	color	= undefined,
	alpha	= undefined,
	realW	= parseInt(getComputedStyle(canvas, null).width, 10),
	ratio	= width / realW,
	cache	= [],
    html    = document.querySelector('html'),
    htmlSty = html.style,	
	body	= document.html,
	bodySty = html.style,
	slice 	= [].slice,
	elem	= document.querySelector('h1 span');

/*
 oh rly?	ya rly! 
   \ ___,    ___ /   _,_  oh.
    {O,0}   {-.-}   {o,O} /
    |)__)   |)~(|   (~~(|
,----"-"-----"-"-----"-"-----,_
)		--	--	--	--    \__(o)
\_,------------------------.__)
*/

// First we make our pretty pretty colorpicker!
for (x = 0; x < width; x++){
	cache[x] = [];
	for (y = 0; y < height; y++){
		color = 'hsl(' + x	+ ', ' + (100 - y) + '%, 50%)';
		cache[x][y] = color;
		ctx.fillStyle = color;
		ctx.fillRect(x,y,1,1);
	}
}	


function grabColor(e){
	var x = e.offsetX || e.layerX,
		y = e.offsetY || e.layerY,
		realX = parseInt(x * ratio, 10) % 360,
		realY = parseInt(y * ratio, 10) % 360

	color = cache[realX][realY];
}

function mousemove(e){
	grabColor(e);
	bodySty.backgroundColor = color;
    htmlSty.backgroundColor = color;
    setText(color);
}

function setText(){
	var newcolor = color
		.replace('hsl', (alpha !== undefined) ? 'hsla' : 'hsl')
		.replace(')',   (alpha !== undefined) ? ', ' + alpha + ')' : ')');
					
	elem.className = 'chosen';
	bodySty.backgroundColor = elem.textContent = newcolor;
	htmlSty.backgroundColor = elem.textContent = newcolor;
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