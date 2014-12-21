var game;

function Game () {
	this.rudolph = new Rudolph();
	this.buildings = [];
	this.moving = false;

	this.time;
}

Game.canvas = document.getElementById("canvas");
Game.ctx = canvas.getContext("2d");

Game.prototype.draw = function () {
	Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	this.rudolph.draw(Game.ctx);
	for (var i in this.buildings) {
		this.buildings[i].draw(Game.ctx);
	}
}

Game.prototype.update = function () {
	var now = Date.now();
	var dt = now - (this.time || now);
	this.time = now;

	this.rudolph.update(dt);
	for (var i in this.buildings) {
		this.buildings[i].update(dt);
	}

	this.clean();
	this.generate();
	this.draw();

	this.req();
}

Game.prototype.start = function () {
	this.moving = true;
	this.rudolph.run();
	for (var i in this.buildings) {
		this.buildings[i].run();
	}

	this.req();
}

Game.prototype.req = function () {
	requestAnimationFrame(this.update.bind(this));
}

Game.prototype.clean = function () {
	this.buildings = this.buildings.filter(function (b) {
		return b.visible;
	});
}

Game.prototype.generate = function () {
	var last = this.buildings[this.buildings.length - 1];
	if (last.x + last.w < Game.canvas.width) {
		var w = Math.ceil(Math.random() * 8) + 8;
		var t = Math.floor(Math.random() * 4);
		var b = new Building();
		this.buildings.push(b);

		if (this.moving)
			b.run();
	}
}

window.onload = function () {
	game = new Game();
	game.buildings.push(new Building());

	game.draw();
}