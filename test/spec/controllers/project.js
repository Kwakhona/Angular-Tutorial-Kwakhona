'use strict';

describe('Controller: ProjectCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var ProjectCtrl,
        $scope,
        $rootScope,
        q,
        deferred,
        projectService,
        httpBackend,
        url;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$rootScope_, _projectService_, _$httpBackend_, _PROJECT_SERVICE_BASE_URI_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        q = _$q_;

        httpBackend = _$httpBackend_;
        projectService = _projectService_;
        url = _PROJECT_SERVICE_BASE_URI_;


        ProjectCtrl = $controller('ProjectCtrl', {
            $scope: $scope, projectService: projectService
        });
    }));



    it('should get a list of projects ', function () {

        httpBackend.when('GET', /^.*/)
            .respond(200,
            [
                { "pk": 179, "title": "HenryNduTest-Passed", "description": "Henry test.", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 134, "title": "Test - modify", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }
            ]);
        $scope.init();

        httpBackend.flush();

        expect($scope.success).toBe(true);
        expect($scope.projects).toEqual(
            [
                { "pk": 179, "title": "HenryNduTest-Passed", "description": "Henry test.", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 134, "title": "Test - modify", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }
            ]);
    });

    it('should add a new project successfully', function () {
        $scope.project = {
            title: "Kwakhona Mahamba is here",
            description: "Kwakhon's test calls",
            start_date: "2016-05-03",
            end_date: "2016-03-09",
            is_billable: true,
            is_active: true
        };
        httpBackend.when('GET', /^.*/).respond(200, {});
        httpBackend.when('POST', /^.*/)
            .respond(200,
            { "pk": 190, "title": "Kwakhona Mahamba is here", "description": "Kwakhon's test calls", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }
            );

        $scope.addProject($scope.project);

        httpBackend.flush();

        expect($scope.success).toBe(true);
        expect($scope.form.added).toBe(true);
        expect($scope.res.data).toEqual(
            { "pk": 190, "title": "Kwakhona Mahamba is here", "description": "Kwakhon's test calls", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }
        );
    });

});
