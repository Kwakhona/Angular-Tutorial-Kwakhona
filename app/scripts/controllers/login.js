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
                    if(angular.isDefined(error.non_field_errors)){
                        $window.alert("Error: "+ error.non_field_errors);
                    } else if(angular.isDefined(error.username) || angular.isDefined(error.password)){
                        $window.alert("Username/Password is required. Please try again");
                    }
                });
        };
    });
