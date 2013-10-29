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
    var num = 15,
        spineBoy = [];

    for (var i = 0; i < num; i += 1) {
        spineBoy[i] = new PIXI.Spine("data/spineboy.json");

        spineBoy[i].position.x = i * 40 + 40;
        spineBoy[i].position.y = h;

        spineBoy[i].scale.x = spineBoy[i].scale.y = h / 2400;

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


}

function animate() {
    
    requestAnimationFrame(animate);
    renderer.render(stage);

}

animate();