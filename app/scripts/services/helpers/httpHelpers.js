'use strict';

/**
 * @ngdoc service
 * @name angularTutorialKwakhonaApp.service:UserAuthentication
 * @description
 * # UserAuthentication
 * Service of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
    .service('httpHelpers', function ($http, UserAuthentication) {
        var httpHelper = {};
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': UserAuthentication.getToken()
        }

        // get method
        httpHelper.get = function (url, data) {
            if (httpHelper.isUndefined(data)) {
                var id = data.projectId;
                url += id + '/';
            }

            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }// create method
        httpHelper.create = function (url, data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                headers: headers
            });
        }
        // put method
        httpHelper.update = function(url, data) {
            var projectId = data.projectId;
            var projectObject = data.projectObject;
            url +=  projectId+'/';

            return $http({
                method: 'PUT',
                url: url,
                data: projectObject,
                headers: headers
            });
        }
        // delete method
        httpHelper.remove = function(url, data) {
            if (httpHelper.isUndefined(data)) {
                var id = data.projectId;
                url += id + '/';
            }

            return $http({
                method: 'DELETE',
                url: url,
                headers: headers
            });
        }

        // determine whether projectId is undefined
        httpHelper.isUndefined = function(data){
            if(!angular.isUndefined(data.projectId)){
                return true;
            }
            return false;
        };
        

        return httpHelper;
    });