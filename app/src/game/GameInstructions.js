(function (window) {
    window.abcya = window.abcya || {};

    function GameInstructions(parentClass) {
        this.Container_constructor();
        this.initialize(parentClass);
    }

    var me = GameInstructions.prototype = createjs.extend(GameInstructions, createjs.Container);

    me.mag = null;
    me.parentClass = null;
    me.instText = null;
    me.instText2 = null;
    me.instText3 = null;
    me.textCont = null;
    me.textCont2 = null;
    me.textCont3 = null;
    me.masker = null;
    me.masker2 = null;
    me.masker3 = null;
    me.maskerCom = null;
    me.masker2Com = null;
    me.masker3Com = null;

    me.playBtn = null;
    me.clickSound = null;

    me.initialize = function (parentClass) {
        this.parentClass = parentClass;

        this.mag = new createjs.Bitmap(game.assets.getAsset("magnetoL"));
        this.mag.scaleX = 0;
        this.mag.scaleY = .5;
        this.mag.y = -100;
        this.mag.alpha = 0;

        this.textCont = new createjs.Container();
        this.textCont2 = new createjs.Container();
        this.textCont3 = new createjs.Container();
        this.instText = new createjs.Text("FINDING THE X-MEN WILL NOT BE EASY", "bold 24px Trebuchet MS","#fff200");
        this.instText2 = new createjs.Text("AS I AM HERE TO SCRAMBLE YOUR MEMORY.", "bold 24px Trebuchet MS","#fff200");
        this.instText3 = new createjs.Text("THEIR POWERS WILL BE MINE!", "bold 33px Trebuchet MS","#fff200");
        this.textCont.y = -250;
        this.textCont.addChild(this.instText);
        this.textCont2.y = -210;
        this.textCont2.addChild(this.instText2);
        this.textCont3.y = -160;
        this.textCont3.addChild(this.instText3);

        this.masker = new createjs.Shape();
        this.masker.graphics.drawRect(-300, -280, 25, 50);
        this.maskerCom = this.masker.graphics.command;
        this.textCont.mask = this.masker;

        this.masker2 = new createjs.Shape();
        this.masker2.graphics.drawRect(-300, -240, 20, 50);
        this.masker2Com = this.masker2.graphics.command;
        this.textCont2.mask = this.masker2;

        this.masker3 = new createjs.Shape();
        this.masker3.graphics.drawRect(-300, -180, 25, 50);
        this.masker3Com = this.masker3.graphics.command;
        this.textCont3.mask = this.masker3;

        this.playBtn = new createjs.Bitmap(game.assets.getAsset("playBtn"));
        this.playBtn.x = 250;
        this.playBtn.y = 250;
        this.playBtn.alpha = 0;

        reRegisterItems([this.mag, this.instText, this.instText2, this.instText3, this.playBtn], "center");
        this.addChild(this.mag, this.textCont, this.textCont2, this.textCont3, this.masker, this.masker2, this.masker3, this.playBtn);

        createjs.Tween.get(this.playBtn).to({alpha:1},1000,createjs.Ease.linear());
        createjs.Tween.get(this.mag).to({alpha:1,y:100, scaleX:.5},1000,createjs.Ease.backOut).call(this.startInstruct,[],this);
    };

    me.startInstruct = function(){
        this.maskText(1);
        this.playBtn.on("click", this.clearInstruct, this, true);

        createjs.Tween.get(this.mag, {loop:true}).to({y:50}, 5000, createjs.Ease.cubicInOut).to({y:100}, 5000, createjs.Ease.cubicInOut);
    };

    me.maskText = function(ind){
        if(ind == 1){
            createjs.Tween.get(this.maskerCom).to({w:600}, 2000, createjs.Ease.linear()).call(this.maskText,[2],this);
        }
        if(ind == 2){
            createjs.Tween.get(this.masker2Com).to({w:600}, 2000, createjs.Ease.linear()).call(this.maskText,[3],this);
        }
        if(ind == 3){
            createjs.Tween.get(this.masker3Com).wait(750).to({w:600}, 2000, createjs.Ease.linear()).call(this.delayEnd,[],this);
        }
    };

    me.delayEnd = function(){
        createjs.Tween.get(this.clickSound).wait(3000).call(this.endInstruct,[],this);
    };

    me.endInstruct = function(){
        createjs.Tween.removeAllTweens();

        createjs.Tween.get(this.clickSound).call(this.playSound,[],this);
        createjs.Tween.get(this.textCont).to({alpha:0}, 500, createjs.Ease.linear());
        createjs.Tween.get(this.textCont2).to({alpha:0}, 500, createjs.Ease.linear());
        createjs.Tween.get(this.textCont3).to({alpha:0}, 500, createjs.Ease.linear());
        createjs.Tween.get(this.mag).to({scaleX: 0, x:this.mag.x -75, y:-100, alpha:0}, 500, createjs.Ease.backIn).call(this.cleanUp,[],this);
    };

    me.clearInstruct = function(){
        console.log("CLEARING");
        this.clickSound = createjs.Sound.play("clickSound");

        createjs.Tween.removeAllTweens();

        createjs.Tween.get(this.clickSound).call(this.playSound,[],this);
        createjs.Tween.get(this.playBtn).to({alpha:0}, 500, createjs.Ease.linear());
        createjs.Tween.get(this.textCont).to({alpha:0}, 500, createjs.Ease.linear());
        createjs.Tween.get(this.textCont2).to({alpha:0}, 500, createjs.Ease.linear());
        createjs.Tween.get(this.textCont3).to({alpha:0}, 500, createjs.Ease.linear());
        createjs.Tween.get(this.mag).to({scaleX: 0, x:this.mag.x -75, y:-100, alpha:0}, 500, createjs.Ease.backIn).call(this.cleanUp,[],this);
    };

    me.playSound = function(){
        this.clickSound = createjs.Sound.play("swooshSound");
    };

    me.cleanUp = function(){
        while(this.getNumChildren() > 0){
            this.removeChild(this.getChildAt(0));
        }

        this.parentClass.initTiles();
    };

    window.abcya.GameInstructions = createjs.promote(GameInstructions, "Container");

}(window));