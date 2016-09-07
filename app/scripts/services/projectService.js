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

        projectApi.getProjects = function(){
            return httpHelpers.get(url, data);
        };

        projectApi.updateProject = function(project){
            data.projectId = project.pk;
            data.projectObject = project;

            return httpHelpers.update(url, data);
        };

        projectApi.deleteProject = function(pk){
            data.projectId = pk;

            return httpHelpers.update(url, data);
        };

        return projectApi;
    });