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
      .when('/user', {
        templateUrl: 'views/user_dashboard.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
