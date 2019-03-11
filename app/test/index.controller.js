(function() {
  "use strict";

  angular.module("app").controller("Test.IndexController", Controller);

  function Controller(UserService, FlashService) {
    var vm = this;

    vm.user = null;
    vm.allUsers = null;
    vm.ansvers = null;
    vm.allClients = null;

    initController();

    function initController() {
      // get current user
      // UserService.GetCurrent().then(function(user) {
      //   vm.user = user;
      // });
      getAllClients();
    }


    function getAllClients(){
      UserService.GetAll().then(function(users) {
        vm.allUsers = users;
        console.log(vm.allUsers)
      });
    }

    function searchClients(name){
      UserService.GetByUsername(name).then(function(clients){
        vm.allClients = clients;
      })
    }

    

    
    
    
  }
})();
