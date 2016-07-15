(function (window) {
    window.abcya = window.abcya || {};

    function ScoreBoard(tileBoard, parentClass) {
        this.Container_constructor();
        this.initialize(tileBoard, parentClass);
    }

    var me = ScoreBoard.prototype = createjs.extend(ScoreBoard, createjs.Container);
    
    me.scoreArray = null;
    me.scoreCont = null;
    me.scorePanel = null;
    me.clockTime = null;
    me.timeText = null;
    me.timeCont = null;
    me.scoreClock = null;
    me.tOut = null;

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

    me.tBoard = null;
    me.pClass = null;

    me.initialize = function (tileBoard, parentClass) {
        if(abcya.GamePlayEvents.EASY_MODE){
            this.clockTime = 75;
            this.scorePanel = new createjs.Bitmap(game.assets.getAsset("scorePanel3"));
        }
        if(abcya.GamePlayEvents.MED_MODE){
            this.clockTime = 90;
            this.scorePanel = new createjs.Bitmap(game.assets.getAsset("scorePanel"));
        }
        if(abcya.GamePlayEvents.HARD_MODE){
            this.clockTime = 80;
            this.scorePanel = new createjs.Bitmap(game.assets.getAsset("scorePanel2"));
        }

        this.tBoard = tileBoard;
        this.pClass = parentClass;
        this.scoreArray = [];

        this.timeCont = new createjs.Container();
        this.timeText = new createjs.Text(this.clockTime.toString(), "bold 65px Trebuchet MS","#fff200");
        this.timeCont.y = -230;
        this.timeCont.addChild(this.timeText);

        this.scoreCont = new createjs.Container();

        reRegisterItems([this.scorePanel, this.timeCont], "center");//this.tileBG,

        this.scoreCont.addChild(this.scorePanel, this.timeCont);
        this.addChild(this.scoreCont);

        createjs.Tween.get(this).to({alpha:1, x:this.scorePanel.getBounds().width},1250,createjs.Ease.backOut);//.call(this.setClock,[this.clockTime, this.timeText], this)
    };

    me.setClock = function(seconds, output){
        output.text = seconds.toString();
        if(output.text.length == 1){
            output.x = 20;
            output.color = "#ff0000";
            this.timeCont.scaleX = this.timeCont.scaleY = .5;
            this.timeCont.y = -230;
            createjs.Tween.get(this.timeCont).to({y:-240, scaleX:2,scaleY:2},1000,createjs.Ease.elasticOut);
        }

        seconds--;

        if(abcya.GamePlayEvents.EASY_MODE){
            if(seconds >= 0 && this.scoreArray.length < 6) {
                this.tOut = window.setTimeout(function(){this.setClock(seconds, output)}.bind(this), 1000);
            } else if(seconds >= 0 && this.scoreArray.length >= 6) {
                console.log("WOOT YOU WON!");
                window.clearTimeout(this.tOut);
                this.tOut = null;
                this.tBoard.setListeners("off", false);
                this.pClass.createEnding("win");
            } else {
                console.log("YOU LOSE!");
                window.clearTimeout(this.tOut);
                this.tOut = null;
                this.tBoard.setListeners("off", false);
                this.pClass.createEnding("fail");
            }
        }
        if(abcya.GamePlayEvents.MED_MODE){
            if(seconds >= 0 && this.scoreArray.length < 10) {
                this.tOut = window.setTimeout(function(){this.setClock(seconds, output)}.bind(this), 1000);
            } else if(seconds >= 0 && this.scoreArray.length >= 10) {
                console.log("WOOT YOU WON!");
                window.clearTimeout(this.tOut);
                this.tOut = null;
                this.tBoard.setListeners("off", false);
                this.pClass.createEnding("win");
            } else {
                console.log("YOU LOSE!");
                window.clearTimeout(this.tOut);
                this.tOut = null;
                this.tBoard.setListeners("off", false);
                this.pClass.createEnding("fail");
            }
        }
        if(abcya.GamePlayEvents.HARD_MODE){
            if(seconds >= 0 && this.scoreArray.length < 12) {
                this.tOut = window.setTimeout(function(){this.setClock(seconds, output)}.bind(this), 1000);
            } else if(seconds >= 0 && this.scoreArray.length >= 12) {
                console.log("WOOT YOU WON!");
                window.clearTimeout(this.tOut);
                this.tOut = null;
                this.tBoard.setListeners("off", false);
                this.pClass.createEnding("win");
            } else {
                console.log("YOU LOSE!");
                window.clearTimeout(this.tOut);
                this.tOut = null;
                this.tBoard.setListeners("off", false);
                this.pClass.createEnding("fail");
            }
        }
    };

    me.setScore = function(who){
        switch(who) {
            case "rogue":
                this.rogue = new createjs.Bitmap(game.assets.getAsset("rogue"));
                this.rogue.scaleX = 0;
                this.rogue.scaleY = .5;
                this.scoreArray.push(this.rogue);
                this.scoreCont.addChild(this.rogue);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.rogue.x = -37;
                    this.rogue.y = 61;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.rogue.x = -38;
                    this.rogue.y = 25;
                }

                createjs.Tween.get(this.rogue).to({scaleX:.5, y:this.rogue.y+20},300,createjs.Ease.backOut);
                break;
            case "beast":
                this.beast = new createjs.Bitmap(game.assets.getAsset("beast"));
                this.beast.scaleX = 0;
                this.beast.scaleY = .5;
                this.scoreArray.push(this.beast);
                this.scoreCont.addChild(this.beast);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.beast.x = 39;
                    this.beast.y = 60;
                }
                if(abcya.GamePlayEvents.EASY_MODE){
                    this.beast.x = 39;
                    this.beast.y = 25;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.beast.x = 39;
                    this.beast.y = 23;
                }

                createjs.Tween.get(this.beast).to({scaleX:.5, y:this.beast.y+20},300,createjs.Ease.backOut);
                break;
            case "colossus":
                this.colossus = new createjs.Bitmap(game.assets.getAsset("colossus"));
                this.colossus.scaleX = 0;
                this.colossus.scaleY = .5;
                this.scoreArray.push(this.colossus);
                this.scoreCont.addChild(this.colossus);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.colossus.x = -39;
                    this.colossus.y = -85;
                }
                if(abcya.GamePlayEvents.EASY_MODE){
                    this.colossus.x = -42;
                    this.colossus.y = -95;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.colossus.x = -38;
                    this.colossus.y = -145;
                }

                createjs.Tween.get(this.colossus).to({scaleX:.5, y:this.colossus.y+20},300,createjs.Ease.backOut);
                break;
            case "cable":
                this.cable = new createjs.Bitmap(game.assets.getAsset("cable"));
                this.cable.scaleX = 0;
                this.cable.scaleY = .5;
                this.scoreArray.push(this.cable);
                this.scoreCont.addChild(this.cable);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.cable.x = 39;
                    this.cable.y = -85;
                }
                if(abcya.GamePlayEvents.EASY_MODE){
                    this.cable.x = 36;
                    this.cable.y = -95;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.cable.x = 40;
                    this.cable.y = -145;
                }

                createjs.Tween.get(this.cable).to({scaleX:.5, y:this.cable.y+20},300,createjs.Ease.backOut);
                break;
            case "gambit":
                this.gambit = new createjs.Bitmap(game.assets.getAsset("gambit"));
                this.gambit.scaleX = 0;
                this.gambit.scaleY = .5;
                this.scoreArray.push(this.gambit);
                this.scoreCont.addChild(this.gambit);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.gambit.x = -38;
                    this.gambit.y = -8;
                }
                if(abcya.GamePlayEvents.EASY_MODE){
                    this.gambit.x = -38;
                    this.gambit.y = 22;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.gambit.x = -39;
                    this.gambit.y = -58;
                }

                createjs.Tween.get(this.gambit).to({scaleX:.5, y:this.gambit.y+20},300,createjs.Ease.backOut);
                break;
            case "xavier":
                this.xavier = new createjs.Bitmap(game.assets.getAsset("xavier"));
                this.xavier.scaleX = 0;
                this.xavier.scaleY = .5;
                this.scoreArray.push(this.xavier);
                this.scoreCont.addChild(this.xavier);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.xavier.x = 40;
                    this.xavier.y = -13;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.xavier.x = 41;
                    this.xavier.y = -61;
                }

                createjs.Tween.get(this.xavier).to({scaleX:.5, y:this.xavier.y+20},300,createjs.Ease.backOut);
                break;
            case "storm":
                this.storm = new createjs.Bitmap(game.assets.getAsset("storm"));
                this.storm.scaleX = 0;
                this.storm.scaleY = .5;
                this.scoreArray.push(this.storm);
                this.scoreCont.addChild(this.storm);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.storm.x = -37;
                    this.storm.y = 130;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.storm.x = -38;
                    this.storm.y = 109;
                }

                createjs.Tween.get(this.storm).to({scaleX:.5, y:this.storm.y+20},300,createjs.Ease.backOut);
                break;
            case "bishop":
                this.bishop = new createjs.Bitmap(game.assets.getAsset("bishop"));
                this.bishop.scaleX = 0;
                this.bishop.scaleY = .5;
                this.scoreArray.push(this.bishop);
                this.scoreCont.addChild(this.bishop);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.bishop.x = 38;
                    this.bishop.y = 132;
                }
                if(abcya.GamePlayEvents.EASY_MODE){
                    this.bishop.x = 38;
                    this.bishop.y = 142;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.bishop.x = 38;
                    this.bishop.y = 109;
                }

                createjs.Tween.get(this.bishop).to({scaleX:.5, y:this.bishop.y+20},300,createjs.Ease.backOut);
                break;
            case "wolverine":
                this.wolverine = new createjs.Bitmap(game.assets.getAsset("wolverine"));
                this.wolverine.scaleX = .5;
                this.wolverine.scaleY = .5;
                this.scoreArray.push(this.wolverine);
                this.scoreCont.addChild(this.wolverine);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.wolverine.x = -37;
                    this.wolverine.y = 204;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.wolverine.x = -37;
                    this.wolverine.y = 194;
                }

                createjs.Tween.get(this.wolverine).to({scaleX:.5, y:this.wolverine.y+20},300,createjs.Ease.backOut);
                break;
            case "cyclops":
                this.cyclops = new createjs.Bitmap(game.assets.getAsset("cyclops"));
                this.cyclops.scaleX = 0;
                this.cyclops.scaleY = .5;
                this.scoreArray.push(this.cyclops);
                this.scoreCont.addChild(this.cyclops);

                if(abcya.GamePlayEvents.HARD_MODE){
                    this.cyclops.x = 39;
                    this.cyclops.y = 204;
                }
                if(abcya.GamePlayEvents.EASY_MODE){
                    this.cyclops.x = -30;
                    this.cyclops.y = 141;
                }
                if(abcya.GamePlayEvents.MED_MODE){
                    this.cyclops.x = 39;
                    this.cyclops.y = 195;
                }

                createjs.Tween.get(this.cyclops).to({scaleX:.5, y:this.cyclops.y+20},300,createjs.Ease.backOut);
                break;
            case "iceman":
                this.iceman = new createjs.Bitmap(game.assets.getAsset("iceman"));
                this.iceman.scaleX = 0;
                this.iceman.scaleY = .5;
                this.scoreArray.push(this.iceman);
                this.scoreCont.addChild(this.iceman);

                this.iceman.x = -35;
                this.iceman.y = -161;

                createjs.Tween.get(this.iceman).to({scaleX:.5, y:this.iceman.y+20},300,createjs.Ease.backOut);
                break;
            case "shadowCat":
                this.shadowCat = new createjs.Bitmap(game.assets.getAsset("shadowCat"));
                this.shadowCat.scaleX = 0;
                this.shadowCat.scaleY = .52;
                this.scoreArray.push(this.shadowCat);
                this.scoreCont.addChild(this.shadowCat);

                this.shadowCat.x = 33;
                this.shadowCat.y = -162;

                createjs.Tween.get(this.shadowCat).to({scaleX:.53, y:this.shadowCat.y+20},300,createjs.Ease.backOut);
                break;
        }

        reRegisterItems(this.scoreArray, "topCenter");
    };

    window.abcya.ScoreBoard = createjs.promote(ScoreBoard, "Container");

}(window));