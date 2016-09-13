'use strict';

describe('Controller: LoginCtrl', function () {
    var LoginCtrl,
        scope,
        location,
        cookie,
        httpBackend,
        UserAuthentication;

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$rootScope_, _UserAuthentication_, _$httpBackend_, _$location_, _$cookies_) {
        scope = _$rootScope_.$new();
        cookie = _$cookies_;
        location = _$location_;
        httpBackend = _$httpBackend_;
        UserAuthentication = _UserAuthentication_;
        

        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope, $cookies: cookie, UserAuthentication: UserAuthentication, $location: location
        });

    }));

    it('should initialize the Login controller', function () {
        expect(LoginCtrl).toBeDefined();
    });
    it('should redirect user after successful login', function () {
        expect(LoginCtrl).toBeDefined();

        httpBackend.when('POST','http://userservice.staging.tangentmicroservices.com/api-token-auth/')
            .respond(200, { "token": "71456dbd15de0c0b6d2b4b44e5a92ad94c6def97" });

        scope.Login();

        httpBackend.flush();

        expect(location.path()).toBe('/projects');
        expect(cookie.get('token')).toBe('71456dbd15de0c0b6d2b4b44e5a92ad94c6def97');
    });

    it('should return an error on login failure -- wrong username/password', function () {
        expect(LoginCtrl).toBeDefined();

        var error;
        httpBackend.when('POST','http://userservice.staging.tangentmicroservices.com/api-token-auth/')
            .respond(400, { "non_field_errors": ["Unable to login with provided credentials."] });

        scope = { username: 'adm', password: 'adm' };

        UserAuthentication.login(scope.username, scope.password)
            .catch(function (err) {
                if(angular.isDefined(err.non_field_errors)){
                    error = err;
                }
            });

        httpBackend.flush();
        expect(error.non_field_errors[0]).toBe("Unable to login with provided credentials.");


    });
    it('should return an error on login failure -- undefined username/password', function () {
        expect(LoginCtrl).toBeDefined();

        var error;
        httpBackend.when('POST','http://userservice.staging.tangentmicroservices.com/api-token-auth/')
            .respond(400, { "username": ["This field is required."], "password": ["This field is required."] });

        scope = { username: '', password: '' };

        UserAuthentication.login(scope.username, scope.password)
            .catch(function (err) {
                if(angular.isDefined(err.username) || angular.isDefined(err.password)){
                    error = err;
                }
            });

        httpBackend.flush();
        expect(error.username[0]).toBe("This field is required.");
        expect(error.password[0]).toBe("This field is required.");
    });

});
