'use strict';

/**
 * @ngdoc function
 * @name angularTutorialKwakhonaApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
    .controller('ProjectCtrl', function($scope, $window, projectService) {

        projectService.getProjects()
            .then(function(response){
                $scope.projects = response.data;
            })
            .catch(function(error){
                $window.alert("Error: "+ error);
            });
    });
