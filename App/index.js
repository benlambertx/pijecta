ejecta.include('lib/pixi.js');
ejecta.include('lib/pixi/Utils/Utils.js');
ejecta.include('lib/pixi/Loaders/AssetLoader.js');
ejecta.include('lib/pixi/Loaders/AtlasLoader.js');
ejecta.include('lib/pixi/Loaders/SpineLoader.js');
ejecta.include('lib/pixi/Extras/Spine.js');


var w = window.innerWidth;
var h = window.innerHeight;

var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;
canvas.retinaResolutionEnabled = true;
canvas.MSAAEnabled = false;


var wabbitTexture;

var bunnys = [];
var gravity = 0.75//1.5 ;

var maxX = w;
var minX = 0;
var maxY = h;
var minY = 0;

var startBunnyCount = 300;
var isAdding = false;
var count = 0;
var container;

var assetsToLoader = ["data/spineboy.atlas", "data/spineboy.json"];

// create a new loader
loader = new PIXI.AssetLoader(assetsToLoader);

// use callback
loader.onComplete = onAssetsLoaded;

//begin load
loader.load();


// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF, false);

// create a renderer instance
var renderer = new PIXI.WebGLRenderer(w, h, canvas);

function onAssetsLoaded() {
    var num = 7,
        spineBoy = [];

    for (var i = 0; i < num; i += 1) {
        spineBoy[i] = new PIXI.Spine("data/spineboy.json");

        spineBoy[i].position.x = i * 120 + 120;
        spineBoy[i].position.y = h;

        // set up the mixes!
        spineBoy[i].stateData.setMixByName("walk", "jump", 0.2);
        spineBoy[i].stateData.setMixByName("jump", "walk", 0.4);

        // play animation
        spineBoy[i].state.setAnimationByName("walk", true);


        stage.addChild(spineBoy[i]);
    }


    canvas.addEventListener('touchstart', function () {
        for (var j = 0; j < num; j += 1) {
            spineBoy[j].state.setAnimationByName("jump", false);
            spineBoy[j].state.addAnimationByName("walk", true);
        }
    });


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




}

function animate() {

    requestAnimationFrame(animate);
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
    renderer.render(stage);

}

animate();