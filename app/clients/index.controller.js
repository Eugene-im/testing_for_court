(function() {
    "use strict";

    angular.module("app").controller("Test.IndexController", Controller);

    function Controller(UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.allUsers = null;
        vm.name = null;

        initController();

        function initController() {
            // getAllClients();
            getAllUsers();
        }

        function getAllUsers(){
            UserService.GetAllUsers().then(function(users) {
                vm.allUsers = users;
                console.log(vm.allUsers);
            });
        }

        function searchUsers() {
            //  TODO: Create a function for searching users.
        }

    }
})();
