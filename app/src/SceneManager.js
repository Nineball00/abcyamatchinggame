(function (window) {

    window.abcya = window.abcya || {};

    function SceneManager() {
        this.initialize();
    }
    
    var me = SceneManager.prototype = {};
    me.currentScene = null;
    me.currentStateFunction = null;
    me.bgImage = null;
    me.bg = null;
    me.fpsLabel = null;
    me.music = null;

    me.initialize = function() {
        game.calenderFont = abcya.GameConfig.GAME_FONTS[0];
        if (abcya.GameConfig.USES_STORAGE) {
            //game.storage = new abcya.GameStorage(abcya.GameConfig.STORAGE_PREFIX);
        }

        var bgName = (game.isWidescreen) ? "mainBgWide" : "mainBg";
        this.gameBg = new createjs.Bitmap(game.assets.getAsset(bgName));
        game.stage.addChild(this.gameBg);

        this.arenaBg = new createjs.Bitmap(game.assets.getAsset("game-bg-new"));
        game.stage.addChild(this.arenaBg);

        createjs.Ticker.on("tick", this.gameLoop, this);
        this.changeState(abcya.GameStates.GS_INTRO);

        //this.layoutScreens();

        //call layout screens after slight delay to start renderer
        createjs.Tween.get(this).wait(200).call(this.layoutScreens,[],this);

    };

    me.changeState = function(state) {
        switch(state) {
            case abcya.GameStates.GS_RUNSCENE :
                this.currentStateFunction = this.gameStateRunScene;
                break;
            case abcya.GameStates.GS_INTRO:
                console.log("CHANGE GS_INTRO");
                this.currentStateFunction = this.gameStateShowIntro;
                break;
            case abcya.GameStates.GS_GAME:
                console.log("CHANGE GS_GAME");
                this.currentStateFunction = this.gameStateShowGame;
                break;
        }
    };

    //scene tick functions
    me.gameStateRunScene = function(tickEvent) {
        if(game.hasFocus){
            if(this.currentScene.tick) this.currentScene.tick(tickEvent);

        }
    };

    me.gameStateShowIntro = function(tickEvent) {
        console.log("intro SCREEN");
        var scene = new abcya.IntroScreen();
        scene.on(abcya.GameStateEvents.GE_SHOW_GAME, this.onStateEvent, this, false, {state:abcya.GameStates.GS_GAME});
        scene.addEventListener("TOGGLE_MUSIC", this.controlMusic.bind(this));
        game.stage.addChild(scene);
        this.currentScene = scene;
        this.changeState(abcya.GameStates.GS_RUNSCENE);
        //this.playMusic();
    };

    me.gameStateShowGame = function(tickEvent) {
        console.log("GAME SCREEN");
        var scene = new abcya.GameScreen();
        scene.on(abcya.GameStateEvents.GE_SHOW_INTRO, this.onStateEvent, this, false, {state:abcya.GameStates.GS_INTRO});
        game.stage.addChild(scene);
        this.currentScene = scene;
        this.changeState(abcya.GameStates.GS_RUNSCENE);
    };

    me.onStateEvent = function(e, obj) {
        this.changeState(obj.state);
    };

    me.gameLoop = function(e) {
        if(this.currentStateFunction != null) {
            this.currentStateFunction(e);
        }

        //this.fpsLabel.text = Math.floor(createjs.Ticker.getMeasuredFPS()) + " fps";
        game.stage.update(e);
    };

    me.controlMusic = function(e){
        if(e._musicOn == true){
            if(this.music == null) this.playMusic();
        }else{
            game.themePlaying = false;
            if(this.music != null){
                this.music.stop();
                this.music = null;
            }
        }
    };

    me.playMusic = function(){
        this.music = createjs.Sound.play("intro",{loop:-1});
        game.themePlaying = true;
    };

    me.layoutScreens = function() {

        if(!this.currentScene) return;
        var bgName = (game.isWidescreen) ? "mainBgWide" : "mainBg";
        this.gameBg.image = game.assets.getAsset(bgName);

        if(this.currentScene.layoutRatio){} this.currentScene.layoutRatio();
    };

    me.debugStuff = function(debugMessage){
        this.fpsLabel.text = debugMessage;
    };

    window.abcya.SceneManager = SceneManager;

}(window));