(function () {
    "use strict";

    angular
        .module("app.admin")
        .config(adminConfig);

    adminConfig.$inject = ['$stateProvider'];

    function adminConfig($stateProvider) {

        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: "app/modules/app.admin/admin/admin.html",
                controller: "AdminController as vm"
            })
            .state('create', {
                url: '/admin/create',
                templateUrl: "app/modules/app.admin/creator/creator.html",
                controller: "CarCreatorController as vm"
            })
            .state('edit', {
                url: '/admin/edit/{id}',
                templateUrl: "app/modules/app.admin/editor/editor.html",
                controller: "EditorController as vm",
                params: {
                    id: null
                }
            })
            .state('parameters', {
                url: '/admin/parameters',
                templateUrl: "app/modules/app.admin/parameters/parameters.html",
                controller: "ParametersController as vm"
            });
    }
})();