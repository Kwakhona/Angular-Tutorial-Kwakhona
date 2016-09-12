'use strict';

describe('Controller: ProjectCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var ProjectCtrl,
        scope,
        rootScope,
        projectService,
        httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$rootScope_, _projectService_, _$httpBackend_) {
        rootScope = _$rootScope_;
        scope = _$rootScope_.$new();

        httpBackend = _$httpBackend_;
        projectService = _projectService_;

        ProjectCtrl = $controller('ProjectCtrl', {
            $scope: scope
        });
    }));

    it('should initialize the Project controller', function () {
        expect(ProjectCtrl).toBeDefined();
    });

    it('should get a list of projects', function () {

        httpBackend.when('GET', "http://projectservice.staging.tangentmicroservices.com/api/v1/projects/")
            .respond(200,
            [
                { "pk": 35, "title": "Justice Unit Tester", "description": "To run unit tests on the project2", "start_date": "2016-08-22", "end_date": "2017-01-27", "is_billable": false, "is_active": false, "task_set": [], "resource_set": [] },
                { "pk": 136, "title": "Test - old me", "description": "Test", "start_date": "2015-09-09", "end_date": "2016-09-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 133, "title": "Test - ert", "description": "Testing", "start_date": "2016-09-09", "end_date": "2016-08-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 134, "title": "Test - modify", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 140, "title": "KG testing", "description": "My testing", "start_date": "2015-09-08", "end_date": "2016-03-04", "is_billable": false, "is_active": false, "task_set": [], "resource_set": [] },
                { "pk": 131, "title": "Simple Test23", "description": "Simple Test of a applicaion maybee", "start_date": "2016-11-30", "end_date": "2016-12-01", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 141, "title": "Test Title - Ernest", "description": "This is a test description - update", "start_date": "2016-10-25", "end_date": "2016-11-11", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 142, "title": "Kwakhona Mahamba", "description": "Kwakhona's Test Project", "start_date": "2016-09-09", "end_date": "2016-09-28", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }
            ]);

        projectService.getProjects()
            .then(function (response) {
                expect(response.data[0]).toBe({ "pk": 35, "title": "Justice Unit Tester", "description": "To run unit tests on the project2", "start_date": "2016-08-22", "end_date": "2017-01-27", "is_billable": false, "is_active": false, "task_set": [], "resource_set": [] });
            });
    });

    it('should add project successfully', function () {

        httpBackend.when('POST', "http://projectservice.staging.tangentmicroservices.com/api/v1/projects/")
            .respond(201,
            {
                pk: 143,
                title: "Kwakhona Richard Mahamba",
                description: "Kwakhona's 3rd Test Project",
                start_date: "2016-09-19",
                end_date: "2016-09-28",
                is_billable: false,
                is_active: true,
                task_set: [],
                resource_set: []
            });

        var project = {
            title: "Kwakhona Richard Mahamba",
            description: "Kwakhona's 3rd Test Project",
            start_date: "2016-09-19",
            end_date: "2016-09-28",
            is_billable: false,
            is_active: true
        };

        projectService.createProject(project)
            .then(function (response) {
                expect(response.data).toBe({
                    pk: 143,
                    title: "Kwakhona Richard Mahamba",
                    description: "Kwakhona's 3rd Test Project",
                    start_date: "2016-09-19",
                    end_date: "2016-09-28",
                    is_billable: false,
                    is_active: true,
                    task_set: [],
                    resource_set: []
                });
            });

    });

    it('should update project details(title, description, start_date & is_billable) successfully', function () {

        httpBackend.when('PUT', "http://projectservice.staging.tangentmicroservices.com/api/v1/projects/142/")
            .respond(200,
            {
                pk: 142,
                title: "Kwakhona Richard Mahamba",
                description: "Kwakhona's 3rd Test Project",
                start_date: "2016-09-19",
                end_date: "2016-09-28",
                is_billable: false,
                is_active: true,
                task_set: [],
                resource_set: []
            });

        var project = {
            pk: 142,
            title: "Kwakhona Richard Mahamba",
            description: "Kwakhona's 3rd Test Project",
            start_date: "2016-09-19",
            end_date: "2016-09-28",
            is_billable: false,
            is_active: true,
            task_set: [],
            resource_set: []
        };

        projectService.updateProject(project.pk, project)
            .then(function (response) {
                expect(response.data).toBe({
                    pk: 142,
                    title: "Kwakhona Richard Mahamba",
                    description: "Kwakhona's 3rd Test Project",
                    start_date: "2016-09-19",
                    end_date: "2016-09-28",
                    is_billable: false,
                    is_active: true,
                    task_set: [],
                    resource_set: []
                });
            });

    });

    it('should return a error message on project update failure -- Require fields(title, description & start_date)', function () {

        httpBackend.when('PUT', "http://projectservice.staging.tangentmicroservices.com/api/v1/projects/142/")
            .respond(400,
            {
                "title": ["This field may not be blank."],
                "start_date": ["This field is required."],
                "description": ["This field may not be blank."]
            });

        var project = {
            pk: 142,
            title: "",
            description: "",
            is_billable: false,
            is_active: true
        };

        projectService.updateProject(project.pk, project)
            .then(function (response) {
                expect(response.data).toBe({
                    "title": ["This field may not be blank."],
                    "start_date": ["This field is required."],
                    "description": ["This field may not be blank."]
                });
            });

    });

    it('should return a error message on project update failure -- Incorrect Date format(start_date & end_date)', function () {

        httpBackend.when('PUT', "http://projectservice.staging.tangentmicroservices.com/api/v1/projects/142/")
            .respond(400,
            {
                "start_date": ["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."],
                "end_date": ["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."]
            });

        var project = {
            pk: 142,
            title: "Kwakhona is here",
            description: "Testing is supreme tool",
            start_date: "",
            end_date: "02-02-1990",
            is_billable: false,
            is_active: true
        };

        projectService.updateProject(project.pk, project)
            .then(function (response) {
                expect(response.data).toBe({
                    "start_date": ["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."],
                    "end_date": ["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."]
                });
            });

    });

    it('should delete a project successfully', function () {

        httpBackend.when('DELETE', "http://projectservice.staging.tangentmicroservices.com/api/v1/projects/142/")
            .respond(204);

        var project = {
            pk: 142,
            title: "Kwakhona Richard Mahamba",
            description: "Kwakhona's 2nd Test Project",
            start_date: "2016-09-19",
            end_date: "2016-09-28",
            is_billable: false,
            is_active: true
        };

        projectService.deleteProject(project)
            .then(function (response) {
                expect(response.status).toBe(204);
            });

    });
});
