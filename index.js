var UP = 1;
var DOWN = 0;
var LEFT = 2;
var RIGHT = 3;

var graphics = [];

function main()
{
	
}

function mkCharacter(pointer, imagesource)
{
	pointer = {	
		direction : 0,
		frame : 0,
		img : null,
		xc : Math.floor(700/2)-16,
		yc : Math.floor(500/2)-16,
		size : 32,
		speed : 3,
		moving : [false, false, false, false],
		timing : [null, null, null, null],

		init : function(source)
		{
			this.img = new Image();
			this.img.src = source;
			this.img.onload = redrawCanvas;
			
		},
		
		step : function()
		{
			if (this.direction < 2)
				this.yc += this.direction? -1*this.speed : this.speed;
			else
				this.xc += (this.direction==LEFT)? -1*this.speed : this.speed;
		
			this.frame = (this.frame + 1) % 10;
			redrawCanvas();
		},

		draw : function(ctx)
		{
			ctx.drawImage(this.img, (Math.floor(this.frame/5))*this.size, this.direction*this.size, this.size, this.size, this.xc, this.yc, this.size, this.size);
		}
	} 

	pointer.init(imagesource);
}


function redrawCanvas()
{
		var canvas = document.getElementById("main")
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 500);
		for (var x=0; x<graphics.length; x++)
			graphics[x].draw(ctx);
}

window.onkeyup = function(e){
	var tdir = detDir(e);
	clearInterval(timing[tdir]);
	moving[tdir] = false;
}

function detDir(e)
{
	var code = e.keyCode;	

	if (code == 37 || code == 65)
		tdir = LEFT;
	else if (code == 39 || code == 68)
		tdir = RIGHT;
	else if (code == 38 || code == 87)
		tdir = UP;
	else if (code == 40 || code == 83)
		tdir = DOWN;
	else
		return -1;

	return tdir;
}

window.onkeydown = function(e){


	var tdir = detDir(e);

	if (tdir==-1) return;

	if (!moving[tdir])
	{
		moving[tdir] = true;
		direction = tdir;
		timing[tdir] = setInterval(step, 33);
	}
}

