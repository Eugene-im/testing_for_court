(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', ['UserService','FlashService', '$scope', Controller]);
        // .controller('Home.IndexController', Controller);

    function Controller(UserService, FlashService, $scope) {
        var vm = this;

        vm.user = null;
        vm.newUser = null;
        vm.addNew = addNew;
        vm.one = null;
        vm.two = null;
        vm.qwe = null;

        $scope.$watch('two', function(){
            console.log('Two cahnged', arguments);
        });

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        $scope.fileNameChanged = function() {
          var reader = new FileReader();
          var x = arguments[0].getAttribute('imgfor');
          console.log(x);

          reader.addEventListener("load", function() {
            vm[x] = reader.result;
            $scope.$digest();
            // vm.qwe = reader.result;
            console.log(vm);
            }
          );

          if (arguments[0].files[0]) {
            reader.readAsDataURL(arguments[0].files[0]);
          }

        }

        function addNew() {
          vm.newUser.idfoto1 = vm.one;
          vm.newUser.idfoto2 = vm.two;
          vm.newUser.date =  new Date(new Date().toUTCString()).toLocaleString()
            console.log(vm.newUser);
            UserService.addNew(vm.newUser).then(function() {
            FlashService.Success("відправлено");
          })
          .catch(function(error) {
            FlashService.Error(error);
          });
        }
    }
})();