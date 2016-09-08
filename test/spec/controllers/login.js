'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var LoginCtrl,
        $scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        LoginCtrl = $controller('LoginCtrl', {
            $scope: $scope
        });

    }));

    it('should initialize the LoginCtrl', function () {
        expect(LoginCtrl).toBeDefined();
    });

});
