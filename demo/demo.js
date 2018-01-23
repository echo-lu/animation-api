var imgUrl = 'rabbit-big.png';//图片地址
var positions = ['0 -854','-174 -852','-349 -852','-524 -852','-698 -852','-873 -848'];//图片位置

var ele = document.getElementById('rabbit');
var animation = window.animation;

var repeatAnimation = animation().loadImage([imgUrl]).changePosition(ele,positions,imgUrl).repeatForever();
repeatAnimation.start(80);
// animation(ele,positions,imgUrl);

// function animation(ele,positions,imgUrl) {

// 	ele.style.backgroundImage = 'url(' + imgUrl + ')';
// 	ele.style.backgroundRepeat = 'no-repeat';
// 	var index = 0;
// 	function run() {

// 		var position = positions[index].split(' ');
// 		ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
// 		index ++;
// 		if(index >=positions.length) index = 0;
// 		setTimeout(run,80);
// 	}

// 	run();
// }