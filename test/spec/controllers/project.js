'use strict';

describe('Controller: ProjectCtrl', function () {

    // load the controller's module
    beforeEach(module('angularTutorialKwakhonaApp'));

    var ProjectCtrl,
        $scope,
        $rootScope,
        projectService,
        httpBackend,
        url;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$rootScope_, _projectService_, _$httpBackend_, _PROJECT_SERVICE_BASE_URI_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

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
    // it('should return a error on get a list of projects failure', function () {

    //     httpBackend.when('GET', 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/')
    //         .respond(403, { 'detail': 'No such user' });
    //     $scope.init();
    //     httpBackend.flush();

    //     expect($scope.success).toBe(false);
    //     expect($scope.error).toBe({ "detail": "No such user" });
    // });

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

    it('should updated a project successfully', function () {
        // updated project
        $scope.project = {
            pk: 190,
            title: "Kwakhona Mahamba not is here",
            description: "Kwakhona test calls",
            start_date: "2016-05-03",
            end_date: "2016-03-09",
            is_billable: true,
            is_active: false
        };

        httpBackend.when('GET', /^.*/).respond(200, {});
        httpBackend.when('PUT', /^.*/)
            .respond(200,
            {
                "pk": 190,
                "title": "Kwakhona Mahamba is not here",
                "description": "Kwakhona test calls",
                "start_date": "2016-05-03",
                "end_date": "2016-03-09",
                "is_billable": true,
                "is_active": false,
                "task_set": [],
                "resource_set": []
            }
            );

        $scope.updateProject($scope.project.pk, $scope.project);

        httpBackend.flush();

        expect($scope.success).toBe(true);
        expect($scope.form.edited).toBe(true);
        expect($scope.res.data).toEqual(
            {
                "pk": 190,
                "title": "Kwakhona Mahamba is not here",
                "description": "Kwakhona test calls",
                "start_date": "2016-05-03",
                "end_date": "2016-03-09",
                "is_billable": true,
                "is_active": false,
                "task_set": [],
                "resource_set": []
            }
        );
    });

    it('should delete a project successfully', function () {
        // project to be deleted
        $scope.project = {
            pk: 190,
            title: "Kwakhona Mahamba not is here",
            description: "Kwakhona test calls",
            start_date: "2016-05-03",
            end_date: "2016-03-09",
            is_billable: true,
            is_active: false
        };

        httpBackend.when('GET', /^.*/).respond(200, {});
        httpBackend.when('DELETE', /^.*/)
            .respond(204);

        projectService.deleteProject($scope.project.pk)
            .then(function (res) {
                $scope.res = res;
            });

        httpBackend.flush();

        expect($scope.success).toBe(true);
        expect($scope.res.status).toEqual(204);
    });

    it('should update the $scope.project which updates the add form', function () {
        var _project = {
            title: "Mr Mahamba",
            description: "Mr Mahamba is not just my father",
            start_date: "2016-05-03",
            end_date: "2016-03-09",
            is_billable: true,
            is_active: true
        };
        $scope.UpdateForm(_project);
        expect($scope.project).toBeDefined();
    });
    it('should update the $scope.project which updates the edit form', function () {
        var _project = {
            pk: 190,
            title: "Mr KR Mahamba",
            description: "Mr Mahamba is not just my father or his brothers and grandfather",
            start_date: "2016-05-03",
            end_date: "2016-03-09",
            is_billable: true,
            is_active: true
        };
        $scope.UpdateForm(_project);

        expect($scope.project).toBeDefined();
    });
    it('should update the $scope.project to default values', function () {
        $scope.UpdateForm();

        expect($scope.project).toBeDefined();
        expect($scope.project.pk).toBe('');
        expect($scope.project.title).toBe('');
        expect($scope.project.description).toBe('');
        expect($scope.project.start_date).toBe('');
        expect($scope.project.end_date).toBe('');
        expect($scope.project.is_active).toBe(false);
        expect($scope.project.is_billable).toBe(false);
    });


    it('should handle error on delete project failure', function () {
        var error;

        // error returned when the project the user is trying to delete does not exists
        httpBackend.when('GET', /^.*/).respond(200, {});
        httpBackend.when('DELETE', /^.*/)
            .respond(404, { "detail": "Not found." });

        projectService.deleteProject(15566)
            .catch(function (err) {
                error = err;
            });
        httpBackend.flush();

        expect(error.data).toEqual({ "detail": "Not found." });

    });
    it('should handle error on update project failure', function () {
        var error;
        // error returned when the project the user is trying to update does not exists
        $scope.project = {
            pk: 15555,
            title: "Kwakhona Mahamba is here",
            description: "Kwakhon's test calls",
            start_date: "2016-05-03",
            end_date: "2016-03-09",
            is_billable: true,
            is_active: true
        };
        httpBackend.when('GET', /^.*/).respond(200, {});
        httpBackend.when('PUT', /^.*/)
            .respond(404, { "detail": "Not found." });

        projectService.updateProject($scope.project.pk, $scope.project)
            .catch(function (err) {
                error = err;
            });
        httpBackend.flush();

        expect(error.data).toEqual({ "detail": "Not found." });
    });
    it('should handle error on add new project failure -- Blank title/description', function () {
        var error;
        // error returned when the project user is trying to add doesn't has a title/description
        $scope.project = {
            title: "",
            description: "",
            start_date: "2016-05-03",
            end_date: "2016-03-09",
            is_billable: true,
            is_active: true
        };
        httpBackend.when('GET', /^.*/).respond(200, {});
        httpBackend.when('POST', 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/')
            .respond(400, { "description": ["This field may not be blank."], "title": ["This field may not be blank."] });

        projectService.createProject($scope.project)
            .catch(function (err) {
                error = err;
            });
        httpBackend.flush();

        expect(error.status).toBe(400);
        expect(error.data).toEqual({ "description": ["This field may not be blank."], "title": ["This field may not be blank."] });
    });
    it('should handle error on add new project failure -- Wrong Date format', function () {
        var error;
        // error returned when the project user is trying to add doesn't has a the incorrect format(YYYY-MM-DD) for start_date/end_date
        $scope._project = {
            title: "Kwaks",
            description: "Kwask is here too",
            start_date: "",
            end_date: "",
            is_billable: true,
            is_active: true
        };
        httpBackend.when('GET', /^.*/).respond(200, {});
        httpBackend.when('POST', 'http://projectservice.staging.tangentmicroservices.com/api/v1/projects/')
            .respond(400, {
                "start_date": ["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."],
                "end_date": ["Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]]."]
            });

        projectService.createProject($scope._project)
            .catch(function (err) {
                error = err;
            });
        httpBackend.flush();

        expect(error.status).toBe(400);
        expect(error.data.start_date[0]).toEqual("Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]].");
        expect(error.data.end_date[0]).toEqual("Date has wrong format. Use one of these formats instead: YYYY[-MM[-DD]].");
    });
});
