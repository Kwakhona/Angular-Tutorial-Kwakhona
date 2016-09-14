'use strict';

describe('Service: projectService', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var service,
        url,
        httpBackend;

    // Initialize the service, httpBackend and a base uri
    beforeEach(inject(function (projectService, $httpBackend, PROJECT_SERVICE_BASE_URI) {
        service = projectService;
        url = PROJECT_SERVICE_BASE_URI + 'projects/';
        httpBackend = $httpBackend;
    }));

    it('should get a list of all projects', function () {
        httpBackend.expect('GET', url)
            .respond(200, [{ "pk": 35, "title": "Justice Unit Tester", "description": "To run unit tests on the project", "start_date": "2016-08-22", "end_date": "2017-01-27", "is_billable": true, "is_active": false, "task_set": [], "resource_set": [] }, { "pk": 125, "title": "Test - Ernest", "description": "Test - Title - and edited - revisited", "start_date": "2016-09-24", "end_date": "2016-10-25", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 126, "title": "Title - Ernest test 2", "description": "Desciption - nothing of any real consequence - edited", "start_date": "2016-11-25", "end_date": "2017-02-23", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, { "pk": 36, "title": "Stark Industries CRM", "description": "Helping iron man keep track of his customers", "start_date": "2015-02-18", "end_date": null, "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }]);
        var res;
        service.getProjects()
            .then(function (response) {
                res = response;
            });

        httpBackend.flush();
        expect(res).toBeDefined();
        expect(res.data).toEqual(
            [
                { "pk": 35, "title": "Justice Unit Tester", "description": "To run unit tests on the project", "start_date": "2016-08-22", "end_date": "2017-01-27", "is_billable": true, "is_active": false, "task_set": [], "resource_set": [] }, 
                { "pk": 125, "title": "Test - Ernest", "description": "Test - Title - and edited - revisited", "start_date": "2016-09-24", "end_date": "2016-10-25", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, 
                { "pk": 126, "title": "Title - Ernest test 2", "description": "Desciption - nothing of any real consequence - edited", "start_date": "2016-11-25", "end_date": "2017-02-23", "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }, 
                { "pk": 36, "title": "Stark Industries CRM", "description": "Helping iron man keep track of his customers", "start_date": "2015-02-18", "end_date": null, "is_billable": true, "is_active": true, "task_set": [], "resource_set": [] }
            ]
        );
    });

    it('should add a project successfully', function () {
        httpBackend.expect('POST', url)
            .respond(201,
            {
                "pk": 153,
                "title": "Kwakhona Mahamba",
                "description": "Kwakhona's Test Project",
                "start_date": "2001-02-20",
                "end_date": "2016-02-20",
                "is_billable": true,
                "is_active": false,
                "task_set": [],
                "resource_set": []
            });
        var project = {
            "title": "Kwakhona Mahamba",
            "description": "Kwakhona's Test Project",
            "start_date": new Date("2001-02-20"),
            "end_date": new Date("2016-02-20"),
            "is_billable": true,
            "is_active": false
        };
        var res;
        service.createProject(project)
            .then(function (response) {
                res = response;
            });

        httpBackend.flush();
        expect(res).toBeDefined();
        expect(res.data.pk).toBe(153);
    });
    it('should add a project successfully -- with no end_date', function () {
        httpBackend.expect('POST', url)
            .respond(201,
            {
                "pk": 153,
                "title": "Kwakhona Mahamba",
                "description": "Kwakhona's Test Project",
                "start_date": "2001-02-20",
                "end_date": "",
                "is_billable": true,
                "is_active": false,
                "task_set": [],
                "resource_set": []
            });
        var project = {
            "title": "Kwakhona Mahamba",
            "description": "Kwakhona's Test Project",
            "start_date": new Date("2001-02-20"),
            "is_billable": true,
            "is_active": false
        };
        var res;
        service.createProject(project)
            .then(function (response) {
                res = response;
            });

        httpBackend.flush();
        expect(res).toBeDefined();
        expect(res.data.pk).toBe(153);
    });

    it('should update a particular project successfully', function () {
        httpBackend.expect('PUT', url + "153/")
            .respond(200,
            {
                "pk": 153,
                "title": "Kwakhona Mahamba",
                "description": "Kwakhona's 1st Test Project",
                "start_date": "2016-09-09",
                "end_date": "2016-02-20",
                "is_billable": true,
                "is_active": true,
                "task_set": [],
                "resource_set": []
            });
        var project = {
            "pk": 153,
            "title": "Kwakhona Mahamba",
            "description": "Kwakhona's 1st Test Project",
            "start_date": new Date("2016-09-09"),
            "is_billable": true,
            "is_active": true
        };
        var res;
        service.updateProject(project.pk, project)
            .then(function (response) {
                res = response;
            });

        httpBackend.flush();
        expect(res).toBeDefined();
        expect(res.data.description).toBe("Kwakhona's 1st Test Project");
    });

    it('should delete a particular project successfully', function () {
        httpBackend.expect('DELETE', url + "155/")
            .respond(204);
        var res;
        service.deleteProject("155")
            .then(function (response) {
                res = response;
            });

        httpBackend.flush();
        expect(res).toBeDefined();
        expect(res.status).toBe(204);
    });

    it('should convert a full text date to this format: YYYY-MM-DD', function () {
        var date = new Date("1990-02-20");

        var new_date = service.dateToString(date);

        expect(new_date).toEqual("1990-2-20");
    });
});
