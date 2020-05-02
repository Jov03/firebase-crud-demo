
define(['angular'], function (angular) {
  var app = angular.module('DashboardModule', []);


  app.controller('DashboardController', ['$scope', 'firebaseService', '$location', function ($scope, firebaseService, $location) {
    $scope.currentUser = firebaseService.getCurrentUser().email;
    $scope.companies = [];
    console.log('Dashboard Controller Intialized');

    firebaseService.getCompanies().then((res) => {
      $scope.companies.push(...res);
      $scope.$apply();
    });

    $scope.edit = function (company) {
      console.log(company.id);
      $location.path('/dashboard/editCompany/' + company.id);
    };

    $scope.delete = function (company) {
      console.log(company);
      firebaseService.deleteCompany(company.id).then(() => {
        $scope.companies = $scope.companies.filter(element => element.id != company.id);
      });
    };

    $scope.signOut = function () {
      firebaseService.signOut().then(()=>{
        $location.path('/login');
      });
    }

  }]);
});

