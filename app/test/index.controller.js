(function () {
    'use strict';

    angular
        .module('app')
        .controller('Test.IndexController', Controller);

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
            let vm.ansvers = getAnsvers();
            UserService.sendAnsvers(vm.user, vm.ansvers, vm.score)
            .then(function () {
                FlashService.Success('User score updated');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
            console.log(vm.ansvers);
        }

        // window.onload = function numeration() {
        //     let nums = document.getElementsByClassName('num');
        //     for (var i = 0; i < nums.length; i++) {
        //         nums[i].innerHTML = i + 1;
        //     }
        // }

            // let time = (40 * 60)
    // let tic = setInterval(() => {
    //     if (time > 0) time--
    //     else tic = null;
    //     console.log(new Date(time * 1000).getMinutes(), ':', new Date(time * 1000).getSeconds())
    //     document.getElementsByClassName('clock')[0].innerHTML = new Date(time * 1000).getMinutes() + ':' + new Date(time * 1000).getSeconds();
    // }, 1000)
    // document.onload("numeration");
    // document.addEventListener("DOMContentLoaded", numeration);

        function getAnsvers() {
            let ansvers = {};
            let array = document.getElementsByTagName('input');
            for (let i = 0, j = 0; i < array.length; i++) {
                if (array[i].checked) {
                    j = j + 1;
                    ansvers[j] = {
                        val: array[i].value,
                        num: array[i].name
                    };
                }
            }
            return ansvers;
        }
        // function getTrueAnsvers() {
        //     let ansvers = {};
        //     let array = document.getElementsByTagName('input');
        //     for (let i = 0, j = 0; i < array.length; i++) {
        //         if (array[i].value == "+") {
        //             j = j + 1; 
        //             ansvers[j] = {
        //                 val: array[i].value,
        //                 num: array[i].name
        //             };
        //         }
        //     }
        //     return ansvers;
        // }
    }

})();