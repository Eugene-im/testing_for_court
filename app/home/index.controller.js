(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.newUser = null;
        vm.addNew = addNew;
        // vm.getNewUser = getNewUser;
        vm.previewFile = previewFile;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function addNew() {
            console.log(vm.newUser);
            UserService.addNew(vm.newUser)
          .then(function() {
            FlashService.Success("Результати тесту відправлені!");
          })
          .catch(function(error) {
            FlashService.Error(error);
          });
        }
    }
})();