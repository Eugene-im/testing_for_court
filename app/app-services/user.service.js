(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAllClients = GetAllClients;
        service.GetAllUsers = GetAllUsers;
        service.GetById = GetById;
        service.GetByClientname = GetByClientname;
        service.Create = Create;
        service.Update = Update;
        service.addNew = addNew;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }

        function GetAllUsers() {
            return $http.get('/api/users/allusers').then(handleSuccess, handleError);
        }

        function GetAllClients() {
            return $http.get('/api/users/allclients').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
        }

        function GetByClientname(username) {
            return $http.get('/api/users/' + 'client/' + username).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
        }

        function addNew(user) {
            return $http.post('/api/users/add', user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
