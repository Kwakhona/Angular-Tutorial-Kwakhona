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
    beforeEach(inject(function ($controller, $rootScope, projectService, $httpBackend, PROJECT_SERVICE_BASE_URI) {
        $scope = $rootScope.$new();
        service = projectService;
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
        expect(ProjectCtrl).toBeDefined();
        httpBackend.expect('GET', url)
            .respond(200, [{ "pk": 35, "title": "Justice Unit Tester", "description": "To run unit tests on the project2", "start_date": "2016-08-22", "end_date": "2017-01-27", "is_billable": false, "is_active": false, "task_set": [], "resource_set": [] }, { "pk": 136, "title": "Test - old me", "description": "Test", "start_date": "2015-09-09", "end_date": "2016-09-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 133, "title": "Test - ert", "description": "Testing", "start_date": "2016-09-09", "end_date": "2016-08-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 134, "title": "Test - modify", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 140, "title": "KG testing", "description": "My testing", "start_date": "2015-09-08", "end_date": "2016-03-04", "is_billable": false, "is_active": false, "task_set": [], "resource_set": [] }, { "pk": 131, "title": "Simple Test23", "description": "Simple Test of a applicaion maybee", "start_date": "2016-11-30", "end_date": "2016-12-01", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 141, "title": "Test Title - Ernest", "description": "This is a test description - update", "start_date": "2016-10-25", "end_date": "2016-11-11", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 142, "title": "Kwakhona Mahamba", "description": "Kwakhona's Test Project", "start_date": "2016-09-09", "end_date": "2016-09-28", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }]);

        $scope.project = $scope.init();

        expect($scope.projects).toBe(
            [
                { "pk": 35, "title": "Justice Unit Tester", "description": "To run unit tests on the project2", "start_date": "2016-08-22", "end_date": "2017-01-27", "is_billable": false, "is_active": false, "task_set": [], "resource_set": [] },
                { "pk": 136, "title": "Test - old me", "description": "Test", "start_date": "2015-09-09", "end_date": "2016-09-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 133, "title": "Test - ert", "description": "Testing", "start_date": "2016-09-09", "end_date": "2016-08-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 134, "title": "Test - modify", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "start_date": "2016-05-03", "end_date": "2016-03-09", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 140, "title": "KG testing", "description": "My testing", "start_date": "2015-09-08", "end_date": "2016-03-04", "is_billable": false, "is_active": false, "task_set": [], "resource_set": [] },
                { "pk": 131, "title": "Simple Test23", "description": "Simple Test of a applicaion maybee", "start_date": "2016-11-30", "end_date": "2016-12-01", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 142, "title": "Kwakhona Mahamba", "description": "Kwakhona's Test Project", "start_date": "2016-09-09", "end_date": "2016-09-28", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] },
                { "pk": 141, "title": "Test Title - Ernest", "description": "This is a test description - update", "start_date": "2016-10-25", "end_date": "2016-11-11", "is_billable": true, "is_active": false, "task_set": [], "resource_set": [] }
            ]
        );

        httpBackend.flush();
    });

    // it('should update project details(title, description, start_date & is_billable) successfully', function () {
    //     httpBackend.expect('PUT', url + "142/")
    //         .respond(200,
    //         {
    //             pk: 142,
    //             title: "Kwakhona Richard Mahamba",
    //             description: "Kwakhona's 2nd Test Project",
    //             start_date: "2016-09-19",
    //             end_date: "2016-09-28",
    //             is_billable: false,
    //             is_active: true,
    //             task_set: [],
    //             resource_set: []
    //         });

    //     var project = {
    //         pk: 142,
    //         title: "Kwakhona Richard Mahamba",
    //         description: "Kwakhona's 2nd Test Project",
    //         start_date: "2016-09-19",
    //         end_date: "2016-09-28",
    //         is_billable: false,
    //         is_active: true,
    //         task_set: [],
    //         resource_set: []
    //     };

    //     service.updateProject(project.pk, project)
    //         .then(function (data) {
    //             expect(data).toBe({
    //                 pk: 142,
    //                 title: "Kwakhona Richard Mahamba",
    //                 description: "Kwakhona's 2nd Test Project",
    //                 start_date: "2016-09-19",
    //                 end_date: "2016-09-28",
    //                 is_billable: false,
    //                 is_active: true,
    //                 task_set: [],
    //                 resource_set: []
    //             });
    //         });

    //     httpBackend.flush();
    // });

});
