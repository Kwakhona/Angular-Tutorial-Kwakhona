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
    url = PROJECT_SERVICE_BASE_URI  + 'projects/';
    httpBackend = $httpBackend;
  }));

  it('should get a list of all projects', function () {
      httpBackend.expect('GET', url)
            .respond(200, [{"pk":35,"title":"Justice Unit Tester","description":"To run unit tests on the project","start_date":"2016-08-22","end_date":"2017-01-27","is_billable":true,"is_active":false,"task_set":[],"resource_set":[]},{"pk":125,"title":"Test - Ernest","description":"Test - Title - and edited - revisited","start_date":"2016-09-24","end_date":"2016-10-25","is_billable":true,"is_active":true,"task_set":[],"resource_set":[]},{"pk":126,"title":"Title - Ernest test 2","description":"Desciption - nothing of any real consequence - edited","start_date":"2016-11-25","end_date":"2017-02-23","is_billable":true,"is_active":true,"task_set":[],"resource_set":[]},{"pk":36,"title":"Stark Industries CRM","description":"Helping iron man keep track of his customers","start_date":"2015-02-18","end_date":null,"is_billable":true,"is_active":true,"task_set":[],"resource_set":[]}]);

        service.getProjects()
            .then(function (data) {
                expect(data[0]).toBeDefined();
            });

        httpBackend.flush();
  });
});
