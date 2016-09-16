'use strict';

/**
 * @ngdoc overview
 * @name angularTutorialKwakhonaApp
 * @description
 * # angularTutorialKwakhonaApp
 *
 * Main module of the application.
 */
angular
  .module('angularTutorialKwakhonaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant({
    'AUTH_SERVICE_BASE_URI': 'http://userservice.staging.tangentmicroservices.com/',
    'PROJECT_SERVICE_BASE_URI': 'http://projectservice.staging.tangentmicroservices.com/api/v1/'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/projects', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projects'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  // a controller for the Menu
  .controller('menuCtrl', function ($scope, UserAuthentication, $location, $window) {
    // check if loggeIn every second
    if (UserAuthentication.isLoggedIn() === true) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    }

    $scope.Logout = function () {
      UserAuthentication.logout();
      $location.path('/');
      $window.location.reload();
    };
  });
