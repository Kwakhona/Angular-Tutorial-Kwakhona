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
        var init = function () {
            projectService.getProjects()
                .then(function (response) {
                    $scope.projects = response.data;
                })
                .catch(function (error) {
                    $window.alert(JSON.stringify(error));
                });
        };

        // error handling method
        var HandleError = function (error) {
            var err = "ERRORS \n";

            if ($scope.isDefined(error.data.title)) {
                err += "Title: " + error.data.title + "\n";
            }
            if ($scope.isDefined(error.data.description)) {
                err += "Description: " + error.data.description + "\n";
            }
            if ($scope.isDefined(error.data.start_date)) {
                err += "Start Date: " + error.data.start_date + "\n";
            }
            if ($scope.isDefined(error.data.end_date)) {
                err += "End Date: " + error.data.end_date + "\n";
            }

            $window.alert(err);
        };


        $scope.isDefined = function (value) {
            if (angular.isDefined(value)) {
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
                .then(function () {
                    $scope.form = { 'added': true };
                    init();
                })
                .catch(function (error) {
                    HandleError(error);
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
                    HandleError(error);
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
                        HandleError(error);
                    });
            } else {
                $window.alert("You have cancelled the deletion off project: " + project.title);
            }
        };

        init();
    });
