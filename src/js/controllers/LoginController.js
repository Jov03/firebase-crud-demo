define(['angular'], function (angular) {
    var app = angular.module('AuthenticationModule', []);

    app.controller('LoginController', ['$scope', 'firebaseService', '$location', function ($scope, firebaseService, $location) {

        $scope.signInInfo = {};
        $scope.signIn = function () {
            firebaseService.signIn($scope.signInInfo.email, $scope.signInInfo.password).then(() => {
                console.log($scope.signInInfo.email, $scope.signInInfo.password);
                window.location.hash ='#/dashboard';
            });
            

        }
    }])
}); 
