(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.newUser = null;
        vm.addNew = addNew;
        // vm.previewFile = previewFile;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
        // function previewFile(img) {
        //     var preview = document.getElementById(img);
        //     var file = document.querySelector("input[type=file]").files[0];
        //     var reader = new FileReader();
        
        //     reader.addEventListener(
        //       "load",
        //       function() {
        //         preview.src = reader.result;
        //       },
        //       false
        //     );
        
        //     if (file) {
        //       reader.readAsDataURL(file);
        //     }
        //   }
        function addNew() {
          vm.newUser.src1= document.getElementById("_1").src;
          vm.newUser.src2= document.getElementById("_2").src;
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