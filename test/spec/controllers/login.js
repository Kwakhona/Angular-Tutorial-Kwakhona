'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var LoginCtrl,
        $scope,
        _authService,
        uri,
        location,
        httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $location, UserAuthentication, $httpBackend, _AUTH_SERVICE_BASE_URI_) {
        $scope = $rootScope.$new();
        LoginCtrl = $controller('LoginCtrl', {
            $scope: $scope
        });

        _authService = UserAuthentication;
        httpBackend = $httpBackend;
        location = $location;
        uri = _AUTH_SERVICE_BASE_URI_ + 'api-token-auth/';

        $scope = { username: 'admin', password: 'admin' };
    }));

    it('should login in successfully', function () {

        httpBackend.expect('POST', uri)
            .respond(200, "{token: 71456dbd15de0c0b6d2b4b44e5a92ad94c6def97}");

        _authService.login($scope.username, $scope.password)
            .then(function (data) {
                expect(data.token).toBe('71456dbd15de0c0b6d2b4b44e5a92ad94c6def97');
            });

        httpBackend.flush();
    });

});
