(function() {
    "use strict";

    angular.module("app").controller("Client.IndexController", Controller);

    function Controller(UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.allClients = null;
        vm.name = null;
        vm.offsetClients = null;
        vm.loadClients = loadClients;

        vm.searchClients = searchClients;

        initController();

        function initController() {
            getAllClients();
        }


        function getAllClients(){
            UserService.GetAllClients().then(function(clients) {
                console.log(clients);
                vm.allClients = clients;
            });
        }

        function searchClients(){
            var name = vm.name;
            console.log(name);
            if (name === "") {getAllClients()}
            else{
                UserService.GetByClientname(name).then(function(clients){
                    vm.allClients = clients;
                    alert("Here!");
                })
            }
        }

        function loadClients(offset) {
            UserService.Offset(offset).then(function(clients) {
                if (clients.length > 0){
                    vm.allClients = vm.allClients.concat(clients);
                }
                else{
                    let button = document.getElementById('btn');
                    btn.setAttribute('disabled', 'true');
                }

            });

        }
    }
})();
