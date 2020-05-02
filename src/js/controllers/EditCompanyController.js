define(['angular', 'js/controllers/DashboardController'], function (angular) {
    var module = angular.module('DashboardModule');


    module.controller('EditCompanyController', ['$scope', 'firebaseService', '$stateParams', '$location', function ($scope, firebaseService, $stateParams, $location) {
        console.log('EditCompanyController Controller Intialized');
        $scope.company = {};

        firebaseService.getCompany($stateParams.documentId).then(res=>{
            $scope.company=res;
        });

        $scope.editCompany = function () {
            console.log($scope.company);
            firebaseService.editCompany($scope.company).then(() => {
                $location.path('/dashboard');
            })

        }

    }]);
});