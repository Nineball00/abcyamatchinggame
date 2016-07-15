(function (window) {

    window.abcya = window.abcya || {};

    function AssetsManager() {
        this.preload = new createjs.LoadQueue();
        this.preload.installPlugin(createjs.Sound);
        this.preload.setMaxConnections(4);

    }

    AssetsManager.prototype.preload = null;
    AssetsManager.prototype.onDownloadCompleted = null;
    AssetsManager.prototype.preloadUpdater = null;
    AssetsManager.prototype.dialogSheet = null;
    AssetsManager.prototype.spriteSheet = null;
    AssetsManager.prototype.spectatorSheet = null;
    AssetsManager.prototype.playerSheet = null;
    AssetsManager.prototype.testSheet = null;


    // preload display images
    AssetsManager.prototype.startPreload = function() {
        this.preload.addEventListener("complete", this.handlePreloadComplete.bind(this));
        this.preload.addEventListener("progress", this.handlePreloadProgress.bind(this));

        var assetsPath = abcya.GameConstants.COMMON_IMAGE_ASSETS_PATH;

        //preloader
        var manifest = [
            {id: "preload-assets", src: "preload-assets.json"},
            {id: "mainBg", src: game.orientation + "BlankBackground_4x3.png"},
            {id: "mainBgWide", src: game.orientation + "BlankBackground_16x9.png"}

        ];
        this.preload.loadManifest(manifest, false, assetsPath);
        this.preload.load();
    };

    //what's this for?
    AssetsManager.prototype.handlePreloadProgress = function() {

    };

    AssetsManager.prototype.handlePreloadComplete = function() {
        this.preload.removeAllEventListeners();
        this.onDownloadCompleted();

    };

    //game downloads
    AssetsManager.prototype.startDownload = function() {

        this.preload.addEventListener("complete", this.handleDownloadComplete.bind(this));
        this.preload.addEventListener("progress", this.handleDownloadProgress.bind(this));

        //common
        var assetsPath = abcya.GameConstants.COMMON_IMAGE_ASSETS_PATH;
        var manifest = abcya.GameConfig.COMMON_IMAGE_MANIFEST;
        this.preload.loadManifest(manifest,false,assetsPath);

        assetsPath = abcya.GameConstants.COMMON_AUDIO_ASSETS_PATH;
        manifest = abcya.GameConfig.COMMON_SOUND_MANIFEST;
        createjs.Sound.alternateExtensions = ["mp3"];
        this.preload.loadManifest(manifest,false,assetsPath);



        //group
        assetsPath = abcya.GameConfig.GROUP_IMAGE_ASSETS_PATH;
        manifest = abcya.GameConfig.GROUP_IMAGE_MANIFEST;
        this.preload.loadManifest(manifest,false,assetsPath);

        assetsPath = abcya.GameConfig.GROUP_AUDIO_ASSETS_PATH;
        manifest = abcya.GameConfig.GROUP_SOUND_MANIFEST;
        createjs.Sound.alternateExtensions = ["mp3"];
        this.preload.loadManifest(manifest,false,assetsPath);

        /*SPECIFIC GAMES*/
        assetsPath = abcya.GameConfig.GAME_IMAGE_ASSETS_PATH;
        manifest = abcya.GameConfig.LOCAL_IMAGE_MANIFEST;
        this.preload.loadManifest(manifest,false,assetsPath);

        //sounds
        assetsPath = abcya.GameConfig.GAME_AUDIO_ASSETS_PATH;
        manifest = abcya.GameConfig.LOCAL_SOUND_MANIFEST;
        createjs.Sound.alternateExtensions = ["mp3"];
        this.preload.loadManifest(manifest,false,assetsPath);

        //data
        assetsPath = abcya.GameConfig.DATA_ASSETS_PATH;
        manifest = [
            {id:"path-data", src:"path-data.json"}
        ];

        this.preload.loadManifest(manifest,false,assetsPath);
        this.preload.load();

    };

    AssetsManager.prototype.handleDownloadProgress = function(e) {
        if(this.preloadUpdater) this.preloadUpdater.setProgress(e.progress);
    };

    AssetsManager.prototype.handleDownloadComplete = function() {
        this.preload.removeAllEventListeners();

        //spritesheet
        this.testSheet = new createjs.SpriteSheet(this.getAsset("preloadData"));
        this.spriteSheet = new createjs.SpriteSheet(this.getAsset("gameItemData"));
        this.spectatorSheet = new createjs.SpriteSheet(this.getAsset("spectatorData"));
        this.playerSheet = new createjs.SpriteSheet(this.getAsset("playerData"));



        //call function we set to start game
        this.onDownloadCompleted();
        this.onDownloadCompleted = null;
        this.preloadUpdater = null;

    };

    //public methods

    //from GameMain
    AssetsManager.prototype.setDownloadCompleted = function(callbackMethod) {
        this.onDownloadCompleted = callbackMethod;
    };

    AssetsManager.prototype.setPreloadViewUpdate = function(callbackMethod) {
        this.preloadUpdater = callbackMethod;
    };

    AssetsManager.prototype.getAsset = function(assetName) {
        return this.preload.getResult(assetName)
    };


    window.abcya.AssetsManager = AssetsManager;

}(window));