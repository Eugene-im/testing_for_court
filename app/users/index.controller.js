(function() {
  "use strict";

  angular.module("app").controller("User.IndexController", Controller);

  function Controller(UserService, FlashService) {
    var vm = this;

    vm.user = null;
    vm.allUsers = null;
    vm.name = null;

    vm.searchUsers = searchUsers;

    initController();

    function initController() {
      getAllUsers();
    }

    function getAllUsers(){
      UserService.GetAllUsers().then(function(users) {
        vm.allUsers = users;
        console.log(vm.allUsers);
      });
    }

    function searchUsers() {
      let name = vm.name;
      if (name === "") {getAllUsers()}
      else{
        UserService.GetByUsername(name).then(function(users){
          vm.allUsers = users;
        })
      }
    }

  }
})();
