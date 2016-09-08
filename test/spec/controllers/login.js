'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var LoginCtrl,
        $scope,
        location,
        authService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $location, UserAuthentication) {
        $scope = $rootScope.$new();
        LoginCtrl = $controller('LoginCtrl', {
            $scope: $scope
        });

        location = $location;
        authService = UserAuthentication;

        $scope = { username: 'admin', password: 'admin' };
    }));

    it('should redirect to project after Login()', function () {
        $scope.Login = authService.login($scope.username, $scope.password)
                        .then(function(response){
                            expect(response.token).toBe('71456dbd15de0c0b6d2b4b44e5a92ad94c6def97');
                            location.path('/projects');
                        });

    });

});
