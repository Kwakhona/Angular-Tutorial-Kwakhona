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
            $scope.success = false;
            projectService.getProjects()
                .then(function (response) {
                    $scope.setSuccess(true);
                    $scope.projects = response.data;
                })
                .catch(function (error) {
                    $scope.error = error;
                    $scope.setSuccess(false);
                    $window.alert("yes an error");
                    if($scope.isDefined(error.detail)){
                        $window.alert(error.detail);
                    }
                });
        };
        // error handling method
        $scope.handleError = function (error) {
            if ($scope.isDefined(error)) {
                $window.alert(error.data);
            }
        };
        // verify value is defined
        $scope.isDefined = function (value) {
            if (angular.isDefined(value)) {
                return true;
            }
            return false;
        };
        // set $scope.success
        $scope.setSuccess = function(value){
            $scope.success = value;
        };
        // confirm alert 
        $scope.confirm = function(title){
            if($window.confirm("Are you sure you want to delete project: " + title) === true){
                return true;
            }
            return false;
        };

        // updating add/edit form
        $scope.UpdateForm = function (project) {
            $scope.form = { edited: false, added: false };

            if ($scope.isDefined(project)) {
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
                .then(function (response) {
                    $scope.res = response;
                    $scope.setSuccess(true);
                    $scope.form = { 'added': true };
                    $scope.init();
                })
                .catch(function (error) {
                    $scope.error = error;
                    $scope.setSuccess(false);
                    $scope.handleError(error);
                });
        };

        // updating a project
        $scope.updateProject = function () {

            projectService.updateProject($scope.project.pk, $scope.project)
                .then(function (response) {
                    $scope.res = response;
                    $scope.setSuccess(true);
                    $scope.form = { 'edited': true };
                    $scope.init();
                })
                .catch(function (error) {
                    $scope.error = error;
                    $scope.setSuccess(false);
                    $scope.handleError(error);
                });
        };

        // deleting a project
        $scope.deleteProject = function (project) {
            if ($scope.confirm(project.title)) {
                projectService.deleteProject(project.pk)
                    .then(function (response) {
                        $scope.res = response;
                        $scope.setSuccess(true);
                        $scope.init();
                    })
                    .catch(function (error) {
                        $scope.error = error;
                        $scope.setSuccess(false);
                        $scope.handleError(error);
                    });
            } else {
                $scope.error = "You have cancelled the deletion of project: " + project.title;
                $window.alert($scope.error);
            }
        };

        $scope.init();
    });
