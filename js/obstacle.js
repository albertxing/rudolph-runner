function Obstacle (x, imgs) {}

Obstacle.prototype = new Model(0, 0, 0, 0, null);

Obstacle.prototype.fixY = function () {
	this.y = Rudolph.Y + Rudolph.S - this.h - 6;
}

Obstacle.prototype.collidesWith = function (r) {
	return r.x <= this.x + this.w - 12 + r.oy / 4
	&& r.x + r.w >= this.x + 12 - r.oy / 4
	&& r.y + r.h > this.y;
}

function Snowman (x) {
	this.x = x;

	var index = Math.floor(Math.random() * 4);
	var meta = Snowman.imgs[index];

	this.w = meta.w;
	this.h = meta.h;
	this.img = meta.img;

	this.fixY();
}

Snowman.imgs = [{
	w: 54,
	h: 87,
	img: cI("s1.png")
}, {
	w: 54,
	h: 99,
	img: cI("s2.png")
}, {
	w: 57,
	h: 57,
	img: cI("s3.png")
}, {
	w: 57,
	h: 69,
	img: cI("s4.png")
}];

Snowman.prototype = new Obstacle(0, Snowman.imgs);

function Snowball (x) {
	this.x = x;

	var index = Math.floor(Math.random() * 2);
	var meta = Snowball.imgs[index];

	this.w = meta.w;
	this.h = meta.h;
	this.img = meta.img;

	this.fixY();
}

Snowball.imgs = [{
	w: 60,
	h: 60,
	img: cI("b1.png")
}, {
	w: 39,
	h: 39,
	img: cI("b2.png")
}, {
	w: 30,
	h: 30,
	img: cI("b3.png")
}];

Snowball.prototype = new Obstacle(0, Snowball.imgs);