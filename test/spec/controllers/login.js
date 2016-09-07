'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var LoginCtrl,
        rootScope,
        scope,
        $controller,
        projectService,
        httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller, _$scope, _$rootScope, _projectService, _$httpBackend) {
        scope = _$scope;
        rootScope = _$rootScope;
        $controller = _$controller;
        projectService = _projectService;
        httpBackend = _$httpBackend;
    }));

    it('should load login()', function ($scope) {
        LoginCtrl = $controller('LoginCtrl', {
            $scope: $scope
        });
        $scope.Login();
    });
});
