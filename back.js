var UP = 1;
var DOWN = 0;
var LEFT = 2;
var RIGHT = 3;

var direction = 0;
var frame = 0;
var xc = Math.floor(700/2)-16;
var yc = Math.floor(500/2)-16;;
var size = 32;
var speed = 3;
var moving = [false, false, false, false];
var timing = [null, null, null, null];

var img;

var test = {
	myvalue: 0,
	setValue: function(a)
	{
		this.myvalue = a;
	},
	getValue: function()
	{
		return this.myvalue;
	}
};

function draw() {
	img = new Image();
	img.src = "link_sprites.png";
	img.onload = update;
}

function update()
{

		var canvas = document.getElementById("main")
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 700, 500);
		ctx.drawImage(img, (Math.floor(frame/5))*size, direction*size, size, size, xc, yc, size, size);
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

function step()
{
	if (direction < 2)
		yc += direction? -1*speed : speed;
	else
		xc += (direction==LEFT)? -1*speed : speed;

	frame = (frame + 1) % 10;
	draw();
}
