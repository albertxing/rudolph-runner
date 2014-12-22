function Game () {
	this.rudolph = new Rudolph();
	this.obstacles = [];
	this.particles = [];
	this.closeParticles = [];

	this.waiting = true;
	this.stage = 0;

	this.score = 0;
	this.maxScore = false;

	this.time;

	this.generateTerrain();
}

Game.getInstance = function () {
	if (!Game._instance) Game._instance = new Game();
	return Game._instance;
}

Game.container = document.getElementById("container");
Game.canvas = document.getElementById("canvas");
Game.ctx = canvas.getContext("2d");

Game.help = document.getElementById("help-img");
Game.overImg = document.getElementById("over");

Game.startImg = cI("k1.png");
Game.jumpImg = cI("k2.png");

Game.numImg = cI("n.png");

Game.prototype.draw = function () {
	Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

	Game.ctx.fillStyle = "#ffffff";
	Game.ctx.fillRect(0, Game.canvas.height - 18, Game.canvas.width, 18);

	this.drawScore();

	this.particles.forEach(function (p) { p.draw(); });
	this.obstacles.forEach(function (o) { o.draw(); });
	this.rudolph.draw();
	this.closeParticles.forEach(function (p) { p.draw(); });
}

Game.prototype.drawScore = function () {
	var w = Game.canvas.width;
	var x = w - 315;

	if (this.maxScore) {
		Game.ctx.drawImage(Game.numImg, 0, 30, 96, 30, x, 12, 48, 15);
		this.drawNumber(Math.floor(this.maxScore), x + 120);
	}

	x += 168;

	Game.ctx.drawImage(Game.numImg, 102, 30, 138, 30, x, 12, 69, 15);
	this.drawNumber(Math.floor(this.score), x + 141);
}

Game.prototype.drawNumber = function (n, x) {
	var digits = n.toString().split('');
	for (var i = digits.length - 1; i >= 0; i--) {
		x -= 15;
		var sx = digits[i] * 24;
		Game.ctx.drawImage(Game.numImg, sx, 0, 24, 30, x, 12, 12, 15);
	};
}

Game.prototype.update = function (now) {
	var dt = now - (this.time || now);
	this.time = now;

	this.score += dt / 100;

	this.rudolph.update(dt);
	this.obstacles.forEach(function (o) { o.update(dt); });
	this.particles.forEach(function (p) { p.update(dt); });
	this.closeParticles.forEach(function (p) { p.update(dt); });

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
	if (this.stage == 2) {
		this.obstacles = [];
		this.particles = [];

		this.time = false;

		if (!this.maxScore || this.score > this.maxScore)
			this.maxScore = this.score;
		this.score = 0;

		this.rudolph.reset();
		this.generateTerrain();

		Game.overImg.style.display = "none";
	}

	this.stage = 1;
	this.waiting = false;
	this.rudolph.run();

	Game.help.src = "images/k2.png";
	setTimeout(function () {
		Game.help.src = "";
	}, 2000);

	this.req();
}

Game.prototype.gameOver = function () {
	this.stage = 2;
	this.rudolph.stop();

	Game.overImg.style.display = "initial";

	Game.help.src = "images/k3.png";
	setTimeout(function () {
		this.waiting = true;
	}.bind(this), 400);
}

Game.prototype.req = function () {
	if (this.stage != 1) return;
	requestAnimationFrame(this.update.bind(this));
}

Game.prototype.clean = function () {
	this.obstacles = this.obstacles.filter(function (o) {
		return o.visible;
	});
	this.particles = this.particles.filter(function (p) {
		return p.visible;
	});
	this.closeParticles = this.closeParticles.filter(function (p) {
		return p.visible;
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

	if (toss(0.3)) this.particles.push(new Snow());
	if (toss(0.3)) this.closeParticles.push(new Snow());
	if (toss(0.2)) this.particles.push(new Terrain());
	if (toss(0.1)) this.particles.push(new Dirt());
}

Game.prototype.generateTerrain = function () {
	for (var x = 0; x < Game.canvas.width; x += 3) {
		x += 3;
		if (toss(0.1)) {
			var t = new Terrain();
			t.x = x;
			this.particles.push(t);
		}
		if (toss(0.05)) {
			var d = new Dirt();
			d.x = x;
			this.particles.push(d);
		}
	}
}

Game.prototype.onkeydown = function (e) {
	if (this.stage != 1 && this.waiting) {
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
}

Game.prototype.onkeyup = function (e) {
	this.keydown = false;
}

window.onload = function () {
	window.onresize();

	var game = Game.getInstance();

	window.addEventListener("keydown", game.onkeydown.bind(game));
	window.addEventListener("keyup", game.onkeyup.bind(game))
}

window.onresize = function () {
	Game.canvas.width = container.clientWidth;
	Game.canvas.height = container.clientHeight;

	Rudolph.Y = Game.canvas.height - Rudolph.S - 12;

	var game = Game.getInstance();

	game.rudolph.fixY();
	game.obstacles.forEach(function (o) {
		o.fixY();
	});
	game.particles.forEach(function (p) {
		p.fixY();
	});

	game.draw();
}