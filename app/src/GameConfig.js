(function () {

    window.abcya = window.abcya || {};

    var GameStates = {
        GS_PRELOAD: 0,
        GS_RUNSCENE: 1,
        GS_INTRO: 3,
        GS_GAME: 10,
        //GS_SELECT: 15,
        //GS_INST:9
    };

    var GameStateEvents = {
        GE_GO_CLICK: "handle_go_click",
        GE_SHOW_INTRO: "show_intro",
        GE_SHOW_GAME: "show_game",
        //GE_SHOW_SELECT: "show_select",
        //GE_SHOW_INST: "show_inst"
    };

    var GamePlayEvents = {
        QUESTION_READY: "question_ready",
        GAME_COMPLETE: "game_complete",
        DAY_SELECTED: "day_selected",
        INST_SHOWN: "inst_shown",
        EASY_MODE: false,
        MED_MODE: true,
        HARD_MODE: false
    };

    var GameConfig = {
        RUN_MODE: "Production", //!!TODO: not sure we are really gonna use
        FPS: 61,
        DO_ORIENTATION_BLOCK: true,
        EXIT_URL: '../../../',
        FORCE_NORMAL_RATIO: true,
        GAME_ORIENTATION: "Landscape",
        GAME_FONTS: ["asap-regular","asap-bt","vagrounded_btregular"],
        USES_STORAGE: false,
        STORAGE_PREFIX: "starter_game",
        STORAGE_TYPE: "local",
        GAME_NAME:"interactive_100_number_chart",

        GROUP_IMAGE_ASSETS_PATH: './assets/images/',
        GROUP_AUDIO_ASSETS_PATH: './assets/audio/',
        GAME_IMAGE_ASSETS_PATH: './assets/images/',
        GAME_AUDIO_ASSETS_PATH: './assets/audio/',
        DATA_ASSETS_PATH: './assets/data/',

        COMMON_IMAGE_MANIFEST: [
            //exit dialog sounds?

        ],

        COMMON_SOUND_MANIFEST: [

        ],


        GROUP_IMAGE_MANIFEST: [
            // Spritesheets
            {id:"preloadData", src:"preload-assets.json"},
            {id:"preloadSheet",src:"preload-assets.png"}
        ],

        GROUP_SOUND_MANIFEST: [


        ],

        LOCAL_IMAGE_MANIFEST: [
            {id:"cable", src:"cable2.png"},
            {id:"gambit", src:"gambit2.png"},
            {id:"rogue", src:"rogue2.png"},
            {id:"storm", src:"storm2.png"},
            {id:"bishop", src:"bishop2.png"},
            {id:"colossus", src:"colossus2.png"},
            {id:"xavier", src:"xavier2.png"},
            {id:"cyclops", src:"ciclops2.png"},
            {id:"wolverine", src:"wolverine2.png"},
            {id:"magneto", src:"magneto2.png"},
            {id:"beast", src:"beast2.png"},
            {id:"magnetoL", src:"magnetoL2.png"},
            {id:"phoenix", src:"phoenix.png"},
            {id:"shadowCat", src:"shadowCat.png"},
            {id:"iceman", src:"iceman.png"},

            {id:"Tcable", src:"Tcable.png"},
            {id:"Tgambit", src:"Tgambit.png"},
            {id:"Trogue", src:"Trogue.png"},
            {id:"Tstorm", src:"Tstorm.png"},
            {id:"Tbishop", src:"Tbishop.png"},
            {id:"Tcolossus", src:"Tcolossus.png"},
            {id:"Txavier", src:"Txavier.png"},
            {id:"Tcyclops", src:"Tciclops.png"},
            {id:"Twolverine", src:"Twolverine.png"},
            {id:"Tmagneto", src:"Tmagneto.png"},
            {id:"Tbeast", src:"Tbeast.png"},
            {id:"Ticeman", src:"Ticeman.png"},
            {id:"TshadowCat", src:"TshadowCat.png"},
            {id:"Tphoenix", src:"Tphoenix.png"},


            {id:"Tshadow", src:"tileShadow2.png"},
            {id:"Tbg", src:"tilesBG.png"},
            {id:"scorePanel", src:"scorePanel.png"},
            {id:"scorePanel2", src:"scorePanel2.png"},
            {id:"scorePanel3", src:"scorePanel3.png"},
            {id:"helpBtn", src:"help.png"},
            {id:"goBtn", src:"playbtn.png"},
            {id:"homeBtn", src:"homeBtn.png"},
            {id:"playBtn", src:"gobtn.png"},
            {id:"title1", src:"xmenTitle.png"},
            {id:"xBtn", src:"symbol.png"},
            {id:"instructions", src:"instructions.png"},
            {id:"game-bg-new", src:"game-bg2.png"},
            {id:"endFail", src:"endFail.png"},
            {id:"easyBtn", src:"btnEasy.png"},
            {id:"medBtn", src:"btnMed.png"},
            {id:"hardBtn", src:"btnHard.png"},
            {id:"endWin", src:"endWin.png"},
            {id:"masker", src:"mask.png"}
        ],

        LOCAL_SOUND_MANIFEST: [
            {id: "swooshSound", src:"Swoosh.mp3", data:2},
            {id: "shuffleSound", src:"laugh.mp3", data:2},
            {id: "clickSound", src:"click.ogg", data:3},
            {id: "correctSound", src:"correct-answer.ogg", data:4},
            {id: "incorrectSound", src:"incorrect-answer.ogg", data:5},
            {id: "themeSong", src:"themeSong.mp3", data:6}
        ],

        TEXT_COLOR_1:"#82B531",
        TEXT_COLOR_2:"#0D8C5B"
    };


    window.abcya.GameStates = GameStates;
    window.abcya.GameStateEvents = GameStateEvents;
    window.abcya.GamePlayEvents = GamePlayEvents;
    window.abcya.GameConfig = GameConfig;


}());
