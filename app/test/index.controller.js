(function() {
  "use strict";

  angular.module("app").controller("Test.IndexController", Controller);

  function Controller(UserService, FlashService) {
    var vm = this;

    vm.user = null;
    vm.allUsers = null;
    vm.ansvers = null;
    vm.allClients = null;
    vm.name = null;
    vm.searchClients = searchClients;

    initController();

    function initController() {
      // get current user
      // UserService.GetCurrent().then(function(user) {
      //   vm.user = user;
      // });
      getAllClients();
    }


    function getAllClients(){
      //if arguments.length == 0 then 
      UserService.GetAllClients().then(function(clients) {
        vm.allClients = clients;
        console.log(vm.allClients);
      });
      //else 
      // UserService.GetAllClients().then(function(clients) {
      //   vm.allClients = clients;
      //   console.log(vm.allClients);
      // });

    }

    function searchClients(){
      var name = vm.name;
      console.log(vm.name);
      UserService.GetByClientname(name).then(function(clients){
        vm.allClients = clients;
        console.log(vm.allClients);
        // console.log(vm.name);        
      })
    }

    

    
    
    
  }
})();
