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
      getAllClients();
    }


    function getAllClients(){
      UserService.GetAllClients().then(function(clients) {
        vm.allClients = clients;
        console.log(vm.allClients);
      });
    }

    function searchClients(){
      var name = vm.name;
      if (name === "") {getAllClients()}
      else{
      UserService.GetByClientname(name).then(function(clients){
        vm.allClients = clients;
        })
      }
    }

    

    
    
    
  }
})();
