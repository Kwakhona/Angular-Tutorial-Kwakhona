'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var LoginCtrl,
        $scope,
        location,
        cookie,
        httpBackend,
        service;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend ,UserAuthentication, $location, $cookies) {
        $scope = $rootScope.$new();
        cookie = $cookies;
        service = UserAuthentication;
        location = $location;
        httpBackend = $httpBackend;

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

});
