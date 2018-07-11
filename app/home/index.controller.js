(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, QuestService) {
        var vm = this;

        vm.user = null;
        vm.quest=null;
        vm.ansvers=null;
        vm.score=null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            QuestService.GetAll().then(function (quest) {
                vm.quest = quest})
        }
        function saveUnsvers() {
            FlashService.Success('User score saved');
        }

        function sendAnsvers(user, ansvers, score) {
            UserService.sendAnsvers(vm.user, vm.ansvers, vm.score)
            .then(function () {
                FlashService.Success('User score updated');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }
    }

})();