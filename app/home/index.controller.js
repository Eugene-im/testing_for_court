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
                vm.quest = quest})
        }
        function saveUnsvers() {
            // UserService.Update(vm.user)
            //     .then(function () {
            //         FlashService.Success('User updated');
            //     })
            //     .catch(function (error) {
            //         FlashService.Error(error);
            //     });
        }

        function sendAnsvers(user, ansvers) {
            // UserService.Delete(vm.user._id)
            //     .then(function () {
            //         // log user out
            //         $window.location = '/login';
            //     })
            //     .catch(function (error) {
            //         FlashService.Error(error);
            //     });
        }
    }

})();