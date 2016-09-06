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

        return projectApi;
    });