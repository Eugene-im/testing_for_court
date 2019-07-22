(function () {
  'use strict';

  angular
    .module('app')
    .controller('Home.IndexController', ['UserService', 'FlashService', '$scope', Controller]);

  function Controller(UserService, FlashService, $scope) {
    // This scope
    var vm = this;

    var mDev = {};
    var slide;

    vm.nextStep = nextStep;
    vm.user = null;
    vm.newUser = null;
    vm.addNew = addNew;
    vm.snap = snap;
    vm.one = null;
    vm.two = null;
    vm.qwe = null;
    vm.slide = null;
    vm.flag = null;
    vm.flag1 = null;
    vm.reset = reset;

    vm.mediaConfig = {
      video: true
    };
    vm.errBack = null;

    initController();

    function initController() {
      // get current user
      // UserService.GetCurrent().then(function (user) {
      //   vm.user = user;
      // });

      navigator.mediaDevices.enumerateDevices().then(gotDevices);
    }

    function inc() {
      vm.slide += 1;
      slide = vm.slide;
      console.log(slide);
      console.log('vm ' + vm.slide);
    }

    function nextStep() {
      if (vm.slide == null && vm.newUser.lastName && vm.newUser.firstName && vm.newUser.surName && vm.newUser.destination) {
        inc();
        if (slide == 1) {
          initCam(slide);
        }
      } else if (vm.slide == 1 && vm['photo_1'] != null) {
        inc();
        if (slide == 2) {
          initCam(slide);
        }
      } else if (vm.slide == 2 && vm['photo_2'] != null) {
        inc();
      }
    }

    function reset(){
      vm.slide = null;
    }

    function initCam(a) {
      //   // a - number of video.
      const videoConstraints = {};
      let currentStream;
      vm.video = document.getElementById('video_' + a);
      vm.errBack = function (e) {
        console.log('An error has occurred!', e)
      };

      videoConstraints.deviceId = {
        exact: mDev['camera_' + a].value
      };
      const constraints = {
        video: videoConstraints,
        audio: false
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          currentStream = stream;
          vm.video.srcObject = stream;
          vm.video.play();
        })
        .catch(error => {
          console.error(error);
        });

      //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      //     navigator.mediaDevices.getUserMedia(vm.mediaConfig).then(function (stream) {
      //       vm.video.srcObject = stream;
      //       vm.video.play();
      //     });
      //   } else if (navigator.getUserMedia) { // Standard
      //     navigator.getUserMedia(vm.mediaConfig, function (stream) {
      //       vm.video.src = stream;
      //       vm.video.play();
      //     }, vm.errBack);
      //   } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
      //     navigator.webkitGetUserMedia(vm.mediaConfig, function (stream) {
      //       vm.video.src = window.webkitURL.createObjectURL(stream);
      //       vm.video.play();
      //     }, vm.errBack);
      //   } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
      //     navigator.mozGetUserMedia(vm.mediaConfig, function (stream) {
      //       vm.video.src = window.URL.createObjectURL(stream);
      //       vm.video.play();
      //     }, vm.errBack);
      //   }
    }



    function gotDevices(mediaDevices) {
      let count = 1;
      mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
          mDev[`camera_${count}`] = {
            value: mediaDevice.deviceId,
            labe: mediaDevice.label
          }
          count++
        }
      });
      // console.log(mDev);
    }



    function snap(a) {
      // a - number of canvas.
      var canvas = document.getElementById('canvas_' + a);
      var context = canvas.getContext('2d');
      context.drawImage(vm.video, 0, 0, 640, 480);
      vm['photo_' + a] = canvas.toDataURL("image/png");
      console.log(vm['photo_' + a]);
      if(a == 2){
        vm.flag = 1;
      }
    }

    function addNew() {
      if (vm.slide == 2 && vm.flag == 1 && vm.newUser.lastName && vm.newUser.firstName && vm.newUser.surName && vm.newUser.destination && vm['photo_1'] != null && vm['photo_2'] != null) {

        vm.newUser.idfoto1 = vm['photo_1'];
        vm.newUser.idfoto2 = vm['photo_2'];
        vm.newUser.date = new Date(new Date().toUTCString()).toLocaleString();
        console.log(vm.newUser);
        UserService.addNew(vm.newUser).then(function () {
            FlashService.Success("відправлено");
          })
          .catch(error => {
            FlashService.Error("сталася помилка" + error);
            console.error(error);
          });
          window.setTimeout(function(){location.reload()},2000);
      }
    }
  }
})();