(function (window) {
    window.abcya = window.abcya || {};

    function GameTile(ind, parentClass) {
        this.Container_constructor();
        this.initialize(ind, parentClass);
    }

    var me = GameTile.prototype = createjs.extend(GameTile, createjs.Container);

    me.ind = null;
    me.parentClass = null;
    me.tileShadow = null;
    me.tileName = null;
    me.tileBack = null;
    me.startPos = null;
    me.restartPos = null;

    me.initialize = function (ind, parentClass) {
        this.ind = ind;
        this.parentClass = parentClass;

        if(this.ind == 0 || this.ind == 1){
            this.name = "beast";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tbeast"));
        }
        if(this.ind == 2 || this.ind == 3){
            this.name = "bishop";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tbishop"));
        }
        if(this.ind == 4 || this.ind == 5){
            this.name = "cable";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tcable"));
        }
        if(this.ind == 6 || this.ind == 7){
            this.name = "cyclops";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tcyclops"));
        }
        if(this.ind == 8 || this.ind == 9){
            this.name = "colossus";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tcolossus"));
        }
        if(this.ind == 10 || this.ind == 11){
            this.name = "gambit";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tgambit"));
        }
        if(this.ind == 12){
            this.name = "magneto";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tmagneto"));
        }
        if(this.ind == 13 || this.ind == 14){
            this.name = "rogue";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Trogue"));
        }
        if(this.ind == 15 || this.ind == 16){
            this.name = "storm";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Tstorm"));
        }
        if(this.ind == 17 || this.ind == 18){
            this.name = "wolverine";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Twolverine"));
        }
        if(this.ind == 19 || this.ind == 20){
            this.name = "xavier";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Txavier"));
        }
        if(this.ind == 21 || this.ind == 22){
            this.name = "iceman";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("Ticeman"));
        }
        if(this.ind == 23 || this.ind == 24){
            this.name = "shadowCat";
            this.tileBack = new createjs.Bitmap(game.assets.getAsset("TshadowCat"));
        }

        this.tileShadow = new createjs.Bitmap(game.assets.getAsset("Tshadow"));
        reRegisterItems([this.tileBack, this.tileShadow], "center");
        this.addChild(this.tileShadow);
    };

    me.setPos = function(newX, newY){
        this.startPos = [];
        this.startPos = [newX, newY];
    };

    me.getPos = function(ind){
        return this.startPos[ind];
    };

    me.toBack = function(){
        this.removeChild(this.tileShadow);
        this.addChild(this.tileBack);
    };

    me.toFront = function(){
        this.removeChild(this.tileBack);
        this.addChild(this.tileShadow);
    };

    window.abcya.GameTile = createjs.promote(GameTile, "Container");

}(window));