define(['angular','js/controllers/DashboardController'], function (angular) {
    var module = angular.module('DashboardModule');


    module.controller('AddCompanyController', ['$scope', 'firebaseService', '$location', function ($scope, firebaseService, $location) {
        $scope.company={};
        $scope.company.createdBy = firebaseService.getCurrentUser().email;
        console.log('AddCompanyController Controller Intialized');
        $scope.addCompany=function(){
            console.log($scope.company);
            firebaseService.addCompany($scope.company).then(()=>{
                $location.path('/dashboard');
            })
            
        }

    }]);
});