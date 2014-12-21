function Building () {
	var w = Math.ceil(Math.random() * 16) + 12;
	var type = Math.floor(Math.random() * 4);

	this.pw = w; 
	this.w = this.pw * 30 + 6;
	this.img = Building.imgs[type];
	this.obstacles = [];

	if (w > 24 & toss()) {
		var dish = new Obstacle(this.x + this.w - 96, "dish", 0);
		this.obstacles.push(dish);

		var t = type < 2 ? "industrial" : "classic";
		var i = Math.floor(Math.random() * 2); 
		var chimney = new Obstacle(0, t, i);
		if (toss()) {
			var t2 = Math.floor(Math.random() * 2);
			var alt = new Obstacle(0, "alt", t2);

			var width = chimney.w + alt.w;
			var start = 12 + 3 * Rudolph.S + dish.w + width;
			var space = this.w - start - width;
			var x = Math.round(Math.random() * space) + this.x;

			chimney.x = x;
			alt.x = x + chimney.w;

			this.obstacles.push(alt);
		} else {
			var width = chimney.w;
			var start = 12 + 3 * Rudolph.S + width;
			var space = this.w - start - width;
			var x = Math.round(Math.random() * space) + this.x;

			chimney.x = x;
		}

		this.obstacles.push(chimney);
	} else {
		var t = type < 2 ? "industrial" : "classic";
		var i = Math.floor(Math.random() * 2); 
		var chimney = new Obstacle(0, t, i);
		if (toss()) {
			var t2 = Math.floor(Math.random() * 2);
			var alt = new Obstacle(0, "alt", t2);

			var width = chimney.w + alt.w;
			var start = 3 * Rudolph.S;
			var space = this.w - start - width;
			var x = Math.round(Math.random() * space) + start + this.x;

			chimney.x = x;
			alt.x = x + chimney.w;

			this.obstacles.push(alt);
		} else {
			var width = chimney.w;
			var start = 3 * Rudolph.S;
			var space = this.w - start - width;
			var x = Math.round(Math.random() * space) + start + this.x;

			chimney.x = x;
		}

		this.obstacles.push(chimney);
	}
}

Building.imgs = [cI("b1.png"), cI("b2.png"), cI("b3.png"), cI("b4.png")];

Building.prototype = new Model(Game.canvas.width + 80, Rudolph.Y + Rudolph.S, 0, 25, null);

Building.prototype.draw = function (ctx) {
	for (var i = 0; i < this.pw; i++) {
		ctx.drawImage(this.img, this.x + i * 30, this.y, 36, this.h);
	}
	this.obstacles.forEach(function (o) {
		o.draw(ctx);
	});
}

Building.prototype.update = function (dt) {
	if (this.moving) {
		this.x += this.speed * dt;
		this.obstacles.forEach(function (o) {
			o.update(dt);
		});
		
		if (this.x + this.w < 0) this.visible = false;
	}
}

Building.prototype.run = function () {
	this.moving = true;
	this.obstacles.forEach(function (o) {
		o.run();
	});
}