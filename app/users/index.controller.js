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
      // getAllClients();
      getAllUsers();
    }


    function getAllClients(){
      UserService.GetAllClients().then(function(clients) {
        vm.allClients = clients;
        console.log(vm.allClients);
      });
    }
    function getAllUsers(){
      UserService.GetAllUsers().then(function(users) {
        vm.allUsers = users;
        console.log(vm.allUsers);
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

    function searchUsers() {
    //  TODO: Create a function for searching users.
    }

  }
})();
