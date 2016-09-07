'use strict';

/**
 * @ngdoc function
 * @name angularTutorialKwakhonaApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
    .controller('ProjectCtrl', function($scope, $window, $route, projectService) {
        
        projectService.getProjects()
            .then(function(response){
                $scope.projects = response.data;
            })
            .catch(function(error){
                $window.alert("Error: "+ error);
            });

        $scope.Update = function(project){
            $scope.project = {
                'pk':project.pk,
                'title': project.title,
                'description': project.description,
                'start_date': project.start_date,
                'end_date': project.end_date,
                'is_billable': project.is_billable,
                'is_active': project.is_active
            };
            $scope._edited = { 'success': false };
        };
        $scope.updateProject = function(){
            projectService.updateProject($scope.project.pk, $scope.project)
                .then(function(){
                    $scope._edited = { 'success': true };
                    
                    $route.reload();
                })
                .catch(function(error){
                    $window.alert("Error: "+ error);
                });
        };
    });
