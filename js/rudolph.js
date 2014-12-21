function Rudolph () {
	this.runImg = 0;
	this.alt = 180;
}

Rudolph.standingImg = cI("r.png");
Rudolph.runImgs = [cI("r0.png"), cI("r1.png")];

Rudolph.X = 30;
Rudolph.Y = 200;
Rudolph.S = 72;

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

Rudolph.prototype.update = function (dt) {
	if (!this.moving) return;

	if (this.timer < this.alt) {
		this.timer += dt;
	} else {
		if (this.runImg) this.runImg = 0;
		else this.runImg = 1;

		this.timer = 0;
		this.img = Rudolph.runImgs[this.runImg];
	}
}