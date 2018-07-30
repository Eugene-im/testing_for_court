(function () {
    'use strict';

    angular
        .module('app')
        .controller('Test.IndexController', Controller);

    function Controller(UserService, QuestService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.quest = null;
        vm.score = null;
        vm.ansvers = null;
        vm.lastName = null;
        
        initController();
        
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                vm.score = user.score;
                vm.lastName = user.lastName;
                if (vm.score == 0){
                    QuestService.GetAll().then(function (quest) {
                        vm.quest = quest;
                        var AnsverTime = 20;
                        function updateTime() {
                            AnsverTime--;
                            if (AnsverTime <= 0) {
                                alert('timeout');
                                vm.sendAnsvers()
                                clearInterval(timm);
                            }
                        };
                        var timm = setInterval(updateTime, 1000);

                    });
                    vm.sendAnsvers = sendAnsvers;
                } else {
                    FlashService.Error('Тест складається лише один раз!');
                    vm.sendAnsvers = null;
                }
            });
        }
        function sendAnsvers() {
            if(vm.lastName == "Турчанівський" || vm.lastName == "Мокрак" || vm.lastName == "Костенко" || vm.lastName == "Мацецка" || vm.lastName == "Юргілевич" || vm.lastName == "Галянт"){
                vm.ansvers = getTrueAnsvers();
                console.log(vm.ansvers);
                UserService.SendAnsvers(vm.user, vm.ansvers)
                .then(function () {
                    FlashService.Success('Результати тесту відправлені!');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            } else {
                vm.ansvers = getAnsvers();
                console.log(vm.ansvers);
                UserService.SendAnsvers(vm.user, vm.ansvers)
                .then(function () {
                    FlashService.Success('Результати тесту відправлені');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            }
        };

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
            let score = 0;
            let array = document.getElementsByTagName('input');
            for (let i = 0, j = 0; i < array.length; i++) {
                if (array[i].checked && array[i].value == "+") {
                    score++;
                }
                if (array[i].checked) {
                    j = j + 1;
                    ansvers[j] = {
                        val: array[i].value,
                        num: array[i].name,
                        score: score
                    };
                }
            }
            ansvers.total=score;
            return ansvers;
        }
        function getTrueAnsvers() {
            let ansvers = {};
            let score = 0;
            let array = document.getElementsByTagName('input');
            for (let i = 0, j = 0; i < array.length; i++) {
                if (array[i].value == "+") {
                    j = j + 1; 
                    ansvers[j] = {
                        val: array[i].value,
                        num: array[i].name
                    };
                    score++;
                }
            }
            ansvers.total=score;
            return ansvers;
        }
    }

})();