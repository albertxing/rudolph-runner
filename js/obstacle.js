function Obstacle (x, type, index) {
	this.x = x;

	var meta = Obstacle.o[type][index];
	this.y = Rudolph.Y + Rudolph.S - meta.h;
	this.w = meta.w;
	this.h = meta.h;
	this.img = meta.img;
}

Obstacle.o = {
	industrial: [{ 
		w: 48,
		h: 96,
		img: cI("o1.png")
	}, {
		w: 66,
		h: 102,
		img: cI("o2.png")
	}], 
	classic: [{
		w: 66,
		h: 96,
		img: cI("o3.png")
	}, {
		w: 72,
		h: 102,
		img: cI("o4.png")
	}], 
	alt: [{
		w: 24,
		h: 60,
		img: cI("o5.png")
	}, {
		w: 54,
		h: 54,
		img: cI("o6.png")
	}],
	dish: [{
		w: 84,
		h: 96,
		img: cI("o7.png")
	}]
};

Obstacle.prototype = new Model(0, 0, 0, 0, null);