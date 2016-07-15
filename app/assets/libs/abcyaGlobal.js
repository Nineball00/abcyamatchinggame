 var game = null;
 var view = null;
        function init() {
            //console.log("init game");
            //document.domain = "abcya.com";
            game = new abcya.GameMain();
            game.initGame();
        }

        function getPlatformData() {

            var platformSettings = {};

            if (typeof window.orientation !== 'undefined') { // We have a value for orientation, we are on mobile
                platformSettings.isMobile = true;
            }else{ // We are on desktop
                platformSettings.isMobile = false;
                platformSettings.deviceType = abcya.GameConstants.DESKTOP;
            }

            var isIphone = navigator.userAgent.match(/iPhone/i);
            if (isIphone != null) {
                platformSettings.deviceType = abcya.GameConstants.IPHONE;
            }

            var isIpad =   navigator.userAgent.match(/iPad/i);
            if (isIpad) {
                platformSettings.deviceType = abcya.GameConstants.IPAD;
            }

            if (navigator.userAgent.match(/android/i) !== null) {
                platformSettings.deviceType = abcya.GameConstants.ANDROID;
            }

            if (navigator.userAgent.match(/silk/i) !== null){
                platformSettings.deviceType = abcya.GameConstants.KINDLE;
            }

            // Browser stuff
            platformSettings.browserType = "somethingelse";
            var isChrome = navigator.userAgent.match(/chrome/i);
            if (isChrome) {
                platformSettings.browserType = "WEBKITTYPE";
                platformSettings.tranformTypePrefix = "-webkit-";
            }
            isChrome = navigator.userAgent.match(/safari/i);
            if (isChrome) {
                platformSettings.browserType = "WEBKITTYPE";
                platformSettings.tranformTypePrefix = "-webkit-";
            }
            if(window.navigator.standalone == true){ // If running as homescreen on iOS
                platformSettings.browserType = "WEBKITTYPE";
                platformSettings.tranformTypePrefix = "-webkit-";
            }

            return platformSettings;
        }



