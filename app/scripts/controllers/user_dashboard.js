'use strict';

/**
 * @ngdoc function
 * @name angularTutorialKwakhonaApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
    .controller('UserCtrl', function($scope, $window, projectService) {

        projectService.getProjects()
            .then(function(response){
                $scope.projects = response.data;
            })
            .catch(function(error){
                $window.alert("Error: "+ error);
            });
    });
