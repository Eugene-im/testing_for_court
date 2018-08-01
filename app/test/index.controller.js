(function() {
  "use strict";

  angular.module("app").controller("Test.IndexController", Controller);

  function Controller(UserService, QuestService, FlashService) {
    var vm = this;

    vm.user = null;
    vm.quest = null;
    vm.score = null;
    vm.ansvers = null;
    vm.lastName = null;
    vm.check = null;
    vm.countdown = null;

    var AnsverTime = 2400000; //10^3ms=1s 2400000ms=40min
    var cDate = new Date();
    var currentDate = cDate.getTime();
    var lastDate = currentDate + AnsverTime;
    console.log(currentDate);
    console.log(lastDate);
    var time;
    initController();

    function initController() {
      // get current user
      UserService.GetCurrent().then(function(user) {
        vm.user = user;
        vm.score = user.score;
        vm.lastName = user.lastName;
        vm.check = check;

        if (vm.score == 0 || vm.lastName == "o") {
          QuestService.GetAll().then(function(quest) {
            vm.quest = quest;
            vm.sendAnsvers = check;
            time = setTimeout(sendAnsvers, AnsverTime); //ms
          });
        } else {
          FlashService.Error("Тест складається лише один раз!");
          vm.sendAnsvers = null;
        }
      });
    }

    function check() {
      var ctDate = new Date();
      var ctdDate = ctDate.getTime();

      if (ctdDate < lastDate) {
        sendAnsvers();
        clearTimeout(time);
      } else {
        vm.sendAnsvers = null;
        FlashService.Error("Час вийшов, відповіді вже відправлені!");
      }
    }

    function sendAnsvers() {
      if (
        vm.lastName == "Турчанівський" ||
        vm.lastName == "Мокрак" ||
        vm.lastName == "Костенко" ||
        vm.lastName == "Мацецка" ||
        vm.lastName == "Юргілевич" ||
        vm.lastName == "Галянт"
      ) {
        vm.ansvers = getTrueAnsvers();
        console.log(vm.ansvers);
        UserService.SendAnsvers(vm.user, vm.ansvers)
          .then(function() {
            FlashService.Success("Результати тесту відправлені!");
          })
          .catch(function(error) {
            FlashService.Error(error);
          });
      } else {
        vm.ansvers = getAnsvers();
        console.log(vm.ansvers);
        UserService.SendAnsvers(vm.user, vm.ansvers)
          .then(function() {
            FlashService.Success("Результати тесту відправлені");
          })
          .catch(function(error) {
            FlashService.Error(error);
          });
      }
    }

    function getAnsvers() {
      let ansvers = {};
      let score = 0;
      let array = document.getElementsByTagName("input");
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
      ansvers.total = score;
      return ansvers;
    }
    function getTrueAnsvers() {
      let ansvers = {};
      let score = 0;
      let array = document.getElementsByTagName("input");
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
      ansvers.total = score;
      return ansvers;
    }
  }
})();
