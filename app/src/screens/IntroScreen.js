(function (window) {
    window.abcya = window.abcya || {};

    function IntroScreen() {
        this.Container_constructor();
        this.initialize();
    }

    var me = IntroScreen.prototype = createjs.extend(IntroScreen, createjs.Container);

    me.title1 = null;
    me.goBtn = null;
    me.helpBtn = null;
    me.goCont = null;

    me.instCont = null;
    me.xBtn = null;
    me.instBG = null;
    me.instructPanel = null;
    me.easyBtn = null;
    me.medBtn = null;
    me.hardBtn = null;

    me.introSound = null;
    me.clickSound = null;
    me.diffText = null;

    me.mag = null;
    me.magneto = null;
    me.cable = null;
    me.beast = null;
    me.colossus = null;
    me.bishop = null;
    me.rogue = null;
    me.wolverine = null;
    me.gambit = null;
    me.xavier = null;
    me.cyclops = null;
    me.storm = null;


    me.initialize = function () {
        this.goBtn = new createjs.Bitmap(game.assets.getAsset("goBtn"));
        this.goCont = new createjs.Container();
        this.goCont.scaleX = this.goCont.scaleY = 0;

        this.helpBtn = new createjs.Bitmap(game.assets.getAsset("helpBtn"));
        this.helpBtn.regX = 1;
        this.helpBtn.alpha = 0;

        this.mag = new createjs.Bitmap(game.assets.getAsset("magnetoL"));
        this.mag.regY = this.mag.getBounds().height/2;

        this.title1 = new createjs.Bitmap(game.assets.getAsset("title1"));
        this.title1.regY = this.title1.getBounds().height;

        this.cable = new createjs.Bitmap(game.assets.getAsset("cable"));
        this.beast = new createjs.Bitmap(game.assets.getAsset("beast"));
        this.colossus = new createjs.Bitmap(game.assets.getAsset("colossus"));
        this.bishop = new createjs.Bitmap(game.assets.getAsset("bishop"));
        this.rogue = new createjs.Bitmap(game.assets.getAsset("rogue"));
        this.wolverine = new createjs.Bitmap(game.assets.getAsset("wolverine"));
        this.gambit = new createjs.Bitmap(game.assets.getAsset("gambit"));
        this.xavier = new createjs.Bitmap(game.assets.getAsset("xavier"));
        this.cyclops = new createjs.Bitmap(game.assets.getAsset("cyclops"));
        this.storm = new createjs.Bitmap(game.assets.getAsset("storm"));

        if(abcya.GamePlayEvents.EASY_MODE){
            this.diffText = createOutlineTxt("DIFFICULTY: EASY", "Trebuchet MS", "16", "#000000", "#3E3ce1", 3);
        }
        if(abcya.GamePlayEvents.MED_MODE){
            this.diffText = createOutlineTxt("DIFFICULTY: MEDIUM", "Trebuchet MS", "16", "#000000", "#fff200", 3);
        }
        if(abcya.GamePlayEvents.HARD_MODE){
            this.diffText = createOutlineTxt("DIFFICULTY: HARD", "Trebuchet MS", "16", "#000000", "#ff0000", 3);
        }

        this.introItems = [this.mag, this.title1];
        this.smallGuys = [this.cable, this.beast, this.colossus, this.bishop, this.wolverine, this.rogue, this.gambit, this.xavier, this.cyclops, this.storm];

        reRegisterItems([this.diffText, this.goBtn, this.mag], "center");
        reRegisterItems(this.smallGuys, "centerRight");

        //document.getElementById("gameCanvas").width
        var helppos = (game.isWidescreen) ? {x:-this.helpBtn.getBounds().width, y:100} : {x:-this.helpBtn.getBounds().width, y:100};
        var playpos = (game.isWidescreen) ? {x:game.screen_width-this.goBtn.getBounds().width, y:(game.screen_height-this.goBtn.getBounds().height)-50} : {x:(game.screen_width-this.goBtn.getBounds().width)-25, y:(game.screen_height-this.goBtn.getBounds().height)-70};
        var magpos = (game.isWidescreen) ? {x:100, y:game.screen_height} : {x:this.mag.getBounds().width/2 + 125, y:game.screen_height};
        var title1pos = (game.isWidescreen) ? {x:(game.screen_width-this.title1.getBounds().width)-40, y:100} : {x:(game.screen_width-this.title1.getBounds().width)-40,y:100};

        this.setObjectPosition(this.helpBtn, helppos.x, helppos.y);
        this.setObjectPosition(this.goCont, playpos.x, playpos.y);
        this.setObjectPosition(this.mag, magpos.x, magpos.y);
        this.setObjectPosition(this.title1, title1pos.x, title1pos.y);
        this.setObjectPosition(this.diffText, this.goBtn.x, this.goBtn.y + 120);

        var i = 0;
        while(i < this.introItems.length){
            var item = this.introItems[i];
            item.alpha = 0;
            this.addChild(item);
            i++;
        }

        for(var t = 0; t < 5; t++){
            var itempos=null;
            if(t>0){
                itempos = (game.isWidescreen) ? {x:this.smallGuys[t-1].x+this.smallGuys[t].getBounds().width/1.25, y:game.screen_height-this.smallGuys[t].getBounds().height} : {x:this.smallGuys[t-1].x+this.smallGuys[t].getBounds().width/1.25, y:game.screen_height-this.smallGuys[t].getBounds().height};
            }else{
                itempos = (game.isWidescreen) ? {x:this.smallGuys[t].getBounds().width, y:game.screen_height-this.smallGuys[t].getBounds().height} : {x:this.smallGuys[t].getBounds().width+25, y:game.screen_height-this.smallGuys[t].getBounds().height};
            }
            this.smallGuys[t].alpha = 0;
            this.smallGuys[t].scaleX = this.smallGuys[t].scaleY = 0;
            this.setObjectPosition(this.smallGuys[t],itempos.x,itempos.y);
            this.addChild(this.smallGuys[t]);
        }

        for(var r = 5; r < this.smallGuys.length; r++){
            var itempos2=null;
            if(r>5){
                itempos2 = (game.isWidescreen) ? {x:this.smallGuys[r-1].x+this.smallGuys[r].getBounds().width/1.25, y:game.screen_height-this.smallGuys[r].getBounds().height/2} : {x:this.smallGuys[r-1].x+this.smallGuys[r].getBounds().width/1.25, y:game.screen_height-this.smallGuys[r].getBounds().height/2};
            }else{
                itempos2 = (game.isWidescreen) ? {x:this.smallGuys[r].getBounds().width, y:game.screen_height-this.smallGuys[r].getBounds().height/2} : {x:this.smallGuys[r].getBounds().width*1.5+25, y:game.screen_height-this.smallGuys[r].getBounds().height/2};
            }
            this.smallGuys[r].alpha = 0;
            this.smallGuys[r].scaleX = this.smallGuys[r].scaleY = 0;
            this.setObjectPosition(this.smallGuys[r],itempos2.x,itempos2 .y);
            this.addChild(this.smallGuys[r])
        }

        this.goCont.addChild(this.goBtn, this.diffText);
        this.addChild(this.helpBtn, this.goCont);
        this.startIntro();
    };

    me.startIntro = function(){
        this.introSound = createjs.Sound.play("themeSong");

        reRegisterItems(this.smallGuys, "center");

        var totalItems = this.introItems.length;
        while(this.introItems.length > 0){
            var rIndex = getRandom(0,this.introItems.length - 1);
            var rItem = this.introItems[rIndex];
            if(this.introItems.length == 1){
                createjs.Tween.get(rItem).wait(200 * (totalItems - this.introItems.length)).to({alpha:1,y:game.screen_height/2},1000,createjs.Ease.backOut).call(this.introReady,[],this);
            }else{
                createjs.Tween.get(rItem).wait(200 * (totalItems - this.introItems.length)).to({alpha:1,y:game.screen_height/2},1000,createjs.Ease.backOut);
            }

            this.introItems.splice(rIndex,1);
        }

        for(var r = 0; r < this.smallGuys.length; r++){
            this.smallGuys[r].x = this.smallGuys[r].x-75;
            createjs.Tween.get(this.smallGuys[r]).wait(100 * r).to({alpha:1, scaleX:1, scaleY:1},300,createjs.Ease.bounceOut);
        }
    };

    me.introReady = function(){
        createjs.Tween.get(this.helpBtn).to({alpha:1,x:0},500,createjs.Ease.quintOut);
        createjs.Tween.get(this.goCont).to({scaleX:1,scaleY:1},500,createjs.Ease.elasticOut);
        createjs.Tween.get(this.mag, {loop:true}).to({y:334}, 2500, createjs.Ease.cubicInOut).to({y:384}, 2500, createjs.Ease.cubicInOut);

        this.goBtn.on("click", this.dismissIntro, this, true);
        this.helpBtn.on("click", this.showInstructions, this, true);
    };

    me.showInstructions = function(){
        this.clickSound = createjs.Sound.play("clickSound");

        if(abcya.GamePlayEvents.EASY_MODE){
            this.createInstructions("easy");
        }
        if(abcya.GamePlayEvents.MED_MODE){
            this.createInstructions("med");
        }
        if(abcya.GamePlayEvents.HARD_MODE){
            this.createInstructions("hard");
        }
    };

    me.createInstructions = function(diff){
        var currentDiff = diff;
        console.log(currentDiff);

        this.instCont = new createjs.Container();
        this.instructPanel = new createjs.Bitmap(game.assets.getAsset("instructions"));
        this.xBtn = new createjs.Bitmap(game.assets.getAsset("xBtn"));
        this.easyBtn = new createjs.Bitmap(game.assets.getAsset("easyBtn"));
        this.medBtn = new createjs.Bitmap(game.assets.getAsset("medBtn"));
        this.hardBtn = new createjs.Bitmap(game.assets.getAsset("hardBtn"));

        this.instBG = new createjs.Shape();
        this.instBG.graphics.beginFill("#000000").drawRect(0, 0, game.screen_width, game.screen_height);
        this.instBG.alpha = 0;

        if(currentDiff == "easy"){
            this.easyBtn.alpha = .25;
            this.medBtn.alpha = 1;
            this.hardBtn.alpha = 1;
        }
        if(currentDiff == "med"){
            this.easyBtn.alpha = 1;
            this.medBtn.alpha = .25;
            this.hardBtn.alpha = 1;
        }
        if(currentDiff == "hard"){
            this.easyBtn.alpha = 1;
            this.medBtn.alpha = 1;
            this.hardBtn.alpha = .25;
        }

        reRegisterItems([this.instructPanel, this.xBtn, this.easyBtn, this.medBtn, this.hardBtn], "center");

        this.setObjectPosition(this.xBtn, 295, -295);
        this.setObjectPosition(this.easyBtn, -150, 230);
        this.setObjectPosition(this.medBtn, 0, 230);
        this.setObjectPosition(this.hardBtn, 150, 230);
        this.setObjectPosition(this.instCont, game.screen_width/2, 0);

        this.addChild(this.instBG);
        this.instCont.addChild(this.instructPanel, this.xBtn, this.easyBtn, this.medBtn, this.hardBtn);
        this.addChild(this.instCont);

        createjs.Tween.get(this.instBG).to({alpha:.85}, 500);
        createjs.Tween.get(this.instCont).to({y:game.screen_height/2}, 500, createjs.Ease.backOut).call(this.instructReady,[currentDiff],this);
    };

    me.instructReady = function(diff){
        this.xBtn.on("click", this.dismissInstructions, this, true);
        if(diff == "easy"){
            this.medBtn.on("click", this.setDiff, this, true);
            this.hardBtn.on("click", this.setDiff, this, true);
        }
        if(diff == "med"){
            this.easyBtn.on("click", this.setDiff, this, true);
            this.hardBtn.on("click", this.setDiff, this, true);
        }
        if(diff == "hard"){
            this.easyBtn.on("click", this.setDiff, this, true);
            this.medBtn.on("click", this.setDiff, this, true);
        }
    };

    me.setDiff = function(e){
        this.easyBtn.removeAllEventListeners();
        this.medBtn.removeAllEventListeners();
        this.hardBtn.removeAllEventListeners();
        
        if(e.currentTarget == this.easyBtn){
            this.easyBtn.alpha = .25;
            this.medBtn.alpha = 1;
            this.hardBtn.alpha = 1;
            this.medBtn.on("click", this.setDiff, this, true);
            this.hardBtn.on("click", this.setDiff, this, true);

            abcya.GamePlayEvents.EASY_MODE = true;
            abcya.GamePlayEvents.MED_MODE = false;
            abcya.GamePlayEvents.HARD_MODE = false;

            this.diffText.getChildAt(0).text = "DIFFICULTY: EASY";
            this.diffText.getChildAt(1).text = "DIFFICULTY: EASY";
            this.diffText.getChildAt(1).color = "#3E3ce1";
            this.setObjectPosition(this.diffText, this.goBtn.x + 13, this.goBtn.y + 120);
        }
        if(e.currentTarget == this.medBtn){
            this.easyBtn.alpha = 1;
            this.medBtn.alpha = .25;
            this.hardBtn.alpha = 1;
            this.easyBtn.on("click", this.setDiff, this, true);
            this.hardBtn.on("click", this.setDiff, this, true);

            abcya.GamePlayEvents.EASY_MODE = false;
            abcya.GamePlayEvents.MED_MODE = true;
            abcya.GamePlayEvents.HARD_MODE = false;

            this.diffText.getChildAt(0).text = "DIFFICULTY: MEDIUM";
            this.diffText.getChildAt(1).text = "DIFFICULTY: MEDIUM";
            this.diffText.getChildAt(1).color = "#fff200";
            this.setObjectPosition(this.diffText, this.goBtn.x, this.goBtn.y + 120);
        }
        if(e.currentTarget == this.hardBtn){
            this.easyBtn.alpha = 1;
            this.medBtn.alpha = 1;
            this.hardBtn.alpha = .25;
            this.easyBtn.on("click", this.setDiff, this, true);
            this.medBtn.on("click", this.setDiff, this, true);

            abcya.GamePlayEvents.EASY_MODE = false;
            abcya.GamePlayEvents.MED_MODE = false;
            abcya.GamePlayEvents.HARD_MODE = true;

            this.diffText.getChildAt(0).text = "DIFFICULTY: HARD";
            this.diffText.getChildAt(1).text = "DIFFICULTY: HARD";
            this.diffText.getChildAt(1).color = "#ff0000";
            this.setObjectPosition(this.diffText, this.goBtn.x + 13, this.goBtn.y + 120);
        }
    };

    me.dismissInstructions = function(){
        this.clickSound = createjs.Sound.play("clickSound");

        while(this.instCont.getNumChildren() > 0){
            this.instCont.removeChild(this.instCont.getChildAt(0));
        }
        this.removeChild(this.instCont, this.instBG);

        this.helpBtn.on("click", this.showInstructions, this, true);
    };

    me.dismissIntro = function(){
        if(this.introSound) this.introSound.stop();
        this.clickSound = createjs.Sound.play("shuffleSound");

        this.helpBtn.removeAllEventListeners();

        createjs.Tween.get(this.helpBtn).to({x:-100}, 500, createjs.Ease.cubicIn);
        createjs.Tween.get(this.goCont).to({scaleX:0, scaleY:0}, 500, createjs.Ease.backIn);
        createjs.Tween.get(this.title1).to({y:-100}, 500, createjs.Ease.backIn);
        for(var r = 0; r < this.smallGuys.length; r++){
            var randRot = getRandom(-540, 540);
            if(r == this.smallGuys.length-1){
                createjs.Tween.get(this.smallGuys[r]).wait(100 * r).to({x:this.mag.x-100, y:this.mag.y-70, scaleX:0, scaleY:0, rotation:randRot},750,createjs.Ease.backIn).call(this.moveMag,[],this);
            }else{
                createjs.Tween.get(this.smallGuys[r]).wait(100 * r).to({x:this.mag.x-100, y:this.mag.y-70, scaleX:0, scaleY:0, rotation:randRot},750,createjs.Ease.backIn);
            }

        }
        createjs.Tween.get(this.mag, {override:true}).to({y:game.screen_height/2}, 1000, createjs.Ease.cubicIn);
    };

    me.moveMag = function(){
        createjs.Tween.get(this.mag, {override:true}).to({scaleX: 0, x:this.mag.x -150, y:0, alpha:0}, 500, createjs.Ease.backIn).call(this.destroyIntro,[],this);
    };


    me.destroyIntro = function(){
        while(this.getNumChildren() > 0){
            this.removeChild(this.getChildAt(0));
        }

        //game.stage.removeChild(this);
        this.dispatchEvent(abcya.GameStateEvents.GE_SHOW_GAME);
    };

    me.setObjectPosition = function(obj,xPos,yPos){
        obj.x = xPos;
        obj.y = yPos;
    };

    me.tick = function(tickevent){

    };

    me.layoutRatio = function(){

    };

    window.abcya.IntroScreen = createjs.promote(IntroScreen, "Container");

}(window));