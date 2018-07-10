(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, QuestService) {
        var vm = this;

        vm.user = null;
        vm.quest=null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            QuestService.GetAll().then(function (quest) {
                vm.quest = quest;})
        }
    }

})();