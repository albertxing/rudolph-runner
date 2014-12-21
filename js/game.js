function Game () {
	this.rudolph = new Rudolph();
	this.obstacles = [];

	this.started = false;
	this.keydown = false;

	this.time;
}

Game.getInstance = function () {
	if (!Game._instance) Game._instance = new Game();
	return Game._instance;
}

Game.container = document.getElementById("container");
Game.canvas = document.getElementById("canvas");
Game.ctx = canvas.getContext("2d");

Game.prototype.draw = function () {
	Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	Game.ctx.fillStyle = "#ffffff";
	Game.ctx.fillRect(0, Game.canvas.height - 18, Game.canvas.width, 18);
	this.obstacles.forEach(function (o) {
		o.draw();
	});
	this.rudolph.draw();
}

Game.prototype.update = function (now) {
	var dt = now - (this.time || now);
	this.time = now;

	this.rudolph.update(dt);
	this.obstacles.forEach(function (o) {
		o.update(dt);
	});

	this.checkCollision();

	this.clean();
	this.generate();
	this.draw();

	this.req();
}

Game.prototype.checkCollision = function () {
	var r = this.rudolph;
	for (var i = 0; i < this.obstacles.length; i++) {
		var o = this.obstacles[i];
		if (o.collidesWith(r)) {
			this.gameOver();
			break;
		}
	};
}

Game.prototype.start = function () {
	this.started = true;
	this.rudolph.run();
	this.obstacles.forEach(function (o) {
		o.run();
	});

	this.req();
}

Game.prototype.gameOver = function () {
	this.started = false;
	this.over = true;
	this.rudolph.stop();
	this.obstacles.forEach(function (o) {
		o.stop();
	});
}

Game.prototype.req = function () {
	if (this.over) return;
	requestAnimationFrame(this.update.bind(this));
}

Game.prototype.clean = function () {
	this.obstacles = this.obstacles.filter(function (b) {
		return b.visible;
	});
}

Game.prototype.generate = function () {
	var last = this.obstacles[this.obstacles.length - 1];
	if (!last || last.x + last.w < Game.canvas.width) {
		var start = Game.canvas.width + 2 * Rudolph.S;
		var x = start + Math.round(Math.random() * 8 * Rudolph.S);
		var c = Math.floor(Math.random() * 4);
		switch (c) {
			case 0:
			// Single snowball
			var snowball = new Snowball(x);
			this.obstacles.push(snowball);
			break;

			case 1:
			// Single snowman
			var snowman = new Snowman(x);
			this.obstacles.push(snowman);
			break;

			case 2:
			// Single snowman
			var snowman = new Snowman(x);
			this.obstacles.push(snowman);
			// ... and a snowball
			var snowball = new Snowball(x + snowman.w + 6);
			this.obstacles.push(snowball);
			break;

			case 3:
			// Single snowball
			var snowball = new Snowball(x);
			this.obstacles.push(snowball);
			// ... and a snowman
			var snowman = new Snowman(x + snowball.w + 6);
			this.obstacles.push(snowman);
			break;
		}
	}
}

Game.prototype.onkeydown = function (e) {
	// if (this.keydown) return;

	if (!this.started) {
		if (e.keyCode == 32)
			this.start();
		return;
	}

	switch (e.keyCode) {
		case 32:
		case 38:
		this.rudolph.jump();
		break;
	}

	// this.keydown = true;
}

Game.prototype.onkeyup = function (e) {
	this.keydown = false;
}

window.onload = function () {
	var game = Game.getInstance();
	game.draw();

	window.onresize();
	window.addEventListener("keydown", game.onkeydown.bind(game));
	window.addEventListener("keyup", game.onkeyup.bind(game))
}

window.onresize = function () {
	var game = Game.getInstance();

	Game.canvas.width = container.clientWidth;
	Game.canvas.height = container.clientHeight;

	Rudolph.Y = Game.canvas.height - Rudolph.S - 12;

	if (game) {
		game.rudolph.fixY();
		game.obstacles.forEach(function (o) {
			o.fixY();
		});

		game.draw();
	}
}