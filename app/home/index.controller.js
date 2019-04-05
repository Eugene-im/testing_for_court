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

        $scope.$watch('two', function(){
            console.log('Two cahnged', arguments);
        });

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            // var context = canvas.getContext('2d');
            var video = document.getElementById('video');
            var mediaConfig = {
              video: true
            };
            var errBack = function (e) {
              console.log('An error has occurred!', e)
            };

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
                video.srcObject = stream;
                video.play();
              });
            } else if (navigator.getUserMedia) { // Standard
              navigator.getUserMedia(mediaConfig, function (stream) {
                video.src = stream;
                video.play();
              }, errBack);
            } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
              navigator.webkitGetUserMedia(mediaConfig, function (stream) {
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
              }, errBack);
            } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
              navigator.mozGetUserMedia(mediaConfig, function (stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
              }, errBack);
            }
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

        function snap(){
          var canvas = document.getElementById('canvas');
          function convertCanvasToImage(canvas) {
            vm.one = canvas.toDataURL("image/png");
          }
          document.getElementById('snap').addEventListener('click', function () {
            // context.drawImage(video, 0, 0, 640, 480);
            convertCanvasToImage(canvas);
          });
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