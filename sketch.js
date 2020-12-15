var streams = [];
var symbolSize = 20;

function setup() {
  colorMode(HSB, 360, 100, 100, 1);
  createCanvas(windowWidth, windowHeight);
  // createCanvas(
  // 	window.innerWidth,
  //   window.innerHeigth
  // );
  background(0);
  textSize(symbolSize); 
  textFont('monospace');
  var x = -random(symbolSize*0.5, symbolSize*1.5);
  var y = 0;
	for (var i = 0; i < (width/symbolSize)+3; i++) {
    stream = new Stream();
    stream.generateSymbols(x,-random(0,height/2));
    streams.push(stream);
    x += random(symbolSize*0.8, symbolSize*1.2);
  };
}

function draw() {
  background(0,0,0, .7);
  
	streams.forEach(function(stream){
    stream.render();
  }); 
  
}

function Sym(x,y, speed, first) {
  this.x = x;
  this.y = y; 
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2,60));
  this.first = first;
  
  
  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0){
      this.value = String.fromCharCode(
        randomCharCode()
      );
    }
  }
  
  this.rain = function() {
    if (this.y >= height+symbolSize) {
    	this.y = 0
    } else {this.y += this.speed}
  }
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5,floor(height/symbolSize)));
  this.speed = random(5,8);
  
  this.generateSymbols = function(x, y) {
    var first = random(0,1) < 0.25;
    for (var i = 0; i < this.totalSymbols; i++) {
    	symbol = new Sym(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;   
      first = false;
    }
  }
  
  this.render = function() {
   this.symbols.forEach(function(symbol) {
     if (symbol.first) {
      fill(250,250,250);
      textStyle(BOLD);
     } else {
       fill(40,100,80, 100000);
       textStyle(NORMAL);
     }
  	text(symbol.value, symbol.x, symbol.y);
    symbol.rain();
    symbol.setToRandomSymbol();
   });
  }
  
}

function randomCharCode() {
  var r = random(0,1);
  if (r <= 0.20) {return 0x30A0 + floor(random(0,96))}
  else if (r <= 0.4) {return 0x2440 + floor(random(0,10))}
  else if (r <= 0.6) {return 0x0180 + floor(random(0,208))}
  else if (r <= 0.8) {return 0x0E01 + floor(random(0,90))}
  else {return 0x2E80 + floor(random(0,115))}
}