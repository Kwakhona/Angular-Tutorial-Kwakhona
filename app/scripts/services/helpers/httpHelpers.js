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

        httpHelper.get = function (url, data) {
            if (!angular.isUndefined(data.projectId)) {
                var id = data.projectId;
                url += id + '/';
            }

            return $http({
                method: 'GET',
                url: url,
                headers: headers
            })
        }

        return httpHelper;
    });