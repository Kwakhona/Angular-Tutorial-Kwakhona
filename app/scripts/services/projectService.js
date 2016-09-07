'use strict';

/**
 * @ngdoc service
 * @name angularTutorialKwakhonaApp.service:projectService
 * @description
 * # projectService
 * Service of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
.service('projectService', function ($q, $http, PROJECT_SERVICE_BASE_URI, httpHelpers){
        var projectApi = this;
        var data = {};
        var url = PROJECT_SERVICE_BASE_URI + 'projects/';

        // get all Projects
        projectApi.getProjects = function(){
            return httpHelpers.get(url, data);
        };
        // create a new Project
        projectApi.createProject = function(project){
            data = project;

            return httpHelpers.update(url, data);
        };
        // update a Project
        projectApi.updateProject = function(pk, project){
            var data = {
                'projectId' : pk,
                'projectObject' : project
            };

            return httpHelpers.update(url, data);
        };
        // delete a project
        projectApi.deleteProject = function(pk){
            data.projectId = pk;

            return httpHelpers.update(url, data);
        };

        return projectApi;
    });