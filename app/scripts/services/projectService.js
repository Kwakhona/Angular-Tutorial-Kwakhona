'use strict';

/**
 * @ngdoc service
 * @name angularTutorialKwakhonaApp.service:projectService
 * @description
 * # projectService
 * Service of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
    .service('projectService', function ($q, $http, PROJECT_SERVICE_BASE_URI, httpHelpers) {
        var projectApi = this;
        var data = {};
        var url = PROJECT_SERVICE_BASE_URI + 'projects/';

        // get all Projects
        projectApi.getProjects = function () {
            if (angular.isDefined(data.projectId)) {
                data.projectId = '';
            }
            return httpHelpers.get(url, data);
        };
        // create a new Project
        projectApi.createProject = function (project) {
            project.start_date = projectApi.dateToString(project.start_date);
            project.end_date = projectApi.dateToString(project.end_date);

            data = project;


            return httpHelpers.create(url, data);
        };
        // update a Project
        projectApi.updateProject = function (pk, project) {
            var data = {
                'projectId': pk,
                'projectObject': project
            };

            return httpHelpers.update(url, data);
        };
        // delete a project
        projectApi.deleteProject = function (pk) {
            data.projectId = pk;

            return httpHelpers.remove(url, data);
        };
        // convert a lond date to string
        projectApi.dateToString = function (date) {
            var day, month, year = '';
            // Mon Sep 12 2016 00:00:00 GMT+0200 (South Africa Standard Time)
            if (angular.isDefined(date)) {
                day = date.toString().substr(8, 2);
                month = date.toString().substr(4, 3);
                year = date.toString().substr(11, 4);

            }

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
            return year + "-" + month + "-" + day;
        };

        return projectApi;
    });