(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:



(lib._01_0000_logo01 = function() {
	this.initialize(img._01_0000_logo01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,474,335);


(lib._01_0000_text01_01 = function() {
	this.initialize(img._01_0000_text01_01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,552,90);


(lib._01_0001_rocket = function() {
	this.initialize(img._01_0001_rocket);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,214,220);


(lib._01_0001_text01_02 = function() {
	this.initialize(img._01_0001_text01_02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,554,90);


(lib._01_0002_rocketfire = function() {
	this.initialize(img._01_0002_rocketfire);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,123,124);


(lib._01_0002_text01_03 = function() {
	this.initialize(img._01_0002_text01_03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,555,146);


(lib._01_0003_DREAM = function() {
	this.initialize(img._01_0003_DREAM);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,340,394);


(lib._01_0005_plane = function() {
	this.initialize(img._01_0005_plane);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,466,414);


(lib._01_0006_BJ = function() {
	this.initialize(img._01_0006_BJ);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,750,1334);


(lib.arrow = function() {
	this.initialize(img.arrow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,98);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.text01_04 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,209,111,0.8)").s().p("EgqGAjfQi5gBiDiKQiCiJAAjDMAAAg4PQAAjDCCiKQCDiJC5gBMBUNAAAQC5ABCCCJQCDCKAADDMAAAA4PQAADDiDCJQiCCKi5ABg");
	this.shape.setTransform(314.1,227.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.text01_04, new cjs.Rectangle(0,0,628.3,454.1), null);


(lib.text01_03 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0002_text01_03();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.text01_03, new cjs.Rectangle(0,0,555,146), null);


(lib.text01_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0000_text01_01();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.text01_01, new cjs.Rectangle(0,0,552,90), null);


(lib.text_01_02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0001_text01_02();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.text_01_02, new cjs.Rectangle(0,0,554,90), null);


(lib.rocket = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0001_rocket();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.rocket, new cjs.Rectangle(0,0,214,220), null);


(lib.plane = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0005_plane();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.plane, new cjs.Rectangle(0,0,466,414), null);


(lib.ocketfire = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0002_rocketfire();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.ocketfire, new cjs.Rectangle(0,0,123,124), null);


(lib.logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0000_logo01();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.logo, new cjs.Rectangle(0,0,474,335), null);


(lib.dream = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0003_DREAM();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.dream, new cjs.Rectangle(0,0,340,394), null);


(lib.BJ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._01_0006_BJ();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.BJ, new cjs.Rectangle(0,0,750,1334), null);


(lib.mc2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.arrow();
	this.instance.parent = this;
	this.instance.setTransform(-49,-49);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc2, new cjs.Rectangle(-49,-49,98,98), null);


(lib.mc1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.008)").s().p("Eg6lBeOMAAAi8bMB1LAAAMAAAC8bg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc1, new cjs.Rectangle(-375,-603,750,1206), null);


(lib.rocketZ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rocket
	this.instance = new lib.rocket();
	this.instance.parent = this;
	this.instance.setTransform(107,110,1,1,0,0,0,107,110);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:104,y:107},9).to({x:107,y:110},10).wait(1));

	// ocket-fire
	this.instance_1 = new lib.ocketfire();
	this.instance_1.parent = this;
	this.instance_1.setTransform(59.6,166,1,1,0,0,0,112.6,15);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:0.9,scaleY:0.93,x:58.1,y:164.5},4).to({scaleX:1,scaleY:1,x:57.6,y:162},5).to({scaleX:0.86,scaleY:0.91,y:164.1},5).to({scaleX:1,scaleY:1,x:59.6,y:166},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53,0,267,275);


(lib.arrow_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.mc2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:49},30,cjs.Ease.get(1)).to({y:0},7).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.view1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		_this.stop();
		_this.btn.addEventListener("click",function (){
		           alert("play");
		      _this.play();
		      })
	}
	this.frame_115 = function() {
		this.stop();
		if(model) model.dispatchEvent("complete");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(115).call(this.frame_115).wait(87));

	// 图层 2
	this.btn = new lib.mc1();
	this.btn.parent = this;
	this.btn.setTransform(375,603);

	this.timeline.addTween(cjs.Tween.get(this.btn).wait(202));

	// jiantou
	this.instance = new lib.arrow_1();
	this.instance.parent = this;
	this.instance.setTransform(375,1106.9,0.5,0.5);
	this.instance.alpha = 0.012;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(70).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},15,cjs.Ease.get(1)).wait(117));

	// text01_01
	this.instance_1 = new lib.text01_01();
	this.instance_1.parent = this;
	this.instance_1.setTransform(371.9,596,1,1,0,0,0,276,45);
	this.instance_1.alpha = 0.012;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(46).to({_off:false},0).to({y:628,alpha:1},36,cjs.Ease.get(1)).to({_off:true},106).wait(14));

	// text_01_02
	this.instance_2 = new lib.text_01_02();
	this.instance_2.parent = this;
	this.instance_2.setTransform(371.9,710,1,1,0,0,0,277,45);
	this.instance_2.alpha = 0.012;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49).to({_off:false},0).to({y:742,alpha:1},36,cjs.Ease.get(1)).to({_off:true},103).wait(14));

	// text01_03
	this.instance_3 = new lib.text01_03();
	this.instance_3.parent = this;
	this.instance_3.setTransform(371.4,849.9,1,1,0,0,0,277.5,73);
	this.instance_3.alpha = 0.012;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(52).to({_off:false},0).to({y:881.9,alpha:1},36,cjs.Ease.get(1)).to({_off:true},100).wait(14));

	// text01_04
	this.instance_4 = new lib.text01_04();
	this.instance_4.parent = this;
	this.instance_4.setTransform(57.9,770.1,0.118,1,0,0,0,0,227.1);
	this.instance_4.alpha = 0.012;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(26).to({_off:false},0).to({scaleX:1,alpha:1},26,cjs.Ease.get(1)).to({_off:true},136).wait(14));

	// logo
	this.instance_5 = new lib.logo();
	this.instance_5.parent = this;
	this.instance_5.setTransform(364.1,9.2,1,1,0,0,0,237,167.5);
	this.instance_5.alpha = 0.012;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2).to({_off:false},0).to({y:347.2,alpha:1},18,cjs.Ease.get(1)).to({_off:true},168).wait(14));

	// dream
	this.instance_6 = new lib.dream();
	this.instance_6.parent = this;
	this.instance_6.setTransform(308.1,317.7,1,0.198,0,0,0,170,197);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(15).to({_off:false},0).to({scaleY:1,x:320.1},12,cjs.Ease.get(1)).to({_off:true},161).wait(14));

	// rocketZ
	this.instance_7 = new lib.rocketZ();
	this.instance_7.parent = this;
	this.instance_7.setTransform(-135.5,804.8,1,1,0,0,0,79.5,137);
	this.instance_7.alpha = 0.98;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(2).to({_off:false},0).to({x:532.1,y:268.7},18,cjs.Ease.get(1)).to({_off:true},168).wait(14));

	// plane
	this.instance_8 = new lib.plane();
	this.instance_8.parent = this;
	this.instance_8.setTransform(533.3,1053.2,0.93,0.93,0,0,0,233,207);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({_off:true},188).wait(14));

	// BJ
	this.instance_9 = new lib.BJ();
	this.instance_9.parent = this;
	this.instance_9.setTransform(375,603,1,0.904,0,0,0,375,667);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({_off:true},188).wait(14));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1245.7);


// stage content:
(lib.assets = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;
// library properties:
lib.properties = {
	id: '2FE794F78938404CAA04B6B991FF9458',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_01_0000_logo01.png?1505210656866", id:"_01_0000_logo01"},
		{src:"images/_01_0000_text01_01.png?1505210656866", id:"_01_0000_text01_01"},
		{src:"images/_01_0001_rocket.png?1505210656866", id:"_01_0001_rocket"},
		{src:"images/_01_0001_text01_02.png?1505210656866", id:"_01_0001_text01_02"},
		{src:"images/_01_0002_rocketfire.png?1505210656866", id:"_01_0002_rocketfire"},
		{src:"images/_01_0002_text01_03.png?1505210656866", id:"_01_0002_text01_03"},
		{src:"images/_01_0003_DREAM.png?1505210656866", id:"_01_0003_DREAM"},
		{src:"images/_01_0005_plane.png?1505210656866", id:"_01_0005_plane"},
		{src:"images/_01_0006_BJ.jpg?1505210656866", id:"_01_0006_BJ"},
		{src:"images/arrow.png?1505210656866", id:"arrow"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2FE794F78938404CAA04B6B991FF9458'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;