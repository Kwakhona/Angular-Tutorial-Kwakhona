'use strict';

/**
 * @ngdoc function
 * @name angularTutorialKwakhonaApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
    .controller('ProjectCtrl', function ($scope, $window, $route, projectService) {
        // get all projects
        $scope.init = function () {
            projectService.getProjects()
                .then(function (response) {
                    $scope.projects = response.data;
                })
                .catch(function (error) {
                    $window.alert(JSON.stringify(error));
                });
        };
        var isDefined = function (value) {
            if (angular.isDefined(value)) {
                return true;
            }
            return false;
        };

        // error handling method
       var handleError = function(error) {
            if(isDefined(error)){
                $window.alert(JSON.stringify(error));
            }
        };


        
        // updating add/edit form
        $scope.UpdateForm = function (project) {
            $scope.form = { edited: false, added: false };

            if (isDefined(project)) {
                $scope.project = {
                    pk: project.pk,
                    title: project.title,
                    description: project.description,
                    start_date: project.start_date,
                    end_date: project.end_date,
                    is_billable: project.is_billable,
                    is_active: project.is_active
                };
            } else {
                $scope.project = {
                    pk: '',
                    title: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    is_billable: false,
                    is_active: false
                };
            }

        };
        // creating a project
        $scope.addProject = function () {

            projectService.createProject($scope.project)
                .then(function () {
                    $scope.form = { 'added': true };
                    init();
                })
                .catch(function (error) {
                    handleError(error);
                });
        };

        // updating a project
        $scope.updateProject = function () {

            projectService.updateProject($scope.project.pk, $scope.project)
                .then(function () {
                    $scope.form = { 'edited': true };
                    init();
                })
                .catch(function (error) {
                    handleError(error);
                });
        };

        // deleting a project
        $scope.deleteProject = function (project) {
            if ($window.confirm("Are you sure you want to delete project: " + project.title) === true) {
                projectService.deleteProject(project.pk)
                    .then(function () {
                        init();
                    })
                    .catch(function (error) {
                        handleError(error);
                    });
            } else {
                $window.alert("You have cancelled the deletion off project: " + project.title);
            }
        };

        $scope.init();
    });
