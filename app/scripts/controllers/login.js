'use strict';

/**
 * @ngdoc function
 * @name angularTutorialKwakhonaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularTutorialKwakhonaApp
 */

angular.module('angularTutorialKwakhonaApp')

    .controller('LoginCtrl', function($scope, $location, $window, UserAuthentication) {
        
        $scope.Login = function () {
            UserAuthentication.login($scope.username, $scope.password)
                .then(function(){
                   $location.path('/projects');
                })
                .catch(function(error){
                    console.log(error);
                });
        };
    });
