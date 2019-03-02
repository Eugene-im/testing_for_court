(function() {
  "use strict";

  angular.module("app").controller("Test.IndexController", Controller);

  function Controller(UserService, FlashService) {
    var vm = this;

    vm.user = null;
    vm.allUsers = null;
    vm.ansvers = null;

    initController();

    function initController() {
      // get current user
      UserService.GetCurrent().then(function(user) {
        vm.user = user;
      });
      UserService.GetAll().then(function(users) {
        vm.allUsers = users;
      });
    }

    

    
    
    
  }
})();
