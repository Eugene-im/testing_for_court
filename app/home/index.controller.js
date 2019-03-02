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
        vm.getNewUser = getNewUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }


        function getNewUser() {
            let newUser = {};
            let score = 0;
            let array = document.getElementsByTagName("input");
            for (let i = 0, j = 0; i < array.length; i++) {
                score++;              
              }
            
            newUser.total = score;
            return newUser;
          }

        function addNew() {
            vm.newUser = {"score":100};
            // vm.newUser = getNewUser();
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