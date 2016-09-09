'use strict';

describe('Controller: ProjectCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var ProjectCtrl,
        $scope,
        service,
        httpBackend,
        url;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, projecService, $httpBackend, PROJECT_SERVICE_BASE_URI) {
        $scope = $rootScope.$new();
        service = projecService;
        httpBackend = $httpBackend;
        url = PROJECT_SERVICE_BASE_URI + 'projects/';

        ProjectCtrl = $controller('ProjectCtrl', {
            $scope: $scope
        });

    }));

    it('should initialize the Project controller', function () {
        expect(ProjectCtrl).toBeDefined();
    });

    it('should get a list of projects', function () {
        httpBackend.expect('GET', url)
            .respond(200, [{ "pk": 35, "title": "Justice Unit Tester", "description": "To run unit tests on the project", "start_date": "2016-08-22", "end_date": "2017-01-27", "is_billable": true, "is_active": false, "task_set": [], "resource_set": [] }, { "pk": 125, "title": "Test - Ernest", "description": "Test - Title - and edited - revisited", "start_date": "2016-09-24", "end_date": "2016-10-25", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 126, "title": "Title - Ernest test 2", "description": "Desciption - nothing of any real consequence - edited", "start_date": "2016-11-25", "end_date": "2017-02-23", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 36, "title": "Stark Industries CRM", "description": "Helping iron man keep track of his customers", "start_date": "2015-02-18", "end_date": null, "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }]);

        service.getProjects()
            .then(function (data) {
                expect(data).toBeDefined();
            });

        httpBackend.flush();
    });

    it('should update project details(title, description, start_date & is_billable) successfully', function () {
        httpBackend.expect('PUT', url + "142/")
            .respond(200,
            {
                pk: 142,
                title: "Kwakhona Richard Mahamba",
                description: "Kwakhona's 2nd Test Project",
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
            description: "Kwakhona's 2nd Test Project",
            start_date: "2016-09-19",
            end_date: "2016-09-28",
            is_billable: false,
            is_active: true,
            task_set: [],
            resource_set: []
        };

        service.updateProject(project.pk, project)
            .then(function (data) {
                expect(data).toBe({
                    pk: 142,
                    title: "Kwakhona Richard Mahamba",
                    description: "Kwakhona's 2nd Test Project",
                    start_date: "2016-09-19",
                    end_date: "2016-09-28",
                    is_billable: false,
                    is_active: true,
                    task_set: [],
                    resource_set: []
                });
            });

        httpBackend.flush();
    });

});
