'use strict';

/**
 * @ngdoc service
 * @name angularTutorialKwakhonaApp.service:projectService
 * @description
 * # projectService
 * Service of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
    .service('projectService', function ($http, PROJECT_SERVICE_BASE_URI, httpHelpers) {
        var projectApi = this;
        var data = {};
        var url = PROJECT_SERVICE_BASE_URI + 'projects/';

        // get all Projects
        projectApi.getProjects = function () {
            data = {};
            return httpHelpers.get(url, data);
        };
        // create a new Project
        projectApi.createProject = function (project) {
            if(angular.isDefined(project.start_date)){
                project.start_date = projectApi.dateToString(project.start_date);
            }
            
            if(angular.isDefined(project.end_date)){
                project.end_date = projectApi.dateToString(project.end_date);    
            } else {
                project.end_date = '';
            }
            

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
            var day, month, year;
            day = date.getDate();
            month = date.getMonth() + 1;
            year = date.getFullYear();

            return year + "-" + month + "-" + day;
        };

        return projectApi;
    });