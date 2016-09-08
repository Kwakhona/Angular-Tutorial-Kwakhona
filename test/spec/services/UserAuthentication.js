'use strict';

describe('Service: UserAuthentication', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var authService,
        scope,
        httpBackend,
        url;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (UserAuthentication, $httpBackend, AUTH_SERVICE_BASE_URI) {
        url = AUTH_SERVICE_BASE_URI + 'api-token-auth/';
        authService = UserAuthentication;
        httpBackend =$httpBackend;
        scope = {username: 'admin', password: 'admin'};
    }));

    it('should get login success', function () {
        httpBackend.expect('POST', url)
            .respond(200, { 'token': '71456dbd15de0c0b6d2b4b44e5a92ad94c6def97' });

        authService.login(scope.username, scope.password)
            .then(function (data) {
                expect(data.token).toBe('71456dbd15de0c0b6d2b4b44e5a92ad94c6def97');
            });

        httpBackend.flush();
    });
});
