function cI (src) {
	var img = new Image();
	img.src = "images/" + src;
	return img;
}

function toss () {
	return Math.random() < 0.5;
}