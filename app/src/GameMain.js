(function (window) {

    window.abcya = window.abcya || {}

    function GameMain() {
        this.initialize();
    }
    GameMain.prototype = {};


    // Game vars
    GameMain.prototype.canvas = null;
    GameMain.prototype.gameWrapper = null;
    GameMain.prototype.stage = null;
    GameMain.prototype.screen_width = null;
    GameMain.prototype.screen_height = null;
    GameMain.prototype.isWidescreen = null;
    GameMain.prototype.hasFocus = true;
    GameMain.prototype.isPaused = true;
    GameMain.prototype.platformData = null;
    GameMain.prototype.preloader = null;
    GameMain.prototype.sceneManager = null;
    GameMain.prototype.assets = null;
    GameMain.prototype.orientation = null;
    GameMain.prototype.orientationDimensions = null;
    GameMain.prototype.isMuted = false;
    GameMain.prototype.force43 = false;


    GameMain.prototype.initialize = function() { // Contructor


        this.orientation = abcya.GameConfig.GAME_ORIENTATION;
        this.platformData = initGamePlatformData(this.orientation);

        // Set up cavas var
        this.canvas = document.getElementById("gameCanvas");
        this.gameWrapper = document.getElementById("gameWrapper");


        // Set up createjs
        this.stage = new createjs.Stage(this.canvas);

        if (this.orientation.toLowerCase() === abcya.GameConstants.PORTRAIT.toLowerCase()) {
            this.orientationDimensions = {
                normal:{width:abcya.GameConstants.ORIENTATION_DIMS[1], height:abcya.GameConstants.ORIENTATION_DIMS[0]},
                widescreen:{width:abcya.GameConstants.ORIENTATION_DIMS[2], height:abcya.GameConstants.ORIENTATION_DIMS[0]}
            };
        }else{
            this.orientationDimensions = {
                normal:{width:abcya.GameConstants.ORIENTATION_DIMS[0], height:abcya.GameConstants.ORIENTATION_DIMS[1]},
                widescreen:{width:abcya.GameConstants.ORIENTATION_DIMS[0], height:abcya.GameConstants.ORIENTATION_DIMS[2]}
            };
        }

        this.stage.width = this.orientationDimensions.normal.width;
        this.stage.height = this.orientationDimensions.normal.height;

        //use to be in the GameMain initPlatform function so I moved it here
        if(this.platformData.allowsTouch === true){

            if (createjs.Touch.isSupported()) {
                createjs.Touch.enable(this.stage);
            }
        }

        // Set up the ticker
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.maxDelta = 50;
        createjs.Ticker.setFPS(abcya.GameConfig.FPS);// don't think this is doing anything anymore if RAF ends up on (all recent browsers)

        //event to force focus with view
        window.parent.addEventListener("view_focus_change", this.setPaused.bind(this),false);
        window.parent.addEventListener("view_fullscreen_change", this.toggleFullscreen.bind(this),false);
    };

    GameMain.prototype.setPaused = function(e){

        //if view has focus then we are paused
        this.isPaused = e.detail.hasFocus;
    };

    GameMain.prototype.toggleFullscreen = function(e){

        this.resizeGame()
    };

    /**
     Sets the isWidescreen variable, screen_width/height, and the DOM image we are using for game size.
     Will call any current screens to do their own layout routine if ratio has changed since setup.
     **/
    GameMain.prototype.setGameRatio = function() {
        if (this.platformData.force43 === true) {
            this.force4x3();
            return;
        }
        var w1 = window.innerWidth;
        var h1 = window.innerHeight;
        var w = Math.max(w1, h1);
        var h = Math.min(w1, h1);
        var aspectRatio = w / h;
        var prevRatio = this.isWidescreen;

        if (aspectRatio < 1.4) {
            this.isWidescreen = false;
            this.stage.canvas.width = this.orientationDimensions.normal.width;
            this.stage.canvas.height = this.orientationDimensions.normal.height;
        }else{
            this.isWidescreen = true;
            this.stage.canvas.width = this.orientationDimensions.widescreen.width;
            this.stage.canvas.height = this.orientationDimensions.widescreen.height;
        }

        this.screen_width = this.canvas.width;
        this.screen_height = this.canvas.height;

        var bgImg = (this.isWidescreen) ? "BlankBackground_16x9.png" : "BlankBackground_4x3.png";
        document.getElementById("bg").src =  abcya.GameConstants.COMMON_IMAGE_ASSETS_PATH + this.orientation + bgImg;

        if (game && prevRatio != this.isWidescreen) this.layoutScreens();
    };

    GameMain.prototype.force4x3 = function() { //!!TODO: We prob don't wanna change the canvas every time, should only need to do it once on startup
        var prevRatio = this.isWidescreen;
        this.isWidescreen = false;
        this.stage.canvas.width = this.orientationDimensions.normal.width;
        this.stage.canvas.height = this.orientationDimensions.normal.height;
        this.screen_width = this.canvas.width;
        this.screen_height = this.canvas.height;

        var bgImg = (this.isWidescreen) ? "BlankBackground_16x9.png" : "BlankBackground_4x3.png";
        document.getElementById("bg").src = abcya.GameConstants.COMMON_IMAGE_ASSETS_PATH + this.orientation + bgImg;

        if (game && prevRatio != this.isWidescreen) this.layoutScreens();
    };


    /**
     *  Set the scale of DOM elements to fit our available screen based on aspect ratio
     */
    GameMain.prototype.resizeGame = function() {
        window.top.scrollTo(0,0);

        this.setGameRatio();

        var gameWrapper = document.getElementById("gameWrapper");
        var bgImage = document.getElementById("bg");

        var w1 = window.innerWidth;
        var h1 = window.innerHeight;
        var w = Math.max(w1, h1);
        var h = Math.min(w1, h1);

        var widthToHeight = this.screen_width / this.screen_height;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;
        var scale, newLeft = 0, newTop=0;
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            scale = newWidth / this.screen_width;
        } else {
            newHeight = newWidth / widthToHeight;
            scale = newHeight / this.screen_height;
        }

        if (this.platformData.maxViewScale > 0 && scale > this.platformData.maxViewScale) {
            scale = 1.0;
            newLeft = (w1 - game.screen_width) / 2;
            newTop = (h1 - game.screen_height) / 2;

        }else{
            newTop = (h1-newHeight) / 2;
            newLeft = (w1 - newWidth) / 2;
        }

        this.curCSSLeft = newLeft;
        this.curCSSTop = newTop;
        this.curCSSScale = scale;

        gameWrapper.style.left = pxValue(newLeft);
        gameWrapper.style.top = pxValue(newTop);
        this.canvas.style.left = pxValue(newLeft);
        this.canvas.style.top = pxValue(newTop);

        //small change here, transform prefix is now property of platform data object
        bgImage.setAttribute("style", this.platformData.tranformTypePrefix + "transform:scale(" + scale + ")");
        this.canvas.setAttribute("style", this.platformData.tranformTypePrefix + "transform:scale(" + scale + ")");

        //portrait check removed to view
        this.stage.update();//TODO: get this only when ticker isn't going
    };



    GameMain.prototype.focusCheck = function(e) {
        if (e.type == 'pagehide' || e.type == 'blur' || document['hidden'] == true || document['webkitHidden'] == true)    {
            game.hasFocus = false;
        } else {
            game.hasFocus = true;
        }

        if (game.sceneManager && game.sceneManager.gameFocusChange) game.sceneManager.gameFocusChange();
    };


    /**
     * window function like exit, fullscreen  and orientation moved to game view
     */

    /**
     *   Called from main js init() function AFTER creation so global game variable is all set
     */
    GameMain.prototype.initGame = function() {

        //resize init is now the same for mobile and desktop
        window.onresize = this.resizeGame.bind(this);
        //and both need to resize after, mobile was being done with orientationChange before;


        document.addEventListener('visibilitychange', this.focusCheck, false);
        document.addEventListener('webkitvisibilitychange', this.focusCheck, false);
        document.addEventListener('pagehide', this.focusCheck, false);
        document.addEventListener('pageshow', this.focusCheck, false);

        this.assets = new abcya.AssetsManager();
        game.assets = this.assets;
        this.assets.setDownloadCompleted(this.handlePreloadComplete.bind(this)); // Call function when download is complete
        this.assets.startPreload();
    };

    /**
     *  When we are ready to display the preloader display
     */
    GameMain.prototype.handlePreloadComplete = function() {

        this.resizeGame();

        this.preloader = new abcya.PreloadScreen();
        this.preloader.on("PRELOAD_CLICK", this.startGame, this);
        this.stage.addChild(this.preloader);
        this.stage.update(); // Ticker isn't going yet
        // Start real download
        this.assets.setDownloadCompleted(this.gameAssetsReady.bind(this)); // Call function when download is complete
        this.assets.setPreloadViewUpdate(this.preloader);
        this.assets.startDownload();

        // Show the canvas div now that there is something there -- preventing the flicker
        document.getElementById("gameWrapper").style.visibility = "visible";
    };

    GameMain.prototype.gameAssetsReady = function() {
        this.preloader.addClick();
        this.stage.update(); // Ticker isn't going yet
    };

    GameMain.prototype.startGame = function(e) {
        this.stage.removeChild(this.preloader);
        this.preloader = null;
        this.sceneManager = new abcya.SceneManager();

    };

    GameMain.prototype.playSound = function(value, loop, delay) {
        var snd = null;
        if (!loop) loop = 0;
        if (loop === true) loop = -1;
        if (!delay) delay = 0;
        if (!game.isMuted) {
            var ppc = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: loop, delay:delay});
            snd = createjs.Sound.play(value, ppc);
        }
        return snd;
    };

    /**
     * Called from resize function, I moved this here because of the move of the preloader from outside the state machine -- It used to called the state machine directly
     */
    GameMain.prototype.layoutScreens = function() {
        if (this.preloader) {
            this.preloader.layoutRatio();
        }else if (this.sceneManager) {
            this.sceneManager.layoutScreens();
        }
    };

    //endregion

    window.abcya.GameMain = GameMain;
}(window));