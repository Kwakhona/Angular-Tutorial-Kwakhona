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
        };

        // get method
        httpHelper.get = function (url, data) {
            url = httpHelper.extractID(url, data);

            return httpHelper.help(url);
        };
        // create method
        httpHelper.create = function (url, data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                headers: headers
            });
        };
        // put method
        httpHelper.update = function (url, data) {
            var projectId = data.projectId;
            var projectObject = data.projectObject;
            url += projectId + '/';

            return $http({
                method: 'PUT',
                url: url,
                data: projectObject,
                headers: headers
            });
        };
        // delete method
        httpHelper.remove = function (url, data) {
            url = httpHelper.extractID(url, data);

            return httpHelper.help(url);
        };

        // determine whether projectId is undefined and extract projectID if it is
        httpHelper.extractID = function (url, data) {
            if (angular.isDefined(data.projectId)) {
                var id = data.projectId;
                url += id + '/';
                return url;
            }
            return url;
        };

        httpHelper.help = function (url) {
            var _url = url.split('/');

            if (angular.isDefined(_url[_url.length - 2])) {
                var last = _url[_url.length - 2];
                if (last.match(/[0-9]/i)) {
                    last = Number(last.toString());
                }
                if (angular.isNumber(last)) {
                    return $http({
                        method: 'DELETE',
                        url: url,
                        headers: headers
                    });
                }
            }
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        };


        return httpHelper;
    });