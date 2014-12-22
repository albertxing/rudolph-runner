function Model (x, y, w, h, img) {
	this.x = x;
	this.y = y;

	this.w = w;
	this.h = h;
	this.img = img;

	this.timer = 0;
	this.speed = -0.5;

	this.dy = 0;
	this.oy = 0;

	this.moving = false;
	this.visible = true;
}

Model.prototype.draw = function () {
	Game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
}

Model.prototype.update = function (dt) {
	if (!this.moving) return;

	this.x += this.speed * dt;
	this.y += this.dy * dt;

	if (this.x + this.w < 0 || this.y > Game.canvas.height)
		this.visible = false;
}

Model.prototype.run = function () {
	this.moving = true;
}

Model.prototype.stop = function () {
	this.moving = false;
}

Model.prototype.fixY = function () {};