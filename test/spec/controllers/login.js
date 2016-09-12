'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var LoginCtrl,
        $scope,
        location,
        cookie,
        httpBackend,
        win,
        service;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend ,UserAuthentication, $location, $cookies, $window) {
        $scope = $rootScope.$new();
        cookie = $cookies;
        service = UserAuthentication;
        location = $location;
        httpBackend = $httpBackend;
        win = $window;

        LoginCtrl = $controller('LoginCtrl', {
            $scope: $scope,
            UserAuthentication: service
        });

    }));

    it('should initialize the Login controller', function () {
        expect(LoginCtrl).toBeDefined();
    });
    it('should redirect user after successful login', function () {
        expect(LoginCtrl).toBeDefined();

        httpBackend.expectPOST('http://userservice.staging.tangentmicroservices.com/api-token-auth/')
            .respond(200, {"token": "71456dbd15de0c0b6d2b4b44e5a92ad94c6def97"});
        $scope = { username: 'admin', password: 'admin' };

        service.login($scope.username, $scope.password)
                .then(function(){
                   location.path('/projects');
                });

        httpBackend.flush();

        expect(cookie.get('token')).toBe('71456dbd15de0c0b6d2b4b44e5a92ad94c6def97');
    });
    
    it('should return an error on login failure -- wrong username/password', function () {
        expect(LoginCtrl).toBeDefined();

        var error;
        httpBackend.expectPOST('http://userservice.staging.tangentmicroservices.com/api-token-auth/')
            .respond(400, {"non_field_errors": ["Unable to login with provided credentials."]});

        $scope = { username: 'adm', password: 'adm' };

        service.login($scope.username, $scope.password)
                .catch(function(err){
                   error = err;
                   win.alert("Error: "+ err.non_field_errors);
                });

        httpBackend.flush();

        expect(error.non_field_errors[0]).toBe("Unable to login with provided credentials.");
    });
    it('should return an error on login failure -- undefined username/password', function () {
        expect(LoginCtrl).toBeDefined();

        var error;
        httpBackend.expectPOST('http://userservice.staging.tangentmicroservices.com/api-token-auth/')
            .respond(400, {"username": ["This field is required."], "password": ["This field is required."]});

        $scope = { username: '', password: '' };

        service.login($scope.username, $scope.password)
                .catch(function(err){
                   error = err;
                   if(angular.isDefined(error.username) || angular.isDefined(error.password)){
                        $window.alert("Username/Password is required. Please try again");
                   }
                });

        httpBackend.flush();

        expect(error.username[0]).toBe("This field is required.");
        expect(error.password[0]).toBe("This field is required.");
    });

});
