function cI (src) {
	var img = new Image();
	img.src = "images/" + src;
	return img;
}

function toss (p) {
	if (!p) p = 0.5;
	return Math.random() < p;
}