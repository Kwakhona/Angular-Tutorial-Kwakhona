'use strict';

describe('Service: httpHelpers', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var service,
        url,
        httpBackend;

    // Initialize the service, httpBackend and a base uri
    beforeEach(inject(function (httpHelpers, $httpBackend, PROJECT_SERVICE_BASE_URI) {
        service = httpHelpers;
        url = PROJECT_SERVICE_BASE_URI + 'projects/';
        httpBackend = $httpBackend;
    }));

    it('should make a HTTP GET call successfully -- with no projectId param', function () {
        httpBackend.expectGET(/^.*/).respond(200, '');

        var data = {};
        service.get(url, data)
            .then(function (res) {
                expect(res.status).toBe(200);
            });

        httpBackend.flush();
    });
    it('should make a HTTP GET call successfully -- with a projectId', function () {
        httpBackend.expectGET(/^.*/).respond(200, '');

        var data = { projectId: 155 };
        service.get(url, data)
            .then(function (res) {
                expect(res.status).toBe(200);
            });

        httpBackend.flush();
    });

    it('should make a HTTP POST call successfully', function () {
        httpBackend.expectPOST(url).respond(201, '');

        var data = {
            title: "Kwakhona Mahamba",
            description: "Kwakhona's 3rd Test Project",
            start_date: "2016-09-09",
            end_date: "2016-09-11",
            is_billable: true,
            is_active: true
        };
        service.create(url, data)
            .then(function (res) {
                expect(res.status).toBe(201);
            });

        httpBackend.flush();
    });

    it('should make a HTTP PUT call successfully', function () {
        httpBackend.expectPUT(url+"155/").respond(200, '');

        var data = {
            projectId: 155,
            title: "Kwakhona Mahamba",
            description: "Kwakhona's 2nd Test Project",
            start_date: "2016-09-09",
            is_billable: true,
            is_active: true
        };
        service.update(url, data)
            .then(function (res) {
                expect(res.status).toBe(200);
            });

        httpBackend.flush();
    });

    it('should make a HTTP DELETE call successfully', function () {
        httpBackend.expectDELETE(url+"155/").respond(204, '');

        var data = {
            projectId: 155
        };
        service.remove(url, data)
            .then(function (res) {
                expect(res.status).toBe(204);
            });

        httpBackend.flush();
    });

    it('should extract a projectId from a url & data object and return a new URL', function(){
        var _url = 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/';
        var _data = {
            projectId: 155,
            title: "Kwakhona Mahamba",
            description: "Kwakhona's 2nd Test Project",
            start_date: "2016-09-09",
            is_billable: true,
            is_active: true
        };
        var _newURL = service.extractID(_url, _data);

        expect(_newURL).toBe('http://projectservice.staging.tangentmicroservices.com/api/v1/projects/155/');
    });
});
