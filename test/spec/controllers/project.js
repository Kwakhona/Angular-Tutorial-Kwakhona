'use strict';

describe('Controller: ProjectCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var ProjectCtrl,
        scope,
        q,
        projectService,
        httpBackend,
        url;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$rootScope_, _projectService_, _$httpBackend_, _PROJECT_SERVICE_BASE_URI_, _$q_) {
        scope = _$rootScope_.$new();

        httpBackend = _$httpBackend_;
        projectService = _projectService_;
        url = _PROJECT_SERVICE_BASE_URI_;

        q = _$q_.defer();;
        spyOn(projectService, 'getProjects').and.returnValue(q.promise);

        ProjectCtrl = $controller('ProjectCtrl', {
            $scope: scope, projectService: projectService
        });
    }));


    it('should get a list of projects ', function () {
        q.resolve("Success");
        scope.$digest();
        
        expect(scope.success).toBe(true);
    });
    it('should return error on getProjects failure', function () {
        q.reject("getProjects failed");
        scope.$digest();
        
        expect(scope.success).toBe(false);
    });


    it('should add project successfully', function () {
        var project = {
            title: "Kwakhona Richard Mahamba",
            description: "Kwakhona's 3rd Test Project",
            start_date: "2016-09-19",
            end_date: "2016-09-28",
            is_billable: false,
            is_active: true
        };
        scope.project = project;
        spyOn(projectService, 'createProject').and.returnValue(q.promise);
        
        q.resolve("Success");
        scope.$digest();

        expect(scope.success).toBe(true);
    });
    
    
});
