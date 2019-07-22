(function () {
    'use strict';

    angular
        .module('app')
        .factory('FlashService', Service);

    function Service($rootScope) {
        var service = {};
        var act = null;

        service.Success = Success;
        service.Error = Error;
        service.Ask = Ask;
        service.action = act;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'danger',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
        
        function Ask(message, keepAfterLocationChange, messageSuccess, messageDecline, cb) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                buttonSuccess:{
                    if:"success", //or false
                    messageSuccess:messageSuccess,
                    action: function(){
                        act = true;
                        cb(act);
                        // console.log(act);
                        return act;
                    }
                },
                buttonDecline:{
                    if:"danger", //or false
                    messageDecline:messageDecline,
                    action: function(){
                        act = false;
                        cb(act);
                        // console.log(act);
                        return act;
                    }
                },
                keepAfterLocationChange: keepAfterLocationChange
                // keepAfterLocationChange: false
            };
            // console.log(act);
            return act;
        }
    }

})();