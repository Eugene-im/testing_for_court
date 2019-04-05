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
        vm.snap = snap;
        vm.one = null;
        vm.two = null;
        vm.qwe = null;

        vm.mediaConfig = {
          video: true
        };
        vm.video_one = null;
        vm.video_two = null;
        vm.errBack = null;

        // $scope.$watch('two', function(){
        //     console.log('Two cahnged', arguments);
        // });

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            // var context = canvas.getContext('2d');
            vm.video_one = document.getElementById('video_one');
            vm.video_two = document.getElementById('video_two');
            vm.errBack = function (e) {
              console.log('An error has occurred!', e)
            };

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices.getUserMedia(vm.mediaConfig).then(function (stream) {
                vm.video_one.srcObject = stream;
                vm.video_one.play();
              });
              navigator.mediaDevices.getUserMedia(vm.mediaConfig).then(function (stream) {
                vm.video_two.srcObject = stream;
                vm.video_two.play();
              });
            } else if (navigator.getUserMedia) { // Standard
              navigator.getUserMedia(vm.mediaConfig, function (stream) {
                vm.video_one.src = stream;
                vm.video_one.play();
              }, vm.errBack);
              navigator.getUserMedia(vm.mediaConfig, function (stream) {
                vm.video_two.src = stream;
                vm.video_two.play();
              }, vm.errBack);
            } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
              navigator.webkitGetUserMedia(vm.mediaConfig, function (stream) {
                vm.video_one.src = window.webkitURL.createObjectURL(stream);
                vm.video_one.play();
              }, vm.errBack);
              navigator.webkitGetUserMedia(vm.mediaConfig, function (stream) {
                vm.video_two.src = window.webkitURL.createObjectURL(stream);
                vm.video_two.play();
              }, vm.errBack);
            } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
              navigator.mozGetUserMedia(vm.mediaConfig, function (stream) {
                vm.video_one.src = window.URL.createObjectURL(stream);
                vm.video_one.play();
              }, vm.errBack);
              navigator.mozGetUserMedia(vm.mediaConfig, function (stream) {
                vm.video_two.src = window.URL.createObjectURL(stream);
                vm.video_two.play();
              }, vm.errBack);
            }
        }

        // $scope.fileNameChanged = function() {
        //   var reader = new FileReader();
        //   var x = arguments[0].getAttribute('imgfor');
        //   console.log(x);

        //   reader.addEventListener("load", function() {
        //     vm[x] = reader.result;
        //     $scope.$digest();
        //     // vm.qwe = reader.result;
        //     console.log(vm);
        //     }
        //   );

        //   if (arguments[0].files[0]) {
        //     reader.readAsDataURL(arguments[0].files[0]);
        //   }

        // }

        function snap(a){
          var canvas = document.getElementById('canvas_'+a);
          var context = canvas.getContext('2d');
          context.drawImage(vm['video_' + a], 0, 0, 550, 414);
          vm[a] = canvas.toDataURL("image/png");
        }


        function addNew() {
          vm.newUser.idfoto1 = vm.one;
          vm.newUser.idfoto2 = vm.two;
          vm.newUser.date =  new Date(new Date().toUTCString()).toLocaleString()
            // console.log(vm.newUser);
            UserService.addNew(vm.newUser).then(function() {
            FlashService.Success("відправлено");
          })
          .catch(function(error) {
            FlashService.Error(error);
          });
        }
    }
})();