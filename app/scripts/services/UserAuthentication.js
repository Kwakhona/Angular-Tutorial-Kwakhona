'use strict';

/**
 * @ngdoc service
 * @name angularTutorialKwakhonaApp.service:UserAuthentication
 * @description
 * # UserAuthentication
 * Service of the angularTutorialKwakhonaApp
 */
angular.module('angularTutorialKwakhonaApp')
.service('UserAuthentication', function ($q, $http, $cookies, AUTH_SERVICE_BASE_URI){
        var UserApi = this;

        UserApi.isLoggedIn = function(){
            var token = UserApi.getToken();
            if(angular.isDefined(token)){
                return true;
            }
            return false;
        };

        // set token
        UserApi.storeToken = function(token){
             $cookies.put('token', token);
        };
        // get token
        UserApi.getToken = function(){
             return $cookies.get('token');
        };
        // delete token
        UserApi.deleteToken = function(){
             $cookies.remove('token');
        };

        // Login 
        UserApi.login = function (username, password) {
            var deferred = $q.defer();
            var url = AUTH_SERVICE_BASE_URI + 'api-token-auth/';

            $http.post(url, {
                username: username, password: password
            }).success(function (response, status, headers, config) {
                if (response.token) {
                   UserApi.storeToken(response.token);
                   UserApi.isLoggedIn = true;
                }
                deferred.resolve(response, status, headers, config);
            }).error(function (response, status, headers, config) {
                deferred.reject(response, status, headers, config);
                // console.log(JSON.stringify(response));
            });

            return deferred.promise;
        };

        // Logout 
       UserApi.logout = function () {
			UserApi.deleteToken();
		};

        return UserApi;
    });