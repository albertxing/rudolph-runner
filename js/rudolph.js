function Rudolph () {
	this.jumping = false;

	this.runImg = 0;
	this.alt = 180;
}

Rudolph.standingImg = cI("r.png");
Rudolph.jumpImg = cI("r2.png");
Rudolph.runImgs = [cI("r0.png"), cI("r1.png")];

Rudolph.S = 72;
Rudolph.X = 144;
Rudolph.Y = Game.canvas.height - Rudolph.S - 12;
Rudolph.G = 0.06;

Rudolph.prototype = new Model(Rudolph.X, Rudolph.Y, Rudolph.S, Rudolph.S, Rudolph.standingImg);

Rudolph.prototype.run = function () {
	this.moving = true;
	this.runImg = 0;
	this.img = Rudolph.runImgs[this.runImg];
}

Rudolph.prototype.stop = function () {
	this.moving = false;
	this.img = Rudolph.standingImg;
}

Rudolph.prototype.reset = function () {
	this.jumping = false;
	this.y = Rudolph.Y;
	this.dy = 0;
	this.oy = 0;
}

Rudolph.prototype.jump = function () {
	if (this.jumping) return;

	this.dy = -1;
	this.img = Rudolph.jumpImg;
	this.jumping = true;
}

Rudolph.prototype.update = function (dt) {
	if (!this.moving) return;

	if (!this.jumping) {
		if (this.timer < this.alt) {
			this.timer += dt;
		} else {
			if (this.runImg) this.runImg = 0;
			else this.runImg = 1;

			this.timer = 0;
			this.img = Rudolph.runImgs[this.runImg];
		}
	} else {
		this.y += this.dy * dt;
		this.oy += this.dy * dt;

		if (this.y >= Rudolph.Y) {
			this.dy = 0;
			this.y = Rudolph.Y;
			this.oy = 0;
			this.img = Rudolph.runImgs[this.runImg];
			this.jumping = false;
		} else {
			this.dy += Rudolph.G;
		}
	}
}

Rudolph.prototype.fixY = function () {
	this.y = Rudolph.Y + this.oy;
}