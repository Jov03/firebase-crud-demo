
require([
    'angular',
    'js/services/FirebaseService',
    'js/controllers/DashboardController',
    'js/controllers/AddCompanyController',
    'js/controllers/EditCompanyController',
    'js/controllers/LoginController',
], function (angular) {
    'use strict';
    var app = angular.module("webapp", ['ui.router', 'FirebaseServiceModule', 'DashboardModule', 'AuthenticationModule']);


    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'src/views/login.html',
            controller: 'LoginController',
            skipAuth: true
        }).state('dashboard', {
            url: '/dashboard',
            templateUrl: 'src/views/dashboard.html',
            controller: 'DashboardController'
        }).state('addCompany', {
            url: '/dashboard/addCompany',
            templateUrl: 'src/views/addCompany.html',
            controller: 'AddCompanyController'
        }).state('editCompany', {
            url: '/dashboard/editCompany/:documentId',
            templateUrl: 'src/views/editCompany.html',
            controller: 'EditCompanyController'
        }).state("otherwise", { url: '/login' });

        $urlRouterProvider.otherwise('/login');

    }]);

    app.run(['$rootScope', '$location', 'firebaseService', function ($rootScope, $location, firebaseService) {
        console.log($rootScope);
        $rootScope.$on('$stateChangeStart',
            async function (event, toState, toParams, fromState, fromParams, options) {

                if (!!toState.skipAuth) {
                    console.log('No Authentication Required');
                } else {
                    if (!firebaseService.isAuthenticated()) {

                        window.location.hash = '/';
                        window.location.reload();

                        event.preventDefault();
                    }


                }
            });
    }]);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['webapp']);
    });
});
