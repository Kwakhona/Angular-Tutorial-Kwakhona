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
        projectService.getProjects()
            .then(function (response) {
                $scope.projects = response.data;
            })
            .catch(function (error) {
                $window.alert("Error: " + error);
            });

        // updating add/edit form
        $scope.UpdateForm = function (project) {
            $scope.form = { 'edited': false, 'added': false };

            if (project !== null) {
                $scope.project = {
                    'pk': project.pk,
                    'title': project.title,
                    'description': project.description,
                    'start_date': project.start_date,
                    'end_date': project.end_date,
                    'is_billable': project.is_billable,
                    'is_active': project.is_active
                };
            } else {
                $scope.project = {
                    'pk': '',
                    'title': '',
                    'description': '',
                    'start_date': '',
                    'end_date': '',
                    'is_billable': false,
                    'is_active': false
                };
            }

        };

        $scope.changeMonth = function(month) {
            switch (month) {
                case "Jan":
                    month = "01";
                    break;
                case "Feb":
                    month = "02";
                    break;
                case "Mar":
                    month = "03";
                    break;
                case "Apr":
                    month = "04";
                    break;
                case "May":
                    month = "05";
                    break;
                case "Jun":
                    month = "06";
                    break;
                case "Jul":
                    month = "07";
                    break;
                case "Aug":
                    month = "08";
                    break;
                case "Sep":
                    month = "09";
                    break;
                case "Oct":
                    month = "10";
                    break;
                case "Nov":
                    month = "11";
                    break;
                case "Dec":
                    month = "12";
                    break;
            }
            return month;
        };
        $scope.isDefined = function(value){
            if(angular.isDefined(value)){
                return true;
            }
            return false;
        };

        // creating a project
        $scope.addProject = function () {
            var day, month, year;

            if (angular.isDefined($scope.project.start_date)) {
                day = $scope.project.start_date.toString().substr(8, 2);
                month = $scope.project.start_date.toString().substr(4, 3);
                year = $scope.project.start_date.toString().substr(11, 4);

                month = $scope.changeMonth(month);
                $scope.project.start_date = year + "-" + month + "-" + day;
            }

            if (angular.isDefined($scope.project.end_date)) {
                day = $scope.project.end_date.toString().substr(8, 2);
                month = $scope.project.end_date.toString().substr(4, 3);
                year = $scope.project.end_date.toString().substr(11, 4);

                month = $scope.changeMonth(month);
                $scope.project.end_date = year + "-" + month + "-" + day;
            }


            projectService.createProject($scope.project)
                .then(function() {
                    $scope.form = { 'added': true };
                })
                .catch(function (error) {
                    if ($scope.isDefined(error.data)) {
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
                    }
                });
        };

        // updating a project
        $scope.updateProject = function () {
            console.log($scope.project);
            projectService.updateProject($scope.project.pk, $scope.project)
                .then(function () {
                    $scope.form = { 'edited': true };
                })
                .catch(function (error) {
                    console.log("Error: " + error);
                });
        };

        // deleting a project
        $scope.deleteProject = function (project) {
            if ($window.confirm("Are you sure you want to delete project: " + project.title) === true) {
                projectService.deleteProject(project.pk)
                    .then(function () {
                        $route.reload();
                    })
                    .catch(function (error) {
                        $window.alert("Error: " + error);
                    });
            } else {
                $window.alert("You have cancelled the deletion off project: " + project.title);
            }
        };
    });
