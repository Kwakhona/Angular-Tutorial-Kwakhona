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
        // get all projects
        projectService.getProjects()
            .then(function(response){
                $scope.projects = response.data;
            })
            .catch(function(error){
                $window.alert("Error: "+ error);
            });
        
        
        // creating a project
        $scope.addProject = function(){
            $scope.project.pk = "";
            projectService.createProject($scope.project)
                .then(function(){
                    $scope._edited = { 'success': true };
                })
                .catch(function(error){
                    $window.alert("Error: "+ error);
                });
        };
        
        // updating a project
        $scope.UpdateForm = function(project){
            $scope.form = { 'edited': false, 'added': false };

            if(project !== null){
                console.log("Yes");
                $scope.project = {
                    'pk':project.pk,
                    'title': project.title,
                    'description': project.description,
                    'start_date': project.start_date,
                    'end_date': project.end_date,
                    'is_billable': project.is_billable,
                    'is_active': project.is_active
                };
            } else {
                console.log('No');
                $scope.project = {
                    'pk': '',
                    'title': '',
                    'description': '',
                    'start_date': '',
                    'end_date': '',
                    'is_billable': '',
                    'is_active': ''
                };

            }

        };
        $scope.updateProject = function(){
            projectService.updateProject($scope.project.pk, $scope.project)
                .then(function(){
                    $scope.form = { 'edited': true };
                })
                .catch(function(error){
                    $window.alert("Error: "+ error);
                });
        };

        // deleting a project
        $scope.deleteProject = function(project){
            if($window.confirm("Are you sure you want to delete project: "+ project.title) === true){
                project.deleteProject(project.pk)
                    .then(function(){

                    })
                    .catch(function(error){
                        $window.alert("Error: "+ error);
                    });
            } else {
                $window.alert("You have cancelled the deletion off project: "+ project.title);
            }
        } ;
    });
