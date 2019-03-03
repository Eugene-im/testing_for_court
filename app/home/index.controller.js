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

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
        function addNew() {
          vm.newUser.src1= document.getElementById("_1").src;
          vm.newUser.src2= document.getElementById("_2").src;
            console.log(vm.newUser);
            UserService.addNew(vm.newUser).then(function() {
            FlashService.Success("відправлено");
          })
          .catch(function(error) {
            FlashService.Error(error);
          });
        }
    }
})();