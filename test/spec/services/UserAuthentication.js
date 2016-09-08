'use strict';

describe('Service: UserAuthentication', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var authService,
        scope,
        httpBackend,
        cookie,
        url;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (UserAuthentication, $httpBackend, $cookie, AUTH_SERVICE_BASE_URI) {
        url = AUTH_SERVICE_BASE_URI + 'api-token-auth/';
        authService = UserAuthentication;
        httpBackend =$httpBackend;
        scope = {username: 'admin', password: 'admin'};
        cookie = $cookie;
    }));

    it('should get token on successful authentication', function () {
        httpBackend.expect('POST', url)
            .respond(200, { 'token': '71456dbd15de0c0b6d2b4b44e5a92ad94c6def97' });

        authService.login(scope.username, scope.password)
            .then(function (data) {
                expect(!data.token).toBe(true);
                expect(cookie.get('token')).toBe('71456dbd15de0c0b6d2b4b44e5a92ad94c6def97');
            });

        httpBackend.flush();
    });

    it('should get error message on authentication failure - wrong password', function () {
        httpBackend.expect('POST', url)
            .respond(200, {"non_field_errors": ["Unable to login with provided credentials."] });

        authService.login(scope.username, "adm")
            .then(function (data) {
                expect(data.non_field_errors).toBe('Unable to login with provided credentials.');
            });

        httpBackend.flush();
    });
    it('should get error message on authentication failure - username & password required', function () {
        httpBackend.expect('POST', url)
            .respond(200, {"username": ["This field is required."], "password": ["This field is required."]});

        authService.login('', '')
            .then(function (data) {
                expect(!data.username).toBe(true);
                expect(!data.password).toBe(true);
                
                expect(data.username).toBe("This field is required.");
                expect(data.password).toBe("This field is required.");
            });

        httpBackend.flush();
    });
});
