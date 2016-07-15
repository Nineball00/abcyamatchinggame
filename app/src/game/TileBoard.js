(function (window) {
    window.abcya = window.abcya || {};

    function TileBoard() {
        this.Container_constructor();
        this.initialize();
    }

    var me = TileBoard.prototype = createjs.extend(TileBoard, createjs.Container);
    
    me.tileCont = null;
    me.tileBG = null;
    me.tempTile = null;

    me.tileArray = null;
    me.resetTileArray = null;
    me.tileNameArray = null;

    me.sBoard = null;
    me.instruct = null;

    me.initialize = function () {
        this.tileArray = [];
        this.tileNameArray = [];
        this.resetTileArray = [];

        this.tileCont = new createjs.Container();
        this.tileBG = new createjs.Bitmap(game.assets.getAsset("Tbg"));
        this.tileCont.addChild(this.tileBG);
        this.addChild(this.tileCont);

        reRegisterItems([this.tileBG], "center");
        this.tileCont.addChild(this.tileBG);

        shuffleArray(this.tileArray);
        this.posTiles();

        this.createInstruct();
    };

    me.createInstruct = function(){
        this.instruct = new abcya.GameInstructions(this);
        this.addChild(this.instruct);
    };

    me.initTiles = function(){
        for(var t = 0; t < this.tileArray.length; t++){
            this.tileArray[t].alpha = 1;
            if(t == this.tileArray.length-1){
                createjs.Tween.get(this.tileArray[t]).wait(100 * t).to({x:this.tileArray[t].getPos(0), y:this.tileArray[t].getPos(1)},500,createjs.Ease.backIn).call(this.startGame,[],this);
            }else{
                createjs.Tween.get(this.tileArray[t]).wait(100 * t).to({x:this.tileArray[t].getPos(0), y:this.tileArray[t].getPos(1)},500,createjs.Ease.backIn);
            }
        }
    };

    me.startGame = function(){
        this.sBoard.setClock(this.sBoard.clockTime, this.sBoard.timeText);

        this.setListeners("on", false);
    };

    me.createTiles = function(amount){
        for(var i = 0; i < amount; i++){
            this.tempTile = new abcya.GameTile(i, this);
            this.tileCont.addChild(this.tempTile);
            this.tileArray.push(this.tempTile);
            this.tempTile.alpha = 0;
            //this.tempTile.scaleX = this.tempTile.scaleY = 0;
        }

        shuffleArray(this.tileArray);
    };

    me.revealTile = function(e){
        this.clickSound = createjs.Sound.play("swooshSound");
        var targ = e.currentTarget;
        this.tileNameArray.push(targ);
        createjs.Tween.get(targ).to({y:targ.y-20, scaleX:0},300,createjs.Ease.backIn).call(this.showXmen,[targ],this);

        this.setListeners("off", false);
    };

    me.showXmen = function(targ){
        var tile = targ;
        tile.toBack();
        tile.scaleX = 0;
        createjs.Tween.get(tile).to({y:targ.y+20, scaleX:1},300,createjs.Ease.backOut).call(this.compareTiles,[tile],this);
    };

    me.resetTiles = function(){
        for(var t = 0; t < this.tileArray.length; t++){
            this.resetTileArray.push([this.tileArray[t].getPos(0), this.tileArray[t].getPos(1)]);
       }

        for(var o = 0; o < this.tileArray.length; o++){
            if(o == this.tileArray.length-1){
                createjs.Tween.get(this.tileArray[o]).to({x:0, y:0},1000,createjs.Ease.backIn).call(this.setTiles,[],this);
            }else{
                createjs.Tween.get(this.tileArray[o]).to({x:0, y:0},1000,createjs.Ease.backIn);
            }
        }
    };

    me.setTiles = function(){
        shuffleArray(this.tileArray);
        console.log("RESETTING POSITIONS");

        for(var o = 0; o < this.tileArray.length; o++){
            if(o == this.tileArray.length-1){
                createjs.Tween.get(this.tileArray[o]).to({x:this.resetTileArray[o][0], y:this.resetTileArray[o][1]},1000,createjs.Ease.backIn).call(this.setListeners,["on", true],this)
            }else{
                createjs.Tween.get(this.tileArray[o]).to({x:this.resetTileArray[o][0], y:this.resetTileArray[o][1]},1000,createjs.Ease.backIn);
            }
        }
    };

    me.checkPos = function(){
        for(var o = 0; o < this.tileArray.length; o++){
            this.tileArray[o].setPos(this.tileArray[o].x, this.tileArray[o].y);
        }
    };

    me.showFront = function(targ, isMag, isSecond){
        var tile = targ;
        tile.toFront();
        tile.scaleX = 0;

        if(isMag == true){
            createjs.Tween.get(tile).to({y:targ.y+20, scaleX:1},400,createjs.Ease.backOut).call(this.resetTiles,[],this);
        }

        if(isSecond == true){
            createjs.Tween.get(tile).to({y:targ.y+20, scaleX:1},300,createjs.Ease.backOut).call(this.setListeners,["on", false],this);
        }else{
            createjs.Tween.get(tile).to({y:targ.y+20, scaleX:1},300,createjs.Ease.backOut);
        }

    };

    me.setListeners = function(type, check){
        var onOff = type;

        if(check == true){
            this.checkPos();
        }
        if(onOff == "on"){
            for(var o = 0; o < this.tileArray.length; o++){
                this.tileArray[o].removeAllEventListeners();
                this.tileArray[o].on("click", this.revealTile, this, true);
            }
        }
        if(onOff == "off"){
            for(var r = 0; r < this.tileArray.length; r++){
                this.tileArray[r].removeAllEventListeners();
            }
        }
    };

    me.posTiles = function(){
        if(abcya.GamePlayEvents.EASY_MODE){
            console.log("EASY MODE SELECTED");
            this.createTiles(13);

            for(var m = 0; m < this.tileArray.length; m++) {
                if (m == 0) {
                    this.tileArray[m].setPos((-this.tileBG.getBounds().width / 2 + this.tileArray[m].getBounds().width / 2 + 15), (-this.tileBG.getBounds().height / 2 + this.tileArray[m].getBounds().height / 2 + 20));
                }
                if (m == 1) {
                    this.tileArray[m].setPos((this.tileArray[0].getPos(0) + (this.tileArray[m].getBounds().width * 4) + 20), (this.tileArray[0].getPos(1)));
                }
                if(m == 2){
                    this.tileArray[m].setPos((this.tileArray[0].getPos(0) + this.tileArray[m].getBounds().width + 5), (this.tileArray[0].getPos(1) + this.tileArray[m].getBounds().height + 5));
                }
                if(m > 2 && m < 5){
                    this.tileArray[m].setPos((this.tileArray[m - 1].getPos(0) + this.tileArray[m].getBounds().width + 5), (this.tileArray[2].getPos(1)));
                }
                if(m == 5){
                    this.tileArray[m].setPos((this.tileArray[2].getPos(0)), (this.tileArray[2].getPos(1) + this.tileArray[m].getBounds().height + 5));
                }
                if(m > 5 && m < 8){
                    this.tileArray[m].setPos((this.tileArray[m - 1].getPos(0) + this.tileArray[m].getBounds().width + 5), (this.tileArray[5].getPos(1)));
                }
                if(m == 8){
                    this.tileArray[m].setPos((this.tileArray[5].getPos(0)), (this.tileArray[5].getPos(1) + this.tileArray[m].getBounds().height + 5));
                }
                if(m > 8 && m < 11){
                    this.tileArray[m].setPos((this.tileArray[m - 1].getPos(0) + this.tileArray[m].getBounds().width + 5), (this.tileArray[8].getPos(1)));
                }
                if (m == 11) {
                    this.tileArray[m].setPos((this.tileArray[0].getPos(0)), (this.tileArray[8].getPos(1) + this.tileArray[m].getBounds().height + 5));
                }
                if (m == 12) {
                    this.tileArray[m].setPos((this.tileArray[1].getPos(0)), (this.tileArray[11].getPos(1)));
                }
            }
        }
        if(abcya.GamePlayEvents.MED_MODE){
            console.log("MEDIUM MODE SELECTED");
            this.createTiles(21);

            for(var t = 0; t < this.tileArray.length; t++) {
                if (t == 0) {
                    this.tileArray[t].setPos((-this.tileBG.getBounds().width / 2 + this.tileArray[t].getBounds().width / 2 + 15), (-this.tileBG.getBounds().height / 2 + this.tileArray[t].getBounds().height / 2 + 20));
                }
                if (t > 0 && t < 4) {
                    if (t == 2) {
                        this.tileArray[t].setPos((this.tileArray[t - 1].getPos(0) + (this.tileArray[t].getBounds().width * 2) + 10), (this.tileArray[0].getPos(1)));
                    } else {
                        this.tileArray[t].setPos((this.tileArray[t - 1].getPos(0) + this.tileArray[t].getBounds().width + 5), (this.tileArray[0].getPos(1)));
                    }
                }
                if(t == 4){
                    this.tileArray[t].setPos((this.tileArray[0].getPos(0)), (this.tileArray[0].getPos(1)+ this.tileArray[t].getBounds().height + 5));
                }
                if(t > 4 && t < 9){
                    this.tileArray[t].setPos((this.tileArray[t - 1].getPos(0) + this.tileArray[t].getBounds().width + 5), (this.tileArray[4].getPos(1)));
                }
                if(t == 9){
                    this.tileArray[t].setPos((this.tileArray[1].getPos(0)), (this.tileArray[4].getPos(1)+ this.tileArray[t].getBounds().height + 5));
                }
                if(t > 9 && t < 12){
                    this.tileArray[t].setPos((this.tileArray[t - 1].getPos(0) + this.tileArray[t].getBounds().width + 5), (this.tileArray[9].getPos(1)));
                }
                if(t == 12){
                    this.tileArray[t].setPos((this.tileArray[0].getPos(0)), (this.tileArray[9].getPos(1)+ this.tileArray[t].getBounds().height + 5));
                }
                if(t > 12 && t < 17){
                    this.tileArray[t].setPos((this.tileArray[t - 1].getPos(0) + this.tileArray[t].getBounds().width + 5), (this.tileArray[12].getPos(1)));
                }
                if(t == 17){
                    this.tileArray[t].setPos((this.tileArray[0].getPos(0)), (this.tileArray[12].getPos(1)+ this.tileArray[t].getBounds().height + 5));
                }
                if (t > 17 && t < 21) {
                    if (t == 19) {
                        this.tileArray[t].setPos((this.tileArray[t - 1].getPos(0) + (this.tileArray[t].getBounds().width * 2) + 10), (this.tileArray[17].getPos(1)));
                    } else {
                        this.tileArray[t].setPos((this.tileArray[t - 1].getPos(0) + this.tileArray[t].getBounds().width + 5), (this.tileArray[17].getPos(1)));
                    }
                }
            }
        }
        if(abcya.GamePlayEvents.HARD_MODE){
            console.log("HARD MODE SELECTED");
            this.createTiles(25);

            for(var h = 0; h < this.tileArray.length; h++) {
                if (h == 0) {
                    this.tileArray[h].setPos((-this.tileBG.getBounds().width / 2 + this.tileArray[h].getBounds().width / 2 + 15), (-this.tileBG.getBounds().height / 2 + this.tileArray[h].getBounds().height / 2 + 20));
                }
                if (h > 0 && h < 5) {
                    this.tileArray[h].setPos((this.tileArray[h - 1].getPos(0) + this.tileArray[h].getBounds().width + 5), (this.tileArray[0].getPos(1)));
                }
                if(h == 5){
                    this.tileArray[h].setPos((this.tileArray[0].getPos(0)), (this.tileArray[0].getPos(1)+ this.tileArray[h].getBounds().height + 5));
                }
                if(h > 5 && h < 10){
                    this.tileArray[h].setPos((this.tileArray[h - 1].getPos(0) + this.tileArray[h].getBounds().width + 5), (this.tileArray[5].getPos(1)));
                }
                if(h == 10){
                    this.tileArray[h].setPos((this.tileArray[0].getPos(0)), (this.tileArray[5].getPos(1)+ this.tileArray[h].getBounds().height + 5));
                }
                if(h > 10 && h < 15){
                    this.tileArray[h].setPos((this.tileArray[h - 1].getPos(0) + this.tileArray[h].getBounds().width + 5), (this.tileArray[10].getPos(1)));
                }
                if(h == 15){
                    this.tileArray[h].setPos((this.tileArray[0].getPos(0)), (this.tileArray[10].getPos(1)+ this.tileArray[h].getBounds().height + 5));
                }
                if(h > 15 && h < 20){
                    this.tileArray[h].setPos((this.tileArray[h - 1].getPos(0) + this.tileArray[h].getBounds().width + 5), (this.tileArray[15].getPos(1)));
                }
                if(h == 20){
                    this.tileArray[h].setPos((this.tileArray[0].getPos(0)), (this.tileArray[15].getPos(1)+ this.tileArray[h].getBounds().height + 5));
                }
                if (h > 20 && h < 25) {
                    this.tileArray[h].setPos((this.tileArray[h - 1].getPos(0) + this.tileArray[h].getBounds().width + 5), (this.tileArray[20].getPos(1)));
                }
            }
        }
    };

    me.compareTiles = function(tName){
        if(this.tileNameArray[this.tileNameArray.length-1].name == "magneto"){
            this.setListeners("off", false);
            this.clickSound = createjs.Sound.play("shuffleSound");

            for(var q = 0; q < this.tileNameArray.length; q++){
                createjs.Tween.get(this.tileNameArray[q]).wait(500).to({y:this.tileNameArray[q].y-20, scaleX:0},600,createjs.Ease.backIn).call(this.showFront,[this.tileNameArray[q], true, false],this);
            }

            this.tileNameArray = [];
        }else if(this.tileNameArray.length == 2){
            if(this.tileNameArray[0].name == this.tileNameArray[1].name){
                this.clickSound = createjs.Sound.play("correctSound");
                createjs.Tween.get(this.tileNameArray[0]).wait(500).to({y:this.tileNameArray[0].y-20, scaleX:0},300,createjs.Ease.backIn).call(this.deleteTile,[this.tileNameArray[0], false],this);
                createjs.Tween.get(this.tileNameArray[1]).wait(500).to({y:this.tileNameArray[1].y-20, scaleX:0},300,createjs.Ease.backIn).call(this.deleteTile,[this.tileNameArray[1], true],this);
                this.tileNameArray = [];
            }
            else{
                this.clickSound = createjs.Sound.play("incorrectSound");
                createjs.Tween.get(this.tileNameArray[0]).wait(500).to({y:this.tileNameArray[0].y-20, scaleX:0},300,createjs.Ease.backIn).call(this.showFront,[this.tileNameArray[0], false, false],this);
                createjs.Tween.get(this.tileNameArray[1]).wait(500).to({y:this.tileNameArray[1].y-20, scaleX:0},300,createjs.Ease.backIn).call(this.showFront,[this.tileNameArray[1], false, true],this);
                this.tileNameArray = [];
            }
        }else{
            this.setListeners("on", false);
            if(this.tileNameArray.length >= 1){
                this.tileNameArray[0].removeAllEventListeners();
            }
        }
    };

    me.deleteTile = function(targ, isLast){
        if(isLast == true){
            for(var r = 0; r < this.tileArray.length; r++){
                if(targ.name == this.tileArray[r].name){
                    this.tileArray.splice(r, 1);
                }
            }

            this.sBoard.setScore(targ.name);
            this.setListeners("on", false);
        }

        this.tileCont.removeChild(targ);
    };

    me.setScoreBoard = function(scoreBoard){
        this.sBoard = scoreBoard;
    };

    window.abcya.TileBoard = createjs.promote(TileBoard, "Container");

}(window));