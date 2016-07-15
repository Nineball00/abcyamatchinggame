(function (window) {
    window.abcya = window.abcya || {};

    function GameScreen() {
        this.Container_constructor();
        this.initialize();
    }

    var me = GameScreen.prototype = createjs.extend(GameScreen, createjs.Container);

    me.endCont = null;
    me.endPanel = null;
    me.endBG = null;
    me.goBtn = null;
    me.homeBtn = null;

    me.clickSound = null;
    me.tBoard = null;
    me.sBoard = null;
    me.goHome = null;

    me.initialize = function () {
        console.log("INST HAS LOADED");
        this.goHome = false;

        this.tBoard = new abcya.TileBoard(this.sBoard);
        this.sBoard = new abcya.ScoreBoard(this.tBoard, this);
        this.addChild(this.tBoard, this.sBoard);

        this.tBoard.setScoreBoard(this.sBoard);

        this.tBoard.x = game.screen_width/2 + this.tBoard.getBounds().width/4;
        this.tBoard.y = game.screen_height/2;

        this.sBoard.x = -this.sBoard.getBounds().width;
        this.sBoard.y = game.screen_height/2;
    };

    me.createEnding = function(winFail){
        createjs.Tween.removeAllTweens();

        if(winFail == "win"){
            this.endPanel = new createjs.Bitmap(game.assets.getAsset("endWin"));
        }
        if(winFail == "fail"){
            this.endPanel = new createjs.Bitmap(game.assets.getAsset("endFail"));
        }

        this.endCont = new createjs.Container();

        this.goBtn = new createjs.Bitmap(game.assets.getAsset("goBtn"));
        this.goBtn.scaleX = this.goBtn.scaleY = .8;
        this.homeBtn = new createjs.Bitmap(game.assets.getAsset("homeBtn"));
        this.homeBtn.scaleX = this.homeBtn.scaleY = .8;

        this.endBG = new createjs.Shape();
        this.endBG.graphics.beginFill("#000000").drawRect(0, 0, game.screen_width, game.screen_height);
        this.endBG.alpha = 0;

        reRegisterItems([this.endPanel, this.goBtn, this.homeBtn], "center");
        this.tBoard.setListeners("off", false);

        this.setObjectPosition(this.homeBtn, -100, 115);
        this.setObjectPosition(this.goBtn, 75, 115);
        this.setObjectPosition(this.endCont, game.screen_width/2, 0);

        this.endCont.addChild(this.endPanel, this.goBtn, this.homeBtn);
        this.addChild(this.endBG, this.endCont);

        createjs.Tween.get(this.endBG).to({alpha:.85}, 500);
        createjs.Tween.get(this.endCont).to({y:game.screen_height/2}, 500, createjs.Ease.backOut).call(this.endingReady,[winFail],this);
    };

    me.endingReady = function(){
        this.tBoard.setListeners("off", false);
        this.goBtn.on("click", this.dismissEnding, this, true);
        this.homeBtn.on("click", this.dismissEnding, this, true);
    };

    me.dismissEnding = function(e){
        console.log(e.currentTarget);
        this.tBoard.setListeners("off", false);
        this.clickSound = createjs.Sound.play("clickSound");

        if(e.currentTarget == this.homeBtn){
            this.goHome = true;
        }

        while(this.endCont.getNumChildren() > 0){
            this.endCont.removeChild(this.endCont.getChildAt(0));
        }
        this.removeChild(this.endCont, this.endBG);
        this.cleanUp();
    };

    me.setObjectPosition = function(obj,xPos,yPos){
        obj.x = xPos;
        obj.y = yPos;
    };

    me.tick = function(tickevent){

    };

    me.layoutRatio = function(){

    };

    me.cleanUp = function(){
        if(this.instSound){
            this.instSound.stop();
            this.instSound = null;
        }

        while(this.getNumChildren() > 0){
            this.removeChild(this.getChildAt(0));
        }

        if(this.goHome == true){
            this.dispatchEvent(abcya.GameStateEvents.GE_SHOW_INTRO);
        }else{
            this.initialize();
        }
    };

    window.abcya.GameScreen = createjs.promote(GameScreen, "Container");

}(window));