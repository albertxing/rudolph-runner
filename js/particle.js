function Particle (color, w, h) {
	this.color = color;
	this.w = w;
	this.h = h;

	this.run();
}

Particle.prototype = new Model(0, 0, 0, 0, null);

Particle.prototype.draw = function () {
	Game.ctx.fillStyle = this.color;
	Game.ctx.fillRect(this.x, this.y, this.w, this.h);
}

function Snow () {
	this.speed = -0.3 + Math.random() * 0.1;
	this.dy = 0.2 + Math.random() * 0.1;

	this.x = Math.random() * Game.canvas.width;
	this.y = 0;
}

Snow.prototype = new Particle("#ffffff", 3, 3);

function Terrain () {
	this.x = Game.canvas.width;
	this.y = Game.canvas.height - 21;

	this.w = Math.ceil(Math.random() * 6) * 3;
}

Terrain.prototype = new Particle("#ffffff", 0, 3);

Terrain.prototype.fixY = function () {
	this.y = Game.canvas.height - 21;
}

function Dirt () {
	this.x = Game.canvas.width;

	this.oy = -Math.ceil(Math.random() * 5) * 3;
	this.y = Game.canvas.height + this.oy;
}

Dirt.prototype = new Particle("#c3c3c3", 6, 3);

Dirt.prototype.fixY = function () {
	this.y = Game.canvas.height + this.oy;
}