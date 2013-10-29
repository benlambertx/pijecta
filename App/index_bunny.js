ejecta.include('lib/pixi.js');
ejecta.include('lib/math2.js');

var w = window.innerWidth;
var h = window.innerHeight;

var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;
canvas.retinaResolutionEnabled = true;
canvas.MSAAEnabled = false;

var renderer;
var stage;

var wabbitTexture;

var bunnys = [];
var gravity = 0.75//1.5 ;

var maxX = w;
var minX = 0;
var maxY = h;
var minY = 0;

var startBunnyCount = 400;
var isAdding = false;
var count = 0;
var container;


function onReady() {

    renderer = PIXI.autoDetectRenderer(w, h, canvas);
    stage = new PIXI.Stage(0xFFFFFF);

    requestAnimFrame(update);

    wabbitTexture = new PIXI.Texture.fromImage("bunny.png");

    count = startBunnyCount;

    container = new PIXI.DisplayObjectContainer();
    stage.addChild(container);

    for (var i = 0; i < startBunnyCount; i++) {
        var bunny = new PIXI.Sprite(wabbitTexture, {x: 0, y: 0, width: 26, height: 37});
        bunny.speedX = Math.random() * 10;
        bunny.speedY = (Math.random() * 10) - 5;

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 1;
        bunnys.push(bunny);

        container.addChild(bunny);
    }

    document.addEventListener("touchstart", onTouchStart, true);
    document.addEventListener("touchend", onTouchEnd, true);

    renderer.view.touchstart = function () {

        isAdding = true;
    }

    renderer.view.touchend = function () {
        isAdding = false;
    }

}

function onTouchStart() {
    isAdding = true;
}

function onTouchEnd() {
    isAdding = false;
}

function update() {
    requestAnimFrame(update);

    if (!isAdding) {
        for (var i = 0; i < bunnys.length; i++) {
            var bunny = bunnys[i];

            bunny.position.x += bunny.speedX;
            bunny.position.y += bunny.speedY;
            bunny.speedY += gravity;

            if (bunny.position.x > maxX) {
                bunny.speedX *= -1;
                bunny.position.x = maxX;
            }
            else if (bunny.position.x < minX) {
                bunny.speedX *= -1;
                bunny.position.x = minX;
            }

            if (bunny.position.y > maxY) {
                bunny.speedY *= -0.85;
                bunny.position.y = maxY;
                bunny.spin = (Math.random() - 0.5) * 0.2
                if (Math.random() > 0.5) {
                    bunny.speedY -= Math.random() * 6;
                }
            }
            else if (bunny.position.y < minY) {
                bunny.speedY = 0;
                bunny.position.y = minY;
            }

        }
    } else {
        bunnys.pop();

    }
    renderer.render(stage);
}

requestAnimFrame(onReady);
